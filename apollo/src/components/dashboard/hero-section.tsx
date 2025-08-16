'use client'

import { motion } from "framer-motion";
import { Infinity as InfinityIcon } from "lucide-react";

export default function HeroSection() {
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
        className="text-4xl md:text-8xl font-bold"
      >
        Apollo
      </motion.h1>
    </section>
  );
}
