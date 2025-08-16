"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Infinity as InfinityIcon } from "lucide-react";
import HeroAtmosphere from "@/components/HeroAtmosphere";
import { redirect, RedirectType } from "next/navigation";

export default function ApolloLanding() {

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      <HeroAtmosphere />
      {/* Content wrapper */}
      <div className="relative z-10 bg-gradient-to-b from-black/80 via-gray-900/60 to-black/90 backdrop-blur-[1px] pt-30">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <InfinityIcon className="w-24 h-24 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          </motion.div>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Apollo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl max-w-2xl text-gray-300"
          >
            The next-generation Digital Audio Workstation built for speed, creativity, and an infinite flow of ideas.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 flex gap-4"
          >
            <Button size="lg" className="bg-white text-black hover:bg-gray-200" onClick={() => {
              redirect("/dashboard", RedirectType.push);
            }}>
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Learn More
            </Button>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Lightning Fast Workflow",
              desc: "Experience instant rendering for uninterrupted creativity.",
            },
            {
              title: "Infinite Tracks",
              desc: "No limits. Layer, mix, and master as many tracks as your mind can imagine.",
            },
            {
              title: "Built-in AI Tools",
              desc: "Harness AI-powered composition, mixing, and mastering for professional sound.",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="py-20 text-center backdrop-blur-sm">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to create without limits?
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of producers and artists already shaping the sound of the future with Apollo.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-200" onClick={() => {
            redirect("/dashboard", RedirectType.push);
          }}>
            Get Started
          </Button>
        </section>

        {/* Footer */}
        <footer className="bg-black/80 border-t border-gray-800 mt-12 py-12 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#">Docs</a></li>
                <li><a href="#">Tutorials</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest news, tips, and exclusive offers.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-900 border-gray-700 text-white"
                />
                <Button className="bg-white text-black hover:bg-gray-200">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Apollo. All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  );
}

