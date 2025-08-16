import { createClient } from "@/utils/supabase/server";
import { redirect, RedirectType } from "next/navigation";
import { type User } from "@supabase/supabase-js";

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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to Apollo, {activeUser.email}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
            <p className="text-gray-400">No projects yet. Start creating!</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                New Project
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
                Import Audio
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <p className="text-gray-400">Email: {activeUser.email}</p>
            <form action={signOutAction} className="mt-4">
              <button 
                type="submit"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}