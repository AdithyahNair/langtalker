import React from "react";
import { motion } from "framer-motion";

interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-3">
          <span className="text-white">
            {getTimeOfDay() === "morning"
              ? "Guten Morgen"
              : getTimeOfDay() === "afternoon"
              ? "Guten Tag"
              : "Guten Abend"}
            ,{" "}
          </span>
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            {name}
          </span>
        </h1>
        <p className="text-lg text-gray-400">
          Bereit für deine Deutschstunde? Let's start with some basic German
          phrases!
        </p>
      </motion.div>
    </div>
  );
};

export default Greeting;
