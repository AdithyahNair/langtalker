import React from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Globe, Award } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <motion.div 
    className="feature-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="section bg-white">
      <div className="container">
        <h2 className="section-title">
          Why Learn with <span className="text-primary">LangTalker</span>?
        </h2>
        <p className="section-subtitle">
          Our AI-powered platform revolutionizes how you learn German, 
          making it more effective, accessible, and enjoyable than traditional methods.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Brain size={24} />}
            title="Expert AI Teacher"
            description="AI replica trained with real language experts' knowledge and teaching methodologies."
            delay={0.1}
          />
          <FeatureCard 
            icon={<MessageSquare size={24} />}
            title="Real Conversations"
            description="Practice authentic dialogues with contextual responses and natural language feedback."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Globe size={24} />}
            title="For Everyone"
            description="Specially designed for immigrants, students, and job seekers who need practical German skills."
            delay={0.3}
          />
          <FeatureCard 
            icon={<Award size={24} />}
            title="100% Free"
            description="Access all features without hidden costs or unexpected subscription fees - forever."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;