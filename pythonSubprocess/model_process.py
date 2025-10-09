import torch
import torchaudio
from torchaudio.pipelines import HDEMUCS_HIGH_MUSDB_PLUS
from torchaudio.transforms import Fade
import os
import sys


bundle = HDEMUCS_HIGH_MUSDB_PLUS

model = bundle.get_model()

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

model.to(device)

sample_rate = bundle.sample_rate

def separate_sources(
    model,
    mix,
    segment=10.0,
    overlap=0.1,
    device=None,
):
    """
    Apply model to a given mixture. Use fade, and add segments together in order to add model segment by segment.

    Args:
        segment (int): segment length in seconds
        device (torch.device, str, or None): if provided, device on which to
            execute the computation, otherwise `mix.device` is assumed.
            When `device` is different from `mix.device`, only local computations will
            be on `device`, while the entire tracks will be stored on `mix.device`.
    """
    if device is None:
        device = mix.device
    else:
        device = torch.device(device)

    batch, channels, length = mix.shape

    chunk_len = int(sample_rate * segment * (1 + overlap))
    start = 0
    end = chunk_len
    overlap_frames = overlap * sample_rate
    fade = Fade(fade_in_len=0, fade_out_len=int(overlap_frames), fade_shape="linear")

    final = torch.zeros(batch, len(model.sources), channels, length, device=device)

    while start < length - overlap_frames:
        chunk = mix[:, :, start:end]
        with torch.no_grad():
            out = model.forward(chunk)
        out = fade(out)
        final[:, :, :, start:end] += out
        if start == 0:
            fade.fade_in_len = int(overlap_frames)
            start += int(chunk_len - overlap_frames)
        else:
            start += chunk_len
        end += chunk_len
        if end >= length:
            fade.fade_out_len = 0
    return final


def load_song_and_return_chunk(audios, seg_start, seg_end, sample_rate):
    frame_start = int(seg_start * sample_rate)
    frame_end = int(seg_end * sample_rate)
    drums_seg = audios["drums"][:, frame_start:frame_end].cpu()
    vocals_seg = audios["vocals"][:, frame_start:frame_end].cpu()
    bass_seg = audios["bass"][:, frame_start:frame_end].cpu()
    other_seg = audios["other"][:, frame_start:frame_end].cpu()
    return [drums_seg, vocals_seg, bass_seg, other_seg]


def prepare_and_save_and_return_chunks(song_path, output_path, seg_start, seg_end):
    waveform, sample_rate = torchaudio.load(song_path)  # replace SAMPLE_SONG with desired path for different song
    waveform = waveform.to(device)
    mixture = waveform

    ref = waveform.mean(0)

    waveform = (waveform - ref.mean()) / ref.std()

    sources = separate_sources(
        model,
        waveform[None], # Added [None] here
        device=device,
        overlap=0.1,
        segment=10.0
    )[0]

    sources = sources * ref.std() + ref.mean()
    sources_list = dict(zip(model.sources, sources)) # Convert to dict here

    [drums_seg, vocals_seg, bass_seg, other_seg] = load_song_and_return_chunk(sources_list, seg_start, seg_end, sample_rate)

    os.makedirs(output_path, exist_ok=True)
    torchaudio.save(os.path.join(output_path, "drums.mp3"), drums_seg, sample_rate)
    torchaudio.save(os.path.join(output_path, "vocals.mp3"), vocals_seg, sample_rate)
    torchaudio.save(os.path.join(output_path, "bass.mp3"), bass_seg, sample_rate)
    torchaudio.save(os.path.join(output_path, "other.mp3"), other_seg, sample_rate)

    return [drums_seg, vocals_seg, bass_seg, other_seg]


if __name__ == "__main__":
    input_path = sys.argv[0]
    output_path = sys.argv[1]
    seg_start = int(sys.argv[2])
    seg_end = int(sys.argv[3])
    [d, v, b, o] = prepare_and_save_and_return_chunks(input_path, output_path, seg_start, seg_end)