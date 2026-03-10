import React, { useState } from "react";
import {
  Typography,
  Card,
  CardBody,
  Button,
  IconButton,
  Avatar,
  Progress,
} from "@material-tailwind/react";
import {
  UserGroupIcon,
  EyeIcon,
  ArrowRightOnRectangleIcon,
  ClockIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import DashboardLayout from "../layouts/DashboardLayout";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");

  const stats = [
    {
      label: "Total Visitors",
      value: "12,482",
      trend: "+12.5%",
      trendUp: true,
      icon: UserGroupIcon,
      color: "indigo",
      percent: 65,
    },
    {
      label: "Page Views",
      value: "45,291",
      trend: "+8.2%",
      trendUp: true,
      icon: EyeIcon,
      color: "blue",
      percent: 78,
    },
    {
      label: "Bounce Rate",
      value: "32.4%",
      trend: "-2.4%",
      trendUp: false,
      icon: ArrowRightOnRectangleIcon,
      color: "red",
      percent: 45,
    },
    {
      label: "Avg. Session Duration",
      value: "4m 12s",
      trend: "+18s",
      trendUp: true,
      icon: ClockIcon,
      color: "amber",
      percent: 82,
    },
  ];

  const topPages = [
    {
      name: "/home-design-v2",
      views: "18,402",
      trend: "+24%",
      color: "bg-emerald-500",
    },
    {
      name: "/pricing-plans",
      views: "9,281",
      trend: "+12%",
      color: "bg-slate-900",
    },
    {
      name: "/blog/ai-trends-2024",
      views: "4,921",
      trend: "-2%",
      color: "bg-indigo-500",
    },
    {
      name: "/contact-us",
      views: "2,710",
      trend: "+5%",
      color: "bg-slate-700",
    },
  ];

  const trafficSources = [
    {
      label: "Direct Traffic",
      value: "6,423",
      color: "bg-indigo-500",
      percent: 62,
    },
    {
      label: "Social Media",
      value: "3,110",
      color: "bg-emerald-500",
      percent: 25,
    },
    {
      label: "Organic Search",
      value: "2,949",
      color: "bg-amber-500",
      percent: 13,
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-screen-xl mx-auto px-10 py-10 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Typography
              variant="h2"
              className="text-gray-900 font-black tracking-tight leading-none"
            >
              Analytics Overview
            </Typography>
            <Typography className="text-gray-500 font-medium text-lg">
              Real-time data visualization of your AI-generated websites.
            </Typography>
          </div>

          <div className="bg-white p-1.5 rounded-2xl border border-gray-100 flex items-center gap-1 shadow-sm">
            {["1d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  timeRange === range
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                {range}
              </button>
            ))}
            <div className="w-px h-4 bg-gray-100 mx-2"></div>
            <button className="px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 flex items-center gap-2">
              Custom <AdjustmentsHorizontalIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="rounded-[2.5rem] border border-gray-100 shadow-none overflow-hidden hover:border-indigo-100 transition-colors"
            >
              <CardBody className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div
                    className={`w-12 h-12 bg-${stat.color}-50 rounded-2xl flex items-center justify-center text-${stat.color}-600`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-[11px] font-black ${stat.trendUp ? "text-emerald-500" : "text-rose-500"} bg-gray-50 px-2.5 py-1 rounded-full`}
                  >
                    {stat.trend}{" "}
                    {stat.trendUp ? (
                      <ChevronUpIcon className="h-3 w-3" strokeWidth={4} />
                    ) : (
                      <ChevronDownIcon className="h-3 w-3" strokeWidth={4} />
                    )}
                  </div>
                </div>
                <div className="space-y-1 mb-6">
                  <Typography
                    variant="small"
                    className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2"
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="h3"
                    className="text-gray-900 font-black tracking-tighter leading-none"
                  >
                    {stat.value}
                  </Typography>
                </div>
                <Progress
                  value={stat.percent}
                  size="sm"
                  color={stat.color}
                  className="rounded-full bg-gray-50 h-1"
                />
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Traffic Chart Section */}
        <Card className="rounded-[3rem] border border-gray-100 shadow-none overflow-hidden">
          <CardBody className="p-10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <Typography
                  variant="h5"
                  className="text-gray-900 font-black tracking-tight mb-1"
                >
                  Visitor Traffic
                </Typography>
                <Typography className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Weekly session trends
                </Typography>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>
                  <Typography className="text-[11px] font-black text-gray-600 uppercase tracking-widest">
                    Current Period
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-gray-200 rounded-full"></div>
                  <Typography className="text-[11px] font-black text-gray-300 uppercase tracking-widest">
                    Previous Period
                  </Typography>
                </div>
              </div>
            </div>

            {/* Custom SVG Chart Area */}
            <div className="h-[400px] w-full relative">
              <svg
                viewBox="0 0 1000 400"
                className="w-full h-full overflow-visible"
              >
                {/* Grid Lines */}
                {[0, 100, 200, 300, 400].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="1000"
                    y2={y}
                    stroke="#F8F9FB"
                    strokeWidth="2"
                  />
                ))}

                {/* Previous Period Area (Faded) */}
                <path
                  d="M 0 350 Q 150 320 300 360 Q 450 380 600 340 Q 750 300 1000 280 L 1000 400 L 0 400 Z"
                  fill="#F1F5F9"
                  className="opacity-50"
                />

                {/* Current Period Area Gradient */}
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M 0 320 Q 150 280 300 220 Q 450 160 600 200 Q 750 240 1000 120 L 1000 400 L 0 400 Z"
                  fill="url(#chartGradient)"
                />

                {/* Current Period Line */}
                <path
                  d="M 0 320 Q 150 280 300 220 Q 450 160 600 200 Q 750 240 1000 120"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Point Tooltip Mockup */}
                <circle
                  cx="600"
                  cy="200"
                  r="10"
                  fill="white"
                  stroke="#6366f1"
                  strokeWidth="4"
                />
              </svg>

              {/* Labeling */}
              <div className="flex justify-between mt-8">
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                  (day) => (
                    <Typography
                      key={day}
                      className="text-[10px] font-black text-gray-300 uppercase tracking-widest"
                    >
                      {day}
                    </Typography>
                  ),
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Bottom Section: Sources & Pages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Traffic Sources */}
          <Card className="lg:col-span-4 rounded-[3rem] border border-gray-100 shadow-none">
            <CardBody className="p-10">
              <Typography
                variant="h5"
                className="text-gray-900 font-black tracking-tight mb-12"
              >
                Traffic Sources
              </Typography>

              <div className="flex flex-col items-center justify-center relative mb-12">
                <svg
                  viewBox="0 0 100 100"
                  className="w-48 h-48 transform -rotate-90"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#F1F5F9"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#6366f1"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 0.62)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Typography
                    variant="h2"
                    className="text-gray-900 font-black leading-none"
                  >
                    62%
                  </Typography>
                  <Typography className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">
                    Direct
                  </Typography>
                </div>
              </div>

              <div className="space-y-6">
                {trafficSources.map((source) => (
                  <div
                    key={source.label}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 ${source.color} rounded-full`}
                      ></div>
                      <Typography className="text-[11px] font-black text-gray-500 uppercase tracking-widest">
                        {source.label}
                      </Typography>
                    </div>
                    <Typography className="text-sm font-black text-gray-900">
                      {source.value}
                    </Typography>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Top Performing Pages */}
          <Card className="lg:col-span-8 rounded-[3rem] border border-gray-100 shadow-none overflow-hidden">
            <CardBody className="p-0">
              <div className="p-10 flex items-center justify-between">
                <Typography
                  variant="h5"
                  className="text-gray-900 font-black tracking-tight"
                >
                  Top Performing Pages
                </Typography>
                <button className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.2em] border-b-2 border-indigo-100 pb-1">
                  View All Pages
                </button>
              </div>

              <div className="px-10 pb-10">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-50 pb-4">
                      <th className="py-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                        Page Name
                      </th>
                      <th className="py-4 text-[11px] font-black text-gray-300 uppercase tracking-[0.2em] text-right">
                        Unique Views
                      </th>
                      <th className="py-4 text-[11px] font-black text-gray-300 uppercase tracking-[0.2em] text-right">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50/50">
                    {topPages.map((page) => (
                      <tr
                        key={page.name}
                        className="group hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-6 flex items-center gap-4">
                          <div
                            className={`w-6 h-6 ${page.color} rounded-md shadow-sm`}
                          ></div>
                          <Typography className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {page.name}
                          </Typography>
                        </td>
                        <td className="py-6 text-right">
                          <Typography className="text-sm font-black text-gray-900">
                            {page.views}
                          </Typography>
                        </td>
                        <td className="py-6 text-right">
                          <div
                            className={`inline-flex items-center gap-1 text-[11px] font-black ${page.trend.startsWith("+") ? "text-emerald-500" : "text-rose-500"} bg-gray-50 px-2 py-1 rounded-md`}
                          >
                            {page.trend}{" "}
                            {page.trend.startsWith("+") ? (
                              <ArrowUpRightIcon className="h-3 w-3" />
                            ) : (
                              <ChevronDownIcon className="h-3 w-3" />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
