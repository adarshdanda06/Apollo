'use client'

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Music } from "lucide-react";

interface ProjectCardProps {
  delay: number;
}

export default function ProjectCard({ delay }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <Card className="bg-gray-900/80 border-gray-800 hover:border-gray-600 transition-all backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Music className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl font-semibold">Recent Projects</h3>
          </div>
          <p className="text-gray-400 mb-6">No projects yet. Start creating your masterpiece!</p>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
