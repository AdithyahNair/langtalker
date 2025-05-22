import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ChatLayout from "./components/Layout/ChatLayout";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<"none" | "login" | "signup">("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session on component mount
    checkSession();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    } catch (error) {
      console.error("Error checking session:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setAuthView("none");
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setAuthView("none");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleBack = () => {
    setAuthView("none");
  };

  const handleSwitchToSignup = () => {
    setAuthView("signup");
  };

  const handleSwitchToLogin = () => {
    setAuthView("login");
  };

  if (loading) {
    return (
      <div className="min-h-screen grid-background flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <ChatLayout onLogout={handleLogout} />;
  }

  if (authView === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onBack={handleBack}
        onSwitchToSignup={handleSwitchToSignup}
      />
    );
  }

  if (authView === "signup") {
    return (
      <Signup
        onSignup={handleLogin}
        onBack={handleBack}
        onSwitchToLogin={handleSwitchToLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background font-poppins text-gray-800">
      <Navbar
        onLoginClick={() => setAuthView("login")}
        onSignupClick={() => setAuthView("signup")}
        isAuthenticated={false}
      />
      <main>
        <Hero onGetStarted={() => setAuthView("signup")} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
