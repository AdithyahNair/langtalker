import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface CTAProps {
  onGetStarted: () => void;
}

const CTA: React.FC<CTAProps> = ({ onGetStarted }) => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90 -skew-y-2 transform origin-top-right"></div>
      
      {/* Gold accent line */}
      <div className="absolute h-1 bg-gold w-full top-0"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Start Speaking German Today
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-8 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of learners who are already having natural German conversations with our AI teacher. No credit card required.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button 
              className="bg-white text-primary hover:bg-white/90 btn flex items-center justify-center mx-auto sm:mx-0"
              onClick={onGetStarted}
            >
              Start Learning Now
              <ChevronRight className="ml-2" size={20} />
            </button>
            
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 btn flex items-center justify-center mx-auto sm:mx-0">
              Watch Demo
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;