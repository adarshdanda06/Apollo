import { createClient } from "@/utils/supabase/server";
import { redirect, RedirectType } from "next/navigation";
import { type User } from "@supabase/supabase-js";
import HeroSection from "@/components/dashboard/hero-section";
import NavBar from "@/components/dashboard/nav-bar";
import InputAudioFile from "@/components/dashboard/input-audio-file";

export default async function Dashboard() {
  // Check authentication status
  const supabase = await createClient();
  let activeUser: User | null = null;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      redirect('/login', RedirectType.replace);
    }
    activeUser = user;
  } catch (error) {
    console.log(error);
    redirect('/login', RedirectType.replace);
  }

  async function signOutAction() {
    'use server'
    const serverClient = await createClient();
    await serverClient.auth.signOut();
    redirect('/login', RedirectType.replace);
  }

  return (
    <main className="relative min-h-screen text-white overflow-hidden flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      {/* Navigation Bar */}
      <NavBar user={activeUser} signOutAction={signOutAction} />
      
      {/* Content wrapper */}
      <div className="relative z-10 bg-gradient-to-b from-black/80 via-gray-900/60 to-black/90 backdrop-blur-[1px] pt-14 flex-1 flex flex-col">
        
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content Area */}
        <section className="px-4 max-w-4xl mx-auto text-center flex-1 flex items-start justify-center pt-8">
          <div className="space-y-8">
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-30 border border-gray-800/50 px-40">
              <h2 className="text-3xl font-bold mb-4">Workspace</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Import audio files to start creating your next masterpiece.
              </p>
              <div className="relative">
                <InputAudioFile id="audio-file-input" />
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