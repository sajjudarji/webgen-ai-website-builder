import React from "react";
import Heroimg from "../assets/Heroimg.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  IconButton,
  Card,
  CardBody,
} from "@material-tailwind/react";
import {
  SparklesIcon,
  CursorArrowRaysIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

const Landing = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Websites Built", value: "500k+", trend: "↑ 12%" },
    { label: "Active Users", value: "100k+", trend: "↑ 8%" },
    { label: "User Rating", value: "4.9/5", trend: "+ 0.1%" },
    { label: "Global Teams", value: "24", trend: "NEW COUNT" },
  ];

  const features = [
    {
      title: "AI Generation",
      description:
        "Describe your business and watch as our AI generates a complete professional website in seconds.",
      icon: SparklesIcon,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Drag & Drop Editor",
      description:
        "Customize every detail with our intuitive visual editor. Move elements, change colors, and swap images with ease.",
      icon: CursorArrowRaysIcon,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "SEO Optimization",
      description:
        "We built SiteFlow with lightning-fast performance and global hosting. Your site is automatically optimized for SEO.",
      icon: RocketLaunchIcon,
      color: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-16 bg-white/80 backdrop-blur-md z-[100] border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <SparklesIcon className="h-5 w-5" />
            </div>
            <Typography
              variant="h5"
              className="text-gray-900 font-extrabold tracking-tight"
            >
              SiteFlow
            </Typography>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
            <Link to="#" className="hover:text-indigo-600 transition-colors">
              Features
            </Link>
            <Link to="#" className="hover:text-indigo-600 transition-colors">
              Pricing
            </Link>

            <Button
              size="sm"
              className="bg-indigo-600 rounded-lg shadow-lg shadow-indigo-100 normal-case px-6"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <SparklesIcon className="h-4 w-4" /> Power By AI Generative
            </div>
            <Typography
              variant="h1"
              className="text-gray-900 text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight"
            >
              Build your dream website in{" "}
              <span className="text-indigo-600">minutes</span> with AI
            </Typography>
            <Typography className="text-gray-500 text-lg lg:text-xl font-medium max-w-xl mb-10 leading-relaxed">
              Join over 100,000 creators using SiteFlow to build professional
              websites in seconds. No coding, no design skills required.
            </Typography>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                className="bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100 normal-case px-10 py-4 text-base font-bold flex items-center gap-2 group"
                onClick={() => navigate("/register")}
              >
                Get Started For Now{" "}
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <button className="flex items-center gap-2 text-gray-900 font-bold hover:text-indigo-600 transition-colors text-lg px-6">
                <div className="w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center shadow-sm">
                  <PlayIcon className="h-4 w-4 fill-gray-900" />
                </div>
                View Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full"></div>
            <Card className="relative rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-indigo-100/50 overflow-hidden">
              <div className="h-[450px] bg-gray-50 p-8 flex flex-col gap-6">
                {/* New Hero Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={Heroimg}
                    alt="Hero"
                    className="w-full h-full object-cover transform transition-transform duration-1000 "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent"></div>
                </div>

                {/* Floating Elements on Image */}
                <div className="relative z-10 w-full flex flex-col gap-4 mt-auto">
                  <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-4 rounded-2xl max-w-[200px] shadow-2xl">
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-yellow-400 rounded-full"
                        ></div>
                      ))}
                    </div>
                    <Typography className="text-white text-[10px] font-bold leading-tight uppercase tracking-widest">
                      Live Preview
                    </Typography>
                    <Typography className="text-white text-xs font-black">
                      Modern Furniture Site
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-gray-50 bg-gray-50/30">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <Typography
                  variant="small"
                  className="text-gray-400 font-bold uppercase tracking-widest mb-2"
                >
                  {stat.label}
                </Typography>
                <Typography
                  variant="h2"
                  className="text-gray-900 font-black mb-1 leading-none"
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="small"
                  className="text-green-500 font-bold"
                >
                  {stat.trend}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-screen-xl mx-auto text-center mb-20 whitespace-normal">
          <Typography
            variant="h2"
            className="text-gray-900 text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight"
          >
            Powerful Features for Modern Creators
          </Typography>
          <Typography className="text-gray-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Everything you need to launch your online presence in minutes,
            powered by next-generation artificial intelligence.
          </Typography>
        </div>

        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="shadow-none border border-gray-100 rounded-[2rem] p-4 group hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all"
            >
              <CardBody className="p-8">
                <div
                  className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-8 border border-white group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="h-7 w-7" />
                </div>
                <Typography
                  variant="h4"
                  className="text-gray-900 font-bold mb-4 tracking-tight"
                >
                  {feature.title}
                </Typography>
                <Typography className="text-gray-500 font-medium leading-relaxed">
                  {feature.description}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <Card className="bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -mr-48 -mt-48 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 blur-[100px] -ml-48 -mb-48 rounded-full"></div>
            <div className="relative z-10">
              <Typography
                variant="h2"
                className="text-white text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight"
              >
                Ready to build your dream website?
              </Typography>
              <Typography className="text-indigo-100 text-lg font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                Start your today for free through our next generation creator
                platform. Everything you need is already here.
              </Typography>
              <Button
                size="lg"
                className="bg-white text-indigo-600 rounded-2xl px-12 py-5 text-base font-black normal-case shadow-xl shadow-black/10 hover:scale-105 transition-transform"
                onClick={() => navigate("/register")}
              >
                Get Started For Now
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 border-t border-gray-100">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <SparklesIcon className="h-5 w-5" />
                </div>
                <Typography
                  variant="h5"
                  className="text-gray-900 font-extrabold tracking-tight"
                >
                  SiteFlow
                </Typography>
              </div>
              <Typography className="text-gray-500 text-sm font-medium leading-relaxed">
                The world's most advanced AI-powered website builder.
                Personalized experiences for modern creators.
              </Typography>
            </div>

            <div>
              <Typography className="text-gray-900 font-bold mb-6">
                Product
              </Typography>
              <ul className="space-y-4 text-sm font-bold text-gray-500">
                <li>
                  <Link
                    to="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Showcase
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <Typography className="text-gray-900 font-bold mb-6">
                Company
              </Typography>
              <ul className="space-y-4 text-sm font-bold text-gray-500">
                <li>
                  <Link
                    to="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <Typography className="text-gray-900 font-bold mb-6">
                Support
              </Typography>
              <ul className="space-y-4 text-sm font-bold text-gray-500">
                <li>
                  <Link
                    to="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-[12px] font-bold text-gray-400 gap-4 uppercase tracking-widest">
            <div>© 2024 Platform Inc. All rights reserved.</div>
            <div className="flex gap-8">
              <Link to="#" className="hover:text-gray-900 transition-colors">
                Privacy
              </Link>
              <Link to="#" className="hover:text-gray-900 transition-colors">
                Terms
              </Link>
              <Link to="#" className="hover:text-gray-900 transition-colors">
                English
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
