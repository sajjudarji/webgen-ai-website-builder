import React, { Suspense, useRef, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Card,
  CardBody,
} from "@material-tailwind/react";
import {
  SparklesIcon,
  CursorArrowRaysIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  CpuChipIcon,
  CubeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { motion, useMotionValue, useTransform, useInView, useSpring, animate } from "framer-motion";
import PublicNavbar from "../components/PublicNavbar";
import Logo from "../assets/Logo-2.png";

// --- Animated Counter Component ---
const AnimatedCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest).toLocaleString() + suffix);
  
  useEffect(() => {
    if (isInView) {
      const controls = animate(count, parseFloat(value.replace(/[^0-9.]/g, "")), {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const Landing = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "PROJECTS CREATED", value: "500k+", trend: "↑ 12%" },
    { label: "GLOBAL DEVELOPERS", value: "100k+", trend: "↑ 8%" },
    { label: "CLIENT SATISFACTION", value: "4.9/5", trend: "+ 0.1%" },
  ];

  const features = [
    {
      title: "Instant Scaffolding",
      description: "Describe your vision in natural language. Our engine builds accessible React components styled with Tailwind CSS instantly.",
      icon: SparklesIcon,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Smart Theming",
      description: "Generate coherent design systems, typography scales, and color palettes that align with your brand's unique identity.",
      icon: CpuChipIcon,
      color: "text-purple-600 bg-purple-50",
    },
    {
      title: "Edge Deployment",
      description: "Optimized for performance. Export clean code or deploy directly to a global edge network for blazing fast user experiences.",
      icon: RocketLaunchIcon,
      color: "text-green-600 bg-green-50",
    },
    {
      title: "Live Collaboration",
      description: "Multiplayer editing for teams. Work together in a shared canvas where AI components stay synced across every project.",
      icon: CursorArrowRaysIcon,
      color: "text-yellow-600 bg-yellow-50",
    },
    {
      title: "Design Tokens",
      description: "Single source-of-truth style variables that automatically propagate updates across your entire library and codebase.",
      icon: CubeIcon,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      title: "Enterprise Grade",
      description: "Security-first infrastructure with SOC2 compliance, SSO, and granular permissions for large engineering teams.",
      icon: ShieldCheckIcon,
      color: "text-pink-600 bg-pink-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse"></span>
              V1.0 Platform is Live
            </div>
            <Typography
              variant="h1"
              className="text-gray-900 text-6xl lg:text-[5.5rem] font-bold leading-[1] mb-8 tracking-tight"
            >
              Design <br />
              <span className="text-gray-900/40">Interfaces</span> <br />
              with Intelligence.
            </Typography>
            <Typography className="text-gray-500 text-lg lg:text-xl font-medium max-w-lg mb-12 leading-relaxed opacity-80">
              The high-end AI engine for premium product teams. Generate, iterate, and ship high-fidelity components using the most advanced models.
            </Typography>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                className="bg-indigo-600 rounded-xl px-10 py-4 text-sm font-bold normal-case shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:-translate-y-0.5"
                onClick={() => navigate("/register")}
              >
                Get Started Free
              </Button>
              <Button
                variant="text"
                size="lg"
                className="text-gray-500 font-bold border border-gray-100 rounded-xl px-10 py-4 text-sm normal-case hover:bg-gray-50 bg-white"
              >
                View Docs
              </Button>
            </div>
          </motion.div>

          {/* Right Side: Futuristic Orbital Animation (CSS/SVG Version for Stability) */}
          <div className="relative h-[600px] flex items-center justify-center">
            {/* Orbital Design Layers */}
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 flex items-center justify-center">
                  {/* Rotating Outer Ring */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[500px] h-[500px] border border-indigo-100/50 rounded-full"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_15px_rgba(129,140,248,0.8)]"></div>
                  </motion.div>

                  {/* Middle Ring */}
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[350px] h-[350px] border border-indigo-50/50 rounded-full"
                  >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_12px_rgba(192,132,252,0.8)]"></div>
                  </motion.div>

                  {/* Inner Ring */}
                  <div className="absolute w-[200px] h-[200px] border border-gray-100 rounded-full flex items-center justify-center">
                     <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  </div>

                  {/* Central Glow */}
                  <div className="absolute w-[450px] h-[450px] bg-indigo-50 rounded-full blur-[100px] opacity-30"></div>
               </div>
            </div>

            {/* Floating Particle Dot Field (CSS) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-indigo-400 rounded-full opacity-40 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                  initial={{ 
                    x: Math.random() * 500 - 250 + 300, 
                    y: Math.random() * 500 - 250 + 300 
                  }}
                  animate={{ 
                    y: [0, -40, 0],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 4, 
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                  style={{
                    left: "25%",
                    top: "25%"
                  }}
                />
              ))}
            </div>

            {/* Floating Glass UI elements */}
            <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/4 right-0 z-20 bg-white/80 backdrop-blur-xl border border-gray-100 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[200px] ring-1 ring-black/5"
            >
               <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shadow-inner">
                  <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
               </div>
               <div className="flex-1 space-y-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                  <div className="h-2 w-2/3 bg-gray-100 rounded-full"></div>
               </div>
            </motion.div>

            <motion.div 
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-1/4 left-0 z-20 bg-white/80 backdrop-blur-xl border border-gray-100 p-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[200px] ring-1 ring-black/5"
            >
               <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shadow-inner">
                  <SparklesIcon className="h-5 w-5" />
               </div>
               <div className="flex-1 space-y-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                  <div className="h-2 w-1/2 bg-gray-100 rounded-full"></div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-gray-50 bg-[#fafafa]/50">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="group">
                <Typography
                  variant="h2"
                  className="text-gray-900 text-6xl font-bold mb-4 tracking-tighter"
                >
                  <AnimatedCounter value={stat.value} suffix={stat.value.includes("+") ? "+" : ""} />
                </Typography>
                <div className="flex flex-col items-center gap-2">
                   <Typography className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                     {stat.label}
                   </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Heading */}
      <section className="pt-32 pb-20 px-6 text-center">
         <div className="max-w-screen-xl mx-auto">
            <Typography variant="h2" className="text-gray-900 text-5xl font-bold mb-6 tracking-tight">
               The future of design is prompt-based.
            </Typography>
            <Typography className="text-gray-500 text-lg max-w-2xl mx-auto font-medium opacity-80">
               WebGen AI removes the friction between idea and implementation, delivering production-ready assets in milliseconds.
            </Typography>
         </div>
      </section>

      {/* Features Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
               <Card className="h-full shadow-none border border-gray-100/50 rounded-3xl p-6 group hover:border-gray-200 hover:bg-gray-50/30 transition-all duration-300">
                  <CardBody className="p-4">
                     <div className={`w-10 h-10 ${feature.color} rounded-xl flex items-center justify-center mb-8 border border-white shadow-sm ring-4 ring-gray-50`}>
                        <feature.icon className="h-5 w-5" />
                     </div>
                     <Typography
                        variant="h5"
                        className="text-gray-900 font-bold mb-4 tracking-tight"
                     >
                        {feature.title}
                     </Typography>
                     <Typography className="text-gray-500 text-sm font-medium leading-relaxed opacity-70">
                        {feature.description}
                     </Typography>
                  </CardBody>
               </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-indigo-500/90 to-purple-600 rounded-[2.5rem] p-16 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
               {/* Orbital circle in CTA */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
               
               <div className="relative z-10">
                  <Typography
                     variant="h2"
                     className="text-white text-5xl lg:text-7xl font-bold mb-8 tracking-tight max-w-4xl mx-auto"
                  >
                     Build the future of the <br /> 
                     <span className="opacity-80">web, faster than ever.</span>
                  </Typography>
                  <Typography className="text-indigo-100 text-lg font-medium mb-12 max-w-2xl mx-auto opacity-90">
                     Join 500,000+ creators and engineers building high-end interfaces with WebGen AI.
                  </Typography>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                     <Button
                        size="lg"
                        className="bg-white text-indigo-600 rounded-2xl px-12 py-5 text-sm font-black normal-case shadow-xl hover:bg-gray-50 transform hover:scale-105 transition-all"
                        onClick={() => navigate("/register")}
                     >
                        Start Building Now
                     </Button>
                     <Button
                        size="lg"
                        variant="text"
                        className="bg-white/10 text-white border border-white/20 rounded-2xl px-12 py-5 text-sm font-bold normal-case hover:bg-white/20"
                     >
                        Contact Sales
                     </Button>
                  </div>
               </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 border-t border-gray-50 bg-[#fafafa]/30">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-100 pb-10 mb-10 text-gray-500 font-bold text-xs uppercase tracking-widest">
             <div className="flex items-center gap-2">
                <img src={Logo} className="h-8 w-auto grayscale opacity-50" alt="Logo" />
                <span>WebGen AI</span>
             </div>
             <div className="flex gap-10">
                <Link to="/about" className="hover:text-indigo-600 transition-colors">Platform</Link>
                <Link to="/templates" className="hover:text-indigo-600 transition-colors">Showcase</Link>
                <Link to="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
                <Link to="/enterprise" className="hover:text-indigo-600 transition-colors">Enterprise</Link>
             </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-gray-400 gap-4 uppercase tracking-[0.2em]">
            <div>© 2024 WebGen AI Inc. Handcrafted for the next generation.</div>
            <div className="flex gap-8">
               <Link to="#" className="hover:text-gray-900 transition-colors">Twitter</Link>
               <Link to="#" className="hover:text-gray-900 transition-colors">Discord</Link>
               <Link to="#" className="hover:text-gray-900 transition-colors">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
