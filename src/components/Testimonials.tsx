import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  quote: string;
  image: string;
  stars: number;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ name, role, quote, image, stars, delay }) => (
  <motion.div 
    className="testimonial-card relative"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <Quote className="absolute -top-3 -left-3 text-primary/10" size={40} />
    <div className="mb-4 pt-2">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < stars ? 'text-gold-dark fill-gold-dark' : 'text-gray-300'} 
          />
        ))}
      </div>
    </div>
    <p className="text-gray-700 mb-4 italic">{quote}</p>
    <div className="flex items-center">
      <img 
        src={image} 
        alt={name} 
        className="w-12 h-12 rounded-full object-cover mr-4" 
      />
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  </motion.div>
);

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <h2 className="section-title">
          What Our Users Say
        </h2>
        <p className="section-subtitle">
          Join thousands of satisfied learners who have transformed their German language skills with LangTalker.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            name="Sarah Miller"
            role="Exchange Student"
            quote="LangTalker helped me prepare for my semester in Berlin. The conversational practice was exactly what I needed to feel confident when I arrived."
            image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            stars={5}
            delay={0.1}
          />
          <TestimonialCard 
            name="Markus Schmidt"
            role="Business Professional"
            quote="As someone who travels to Germany frequently for work, this app has been invaluable. The AI teacher corrects my pronunciation in a way textbooks never could."
            image="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
            stars={4}
            delay={0.2}
          />
          <TestimonialCard 
            name="Elena Petrescu"
            role="New Resident"
            quote="Moving to Germany was intimidating, but practicing everyday conversations with LangTalker made me feel prepared for real-life situations. And it's free!"
            image="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg"
            stars={5}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;