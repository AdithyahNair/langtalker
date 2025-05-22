import React, { useState } from "react";
import { Languages, ArrowLeft, Loader2 } from "lucide-react";
import { createClient, AuthError } from "@supabase/supabase-js";
import { motion } from "framer-motion";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface LoginProps {
  onLogin: () => void;
  onBack: () => void;
  onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        throw signInError;
      }

      if (data.session) {
        // Verify user exists in database but don't wait for result
        supabase
          .from("sensay_users")
          .select("id")
          .eq("id", data.user.id)
          .single()
          .then(({ error: userDataError }) => {
            if (userDataError) {
              console.error("Error verifying user data:", userDataError);
            }
          });

        onLogin();
      }
    } catch (err) {
      const error = err as AuthError;
      setError(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid-background relative flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto px-4 py-12">
        <button
          onClick={onBack}
          className="group mb-8 flex items-center text-sm text-gray-400 hover:text-white transition-colors"
          disabled={isLoading}
        >
          <ArrowLeft
            size={16}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          Back to home
        </button>

        <div className="mx-auto max-w-md space-y-8 text-center">
          <div className="space-y-2">
            <div className="relative inline-block">
              <Languages className="mx-auto h-12 w-12 text-blue-500" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={onSwitchToSignup}
                className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
                disabled={isLoading}
              >
                Sign up
              </button>
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-black/80 backdrop-blur-md shadow-xl border border-red-500/20 rounded-full px-6 py-3 text-sm flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-3" />
              <p className="text-red-500 font-medium">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-left">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-800 bg-[#111111] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2 text-left">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-800 bg-[#111111] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="••••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full rounded-xl bg-blue-500 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0A0A0A] transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              <div
                className={`flex items-center justify-center ${
                  isLoading ? "opacity-0" : ""
                }`}
              >
                Sign in
              </div>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-500">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                </div>
              )}
            </button>
          </form>

          <p className="text-sm text-gray-400">
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
