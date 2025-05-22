import React, { useState } from "react";
import { Languages, ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { ApiError } from "../types/error";
import { motion } from "framer-motion";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface SignupProps {
  onSignup: () => void;
  onBack: () => void;
  onSwitchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({
  onSignup,
  onBack,
  onSwitchToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createSensayUser = async (userId: string): Promise<string> => {
    let retries = 0;
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;

    while (retries < MAX_RETRIES) {
      try {
        console.log("Creating Sensay user for Supabase ID:", userId);
        const response = await fetch("https://api.sensay.io/v1/users", {
          method: "POST",
          headers: {
            "X-ORGANIZATION-SECRET": import.meta.env
              .VITE_SENSAY_ORGANIZATION_SECRET,
            "X-API-VERSION": import.meta.env.VITE_SENSAY_API_VERSION,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            id: userId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Sensay API error:", errorData);
          if (retries < MAX_RETRIES - 1) {
            retries++;
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
            continue;
          }
          throw new Error(errorData.message || "Failed to create Sensay user");
        }

        const data = await response.json();
        console.log("Sensay user created successfully:", data);
        return data.id;
      } catch (err: unknown) {
        const error = err as ApiError;
        console.error(
          "Error in createSensayUser attempt",
          retries + 1,
          ":",
          error
        );
        if (retries < MAX_RETRIES - 1) {
          retries++;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          continue;
        }
        throw error;
      }
    }
    throw new Error("Failed to create Sensay user after maximum retries");
  };

  const storeSensayUserId = async (
    supabaseUserId: string,
    sensayUserId: string,
    userEmail: string,
    fullName: string
  ) => {
    let retries = 0;
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;

    while (retries < MAX_RETRIES) {
      try {
        console.log("Storing Sensay user mapping:", {
          supabaseUserId,
          sensayUserId,
          email: userEmail,
          full_name: fullName,
        });

        const { error: createError } = await supabase
          .from("sensay_users")
          .insert([
            {
              id: supabaseUserId,
              sensay_user_id: sensayUserId,
              email: userEmail,
              full_name: fullName,
            },
          ])
          .select();

        if (createError) {
          console.error("Error creating sensay user:", createError);
          if (retries < MAX_RETRIES - 1) {
            retries++;
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
            continue;
          }
          throw new Error(
            `Failed to store Sensay user mapping: ${createError.message}`
          );
        }

        console.log("Successfully stored Sensay user mapping in database");
        return;
      } catch (err: unknown) {
        const error = err as ApiError;
        console.error(
          "Error in storeSensayUserId attempt",
          retries + 1,
          ":",
          error
        );
        if (retries < MAX_RETRIES - 1) {
          retries++;
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          continue;
        }
        throw error;
      }
    }
    throw new Error(
      "Failed to store Sensay user mapping after maximum retries"
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log("Starting signup process for email:", email);

      // 1. Create Supabase user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name, // Store name in user metadata
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (!data.user) {
        throw new Error("No user data returned from signup");
      }

      console.log("Supabase user created successfully:", data.user.id);

      // 2. Create Sensay user
      const sensayUserId = await createSensayUser(data.user.id);
      console.log("Received Sensay user ID:", sensayUserId);

      // 3. Store Sensay user ID and full name in our database
      await storeSensayUserId(data.user.id, sensayUserId, email, name);

      // 4. Sign in the user immediately after successful signup
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      console.log("Signup process completed successfully");
      onSignup();
    } catch (err: unknown) {
      const error = err as ApiError;
      console.error("Signup process failed:", error);
      setError(error.message || "An error occurred during signup");
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
            <h1 className="text-2xl font-bold text-white">
              Create your account
            </h1>
            <p className="text-gray-400">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
                disabled={isLoading}
              >
                Sign in
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-left">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-300"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-800 bg-[#111111] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="John Doe"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2 text-left">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-800 bg-[#111111] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="name@example.com"
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
              className="relative w-full rounded-xl bg-blue-500 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0A0A0A] transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
              disabled={isLoading}
            >
              <div
                className={`flex items-center justify-center ${
                  isLoading ? "opacity-0" : ""
                }`}
              >
                Create account
              </div>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-500">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating account...</span>
                  </div>
                </div>
              )}
            </button>
          </form>

          <p className="text-sm text-gray-400">
            By creating an account, you agree to our{" "}
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

export default Signup;
