import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Card,
  Progress,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Avatar,
  MenuItem,
} from "@material-tailwind/react";
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
          ? "bg-indigo-50/80 text-indigo-700"
          : "text-gray-400 hover:text-gray-900 hover:bg-gray-50/50"
      }`}
    >
      <div className="flex items-center gap-4">
        <item.icon
          className={`h-5 w-5 transition-colors ${
            item.active
              ? "text-indigo-600"
              : "text-gray-300 group-hover:text-gray-900"
          }`}
        />
        <span className="tracking-tight">{item.name}</span>
      </div>

      {/* Far left global indicator bar */}
      {item.active && (
        <div
          className="fixed left-0 w-1.5 h-10 bg-indigo-600 rounded-r-lg shadow-[4px_0_15px_rgba(79,70,229,0.4)]"
          style={{ marginTop: "-2px" }}
        />
      )}
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar - Same as before but consistent */}
      <aside className="w-64 bg-white border-r flex flex-col pt-6 pb-4 shrink-0">
        <div className="px-6 mb-8 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <SparklesIcon className="h-5 w-5" />
          </div>
          <div>
            <Typography
              variant="h6"
              className="text-gray-900 leading-none font-black tracking-tight"
            >
              SiteAI
            </Typography>
            <Typography
              variant="small"
              className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest"
            >
              Pro Plan
            </Typography>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-8 overflow-y-auto pt-2">
          {/* Menu Section */}
          <div className="space-y-1">
            <Typography className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-4 mb-4">
              Main Menu
            </Typography>
            {menuItems.map(renderSidebarItem)}
          </div>

          {/* Preferences Section */}
          <div className="space-y-1">
            <Typography className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] px-4 mb-4">
              Preferences
            </Typography>
            {preferenceItems.map(renderSidebarItem)}
          </div>
        </nav>

        <div className="px-4 mt-auto mb-6">
          <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
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
                Pro Plan
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
