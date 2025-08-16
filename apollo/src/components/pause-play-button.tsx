import { Pause, Play } from "lucide-react";
import { Button } from "./ui/button";


export function PausePlayButton({ isPlaying, togglePlayback, isGeneratingSprite }: { isPlaying: boolean, togglePlayback: () => void, isGeneratingSprite: boolean }) {
    return (
        <Button
            onClick={togglePlayback}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isGeneratingSprite}
            >
            {isPlaying ? (
            <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
            </>
            ) : (
            <>
                <Play className="w-4 h-4 mr-2" />
                Play
            </>
            )}
        </Button>
    )
}
