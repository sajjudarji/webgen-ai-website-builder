import React from "react";
import { Typography } from "@material-tailwind/react";
import { SparklesIcon } from "@heroicons/react/24/outline";

const AppFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-10 mt-auto">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <SparklesIcon className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <div>
            <Typography
              variant="h6"
              className="text-gray-900 leading-none font-black tracking-tight text-sm"
            >
              SiteFlow AI
            </Typography>
            <Typography className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest leading-none">
              © 2024 All Rights Reserved
            </Typography>
          </div>
        </div>

        <div className="flex gap-10">
          {["Product", "Resources", "Support", "Legal"].map((item) => (
            <button
              key={item}
              className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Typography className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em]">
            Crafted with AI
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
