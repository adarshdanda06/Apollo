'use client'

import { motion } from "framer-motion";
import { Infinity as InfinityIcon } from "lucide-react";

interface HeroSectionProps {
  userEmail: string;
}

export default function HeroSection({ userEmail }: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <InfinityIcon className="w-20 h-20 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
      </motion.div>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold mb-4"
      >
        Welcome to Apollo
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg md:text-xl max-w-2xl text-gray-300 mb-8"
      >
        Ready to create without limits, {userEmail}?
      </motion.p>
    </section>
  );
}
