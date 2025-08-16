'use client'

import InputAudioFile from "./input-audio-file"
import {useState} from "react"

export const AudioUploader = () => {
    const [hasUploadedAudio, setHasUploadedAudio] = useState<boolean>(false);

    const handleUpload = () => {
        setHasUploadedAudio(true);
    }
    
    return (
        <div className="flex flex-col items-center justify-center">
            {hasUploadedAudio ? (
                <>
                <h2 className="text-3xl font-bold mb-4">Workspace</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    You have uploaded an audio file.
                </p>
            </>
            ) : (

                <>
                <h2 className="text-3xl font-bold mb-4">Workspace</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Import audio files to start creating your next masterpiece.
                </p>
                <InputAudioFile id="audio-file-input" onUpload={handleUpload} />
            </>
            )}
        </div>
    )
}