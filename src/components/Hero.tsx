import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-[80vh] grid-background overflow-hidden pb-24">
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent" />

      <div className="container relative pt-32 pb-0 md:pt-40">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-white backdrop-blur-sm">
              ✨ Coming soon: AI Tutors on Video Calls!
            </span>
          </motion.div>

          <motion.div
            className="space-y-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
              Learn German from an
            </h1>
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                AI Educator
              </h1>
              <div className="absolute -inset-x-8 -bottom-4 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            </div>
          </motion.div>

          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We've downloaded the brain of a Goethe-Institute-level teacher into
            an AI. Practice real conversations anytime, anywhere.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={onGetStarted}
              className="btn-primary flex items-center justify-center group"
            >
              Start Learning – It's Free
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
