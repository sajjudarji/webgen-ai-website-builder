import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardBody,
  Button,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Tooltip,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
  GlobeAltIcon,
  Cog6ToothIcon,
  TrashIcon,
  Square2StackIcon,
  EyeIcon,
  PencilSquareIcon,
  ClockIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import DashboardLayout from "../layouts/DashboardLayout";

// Simple debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const MyWebsites = () => {
  const [websites, setWebsites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchWebsites = useCallback(async (search = "", status = "") => {
    setIsLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
        params: { search, status: status === "all" ? "" : status },
      };
      const res = await axios.get("http://localhost:5000/api/websites", config);
      setWebsites(res.data.data);
    } catch (error) {
      console.error("Error fetching websites:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user.token]);

  // Debounced search
  const debouncedFetch = useCallback(
    debounce((q, s) => fetchWebsites(q, s), 500),
    [fetchWebsites]
  );

  useEffect(() => {
    debouncedFetch(searchQuery, activeTab);
  }, [searchQuery, activeTab, debouncedFetch]);

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
    { id: "all", label: "All Projects" },
    { id: "published", label: "Published" },
    { id: "draft", label: "Drafts" },
    { id: "archived", label: "Archived" },
  ];

  const WebsiteSkeleton = () => (
    <Card className="rounded-[2rem] overflow-hidden border border-gray-100 shadow-none h-[420px] animate-pulse">
      <div className="h-56 bg-gray-200/50 relative overflow-hidden flex items-center justify-center p-8">
        <div className="w-full h-full bg-gray-300/30 rounded-2xl flex items-center justify-center border border-gray-300/20">
          <GlobeAltIcon className="h-20 w-20 text-gray-400/20" />
        </div>
      </div>
      <CardBody className="p-8 flex flex-col flex-1 space-y-4">
        <div className="flex justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
            <div className="h-3 bg-gray-100 rounded-lg w-1/2"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded-lg w-16"></div>
        </div>
        <div className="mt-auto flex items-center gap-2">
          <div className="h-12 bg-gray-200 rounded-xl flex-1"></div>
          <div className="h-12 bg-gray-100 rounded-xl w-12"></div>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <DashboardLayout>
      <main className="p-6 lg:p-10 bg-[#f8fafc] min-h-full">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <Typography variant="h2" className="text-gray-900 font-black tracking-tight mb-2">
                Project Dashboard
              </Typography>
              <Typography className="text-gray-500 font-medium tracking-wide">
                Manage and monitor your active web projects
              </Typography>
            </div>
            <Button
              onClick={() => navigate("/ai-generate")}
              className="bg-indigo-600 rounded-2xl px-8 py-4 flex items-center gap-3 shadow-xl shadow-indigo-200/50 hover:shadow-indigo-300/50 hover:scale-[1.02] active:scale-[0.98] transition-all normal-case font-bold text-sm"
            >
              <PlusIcon className="h-5 w-5 stroke-[3]" /> Create New Site
            </Button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 sticky top-0 z-20 pt-2 bg-[#f8fafc]">
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-100/50 shadow-sm overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 rounded-[1.1rem] text-sm font-bold tracking-wide transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-indigo-600 shadow-md shadow-indigo-100/20 border border-indigo-50"
                      : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className={`h-5 w-5 transition-colors ${searchQuery ? "text-indigo-500" : "text-gray-400 group-focus-within:text-indigo-500"}`} />
              </div>
              <input
                type="text"
                placeholder="Search your websites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-4.5 bg-white border border-gray-100 rounded-2xl text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-100/30 focus:border-indigo-200 transition-all shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-gray-500"
                >
                  <Typography className="text-[10px] uppercase font-black tracking-widest leading-none">Clear</Typography>
                </button>
              )}
            </div>
          </div>

          {/* Listing Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Skeletons while loading */}
            {isLoading ? (
              Array(6).fill(0).map((_, i) => <WebsiteSkeleton key={i} />)
            ) : websites.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white/50 rounded-[3rem] border-2 border-dashed border-gray-200 mt-4">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                  <PlusIcon className="h-10 w-10 text-indigo-200 stroke-[2]" />
                </div>
                <Typography variant="h4" className="text-gray-900 font-black mb-2">No Projects Found</Typography>
                <Typography className="text-gray-500 font-medium mb-8">Try adjusting your search or filters to find what you're looking for.</Typography>
                <Button 
                  onClick={() => navigate("/ai-generate")}
                  className="bg-indigo-600 rounded-xl px-10 py-4 normal-case font-black shadow-lg shadow-indigo-100"
                >
                  Start New Project
                </Button>
              </div>
            ) : (
              websites.map((site) => (
                <Card
                  key={site._id}
                  className="rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-none hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.12)] transition-all duration-500 group h-full flex flex-col relative bg-white"
                >
                  {/* Preview Area */}
                  <div className="h-60 bg-gray-50 relative overflow-hidden group-hover:bg-indigo-50/20 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center">
                       {site.logo ? (
                          <img src={site.logo} alt={site.name} className="w-20 h-20 opacity-20 object-contain" />
                       ) : (
                          <GlobeAltIcon className="h-24 w-24 text-indigo-100 group-hover:text-indigo-200 transition-colors" />
                       )}
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-6 left-6 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur shadow-sm rounded-full border border-gray-100">
                      <div className={`w-2 h-2 rounded-full ${site.isPublished ? "bg-green-500 animate-pulse" : "bg-orange-500"}`}></div>
                      <Typography className={`text-[10px] font-black uppercase tracking-widest ${site.isPublished ? "text-green-600" : "text-orange-600"}`}>
                        {site.isPublished ? "Live" : "Draft"}
                      </Typography>
                    </div>

                    {/* Action Overlay */}
                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] flex items-center justify-center gap-4">
                       <IconButton 
                        variant="white"
                        className="rounded-2xl w-14 h-14 bg-white/95 shadow-xl hover:scale-110 active:scale-95 transition-all text-indigo-600"
                        onClick={() => navigate(`/builder/${site._id}`)}
                      >
                        <PencilSquareIcon className="h-6 w-6 stroke-[2]" />
                      </IconButton>
                      <IconButton 
                        variant="white"
                        className="rounded-2xl w-14 h-14 bg-white/95 shadow-xl hover:scale-110 active:scale-95 transition-all text-gray-600"
                        onClick={() => window.open(`http://${site.domain || site._id}.localhost:3000`, '_blank')}
                      >
                        <EyeIcon className="h-6 w-6 stroke-[2]" />
                      </IconButton>
                    </div>
                  </div>

                  {/* Content Area */}
                  <CardBody className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <Typography
                          variant="h5"
                          className="text-gray-900 font-bold tracking-tight mb-2 truncate max-w-[200px]"
                        >
                          {site.name}
                        </Typography>
                        <div className="flex items-center gap-2 text-gray-400">
                          <ClockIcon className="h-3.5 w-3.5" />
                          <Typography className="text-[11px] font-bold tracking-wide">
                            Edited {new Date(site.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </div>
                      </div>
                      
                      <Menu placement="bottom-end">
                        <MenuHandler>
                          <IconButton
                            variant="text"
                            className="rounded-xl w-10 h-10 hover:bg-gray-50 shrink-0"
                          >
                            <EllipsisHorizontalIcon className="h-6 w-6 text-gray-400 stroke-[2.5]" />
                          </IconButton>
                        </MenuHandler>
                        <MenuList className="rounded-2xl border-gray-100 shadow-2xl p-2 min-w-[200px]">
                          <MenuItem
                            className="rounded-xl py-3 flex items-center gap-3 font-bold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50"
                            onClick={() => navigate(`/builder/${site._id}`)}
                          >
                            <PencilSquareIcon className="h-4 w-4" /> Open in Editor
                          </MenuItem>
                          <MenuItem
                            className="rounded-xl py-3 flex items-center gap-3 font-bold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50"
                            onClick={() => navigate(`/settings/${site._id}`)}
                          >
                            <Cog6ToothIcon className="h-4 w-4" /> Site Settings
                          </MenuItem>
                          <MenuItem
                            className="rounded-xl py-3 flex items-center gap-3 font-bold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50"
                          >
                            <Square2StackIcon className="h-4 w-4" /> Duplicate
                          </MenuItem>
                          <div className="h-px bg-gray-50 my-1 mx-2"></div>
                          <MenuItem
                            className="rounded-xl py-3 flex items-center gap-3 font-bold text-red-500 hover:text-red-600 hover:bg-red-50/50"
                            onClick={() => deleteWebsite(site._id)}
                          >
                            <TrashIcon className="h-4 w-4" /> Delete Site
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>

                    {/* Stats (from Image 1) */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-50 mb-0">
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">Visitors</span>
                          <span className="text-sm font-black text-gray-700">12.4k</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">Sales</span>
                          <span className="text-sm font-black text-gray-700">$1,280</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">Perf</span>
                          <span className="text-sm font-black text-green-500">98%</span>
                       </div>
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                      <Button
                        fullWidth
                        onClick={() => navigate(`/builder/${site._id}`)}
                        className="bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all font-black py-4 rounded-2xl normal-case text-xs"
                      >
                         {site.isPublished ? "Edit Site" : "Continue Editing"}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))
            )}
          </div>
          
          {/* Recent Activity Section (from Image 1) */}
          <div className="mt-20 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <Typography variant="h4" className="text-gray-900 font-black">Recent Activity</Typography>
              <button className="text-sm font-black text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest">View All History</button>
            </div>
            
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-2 overflow-hidden">
                {[
                  { icon: GlobeAltIcon, title: "Portfolio 2024", desc: "was published to production", time: "2 hours ago", color: "bg-indigo-50 text-indigo-600" },
                  { icon: PencilSquareIcon, title: "Minimalist Store", desc: "draft updated", time: "4 hours ago", color: "bg-orange-50 text-orange-600" },
                  { icon: CheckBadgeIcon, title: "Custom Domain", desc: "pointing successfully", time: "Yesterday at 11:45 PM", color: "bg-green-50 text-green-600" },
                ].map((act, i) => (
                  <div key={i} className={`flex items-center gap-6 p-6 transition-colors hover:bg-gray-50/50 ${i !== 2 ? 'border-b border-gray-50' : ''}`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${act.color}`}>
                      <act.icon className="h-6 w-6 stroke-[2]" />
                    </div>
                    <div className="flex-1">
                      <Typography className="text-gray-900 font-bold tracking-tight">
                        "{act.title}" <span className="text-gray-400 font-medium tracking-normal">{act.desc}</span>
                      </Typography>
                      <Typography className="text-[11px] font-bold text-gray-300 uppercase tracking-widest mt-1">
                        {act.time}
                      </Typography>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default MyWebsites;
