'use client'

import { Button } from "@/components/ui/button";
import { Plus, Upload, LogOut, User as UserIcon } from "lucide-react";
import { type User } from "@supabase/supabase-js";

interface NavBarProps {
  user: User;
  signOutAction: () => Promise<void>;
}

export default function NavBar({ user, signOutAction }: NavBarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and user info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-white font-semibold text-lg">Apollo</span>
            </div>
            <div className="hidden md:flex items-center gap-3 text-sm text-gray-300">
              <span>Welcome,</span>
              <span className="text-white font-medium">{user.email}</span>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-3">
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Audio
            </Button>
            <form action={signOutAction} className="inline">
              <Button 
                type="submit"
                size="sm" 
                variant="ghost" 
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
