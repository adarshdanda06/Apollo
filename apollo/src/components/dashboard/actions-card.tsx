'use client'

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Music, Settings } from "lucide-react";

interface ActionsCardProps {
  delay: number;
}

export default function ActionsCard({ delay }: ActionsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <Card className="bg-gray-900/80 border-gray-800 hover:border-gray-600 transition-all backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-green-400" />
            <h3 className="text-2xl font-semibold">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white justify-start">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
            <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white justify-start">
              <Upload className="w-4 h-4 mr-2" />
              Import Audio
            </Button>
            <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white justify-start">
              <Music className="w-4 h-4 mr-2" />
              Browse Templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
