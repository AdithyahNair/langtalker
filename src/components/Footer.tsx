import React, { useState } from "react";
import { Check } from "lucide-react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="grid-background relative pt-0">
      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Join our newsletter
          </h3>
          <p className="text-gray-400 mb-8">
            Get the latest updates on new features and German learning tips
            delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 bg-[#111111] border border-gray-800 rounded-full pr-36 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                required
                disabled={isSubmitted}
              />
              {!isSubmitted ? (
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-all"
                >
                  Subscribe
                </button>
              ) : (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-green-500 text-white rounded-full font-medium flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span>Subscribed!</span>
                </div>
              )}
            </div>
            {isSubmitted && (
              <p className="absolute mt-2 text-sm text-green-400">
                Thanks for subscribing! You've been added to our mailing list.
              </p>
            )}
          </form>

          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} LangTalker. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
