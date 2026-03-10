import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Typography,
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  Switch,
  IconButton,
  Avatar,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  AdjustmentsHorizontalIcon,
  BellIcon,
  LinkIcon,
  TrashIcon,
  ChevronRightIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import DashboardLayout from "../layouts/DashboardLayout";

const ProjectSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [website, setWebsite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    const fetchWebsite = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const res = await axios.get(
          `http://localhost:5000/api/websites/${id}`,
          config,
        );
        setWebsite(res.data.data);
      } catch (error) {
        console.error("Error fetching website:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWebsite();
  }, [id, user.token]);

  const tabs = [
    { id: "general", label: "General" },
    { id: "domain", label: "Domain" },
    { id: "seo", label: "SEO" },
    { id: "billing", label: "Billing" },
    { id: "team", label: "Team" },
  ];

  if (isLoading)
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center py-40">
          <Typography className="animate-pulse text-indigo-600 font-black uppercase tracking-widest text-sm">
            Initializing Settings Engine...
          </Typography>
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-screen-xl mx-auto px-10 py-10 space-y-10">
        {/* Page Header */}
        <div className="space-y-2">
          <Typography
            variant="h2"
            className="text-gray-900 font-black tracking-tight leading-none"
          >
            Settings
          </Typography>
          <Typography className="text-gray-500 font-medium text-lg">
            Manage your website configuration and publishing preferences.
          </Typography>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-10 border-b border-gray-100 pb-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-black tracking-wide transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Content Sections */}
        {!id ? (
          <section className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mb-8 border border-indigo-100 shadow-xl shadow-indigo-100/20">
              <Cog6ToothIcon className="h-10 w-10" />
            </div>
            <Typography variant="h4" className="text-gray-900 font-black mb-2">
              Select a Project First
            </Typography>
            <Typography className="text-gray-500 font-medium max-w-sm mb-8">
              You need to select a project from your dashboard to manage its
              specific settings, domains, and SEO.
            </Typography>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-indigo-600 rounded-xl px-10 py-3.5 normal-case font-black shadow-lg shadow-indigo-100"
            >
              Go to Dashboard
            </Button>
          </section>
        ) : (
          <div className="space-y-16 py-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* General Section */}
            <section className="space-y-8">
              <div className="space-y-1">
                <Typography
                  variant="h5"
                  className="text-gray-900 font-black tracking-tight"
                >
                  General
                </Typography>
                <Typography className="text-gray-500 text-sm font-medium">
                  Configure your basic website information.
                </Typography>
              </div>

              <Card className="rounded-[2.5rem] border border-gray-100 shadow-none overflow-hidden">
                <CardBody className="p-10 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <Typography className="text-[11px] font-black text-gray-900 uppercase tracking-widest px-1">
                        Site Name
                      </Typography>
                      <Input
                        placeholder="My Creative Portfolio"
                        defaultValue={website?.name}
                        autoComplete="off"
                        className="!border-gray-50 !bg-gray-50/50 rounded-2xl py-7 px-6 text-[15px] font-bold !transition-all focus:!border-indigo-600"
                        labelProps={{ className: "hidden" }}
                      />
                    </div>
                    <div className="space-y-3">
                      <Typography className="text-[11px] font-black text-gray-900 uppercase tracking-widest px-1">
                        Language
                      </Typography>
                      <Select
                        label="Select Language"
                        value="en"
                        className="!border-gray-50 !bg-gray-50/50 rounded-2xl py-7 px-6 font-bold text-gray-900 h-14"
                        labelProps={{ className: "hidden" }}
                      >
                        <Option value="en">English (US)</Option>
                        <Option value="fr">French</Option>
                        <Option value="de">German</Option>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Typography className="text-[11px] font-black text-gray-900 uppercase tracking-widest px-1">
                      Favicon
                    </Typography>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 group hover:border-indigo-600 transition-colors cursor-pointer">
                        <PhotoIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <Button
                          variant="outlined"
                          size="sm"
                          className="rounded-xl border-gray-100 text-gray-900 font-black normal-case flex items-center gap-2 px-6 hover:bg-gray-50 shadow-none"
                        >
                          <ArrowUpTrayIcon className="h-4 w-4" /> Upload New
                        </Button>
                        <Typography className="text-[10px] text-gray-400 font-bold mt-2 font-mono uppercase tracking-tighter">
                          Square PNG or ICO, max 1MB.
                        </Typography>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </section>

            {/* Domain Section */}
            <section className="space-y-8">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <Typography
                    variant="h5"
                    className="text-gray-900 font-black tracking-tight"
                  >
                    Domain
                  </Typography>
                  <Typography className="text-gray-500 text-sm font-medium">
                    Manage where your website is hosted.
                  </Typography>
                </div>
                <Button className="bg-indigo-600 rounded-xl px-8 shadow-lg shadow-indigo-100 normal-case font-black py-3.5">
                  Connect Custom Domain
                </Button>
              </div>

              <Card className="rounded-[2.5rem] border border-gray-100 shadow-none">
                <CardBody className="p-8">
                  <div className="flex items-center justify-between bg-white px-8 py-7 rounded-[2rem] border border-gray-100 group hover:border-indigo-100 transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500 shrink-0">
                        <CheckCircleIcon className="h-7 w-7" />
                      </div>
                      <div>
                        <Typography className="text-gray-900 font-black text-lg leading-none mb-1.5">
                          {website?.domain || "mysite.siteai.io"}
                        </Typography>
                        <Typography className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                          Default Subdomain
                        </Typography>
                      </div>
                    </div>
                    <div className="bg-green-50 text-green-600 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-[0.2em]">
                      Active
                    </div>
                  </div>
                </CardBody>
              </Card>
            </section>

            {/* SEO & Social Section */}
            <section className="space-y-8">
              <div className="space-y-1">
                <Typography
                  variant="h5"
                  className="text-gray-900 font-black tracking-tight"
                >
                  SEO & Social
                </Typography>
                <Typography className="text-gray-500 text-sm font-medium">
                  Optimize how your site appears in search engines and social
                  media.
                </Typography>
              </div>

              <Card className="rounded-[2.5rem] border border-gray-100 shadow-none overflow-hidden">
                <CardBody className="p-10 space-y-8">
                  <div className="space-y-3">
                    <Typography className="text-[11px] font-black text-gray-900 uppercase tracking-widest px-1">
                      Meta Title
                    </Typography>
                    <Input
                      placeholder="Project Portfolio | Modern Designs"
                      className="!border-gray-50 !bg-gray-50/50 rounded-2xl py-7 px-6 text-[15px] font-bold focus:!border-indigo-600 transition-all"
                      labelProps={{ className: "hidden" }}
                    />
                  </div>

                  <div className="space-y-3">
                    <Typography className="text-[11px] font-black text-gray-900 uppercase tracking-widest px-1">
                      Meta Description
                    </Typography>
                    <Textarea
                      rows={6}
                      placeholder="Briefly describe your website for search quality..."
                      className="!border-gray-50 !bg-gray-50/50 rounded-3xl p-6 text-[15px] font-bold focus:!border-indigo-600 transition-all"
                      labelProps={{ className: "hidden" }}
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <Typography className="font-black text-gray-900 text-sm">
                        Index Search Engines
                      </Typography>
                      <Typography className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                        Allow Google to crawl your site
                      </Typography>
                    </div>
                    <Switch color="indigo" defaultChecked />
                  </div>
                </CardBody>
              </Card>
            </section>

            {/* Bottom Save Action */}
            <div className=" flex justify-end gap-4">
              <Button
                variant="text"
                color="gray"
                className="rounded-xl px-8 font-black normal-case text-gray-400 hover:text-gray-900"
              >
                Discard
              </Button>
              <Button className="bg-indigo-600 rounded-xl px-12 py-4 shadow-xl shadow-indigo-100 normal-case font-black text-base transition-all hover:scale-105 active:scale-95">
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectSettings;
