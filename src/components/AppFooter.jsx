import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import Logo from "../assets/Logo-2.png";
import { GlobeAltIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

// Standard Social Icon SVGs
const SocialIcon = ({ d }) => (
  <svg
    className="h-5 w-5 fill-current cursor-pointer hover:text-white transition-colors"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={d} />
  </svg>
);

const AppFooter = () => {
  const Navigate = useNavigate();
  // Simplified menu based on user request: About Us, Pricing, Help
  const footerSections = [
    {
      title: "Company",
      links: ["About Us"],
      navigation: "/about",
    },
    {
      title: "Product",
      links: ["Pricing"],
      navigation: "/pricing",
    },
    {
      title: "Support",
      links: ["Help Center"],
      navigation: "/help",
    },
  ];

  return (
    <footer className="bg-gray-300 text-black p-10 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="h-32 w-32 -ml-6" />
            </div>
            <Typography className="text-gray-900 text-sm leading-7 max-w-sm font-medium">
              Empowering the next generation of web development with
              state-of-the-art AI technology. Build, deploy, and scale in
              seconds.
            </Typography>

            {/* Social Icons */}
            <div className="flex items-center gap-6 text-gray-900">
              <SocialIcon d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              <SocialIcon d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.981 0 1.771-.773 1.771-1.729V1.729C24 .774 23.207 0 22.225 0z" />
              <SocialIcon d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              <SocialIcon d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.069.069 0 00-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.927 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-2 space-y-7">
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-black">
                {section.title}
              </p>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      to={section.navigation}
                      className="text-black text-[13.5px] font-medium hover:text-gray-900 transition-colors text-left bg-transparent border-none p-0"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div className="lg:col-span-3 space-y-7">
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-black">
              Stay Updated
            </p>
            <p className="text-gray-900 text-[13.5px] font-medium leading-[1.7">
              Subscribe to our newsletter for the latest updates and AI
              features.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-gray-100 border border-gray-800 rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-700 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
              <Button className="w-full bg-[#6366F1] rounded-xl py-3.5 font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-indigo-500/20 hover:scale-[1.01] hover:bg-indigo-500 transition-all flex items-center justify-center h-12">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-white/[0.03]" />

        {/* Legal and Extras Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-10 text-gray-500">
            <p className="text-[11.5px] font-bold tracking-tight text-gray-900">
              © 2026 WebGen AI. All rights reserved.
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.4)]" />
              <p className="text-[11.5px] font-bold tracking-tight text-gray-900">
                All systems operational
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
