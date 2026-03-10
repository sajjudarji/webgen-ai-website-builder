import React from "react";
import { Typography, Button, Card, CardBody, Avatar } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { SparklesIcon, RocketLaunchIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import AppFooter from "../components/AppFooter";

const About = () => {
  const navigate = useNavigate();

  const team = [
    { name: "Sarah Chen", role: "AI Strategist", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
    { name: "Marcus Trevor", role: "CTO & Software Engineer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
    { name: "Jessica Jhon", role: "Head of Design", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" },
    { name: "Deni Ale", role: "Product Strategist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Minimal */}
      <nav className="h-16 px-10 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <SparklesIcon className="h-5 w-5" />
          </div>
          <Typography className="text-gray-900 font-extrabold tracking-tight">SiteFlow</Typography>
        </div>
        <div className="flex items-center gap-8 text-sm font-bold text-gray-400">
           <Link to="/" className="hover:text-indigo-600">Home</Link>
           <Link to="/pricing" className="hover:text-indigo-600">Pricing</Link>
           <Button onClick={() => navigate("/login")} size="sm" className="bg-indigo-600 rounded-xl normal-case">Get Started</Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-10 py-24 space-y-32">
        {/* Mission Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <Typography className="text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px]">Our Mission</Typography>
            <Typography variant="h1" className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tighter">
              Empowering the next generation of <span className="text-indigo-600">web design</span>
            </Typography>
            <Typography className="text-gray-500 text-lg leading-relaxed max-w-xl font-medium">
              Our mission is to democratize high-end web development through the power of generative AI, making professional design accessible to every visionary, regardless of technical background.
            </Typography>
            <Button size="lg" className="bg-indigo-600 rounded-2xl px-10 py-4 font-bold flex items-center gap-2" onClick={() => navigate("/register")}>View Open Roles <ArrowRightIcon className="h-4 w-4" /></Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full" />
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" className="rounded-[4rem] shadow-2xl relative z-10 w-full h-[500px] object-cover" />
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-[2.5rem] shadow-2xl z-20 flex items-center gap-4 border border-gray-50">
               <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600"><RocketLaunchIcon className="h-6 w-6" /></div>
               <div>
                  <Typography className="text-gray-900 font-black text-lg">500k+</Typography>
                  <Typography className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Websites Generated</Typography>
               </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="text-center space-y-12 max-w-4xl mx-auto">
           <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full" />
           <Typography variant="h2" className="text-4xl font-extrabold text-gray-900">Our Story</Typography>
           <div className="space-y-6 text-gray-500 font-medium text-lg leading-relaxed">
              <p>Founded in 2024, WebFlow AI began as a small research project in San Francisco. We realized that while the web was expanding, the tools to build it remained complex and gate-kept. We saw the balance between having a great idea and having digital presence was still too high.</p>
              <p>We spent years perfecting our proprietary engine using generative AI to understand design rules, user experience, and conversion psychology. To generate not just "generic site" but "results-driven experiences".</p>
              <p>Today, SiteFlow helps thousands of creators, small businesses, and enterprising aesthetic-loving people around the world manifest an electronic site they are proud to lead, out into a digital platform.</p>
           </div>
        </section>

        {/* Visionaries Section */}
        <section className="space-y-20">
           <div className="flex flex-col md:flex-row justify-between items-end gap-10">
              <div className="space-y-4">
                 <Typography variant="h2" className="text-4xl font-extrabold text-gray-900">Meet the Visionaries</Typography>
                 <Typography className="text-gray-500 font-medium max-w-lg">Our core team brings together experts from Google, Figma, and Canva to redefine the digital landscape.</Typography>
              </div>
              <button className="text-indigo-600 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:translate-x-1 transition-transform">Meet us online <ArrowRightIcon className="h-4 w-4" /></button>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="space-y-6">
                   <div className="aspect-square bg-gray-100 rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border border-gray-100 shadow-sm">
                      <img src={member.img} className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <Typography className="text-gray-900 font-black text-lg">{member.name}</Typography>
                      <Typography className="text-indigo-600 font-black text-[10px] uppercase tracking-widest">{member.role}</Typography>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* CTA Container */}
        <section>
          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[3.5rem] p-16 text-center shadow-2xl shadow-indigo-200">
             <Typography variant="h2" className="text-white text-4xl lg:text-5xl font-black mb-10">Ready to build the future?</Typography>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" className="bg-white text-indigo-600 rounded-2xl px-12 py-5 font-black uppercase text-xs tracking-widest" onClick={() => navigate("/register")}>Join Us now <ArrowRightIcon className="h-4 w-4 text-indigo-300" /></Button>
                <Button size="lg" variant="outlined" className="border-white/20 text-white rounded-2xl px-12 py-5 font-black uppercase text-xs tracking-widest hover:bg-white/10" onClick={() => navigate("/pricing")}>Subscribe</Button>
             </div>
          </Card>
        </section>
      </div>

      <AppFooter />
    </div>
  );
};

export default About;
