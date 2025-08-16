"use client";
import { Upload } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function InputAudioFile({ id }: { id: string }) {
  return (
    <div className="relative w-full">
      <Input 
        type="file" 
        accept="audio/*" 
        className="absolute inset-0 w-full h-full hidden z-10" 
        id={id}
      />
      <Button 
        size="lg" 
        variant="outline" 
        className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white w-full relative z-0"
        onClick={() => document.getElementById(id)?.click()}
      >
        <Upload className="w-4 h-4 mr-2" />
        Import Audio
      </Button>
    </div>
  )
}