import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Button } from "@material-tailwind/react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/Logo-2.png";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="fixed top-0 inset-x-0 h-20 bg-white/80 backdrop-blur-xl z-[100] border-b border-gray-100 flex items-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      <div className="max-w-screen-xl mx-auto w-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => navigate("/")}
        >
          <div className="h-10 px-2 flex items-center">
            <img src={Logo} alt="WebGen AI" className="h-40 w-40 object-contain" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link 
            to="/" 
            className="text-[13px] font-black uppercase tracking-[0.1em] text-gray-400 hover:text-indigo-600 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-[13px] font-black uppercase tracking-[0.1em] text-gray-400 hover:text-indigo-600 transition-colors"
          >
            About Us
          </Link>
          <Link 
            to="/pricing" 
            className="text-[13px] font-black uppercase tracking-[0.1em] text-gray-400 hover:text-indigo-600 transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          {user ? (
            <Button
              size="sm"
              variant="gradient"
              className="bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100 normal-case px-8 py-3 font-black text-[12px] tracking-wider transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          ) : (
            <>
              <button 
                className="text-[13px] font-black uppercase tracking-[0.1em] text-gray-900 hover:text-indigo-600 transition-colors mr-2 hidden sm:block"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
              <Button
                size="sm"
                className="bg-indigo-600 rounded-xl shadow-xl shadow-indigo-100 normal-case px-8 py-3.5 font-black text-[12px] tracking-widest transition-all hover:scale-105 active:scale-95"
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
