"""
This script is used to initialize the model for the segmentation server.
"""

import torch
from torchaudio.pipelines import HDEMUCS_HIGH_MUSDB_PLUS

bundle = HDEMUCS_HIGH_MUSDB_PLUS
model = bundle.get_model()
torch.save(model.state_dict(), "hdemucs_model.pt")

