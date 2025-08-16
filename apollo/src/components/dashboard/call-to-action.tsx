'use client'

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 text-center backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to create without limits?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-300">
          Your next masterpiece is just a click away. Start building the sound of the future.
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Create New Project
        </Button>
      </motion.div>
    </section>
  );
}
