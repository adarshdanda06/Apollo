"use client"

import { createClient } from "@/utils/supabase/client";
import { redirect, RedirectType } from "next/navigation";
import { type User } from "@supabase/supabase-js";
import HeroSection from "@/components/dashboard/hero-section";
import NavBar from "@/components/dashboard/nav-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { signOutAction } from "@/utils/supabase/signout";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Dashboard() {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
      } else {
        setActiveUser(user);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);


  const [audioFileUrl, setAudioFileUrl] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFileUrl(URL.createObjectURL(file));
      alert("Uploaded");
    }
  };


  if (isLoading || !activeUser) {
    return <LoadingSpinner/>;
  }

  return (
    <main className="relative min-h-screen text-white overflow-hidden flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      {/* Navigation Bar */}
      <NavBar user={activeUser}/>
      
      {/* Content wrapper */}
      <div className="relative z-10 bg-gradient-to-b from-black/80 via-gray-900/60 to-black/90 backdrop-blur-[1px] pt-14 flex-1 flex flex-col">
        
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content Area */}
        <section className="px-4 max-w-4xl mx-auto text-center flex-1 flex items-start justify-center pt-8">
          <div className="space-y-8">
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
              <div className="flex flex-col items-center justify-center">
                {audioFileUrl ? (
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
                    <div className="relative w-full">
                      <Input 
                        type="file" 
                        accept="audio/*" 
                        className="absolute inset-0 w-full h-full hidden z-10" 
                        id="audio-file-input"
                        onChange={handleUpload}
                      />
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white w-full relative z-0"
                        onClick={() => document.getElementById("audio-file-input")?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Import Audio
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer - will stick to bottom */}
      <footer className="bg-black/80 border-t border-gray-800 py-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Apollo. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}