import { createClient } from "@/utils/supabase/server";
import { redirect, RedirectType } from "next/navigation";
import { type User } from "@supabase/supabase-js";
import HeroSection from "@/components/dashboard/hero-section";
import ProjectCard from "@/components/dashboard/project-card";
import ActionsCard from "@/components/dashboard/actions-card";
import AccountCard from "@/components/dashboard/account-card";
import CallToAction from "@/components/dashboard/call-to-action";

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
      
      {/* Content wrapper */}
      <div className="relative z-10 bg-gradient-to-b from-black/80 via-gray-900/60 to-black/90 backdrop-blur-[1px] pt-20">
        
        {/* Hero Section */}
        <HeroSection userEmail={activeUser.email || 'User'} />

        {/* Dashboard Grid */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Recent Projects */}
            <ProjectCard delay={0.1} />
            
            {/* Quick Actions */}
            <ActionsCard delay={0.2} />
            
            {/* Account Info */}
            <AccountCard 
              delay={0.3} 
              user={activeUser} 
              signOutAction={signOutAction}
            />
          </div>
        </section>

        {/* Call to Action */}
        <CallToAction />

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