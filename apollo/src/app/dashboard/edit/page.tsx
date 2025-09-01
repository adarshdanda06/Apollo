"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { type User } from "@supabase/supabase-js";
import NavBar from "@/components/dashboard/nav-bar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import DawTrack from "@/components/dashboard/daw-track";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { ArrowLeft } from "lucide-react";

export default function EditPage() {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const audioUrl = searchParams.get('audioUrl');
  const editMode = searchParams.get('editMode');
  

  useEffect(() => {
    if (editMode !== 'true' || !audioUrl) {
      router.replace('/dashboard');
      return;
    }
    
    setIsValid(true);
    
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }
      setActiveUser(user);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, editMode, audioUrl]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  // Show loading while checking auth or validating
  if (isLoading || !activeUser || !isValid) {
    return <LoadingSpinner/>;
  }

  return (
    <main className="relative min-h-screen text-white overflow-hidden flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      {/* Navigation Bar */}
      <NavBar user={activeUser} />
      
      {/* Content wrapper */}
      <div className="relative z-10 bg-gradient-to-b from-black/80 via-gray-900/60 to-black/90 backdrop-blur-[1px] pt-14 flex-1 flex flex-col">
        
        {/* Header with back button */}
        <div className="px-4 max-w-6xl mx-auto w-full pt-8 pb-4">
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              onClick={handleBack}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Audio Editor</h1>
          </div>
        </div>

        {/* Main Content Area */}
        <section className="px-4 max-w-6xl mx-auto text-center flex-1 flex items-start justify-center pt-4 pb-12 w-full">
          <div className="space-y-8 w-full">
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
              <div className="flex flex-col items-center justify-center w-full py-4">
                <h2 className="text-2xl font-bold mb-4">Edit Your Audio</h2>
                <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                  Use the controls below to edit your audio file.
                </p>
                
                {/* Digital Audio Workstation */}
                <div className="w-full max-w-6xl">
                  <h3 className="text-xl font-semibold mb-6 text-center">Digital Audio Workstation</h3>
                  
                  {/* Play All Button */}
                  <div className="mb-6 flex justify-center">
                    <Button 
                      onClick={() => {
                        // This will be implemented to play all tracks
                        console.log('Play all tracks');
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2"
                    >
                      ▶️ Play All
                    </Button>
                  </div>
                  
                  {/* Track Segments */}
                  <div className="space-y-4">
                    <DawTrack 
                      audioUrl={audioUrl!}
                      trackNumber={1}
                      height={60}
                      waveColor="#10b981"
                      progressColor="#34d399"
                      cursorColor="#ffffff"
                      onPlay={() => console.log('Track 1 started playing')}
                      onPause={() => console.log('Track 1 paused')}
                    />
                    
                    <DawTrack 
                      audioUrl={audioUrl!}
                      trackNumber={2}
                      height={60}
                      waveColor="#3b82f6"
                      progressColor="#60a5fa"
                      cursorColor="#ffffff"
                      onPlay={() => console.log('Track 2 started playing')}
                      onPause={() => console.log('Track 2 paused')}
                    />
                    
                    <DawTrack 
                      audioUrl={audioUrl!}
                      trackNumber={3}
                      height={60}
                      waveColor="#8b5cf6"
                      progressColor="#a78bfa"
                      cursorColor="#ffffff"
                      onPlay={() => console.log('Track 3 started playing')}
                      onPause={() => console.log('Track 3 paused')}
                    />
                    
                    <DawTrack 
                      audioUrl={audioUrl!}
                      trackNumber={4}
                      height={60}
                      waveColor="#f97316"
                      progressColor="#fb923c"
                      cursorColor="#ffffff"
                      onPlay={() => console.log('Track 4 started playing')}
                      onPause={() => console.log('Track 4 paused')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-gray-800 py-8 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Apollo. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
