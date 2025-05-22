import React, { useState } from "react";
import { LogOut, ChevronDown, Languages } from "lucide-react";

interface DashboardNavbarProps {
  onLogout: () => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLevel] = useState("A1 level");

  const levels = [
    { name: "A1 level", available: true },
    { name: "A2 level", available: false },
    { name: "B1 level", available: false },
    { name: "B2 level", available: false },
    { name: "C1 level", available: false },
    { name: "C2 level", available: false },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 bg-[#111111]/90 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* App Logo */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Languages
              size={28}
              className="text-blue-500 transform -rotate-12 transition-transform hover:rotate-0 duration-300"
            />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          </div>
          <span className="text-xl font-bold">
            <span className="text-blue-500">Lang</span>
            <span className="text-white">Talker</span>
          </span>
        </div>

        {/* Language Level Selector */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1a1a] text-white hover:bg-[#222222] transition-colors text-sm font-medium min-w-[120px] justify-between"
          >
            {selectedLevel}
            <ChevronDown
              size={16}
              className={`transform transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full mt-1 w-[180px] py-1 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-lg overflow-hidden">
              {levels.map((level) => (
                <button
                  key={level.name}
                  onClick={() => {
                    if (level.available) {
                      setIsDropdownOpen(false);
                    }
                  }}
                  className={`w-full px-4 py-3 text-sm text-left transition-colors flex items-center justify-between group ${
                    level.available
                      ? selectedLevel === level.name
                        ? "bg-[#222222] text-white"
                        : "text-white hover:bg-[#222222]"
                      : "text-gray-500"
                  }`}
                  disabled={!level.available}
                >
                  <span className="font-medium">{level.name}</span>
                  {!level.available && (
                    <span className="text-xs bg-[#222222] text-gray-400 px-2 py-1 rounded-full group-hover:bg-[#2a2a2a]">
                      Coming soon
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sign Out Button */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a1a] text-gray-300 hover:bg-[#222222] hover:text-white transition-colors text-sm font-medium"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
