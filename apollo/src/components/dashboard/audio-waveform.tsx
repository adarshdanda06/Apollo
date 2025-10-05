"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface AudioWaveformProps {
  audioUrl: string;
  height?: number;
  waveColor?: string;
  progressColor?: string;
  cursorColor?: string;
  setEditAudioPage: (editAudioPage: boolean) => void;
}

export default function AudioWaveform({
  audioUrl,
  height = 100,
  waveColor = "#4f46e5",
  progressColor = "#818cf8",
  cursorColor = "#ffffff",
  setEditAudioPage
}: AudioWaveformProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

    // Create WaveSurfer instance with default settings
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: waveColor,
      progressColor: progressColor,
      cursorColor: cursorColor,
      barWidth: 3,
      barGap: 2,
      barRadius: 4,
      height: height,
      normalize: true,
      fillParent: true,
      interact: true,
      hideScrollbar: true,
      autoCenter: true,
      barHeight: 1
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
    });

    wavesurfer.on('pause', () => {
      setIsPlaying(false);
    });

    wavesurfer.on('finish', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });


    // Cleanup
    return () => {
      try {
        if (wavesurfer) {
          wavesurfer.destroy();
          wavesurferRef.current = null;
        }
      } catch (error) {
        // This will catch the "signal aborted" error and prevent it from
        // showing up in the console during development or fast navigation.
        console.warn("WaveSurfer cleanup failed:", error);
      }
    };
  }, [audioUrl]);

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

  const handleNext = () => {
    // Set editAudioPage to true
    setEditAudioPage(true);
    
    // Navigate with URL search params
    const params = new URLSearchParams({
      audioUrl: audioUrl,
      editMode: 'true'
    });
    
    router.push(`/dashboard/edit?${params.toString()}`);
  };

  return (
    <div className="w-full space-y-4">
      {/* Waveform Container */}
      <div 
        ref={waveformRef} 
        className="w-full bg-gray-900/50 rounded-lg border border-gray-700/50 p-4"
      />
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-12 h-12 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors duration-200"
          >
            {isPlaying ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <div className="text-sm text-gray-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <div>
          <Button 
            onClick={handleNext}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
