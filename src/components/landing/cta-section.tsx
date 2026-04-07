"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-32 px-8">
      <motion.div
        className="max-w-[1200px] mx-auto relative rounded-3xl overflow-hidden glass-panel border border-primary/20 p-16 md:p-24 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Decorative background icon */}
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg
            className="w-[200px] h-[200px] text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
          Ready to digitize your capital strategy?
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Button variant="primary" size="lg" className="px-12 py-4 text-lg font-bold">
            Schedule a Demo
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="bg-white/10 text-white border border-white/20 px-12 py-4 text-lg font-bold hover:bg-white/20"
          >
            Read Case Studies
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
