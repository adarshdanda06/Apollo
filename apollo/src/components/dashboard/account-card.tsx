'use client'

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon } from "lucide-react";
import { type User } from "@supabase/supabase-js";

interface AccountCardProps {
  delay: number;
  user: User;
  signOutAction: () => Promise<void>;
}

export default function AccountCard({ delay, user, signOutAction }: AccountCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <Card className="bg-gray-900/80 border-gray-800 hover:border-gray-600 transition-all backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <UserIcon className="w-6 h-6 text-purple-400" />
            <h3 className="text-2xl font-semibold">Account</h3>
          </div>
          <div className="space-y-4 mb-6">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Member Since</p>
              <p className="text-white font-medium">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <form action={signOutAction}>
            <Button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
