"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "../ui/button";

interface DawTrackProps {
  audioUrl: string;
  trackNumber: number;
  height?: number;
  waveColor?: string;
  progressColor?: string;
  cursorColor?: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export default function DawTrack({
  audioUrl,
  trackNumber,
  height = 60,
  waveColor = "#4f46e5",
  progressColor = "#818cf8",
  cursorColor = "#ffffff",
  onPlay,
  onPause
}: DawTrackProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!waveformRef.current) return;

    // Create WaveSurfer instance optimized for DAW
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: waveColor,
      progressColor: progressColor,
      cursorColor: cursorColor,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: height,
      normalize: true,
      fillParent: true,
      interact: true,
      hideScrollbar: true,
      autoCenter: false, // Better for DAW
      barHeight: 0.8
    });

    // Store reference
    wavesurferRef.current = wavesurfer;

    // Load audio
    wavesurfer.load(audioUrl).catch((error) => {
        // The AbortError is expected when the component unmounts during loading.
        // We can safely ignore it.
        if (error.name === 'AbortError') {
          return;
        }
        // For other errors (e.g., 404 Not Found), we might want to log them.
        console.error('Wavesurfer load error:', error);
    });
    // Event listeners
    wavesurfer.on('ready', () => {
      setDuration(wavesurfer.getDuration());
    });

    wavesurfer.on('audioprocess', () => {
      setCurrentTime(wavesurfer.getCurrentTime());
    });

    wavesurfer.on('play', () => {
      setIsPlaying(true);
      onPlay?.();
    });

    wavesurfer.on('pause', () => {
      setIsPlaying(false);
      onPause?.();
    });

    wavesurfer.on('finish', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    // Cleanup
    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl, onPlay, onPause]);

  const togglePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTrackColor = (trackNumber: number) => {
    const colors = [
      { bg: "bg-green-600", hover: "hover:bg-green-700" },
      { bg: "bg-blue-600", hover: "hover:bg-blue-700" },
      { bg: "bg-purple-600", hover: "hover:bg-purple-700" },
      { bg: "bg-orange-600", hover: "hover:bg-orange-700" }
    ];
    return colors[(trackNumber - 1) % colors.length];
  };

  const trackColors = getTrackColor(trackNumber);

  return (
    <div className="bg-gray-800/40 rounded-lg border border-gray-700/50 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-300">Track {trackNumber}</h4>
        <div className="flex items-center space-x-3">
          <div className="text-xs text-gray-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <Button 
            size="sm"
            onClick={togglePlay}
            className={`${trackColors.bg} ${trackColors.hover} text-white px-3 py-1`}
          >
            {isPlaying ? "⏸️" : "▶️"}
          </Button>
        </div>
      </div>
      
      {/* Waveform Container */}
      <div 
        ref={waveformRef} 
        className="w-full bg-gray-900/30 rounded border border-gray-600/30 p-2"
      />
    </div>
  );
}
