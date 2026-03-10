import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  ChevronLeftIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ChevronDownIcon,
  SparklesIcon,
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  EyeIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import {
  setDeviceView,
  setCurrentPage,
  undo,
  redo,
  addPageToList,
} from "../store/builderSlice";
import { logout } from "../store/authSlice";
import { UserIcon, PowerIcon } from "@heroicons/react/24/outline";

const BuilderTopBar = ({ onSave, isPreview, setIsPreview }) => {
  const { currentWebsite, currentPage, pages, deviceView, history, future } =
    useSelector((state) => state.builder);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const [isPageDialogOpen, setIsPageDialogOpen] = React.useState(false);
  const [newPageName, setNewPageName] = React.useState("");

  const handleCreatePage = async () => {
    if (!newPageName) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post(
        "http://localhost:5000/api/pages",
        {
          websiteId: currentWebsite._id,
          name: newPageName,
          slug: newPageName.toLowerCase().replace(/\s+/g, "-"),
          layout: [],
        },
        config,
      );

      if (res.data.success) {
        dispatch(addPageToList(res.data.data));
        setNewPageName("");
        setIsPageDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  const getSliderPosition = () => {
    switch (deviceView) {
      case "tablet":
        return "translate-x-[44px]";
      case "mobile":
        return "translate-x-[88px]";
      default:
        return "translate-x-0";
    }
  };

  return (
    <>
      <div className="h-20 border-b border-gray-100 bg-white flex items-center justify-between px-8 z-[100] sticky top-0 shrink-0 shadow-sm">
        {/* Left: Logo & Page Aligned with Left Panel */}
        <div className="flex items-center gap-4 w-80 shrink-0">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/dashboard")}
          >
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
              <SparklesIcon className="h-5 w-5" />
            </div>
            <Typography
              variant="h6"
              className="text-gray-900 font-extrabold tracking-tight hidden xl:block"
            >
              SiteGenie
            </Typography>
          </div>

          {!isPreview && (
            <Menu>
              <MenuHandler>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl cursor-pointer hover:bg-white hover:border-indigo-400 transition-all group shadow-sm ml-2">
                  <Typography
                    variant="small"
                    className="font-extrabold text-indigo-900 tracking-tight"
                  >
                    {currentPage?.name || "Home"}
                  </Typography>
                  <ChevronDownIcon className="h-3.5 w-3.5 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                </div>
              </MenuHandler>
              <MenuList className="rounded-2xl border-gray-100 shadow-2xl p-2 min-w-[220px] z-[110]">
                <div className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Project Pages
                </div>
                {pages.map((page) => (
                  <MenuItem
                    key={page._id}
                    onClick={() => dispatch(setCurrentPage(page))}
                    className={`rounded-xl py-3 flex items-center gap-3 transition-colors ${currentPage?._id === page._id ? "bg-indigo-50 text-indigo-700 font-bold" : "hover:bg-gray-50 text-gray-600"}`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${currentPage?._id === page._id ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" : "bg-gray-200"}`}
                    ></div>
                    <span className="text-sm tracking-tight">{page.name}</span>
                  </MenuItem>
                ))}
                <div className="p-1 mt-1">
                  <Button
                    fullWidth
                    variant="text"
                    size="sm"
                    onClick={() => setIsPageDialogOpen(true)}
                    className="rounded-xl py-3 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 flex items-center justify-center border border-dashed border-indigo-200"
                  >
                    + Create New Page
                  </Button>
                </div>
              </MenuList>
            </Menu>
          )}
        </div>

        {/* Center: Device Switcher - Truly Centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  hidden md:flex items-center bg-gray-50/80 p-1 rounded-[1.25rem] border border-gray-100/50 shadow-inner">
          <div
            className={`absolute top-1 left-1 w-10 h-10 bg-white rounded-xl shadow-md border border-gray-100 transition-transform duration-300 ease-out ${getSliderPosition()}`}
          ></div>

          <Tooltip content="Desktop View" placement="bottom">
            <button
              className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${deviceView === "desktop" ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
              onClick={() => dispatch(setDeviceView("desktop"))}
            >
              <ComputerDesktopIcon className="h-5 w-5" />
            </button>
          </Tooltip>
          <Tooltip content="Tablet View" placement="bottom">
            <button
              className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${deviceView === "tablet" ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
              onClick={() => dispatch(setDeviceView("tablet"))}
            >
              <div className="w-[18px] h-6 border-2 border-current rounded-md"></div>
            </button>
          </Tooltip>
          <Tooltip content="Mobile View" placement="bottom">
            <button
              className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${deviceView === "mobile" ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
              onClick={() => dispatch(setDeviceView("mobile"))}
            >
              <DevicePhoneMobileIcon className="h-5 w-5" />
            </button>
          </Tooltip>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 w-80 shrink-0 justify-end">
          {!isPreview && (
            <div className="hidden xl:flex items-center gap-1.5 mr-2">
              <Tooltip content="Undo (Ctrl+Z)" placement="bottom">
                <IconButton
                  variant="text"
                  className={`rounded-xl w-10 h-10 transition-all ${history.length > 0 ? "text-gray-900 hover:bg-gray-50" : "text-gray-300 cursor-not-allowed"}`}
                  onClick={() => history.length > 0 && dispatch(undo())}
                >
                  <ArrowUturnLeftIcon className="h-5 w-5 stroke-[2.5]" />
                </IconButton>
              </Tooltip>
              <Tooltip content="Redo (Ctrl+Y)" placement="bottom">
                <IconButton
                  variant="text"
                  className={`rounded-xl w-10 h-10 transition-all ${future.length > 0 ? "text-gray-900 hover:bg-gray-50" : "text-gray-300 cursor-not-allowed"}`}
                  onClick={() => future.length > 0 && dispatch(redo())}
                >
                  <ArrowUturnRightIcon className="h-5 w-5 stroke-[2.5]" />
                </IconButton>
              </Tooltip>
            </div>
          )}

          <Button
            variant="text"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
            className={`rounded-xl font-bold px-5 py-2.5 normal-case transition-all flex items-center gap-2 border ${isPreview ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm" : "text-gray-600 border-transparent hover:bg-gray-50 hover:border-gray-200"}`}
          >
            <EyeIcon className="h-5 w-5" /> {isPreview ? "Edit" : "Preview"}
          </Button>
          <Button
            onClick={onSave}
            size="sm"
            className="bg-indigo-600 rounded-xl px-6 py-3 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 normal-case font-black text-xs tracking-widest transition-all flex items-center gap-2 transform active:scale-95"
          >
            <RocketLaunchIcon className="h-4 w-4" /> Publish
          </Button>

          <div className="h-8 w-px bg-gray-100 mx-2"></div>

          <Menu placement="bottom-end">
            <MenuHandler>
              <Avatar
                size="sm"
                variant="circular"
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff&bold=true`}
                className="cursor-pointer border-2 border-transparent hover:border-indigo-100 transition-all shrink-0"
              />
            </MenuHandler>
            <MenuList className="p-1 rounded-2xl border-gray-100 shadow-2xl min-w-[200px] z-[110]">
              <div className="px-4 py-3 border-b border-gray-50 mb-1">
                <Typography
                  variant="small"
                  className="font-black text-gray-900 leading-none mb-1"
                >
                  {user?.name || "User"}
                </Typography>
                <Typography
                  variant="small"
                  className="text-[10px] font-bold text-gray-400 mt-1 truncate"
                >
                  {user?.email}
                </Typography>
              </div>
              <MenuItem
                onClick={() => navigate("/dashboard")}
                className="rounded-xl flex items-center gap-3 py-3"
              >
                <UserIcon className="h-4 w-4 text-gray-400" />
                <span className="font-bold text-sm text-gray-700">
                  Dashboard
                </span>
              </MenuItem>
              <hr className="my-1 border-gray-50" />
              <MenuItem
                onClick={handleLogout}
                className="rounded-xl flex items-center gap-3 py-3 text-red-500 hover:bg-red-50/50"
              >
                <PowerIcon className="h-4 w-4" />
                <span className="font-black text-sm uppercase tracking-widest">
                  Logout
                </span>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      {/* Create New Page Dialog */}
      <Dialog
        open={isPageDialogOpen}
        handler={() => setIsPageDialogOpen(false)}
        size="xs"
        className="rounded-3xl shadow-2xl p-4"
      >
        <DialogHeader className="font-extrabold text-gray-900 flex flex-col items-start gap-1 pb-2">
          <Typography variant="h4">Create New Page</Typography>
          <Typography className="text-gray-400 font-medium text-sm">
            Design a new addition to your project
          </Typography>
        </DialogHeader>
        <DialogBody className="py-8">
          <></>
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="text"
            color="red"
            onClick={() => setIsPageDialogOpen(false)}
            className="rounded-xl normal-case font-bold"
          >
            Cancel
          </Button>
          <Button
            color="indigo"
            onClick={handleCreatePage}
            className="rounded-xl normal-case font-bold px-8 shadow-none shadow-indigo-100"
          >
            Create Page
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default BuilderTopBar;
