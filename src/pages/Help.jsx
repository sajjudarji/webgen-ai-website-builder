import React from "react";
import {
  Typography,
  Button,
  Input,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import {
  SparklesIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  UserIcon,
  CreditCardIcon,
  WrenchScrewdriverIcon,
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import AppFooter from "../components/AppFooter";

const Help = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Getting Started",
      description:
        "Everything you need to set up and launch your first SiteFlow website.",
      icon: SparklesIcon,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Account",
      description: "Manage your profile, security settings, and team members.",
      icon: UserIcon,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Billing",
      description: "Information about subscriptions, payments, and invoices.",
      icon: CreditCardIcon,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Technical",
      description: "API documentation, webhooks, and advanced configurations.",
      icon: WrenchScrewdriverIcon,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
  ];

  const articles = [
    "How to connect your custom domain",
    "Optimizing images for web performance",
    "Configuring site analytics and SEO",
    "Managing environment variables securely",
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navbar Minimal */}
      <nav className="h-16 px-10 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-[100]">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black uppercase text-xs tracking-tighter shadow-lg shadow-indigo-100 italic">
            SF
          </div>
          <Typography className="text-gray-900 font-extrabold tracking-tighter text-xl">
            SiteFlow
          </Typography>
        </div>
        <div className="flex items-center gap-10 text-xs font-black text-gray-400 uppercase tracking-widest leading-none pt-1">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-indigo-600 transition-colors">
            About Us
          </Link>
          <Link
            to="/pricing"
            className="hover:text-indigo-600 transition-colors"
          >
            Pricing
          </Link>
        </div>
      </nav>

      {/* Hero Search Section */}
      <section className="bg-gradient-to-b from-indigo-50/50 to-white pt-24 pb-20 px-10 text-center">
        <Typography
          variant="h1"
          className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight"
        >
          How can we help?
        </Typography>
        <Typography className="text-gray-500 font-medium mb-10 max-w-xl mx-auto">
          Search our knowledge base for answers to your questions, guides, and
          technical documentation.
        </Typography>

        <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-xl shadow-indigo-100/50 border border-indigo-50 flex items-center gap-2">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 ml-4 shrink-0" />
          <input
            type="text"
            placeholder="Search for articles, guides, and more..."
            className="w-full bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 px-2 py-3"
          />
          <Button
            size="lg"
            className="bg-indigo-600 rounded-xl px-10 shrink-0 capitalize text-sm font-bold shadow-md shadow-indigo-200"
          >
            Search
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-gray-400">
          <span className="uppercase tracking-widest text-[9px]">Popular:</span>
          <span className="hover:text-indigo-600 cursor-pointer transition-colors bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
            Custom Domains
          </span>
          <span className="hover:text-indigo-600 cursor-pointer transition-colors bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
            SEO Optimization
          </span>
          <span className="hover:text-indigo-600 cursor-pointer transition-colors bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
            Billing Policy
          </span>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-10 py-16 space-y-20 relative z-10">
        {/* Categories Grid */}
        <section>
          <Typography
            variant="h3"
            className="text-xl font-extrabold text-gray-900 mb-8 tracking-tight"
          >
            Browse by Category
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card
                key={category.title}
                className="shadow-lg shadow-gray-200/40 border border-gray-100 rounded-3xl hover:-translate-y-1 transition-transform cursor-pointer group"
              >
                <CardBody className="p-8 space-y-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${category.bg} ${category.color} group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="h-6 w-6 stroke-[2.5]" />
                  </div>
                  <Typography className="text-lg font-black text-gray-900">
                    {category.title}
                  </Typography>
                  <Typography className="text-gray-500 text-sm font-medium leading-relaxed">
                    {category.description}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Bottom Section: Articles & Support Card */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
          {/* Popular Articles */}
          <div className="lg:col-span-2 space-y-6">
            <Typography
              variant="h3"
              className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight"
            >
              Popular Articles
            </Typography>
            <div className="space-y-4">
              {articles.map((article, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-indigo-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <DocumentTextIcon className="h-5 w-5 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                    <Typography className="font-bold text-gray-800 text-sm">
                      {article}
                    </Typography>
                  </div>
                  <ChevronRightIcon className="h-4 w-4 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Need Help Card */}
          <Card className="bg-indigo-500 text-white shadow-2xl shadow-indigo-200/50 rounded-3xl border-none p-1 shrink-0">
            <CardBody className="p-8 space-y-6">
              <Typography
                variant="h3"
                className="text-2xl font-black tracking-tight"
              >
                Still need help?
              </Typography>
              <Typography className="text-indigo-100 text-sm font-medium leading-relaxed">
                Our support team is available 24/7 to assist you with any
                technical or account-related issues.
              </Typography>

              <div className="space-y-4 pt-4">
                <Button className="w-full bg-white text-indigo-600 flex items-center justify-center gap-2 py-4 rounded-xl shadow-lg capitalize text-sm font-bold hover:bg-gray-50 transition-colors">
                  <ChatBubbleBottomCenterTextIcon className="h-5 w-5" /> Live
                  Chat
                </Button>
                <Button className="w-full bg-indigo-600/50 border border-white/20 text-white flex items-center justify-center gap-2 py-4 rounded-xl shadow-none hover:bg-white/10 transition-colors capitalize text-sm font-bold">
                  <EnvelopeIcon className="h-5 w-5" /> Email Support
                </Button>
              </div>

              <Typography className="text-center text-[10px] font-bold text-indigo-200 pt-2 uppercase tracking-widest">
                Average response time: 2 hours
              </Typography>
            </CardBody>
          </Card>
        </section>
      </div>

      <AppFooter />
    </div>
  );
};

export default Help;
