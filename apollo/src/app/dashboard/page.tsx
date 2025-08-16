import { createClient } from "@/utils/supabase/server";
import { redirect, RedirectType } from "next/navigation";
import { type User } from "@supabase/supabase-js";
import HeroSection from "@/components/dashboard/hero-section";
import NavBar from "@/components/dashboard/nav-bar";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";

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
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      {/* Navigation Bar */}
      <NavBar user={activeUser} signOutAction={signOutAction} />
      
      {/* Content wrapper */}
      <div className="relative z-10 bg-gradient-to-b from-black/80 via-gray-900/60 to-black/90 backdrop-blur-[1px] pt-24">
        
        {/* Hero Section */}
        <HeroSection userEmail={activeUser.email || 'User'} />

        {/* Main Content Area */}
        <section className="py-20 px-4 max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-12 border border-gray-800/50">
              <h2 className="text-3xl font-bold mb-4">Your Workspace</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Start creating your next masterpiece. Use the navigation bar above to create new projects, 
                import audio files, or manage your account.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Project
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Audio
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/80 border-t border-gray-800 mt-12 py-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Apollo. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}