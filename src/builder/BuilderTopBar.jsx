import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/Logo-2.png";
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
  Input,
  Select,
  Option,
  Switch,
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
  CubeIcon,
  TagIcon,
  DocumentCheckIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import toast from "react-hot-toast";
import {
  setDeviceView,
  setCurrentPage,
  undo,
  redo,
  addPageToList,
  removePageFromList,
} from "../store/builderSlice";
import { logout } from "../store/authSlice";
import { UserIcon, PowerIcon } from "@heroicons/react/24/outline";

const BuilderTopBar = ({ onSave, isPreview, setIsPreview, isSaving }) => {
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
  const [newPageData, setNewPageData] = React.useState({
    name: "",
    type: "Landing",
    slug: "",
    addToNav: true,
    template: "blank",
  });

  const handlePageNameChange = (val) => {
    setNewPageData({
      ...newPageData,
      name: val,
      slug: val.toLowerCase().replace(/\s+/g, "-"),
    });
  };

  const handleCreatePage = async () => {
    if (!newPageData.name) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post(
        "http://localhost:5000/api/pages",
        {
          websiteId: currentWebsite._id,
          name: newPageData.name,
          slug: newPageData.slug,
          layout: [], // Future: Insert layout from template
        },
        config,
      );

      if (res.data.success) {
        dispatch(addPageToList(res.data.data));
        dispatch(setCurrentPage(res.data.data));
        setNewPageData({
          name: "",
          type: "Landing",
          slug: "",
          addToNav: true,
          template: "blank",
        });
        setIsPageDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating page:", error);
      toast.error("Cloud engine error. Try again.");
    }
  };

  const handleDeletePage = async (e, pageId) => {
    e.stopPropagation();

    if (pages.length <= 1) {
      toast.error("Project must have at least one page.");
      return;
    }

    const pageToDelete = pages.find((p) => p._id === pageId);
    if (pageToDelete?.isHome) {
      toast.error("Security alert: Home page cannot be deleted.");
      return;
    }

    if (window.confirm("Are you sure? This will permanently delete the page.")) {
      const deletePromise = (async () => {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`http://localhost:5000/api/pages/${pageId}`, config);
        dispatch(removePageFromList(pageId));
      })();

      toast.promise(deletePromise, {
        loading: "Purging page from cloud...",
        success: "Page deleted successfully.",
        error: "Failed to delete page.",
      });
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
        <div className="flex items-center gap-2 w-80 shrink-0">
          <img src={Logo} alt="Logo" className="w-32 h-32" />
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/dashboard")}
          ></div>

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
                    className={`rounded-xl py-2.5 px-3 flex items-center justify-between transition-all group ${
                      currentPage?._id === page._id
                        ? "bg-indigo-50 text-indigo-700 font-bold"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentPage?._id === page._id
                            ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                            : "bg-gray-200"
                        }`}
                      ></div>
                      <span className="text-sm tracking-tight">{page.name}</span>
                    </div>

                    {!page.isHome && (
                      <IconButton
                        size="sm"
                        variant="text"
                        color="red"
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                        onClick={(e) => handleDeletePage(e, page._id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    )}
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
          <button
            className="bg-blue-600 text-white py-2 px-3 rounded-xl text-sm font-bold"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
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

          <Tooltip content="Live View" placement="bottom">
            <IconButton
              variant="text"
              color="indigo"
              onClick={() =>
                window.open(`/preview/${currentWebsite._id}`, "_blank")
              }
              className="rounded-xl w-10 h-10 hover:bg-indigo-50"
            >
              <EyeIcon className="h-5 w-5 stroke-[2.5]" />
            </IconButton>
          </Tooltip>

          <Button
            variant="text"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
            className={`min-w-[130px] rounded-xl font-bold px-4 py-2.5 normal-case transition-all flex items-center justify-center gap-2 border ${isPreview ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm" : "text-gray-600 border-transparent hover:bg-gray-50 hover:border-gray-200"}`}
          >
            <SparklesIcon className="h-5 w-5 shrink-0" />{" "}
            {isPreview ? "Exit Preview" : "Preview Mode"}
          </Button>
          <Button
            onClick={onSave}
            variant="text"
            size="sm"
            disabled={isSaving}
            className={`min-w-[100px] rounded-xl font-bold px-4 py-2.5 normal-case transition-all flex items-center justify-center gap-2 border border-gray-100 hover:bg-white hover:border-gray-200 text-gray-700 ${isSaving ? "opacity-50 cursor-wait" : ""}`}
          >
            <DocumentCheckIcon className="h-5 w-5 shrink-0 text-indigo-500" />
            {isSaving ? "Saving..." : "Save"}
          </Button>

          <Button
            onClick={onSave}
            size="sm"
            disabled={isSaving}
            className={`min-w-[120px] bg-indigo-600 rounded-xl px-4 py-3 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 normal-case font-black text-xs tracking-widest transition-all flex items-center justify-center gap-2 transform ${isSaving ? "opacity-80 cursor-wait" : "active:scale-95"}`}
          >
            {isSaving ? (
              <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin shrink-0"></div>
            ) : (
              <RocketLaunchIcon className="h-4 w-4 shrink-0" />
            )}
            {isSaving ? "Publishing..." : "Publish"}
          </Button>

          <div className="h-8 w-px bg-gray-100 mx-1"></div>

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
        size="lg"
        className="rounded-[2.5rem] shadow-2xl p-6 overflow-hidden bg-white"
      >
        <DialogHeader className="flex flex-col items-start gap-1 pb-4">
          <Typography
            variant="h3"
            className="text-gray-900 font-black tracking-tight"
          >
            Create New Page
          </Typography>
          <Typography className="text-gray-400 font-medium text-base">
            Design a new addition to your project
          </Typography>
        </DialogHeader>
        <DialogBody className="py-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Typography className="text-[11px] font-black text-gray-900 uppercase tracking-widest ml-1">
                  Page Name
                </Typography>
                <Input
                  variant="outlined"
                  placeholder="e.g. Contact Us"
                  value={newPageData.name}
                  onChange={(e) => handlePageNameChange(e.target.value)}
                  className="!border-gray-200 focus:!border-indigo-500 rounded-xl bg-gray-50/50 py-6"
                  labelProps={{ className: "hidden" }}
                />
              </div>

              <div className="space-y-2">
                <Typography className="text-[11px] font-black text-gray-900 uppercase tracking-widest ml-1">
                  Page Type
                </Typography>
                <Select
                  value={newPageData.type}
                  onChange={(val) =>
                    setNewPageData({ ...newPageData, type: val })
                  }
                  className="rounded-xl border-gray-200 bg-gray-50/50 py-3"
                  labelProps={{ className: "hidden" }}
                >
                  <Option value="Landing">Landing Page</Option>
                  <Option value="About">About Us</Option>
                  <Option value="Services">Services</Option>
                  <Option value="Blog">Blog Posts</Option>
                  <Option value="Portfolio">Portfolio Grid</Option>
                </Select>
              </div>

              <div className="space-y-2">
                <Typography className="text-[11px] font-black text-gray-900 uppercase tracking-widest ml-1">
                  URL Slug Preview
                </Typography>
                <div className="bg-indigo-50/50 px-4 py-3 rounded-xl border border-indigo-100/50 flex items-center gap-2">
                  <span className="text-indigo-200 font-bold text-sm">/</span>
                  <span className="text-indigo-600 font-black text-sm">
                    {newPageData.slug || "page-name"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div>
                  <Typography className="text-xs font-black text-gray-900 leading-none mb-1">
                    Navigation
                  </Typography>
                  <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Add to main menu
                  </Typography>
                </div>
                <Switch
                  color="indigo"
                  checked={newPageData.addToNav}
                  onChange={(e) =>
                    setNewPageData({
                      ...newPageData,
                      addToNav: e.target.checked,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <Typography className="text-[11px] font-black text-gray-900 uppercase tracking-widest ml-1">
                Choose a Starting Point
              </Typography>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "blank", name: "Blank Slate", icon: SparklesIcon },
                  {
                    id: "marketing",
                    name: "Marketing Landing",
                    icon: RocketLaunchIcon,
                  },
                  { id: "product", name: "Product Detail", icon: CubeIcon },
                  { id: "pricing", name: "Price Table", icon: TagIcon },
                ].map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() =>
                      setNewPageData({ ...newPageData, template: tpl.id })
                    }
                    className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all group ${
                      newPageData.template === tpl.id
                        ? "bg-white border-indigo-600 shadow-xl shadow-indigo-100"
                        : "bg-gray-50/50 border-transparent hover:bg-white hover:border-gray-100"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                        newPageData.template === tpl.id
                          ? "bg-indigo-50 text-indigo-600"
                          : "bg-white text-gray-300 group-hover:text-gray-400"
                      }`}
                    >
                      <tpl.icon className="h-5 w-5" />
                    </div>
                    <Typography
                      className={`text-[10px] font-black uppercase tracking-widest text-center ${
                        newPageData.template === tpl.id
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {tpl.name}
                    </Typography>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="gap-4 pt-6">
          <Button
            variant="text"
            color="red"
            onClick={() => setIsPageDialogOpen(false)}
            className="rounded-xl normal-case font-black text-[11px] uppercase tracking-widest"
          >
            Cancel
          </Button>
          <Button
            className="bg-indigo-600 rounded-xl normal-case font-black text-sm px-10 py-4 shadow-xl shadow-indigo-100 hover:shadow-indigo-200 transition-all transform active:scale-95"
            onClick={handleCreatePage}
          >
            Create Page
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default BuilderTopBar;
