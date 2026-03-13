import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Button,
  IconButton,
  Input,
  Progress,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Tooltip,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  Squares2X2Icon,
  GlobeAltIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  SparklesIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => {
  const [websites, setWebsites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalWebsites, setTotalWebsites] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWebsites = async () => {
      setIsLoading(true);
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
          params: {
            status:
              activeTab === "all"
                ? ""
                : activeTab === "drafts"
                  ? "draft"
                  : activeTab,
            page: currentPage,
            limit: 5,
          },
        };
        const res = await axios.get(
          "http://localhost:5000/api/websites",
          config,
        );
        setWebsites(res.data.data);
        setTotalPages(res.data.pages || 1);
        setTotalWebsites(res.data.total || 0);
      } catch (error) {
        console.error("Error fetching websites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebsites();
  }, [user.token, activeTab, currentPage]);

  // Reset page on tab change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const deleteWebsite = async (id) => {
    if (window.confirm("Are you sure you want to delete this website?")) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        await axios.delete(`http://localhost:5000/api/websites/${id}`, config);
        setWebsites(websites.filter((site) => site._id !== id));
      } catch (error) {
        console.error("Error deleting website:", error);
      }
    }
  };

  const tabs = [
    { id: "all", label: "All Sites", count: totalWebsites },
    {
      id: "published",
      label: "Published",
      count: "-",
    },
    { id: "drafts", label: "Drafts", count: "-" },
    { id: "archived", label: "Archived", count: 0 },
  ];

  const filteredWebsites = websites.filter((site) => {
    if (activeTab === "all") return true;
    if (activeTab === "published") return true; // Just for demo, in real app check site.published
    if (activeTab === "drafts") return false; // Just for demo
    return true;
  });

  return (
    <DashboardLayout>
      <main className="p-10">
        <div className="max-w-screen-xl mx-auto">
          {/* Page Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <Typography
                variant="h3"
                className="text-gray-900 font-extrabold tracking-tight mb-2"
              >
                My Projects
              </Typography>
              <Typography className="text-gray-500 font-medium tracking-wide">
                Manage and build your digital experiences.
              </Typography>
            </div>
            <Button
              onClick={() => navigate("/ai-generate")}
              className="bg-indigo-600 rounded-xl px-8 py-4 flex items-center gap-2 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all normal-case font-bold"
            >
              <PlusIcon className="h-5 w-5" /> Create New Website
            </Button>
          </div>

          {/* Overview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Banner Card */}
            <Card className="lg:col-span-2 rounded-[2.5rem] bg-indigo-600 overflow-hidden relative shadow-xl shadow-indigo-100 group">
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              ></div>
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-[100px]"></div>

              <CardBody className="p-10 relative z-10 flex flex-col h-full justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                    <Typography className="text-white font-black text-[10px] uppercase tracking-widest leading-none">
                      AI Powered Builder
                    </Typography>
                  </div>
                </div>
                <Typography
                  variant="h3"
                  className="text-white font-black tracking-tight mb-4 leading-tight"
                >
                  Design your next <br /> masterpiece with AI
                </Typography>
                <Typography className="text-indigo-50 font-medium opacity-80 mb-8 max-w-sm">
                  Our latest engine can now generate full-stack landing pages in
                  under 60 seconds.
                </Typography>

                {/* Optimization Badge (From Image) */}
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-gray-50 group-hover:scale-105 transition-transform">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500 shrink-0">
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex flex-col pr-4">
                    <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest leading-none mb-1">
                      Optimization
                    </span>
                    <span className="text-lg font-black text-gray-900 leading-none whitespace-nowrap">
                      99/100 Page Score
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Quick Metrics */}
            <div className="flex flex-col gap-8">
              <Card className="rounded-[2.5rem] border border-gray-100 shadow-none p-8 flex-1 group hover:border-indigo-100 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                    <ChartBarIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="text-right">
                    <Typography className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Total Visitors
                    </Typography>
                    <Typography
                      variant="h4"
                      className="text-gray-900 font-black"
                    >
                      12.4k
                    </Typography>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end mb-1">
                    <Typography className="text-xs font-bold text-gray-500">
                      Weekly Target
                    </Typography>
                    <Typography className="text-xs font-black text-indigo-600">
                      84%
                    </Typography>
                  </div>
                  <Progress
                    value={84}
                    size="sm"
                    color="indigo"
                    className="rounded-full bg-gray-50"
                  />
                </div>
              </Card>

              <Card className="rounded-[2.5rem] border border-gray-100 shadow-none p-8 flex-1 group hover:border-indigo-100 transition-colors">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                    <GlobeAltIcon className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <Typography className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Live Services
                    </Typography>
                    <Typography
                      variant="h4"
                      className="text-gray-900 font-black"
                    >
                      3 Active
                    </Typography>
                  </div>
                </div>
                <div className="flex -space-x-2 mt-4">
                  {[1, 2, 3].map((i) => (
                    <Avatar
                      key={i}
                      size="sm"
                      variant="circular"
                      src={`https://i.pravatar.cc/150?u=${i}`}
                      className="border-2 border-white"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-400">
                    +5
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 border-b mb-10 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}{" "}
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-md ${activeTab === tab.id ? "bg-indigo-50" : "bg-gray-100"}`}
                >
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>

          {/* Project Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <Typography className="text-gray-400 font-bold animate-pulse">
                  Synchronizing Workspace...
                </Typography>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Create New Card */}
              <button
                onClick={() => navigate("/templates")}
                className="group relative h-full bg-white border-4 border-dashed border-indigo-50 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center transition-all hover:bg-indigo-50/50 hover:border-indigo-100 min-h-[480px] shadow-sm hover:shadow-xl"
              >
                <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center border border-gray-100 shadow-xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <PlusIcon className="h-10 w-10 text-indigo-600 stroke-[2.5]" />
                </div>
                <Typography
                  variant="h4"
                  className="text-gray-900 font-black mb-2"
                >
                  New Project
                </Typography>
                <Typography className="text-gray-400 font-bold text-xs max-w-[180px]">
                  Launch a high-performance site with AI assistance
                </Typography>

                {/* Visual Flair */}
                <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-indigo-200/50 animate-ping"></div>
              </button>

              {filteredWebsites.map((site, index) => (
                <Card
                  key={site._id}
                  className="rounded-[3rem] overflow-hidden border border-gray-100/50 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_32px_64px_-16px_rgba(79,70,229,0.15)] transition-all duration-700 group h-full flex flex-col"
                >
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${index === 0 ? "1460925895917-afdab827c52f" : index === 1 ? "1498050108023-c5249f4df085" : index === 2 ? "1547658719-da2b51169166" : "1555066931-4365d14bab8c"}?auto=format&fit=crop&q=80&w=800`}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt="Project Preview"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Floating Glass Badge */}
                    <div className="absolute top-6 left-6 block">
                      <div
                        className={`backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-2 shadow-xl ${index % 2 === 0 ? "bg-green-500/10" : "bg-orange-500/10"}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${index % 2 === 0 ? "bg-green-400" : "bg-orange-400"} animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]`}
                        ></div>
                        <span
                          className={`text-[9px] font-black uppercase tracking-widest ${index % 2 === 0 ? "text-green-400" : "text-orange-400"}`}
                        >
                          {index % 2 === 0 ? "Live" : "Draft"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardBody className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <Typography className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                          {index % 2 === 0
                            ? "SaaS Platform"
                            : "Retail Experience"}
                        </Typography>
                        <Typography
                          variant="h5"
                          className="text-gray-900 font-black tracking-tight mb-1 truncate max-w-[200px]"
                        >
                          {site.name}
                        </Typography>
                        <Typography className="text-gray-400 font-bold text-[10px] flex items-center gap-1.5">
                          <ClockIcon className="h-3 w-3" /> Synchronized 2h ago
                        </Typography>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center gap-2">
                      <Button
                        fullWidth
                        onClick={() => navigate(`/builder/${site._id}`)}
                        className="bg-gray-50 text-gray-900 border border-gray-100 shadow-none hover:shadow-none font-bold py-3 px-0 rounded-xl normal-case"
                      >
                        Edit Site
                      </Button>
                      <Menu placement="bottom-end">
                        <MenuHandler>
                          <IconButton
                            variant="text"
                            className="rounded-xl w-12 h-12 border border-gray-100 hover:bg-gray-50 shrink-0"
                          >
                            <EllipsisHorizontalIcon className="h-5 w-5" />
                          </IconButton>
                        </MenuHandler>
                        <MenuList className="rounded-2xl border-gray-100 shadow-xl p-2">
                          <MenuItem
                            className="rounded-xl py-3 flex items-center gap-3"
                            onClick={() => navigate(`/settings/${site._id}`)}
                          >
                            <Cog6ToothIcon className="h-4 w-4" /> Settings
                          </MenuItem>
                          <MenuItem
                            className="rounded-xl py-3 flex items-center gap-3 text-red-500"
                            onClick={() => deleteWebsite(site._id)}
                          >
                            <TrashIcon className="h-4 w-4" /> Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination Section */}
          {!isLoading && totalWebsites > 5 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 px-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="flex flex-col">
                <Typography className="text-sm font-bold text-gray-900">
                  Showing{" "}
                  <span className="text-indigo-600">
                    {(currentPage - 1) * 5 + 1}
                  </span>{" "}
                  to{" "}
                  <span className="text-indigo-600">
                    {Math.min(currentPage * 5, totalWebsites)}
                  </span>{" "}
                  of <span className="text-indigo-600">{totalWebsites}</span>{" "}
                  items
                </Typography>
                <Typography className="text-[10px] uppercase font-black tracking-widest text-gray-400 mt-1">
                  Page {currentPage} of {totalPages}
                </Typography>
              </div>

              <div className="flex items-center gap-2">
                <IconButton
                  variant="text"
                  className="rounded-xl hover:bg-indigo-50 text-gray-500 disabled:opacity-30"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeftIcon className="h-5 w-5 stroke-[2.5]" />
                </IconButton>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${
                            currentPage === pageNum
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                              : "text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      (pageNum === 2 && currentPage > 3) ||
                      (pageNum === totalPages - 1 &&
                        currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={pageNum} className="text-gray-300 px-1">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <IconButton
                  variant="text"
                  className="rounded-xl hover:bg-indigo-50 text-gray-500 disabled:opacity-30"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRightIcon className="h-5 w-5 stroke-[2.5]" />
                </IconButton>
              </div>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
