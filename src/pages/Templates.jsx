import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import {
  SparklesIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  RocketLaunchIcon,
  CommandLineIcon,
  PresentationChartLineIcon,
  UserIcon,
  PowerIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { setWebsite } from "../store/builderSlice";
import { logout } from "../store/authSlice";
import DashboardLayout from "../layouts/DashboardLayout";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const res = await axios.get(
          "http://localhost:5000/api/templates",
          config,
        );
        setTemplates(res.data.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTemplates();
  }, [user.token]);

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const useTemplate = async (template) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const res = await axios.post(
        "http://localhost:5000/api/websites/from-template",
        {
          templateId: template._id,
          name: `My ${template.name}`,
        },
        config,
      );

      if (res.data.success) {
        dispatch(setWebsite(res.data.data));
        navigate(`/builder/${res.data.data._id}`);
      }
    } catch (error) {
      console.error("Error using template:", error);
    }
  };

  const categories = [
    "All",
    "Portfolio",
    "Agency",
    "SaaS",
    "Restaurant",
    "E-commerce",
    "Blog",
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Templates Content */}
        {/* Hero Section */}
        <section className="py-24 text-center px-6">
          {/* ... existing hero content ... */}
          <Typography
            variant="h1"
            className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-6"
          >
            Build your dream site in <br />
            <span className="text-indigo-600">seconds</span>
          </Typography>
          <Typography className="text-gray-500 text-lg font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Professional, high-performance templates crafted by designers. Fully{" "}
            <br />
            customizable with AI and ready for your content.
          </Typography>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
            <Card className="relative p-2 rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-2">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                <input
                  placeholder="Describe the site you need to build..."
                  className="flex-1 outline-none text-gray-900 font-medium placeholder:text-gray-400 text-sm"
                />
                <Button
                  color="indigo"
                  className="rounded-xl px-8 shadow-indigo-100 normal-case font-bold py-3"
                >
                  Generate
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Filters & Sorting */}
        <section className="max-w-screen-xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-10">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-[13px] font-bold tracking-wide transition-all ${
                    activeCategory === cat
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Typography
                variant="small"
                className="text-gray-400 font-bold uppercase tracking-wider text-[11px]"
              >
                Sort by:
              </Typography>
              <button className="flex items-center gap-2 font-bold text-gray-900 text-[13px] hover:text-indigo-600 transition-colors">
                Most Popular <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Template Grid */}
        <section className="max-w-screen-xl mx-auto px-6 mb-24 min-h-[400px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Typography className="animate-pulse text-indigo-600 font-bold">
                Loading brilliant templates...
              </Typography>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {templates.map((template, idx) => (
                <Card
                  key={template._id}
                  className="rounded-3xl border border-gray-100 shadow-none hover:shadow-2xl hover:shadow-indigo-50/50 transition-all group"
                >
                  <div className="h-64 relative bg-gray-50 overflow-hidden group-hover:p-2 transition-all duration-500">
                    <div className="w-full h-full rounded-t-2xl group-hover:rounded-2xl transition-all overflow-hidden relative shadow-inner">
                      <img
                        src={
                          template.thumbnail ||
                          `https://images.unsplash.com/photo-${1500000000000 + idx * 1000}?auto=format&fit=crop&q=80`
                        }
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={template.name}
                      />
                    </div>
                  </div>
                  <CardBody className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <Typography
                        variant="h5"
                        className="text-gray-900 font-black tracking-tight leading-none group-hover:text-indigo-600 transition-colors"
                      >
                        {template.name}
                      </Typography>
                      <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black px-2 py-1 rounded shadow-sm uppercase tracking-widest">
                        FREE
                      </span>
                    </div>
                    <Typography className="text-gray-500 text-sm font-medium mb-8 leading-relaxed line-clamp-2 h-10">
                      {template.description ||
                        "A clean, typography-focused layout perfect for modern brands and visual designers."}
                    </Typography>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                      <div className="flex items-center gap-2 text-gray-400">
                        <CommandLineIcon className="h-4 w-4" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          Mobile Ready
                        </span>
                      </div>
                      <Button
                        onClick={() => useTemplate(template)}
                        size="sm"
                        className="bg-indigo-600 rounded-lg normal-case font-bold px-6 shadow-none hover:scale-105 transition-transform"
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

// Icon placeholders since I only imported a few
const ArrowPathIcon = ({ className }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
);

export default Templates;
