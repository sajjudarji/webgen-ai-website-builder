import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Avatar } from "@material-tailwind/react";
import { logout } from "../store/authSlice";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import {
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  Squares2X2Icon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/Logo-2.png";

const DashboardLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    {
      name: "AI Architect",
      icon: SparklesIcon,
      path: "/ai-architect",
      active: location.pathname === "/ai-architect",
      premium: true,
    },
    {
      name: "Dashboard",
      icon: Squares2X2Icon,
      path: "/",
      active: location.pathname === "/",
    },
    {
      name: "My Websites",
      icon: GlobeAltIcon,
      path: "/my-websites",
      active: location.pathname === "/my-websites",
    },
    {
      name: "Templates",
      icon: DocumentDuplicateIcon,
      path: "/templates",
      active: location.pathname === "/templates",
    },
    {
      name: "Analytics",
      icon: ChartBarIcon,
      path: "/analytics",
      active: location.pathname === "/analytics",
    },
  ];

  const preferenceItems = [
    ...(user?.role === "admin"
      ? [
          {
            name: "Admin Panel",
            icon: ShieldCheckIcon,
            path: "/admin",
            active: location.pathname === "/admin",
          },
        ]
      : []),
    {
      name: "Settings",
      icon: Cog6ToothIcon,
      path: "/settings",
      active: location.pathname.includes("/settings"),
    },
  ];

  const renderSidebarItem = (item) => (
    <button
      key={item.name}
      onClick={() => navigate(item.path)}
      className={`relative w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-black transition-all group ${
        item.active
          ? item.premium
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200"
            : "bg-indigo-50/80 text-indigo-700"
          : item.premium
            ? "bg-white border border-indigo-50 text-indigo-900 hover:bg-indigo-50/30"
            : "text-gray-400 hover:text-gray-900 hover:bg-gray-50/50"
      }`}
    >
      <div className="flex items-center gap-4 text-black">
        <item.icon
          className={`h-5 w-5 ${
            item.active
              ? item.premium
                ? "text-white"
                : "text-indigo-600"
              : item.premium
                ? "text-indigo-500"
                : "text-black group-hover:text-indigo-600"
          }`}
        />
        <span className="tracking-tight text-black font-normal">
          {item.name}
        </span>
      </div>

      {item.premium && !item.active && (
        <div className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] uppercase font-black tracking-widest border border-indigo-100">
          PRO
        </div>
      )}

      {/* Far left global indicator bar */}
      {item.active && !item.premium && (
        <div
          className="fixed left-0 w-1.5 h-10 bg-indigo-600 rounded-r-lg shadow-[4px_0_15px_rgba(79,70,229,0.4)]"
          style={{ marginTop: "-2px" }}
        />
      )}
    </button>
  );

  return (
    <div className="flex h-screen bg-transparent overflow-hidden font-sans relative z-0">
      {/* Sidebar - Same as before but consistent */}
      <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-white/50 flex flex-col pb-4 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="h-10 px-6 my-3 flex items-center gap-2">
          <img src={Logo} className="h-36 w-36" />
        </div>

        <nav className="flex-1 px-4 space-y-8 overflow-y-auto pt-2">
          {/* Menu Section */}
          <div className="space-y-1">
            <p className="text-[12px] font-semibold text-black uppercase tracking-[0.2em] px-4 mb-4">
              Main Menu
            </p>
            {menuItems.map(renderSidebarItem)}
          </div>

          {/* Preferences Section */}
          <div className="space-y-1">
            <p className="text-[12px] font-semibold text-black uppercase tracking-[0.2em] px-4 mb-4">
              Preferences
            </p>
            {preferenceItems.map(renderSidebarItem)}
          </div>
        </nav>

        <div className="px-4 mt-auto mb-6">
          <div 
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group border border-transparent hover:border-indigo-100"
          >
            <Avatar
              size="sm"
              src={`https://ui-avatars.com/api/?name=${user?.name || "Alex Rivers"}&background=6366f1&color=fff&bold=true`}
              className="border border-indigo-50"
            />
            <div className="flex-1 overflow-hidden">
              <Typography className="text-sm font-black text-gray-900 leading-none mb-1 truncate group-hover:text-indigo-600 transition-colors">
                {user?.name || "Alex Rivers"}
              </Typography>
              <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                {user?.role || "Pro Plan"}
              </Typography>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <AppHeader />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1">{children}</div>
          <AppFooter />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
