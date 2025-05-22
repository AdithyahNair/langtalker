import React, { useState, useEffect } from "react";
import { Languages, Menu, X } from "lucide-react";

interface NavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  onLoginClick,
  onSignupClick,
  onLogout,
  isAuthenticated,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm py-4" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Languages
                  size={28}
                  className="text-blue-600 transform -rotate-12 transition-transform hover:rotate-0 duration-300"
                />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Lang<span className="text-primary font-black">Talker</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="text-primary hover:text-primary-dark font-medium text-sm"
              >
                Log out
              </button>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="text-primary hover:text-primary-dark font-medium text-sm"
                >
                  Sign in
                </button>
                <button
                  onClick={onSignupClick}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  Sign up
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-4">
          <div className="py-4 px-6 flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
              {isAuthenticated ? (
                <button
                  onClick={onLogout}
                  className="text-primary hover:text-primary-dark font-medium text-sm py-2"
                >
                  Log out
                </button>
              ) : (
                <>
                  <button
                    onClick={onLoginClick}
                    className="text-primary hover:text-primary-dark font-medium text-sm py-2"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={onSignupClick}
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
