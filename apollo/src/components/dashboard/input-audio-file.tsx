"use client";
import { Upload } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function InputAudioFile({ id, onUpload }: { id: string, onUpload: () => void }) {
  
  const handleUpload = () => {
    const file = (document.getElementById(id) as HTMLInputElement).files?.[0];
    if (file) {
      console.log(file);
      alert("Uploaded");
    }
  }
  
  return (
    <div className="relative w-full">
      <Input 
        type="file" 
        accept="audio/*" 
        className="absolute inset-0 w-full h-full hidden z-10" 
        id={id}
        onChange={handleUpload}
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