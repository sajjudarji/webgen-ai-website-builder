import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Avatar,
  MenuItem,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  Squares2X2Icon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { logout } from "../store/authSlice";

const AppHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Determine breadcrumbs based on route
  const getBreadcrumbs = () => {
    if (location.pathname.includes("/settings")) {
      return (
        <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
          <span className="text-blue-800">
            Web<span className="text-blue-400">Gen</span>-AI
          </span>
          <ChevronRightIcon className="h-3 w-3" strokeWidth={3} />
          <span className="text-gray-900">Portfolio 2024</span>
        </div>
      );
    }
    if (location.pathname === "/dashboard") {
      return (
        <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
          <span className="text-blue-800">
            Web<span className="text-blue-400">Gen</span>-AI
          </span>
          <ChevronRightIcon className="h-3 w-3" strokeWidth={3} />
          <span className="text-gray-900">Overview</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
        <span className="text-blue-800">
          Web<span className="text-blue-400">Gen</span>-AI
        </span>
        <ChevronRightIcon className="h-3 w-3" strokeWidth={3} />
        <span className="text-gray-900 capitalize">
          {location.pathname.split("/")[1] || "Platform"}
        </span>
      </div>
    );
  };

  return (
    <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-white/50 flex items-center justify-between px-10 shrink-0 sticky top-0 z-[100] shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      {/* Left Area: Breadcrumbs */}
      <div className="flex items-center">{getBreadcrumbs()}</div>

      {/* Right Area: Actions */}
      <div className="flex items-center gap-6">
        {/* Search Bar - Moved to Right like in reference */}
        <div className="hidden md:block w-72 relative group">
          <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
          <input
            placeholder="Search settings..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50/80 border border-gray-100 rounded-lg focus:bg-white focus:border-indigo-500 transition-all outline-none text-[12px] font-bold placeholder:text-gray-300 shadow-sm"
          />
        </div>

        <IconButton
          variant="text"
          color="blue-gray"
          className="rounded-full bg-gray-50/50 relative hover:bg-gray-100 transition-colors"
        >
          <BellIcon className="h-5 w-5 text-gray-500" />
          <span className="absolute top-2.5 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
        </IconButton>

        <div className="h-6 w-px bg-gray-100"></div>

        <Menu placement="bottom-end">
          <MenuHandler>
            <div className="flex items-center gap-3 cursor-pointer group">
              <Avatar
                variant="circular"
                size="sm"
                className="border border-indigo-50 hover:border-indigo-200 transition-all shrink-0"
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff&bold=true`}
              />
            </div>
          </MenuHandler>
          <MenuList className="rounded-2xl border-gray-100 shadow-2xl p-2 min-w-[200px] z-[110]">
            <div className="px-4 py-3 border-b border-gray-50 mb-1">
              <Typography
                variant="small"
                className="font-black text-gray-900 leading-none mb-1"
              >
                {user?.name || "User"}
              </Typography>
              <Typography
                variant="small"
                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
              >
                {user?.role || "Basic Plan"}
              </Typography>
            </div>
            <MenuItem
              className="rounded-xl py-3 flex items-center gap-3"
              onClick={() => navigate("/dashboard")}
            >
              <Squares2X2Icon className="h-4 w-4 text-gray-400" />
              <span className="font-bold text-sm text-gray-700">Dashboard</span>
            </MenuItem>
            <hr className="my-2 border-gray-50" />
            <MenuItem
              className="rounded-xl py-3 flex items-center gap-3 text-red-500 hover:bg-red-50"
              onClick={handleLogout}
            >
              <span className="font-black text-[11px] uppercase tracking-widest">
                Logout
              </span>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </header>
  );
};

export default AppHeader;
