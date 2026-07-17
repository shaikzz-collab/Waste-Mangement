import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Terminal, MapPin, History, BarChart3, LogOut, Menu, X, ShieldAlert } from "lucide-react";

const Navbar = () => {
  const { currentUser, isDemoMode, logout, forceDemoMode } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const navLinks = [
    { name: "Scanner", path: "/", icon: <Terminal size={18} /> },
    { name: "Map", path: "/map", icon: <MapPin size={18} /> },
    { name: "History", path: "/history", icon: <History size={18} /> },
    { name: "Dashboard", path: "/dashboard", icon: <BarChart3 size={18} /> }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#10251C] border-b border-[#204732] text-[#E8FFF3] font-mono shadow-md backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Header */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold tracking-wider text-[#37D67A] hover:text-[#E8FFF3] transition-colors">
              <span className="p-1.5 bg-[#07140F] border border-[#204732] rounded text-glow">
                ♻
              </span>
              <span>WASTEGUIDE AI</span>
            </Link>

            {/* Demo Mode Badge */}
            {isDemoMode && (
              <div className="hidden sm:flex items-center gap-1.5 ml-4 px-2.5 py-0.5 rounded border border-amber-600 bg-amber-950/40 text-amber-400 text-xs font-semibold uppercase animate-pulse">
                <ShieldAlert size={12} />
                Demo Mode
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-all duration-200 ${
                  isActive(link.path)
                    ? "bg-[#204732] text-[#37D67A] border border-[#37D67A]/30 text-glow"
                    : "text-[#8AA89A] hover:text-[#37D67A] hover:bg-[#07140F]/50"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* User Auth Section */}
          <div className="hidden md:flex items-center gap-4 border-l border-[#204732] pl-4">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-[#8AA89A]">OPERATOR</p>
                  <p className="text-sm font-semibold truncate max-w-[150px] text-[#37D67A]">{currentUser.displayName || currentUser.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-[#8AA89A] hover:text-red-400 hover:bg-[#07140F]/50 rounded transition-all duration-200"
                  title="Disconnect Operator"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={forceDemoMode}
                className="px-3.5 py-1.5 bg-[#204732] hover:bg-[#37D67A] hover:text-[#07140F] border border-[#37D67A] text-xs font-bold rounded transition-all duration-200"
              >
                BOOT DEMO
              </button>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#8AA89A] hover:text-[#37D67A] hover:bg-[#204732]/50 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#204732] bg-[#10251C]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isDemoMode && (
              <div className="flex items-center gap-1.5 mx-3 my-2 px-2 py-1 rounded border border-amber-600 bg-amber-950/40 text-amber-400 text-xs font-semibold uppercase">
                <ShieldAlert size={12} />
                Demo Mode Active
              </div>
            )}
            
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? "bg-[#204732] text-[#37D67A] border-l-4 border-l-[#37D67A]"
                    : "text-[#8AA89A] hover:text-[#37D67A] hover:bg-[#07140F]/30"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            <div className="border-t border-[#204732] pt-4 pb-2 px-3">
              {currentUser ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#8AA89A]">OPERATOR</p>
                    <p className="text-sm font-semibold text-[#37D67A]">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#07140F] border border-red-950 text-red-400 hover:bg-red-950/20 text-xs font-bold rounded"
                  >
                    <LogOut size={14} />
                    DISCONNECT
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    forceDemoMode();
                    setIsOpen(false);
                  }}
                  className="w-full py-2 bg-[#204732] hover:bg-[#37D67A] hover:text-[#07140F] border border-[#37D67A] text-sm font-bold rounded text-center"
                >
                  BOOT DEMO OPERATOR
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
