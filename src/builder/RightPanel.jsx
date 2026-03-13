import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Tooltip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  updateComponent,
  selectComponent,
  removeComponent,
} from "../store/builderSlice";
import {
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SwatchIcon,
  AdjustmentsHorizontalIcon,
  QueueListIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon,
  PhotoIcon,
  CubeIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  PaintBrushIcon,
  CodeBracketIcon,
  SparklesIcon,
  Bars3CenterLeftIcon,
  Squares2X2Icon,
  ViewfinderCircleIcon,
  PlayIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

// Helper Box Model Editor (Browser DevTools / Webflow Style)
const BoxModelEditor = ({ component, onChange }) => {
  const getS = (prop) => component.styles?.[prop] || "0";

  const ValueInput = ({ prop, label, className = "" }) => (
    <input
      type="text"
      value={getS(prop)}
      onChange={(e) => onChange(prop, e.target.value)}
      title={label}
      className={`w-8 text-center bg-transparent border-none outline-none text-[9px] font-black text-gray-900 hover:bg-indigo-50/50 focus:bg-white rounded p-0.5 transition-all ${className}`}
    />
  );

  return (
    <div className="w-full select-none p-1">
      {/* Margin Box */}
      <div className="bg-gray-50/80 border border-gray-200 rounded-[1.5rem] p-2 relative flex flex-col items-center shadow-sm">
        <span className="absolute top-2.5 left-4 text-[9px] font-black text-gray-900 uppercase tracking-[0.2em]">
          margin
        </span>
        <ValueInput prop="marginTop" label="Margin Top" />

        <div className="flex items-center w-full justify-between gap-1">
          <ValueInput prop="marginLeft" label="Margin Left" />

          {/* Padding Box */}
          <div className="flex-1 bg-white border border-gray-200 rounded-[1.2rem] p-3 relative flex flex-col items-center min-w-[160px] shadow-sm">
            <span className="absolute top-2.5 left-4 text-[9px] font-black text-gray-900 uppercase tracking-[0.2em]">
              padding
            </span>
            <ValueInput
              prop="paddingTop"
              label="Padding Top"
              className="text-indigo-600"
            />

            <div className="flex items-center w-full justify-between gap-1">
              <ValueInput
                prop="paddingLeft"
                label="Padding Left"
                className="text-indigo-600"
              />

              {/* Content Placeholder */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl px-4 py-2 min-w-[70px] flex items-center justify-center">
                <span className="text-[10px] font-black text-indigo-900 opacity-60">
                  {component.styles?.width || "auto"} ×{" "}
                  {component.styles?.height || "auto"}
                </span>
              </div>

              <ValueInput
                prop="paddingRight"
                label="Padding Right"
                className="text-indigo-600"
              />
            </div>

            <ValueInput
              prop="paddingBottom"
              label="Padding Bottom"
              className="text-indigo-600"
            />
          </div>

          <ValueInput prop="marginRight" label="Margin Right" />
        </div>

        <ValueInput prop="marginBottom" label="Margin Bottom" />
      </div>
    </div>
  );
};

const SECTIONS = [
  {
    id: "layout",
    title: "Layout",
    icon: ViewfinderCircleIcon,
    controls: [
      {
        label: "Display",
        name: "display",
        type: "select",
        options: ["block", "flex", "grid", "inline-block", "none"],
      },
      {
        label: "Position",
        name: "position",
        type: "select",
        options: ["static", "relative", "absolute", "fixed"],
      },
      { label: "Z-Index", name: "zIndex" },
      {
        label: "Overflow",
        name: "overflow",
        type: "select",
        options: ["visible", "hidden", "scroll", "auto"],
      },
      { label: "Top", name: "top" },
      { label: "Right", name: "right" },
      { label: "Bottom", name: "bottom" },
      { label: "Left", name: "left" },
    ],
  },
  {
    id: "spacing",
    title: "Spacing",
    icon: ArrowsPointingInIcon,
    custom: true,
  },
  {
    id: "size",
    title: "Size",
    icon: ArrowsPointingOutIcon,
    controls: [
      { label: "Width", name: "width" },
      { label: "Height", name: "height" },
      { label: "Min W", name: "minWidth" },
      { label: "Max W", name: "maxWidth" },
      { label: "Min H", name: "minHeight" },
      { label: "Max H", name: "maxHeight" },
      { label: "Aspect", name: "aspectRatio", placeholder: "e.g. 16/9" },
    ],
  },
  {
    id: "typography",
    title: "Typography",
    icon: Bars3CenterLeftIcon,
    controls: [
      { label: "Font", name: "fontFamily", placeholder: "Poppins, sans-serif" },
      {
        label: "Weight",
        name: "fontWeight",
        type: "select",
        options: [
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
          "normal",
          "bold",
        ],
      },
      { label: "Size", name: "fontSize" },
      { label: "Height", name: "lineHeight" },
      { label: "Space", name: "letterSpacing" },
      { label: "Color", name: "color", type: "color" },
      {
        label: "Align",
        name: "textAlign",
        type: "select",
        options: ["left", "center", "right", "justify"],
      },
      {
        label: "Transform",
        name: "textTransform",
        type: "select",
        options: ["none", "capitalize", "uppercase", "lowercase"],
      },
      {
        label: "Decor",
        name: "textDecoration",
        type: "select",
        options: ["none", "underline", "line-through"],
      },
    ],
  },
  {
    id: "background",
    title: "Background",
    icon: PaintBrushIcon,
    controls: [
      { label: "Color", name: "backgroundColor", type: "color" },
      { label: "Image", name: "backgroundImage", placeholder: "url(...)" },
      {
        label: "Gradient",
        name: "background",
        placeholder: "linear-gradient(...)",
      },
      {
        label: "Size",
        name: "backgroundSize",
        type: "select",
        options: ["auto", "cover", "contain"],
      },
      { label: "Position", name: "backgroundPosition" },
      {
        label: "Repeat",
        name: "backgroundRepeat",
        type: "select",
        options: ["repeat", "no-repeat", "repeat-x", "repeat-y"],
      },
    ],
  },
  {
    id: "border",
    title: "Border",
    icon: SwatchIcon,
    controls: [
      { label: "Radius", name: "borderRadius" },
      { label: "Width", name: "borderWidth" },
      {
        label: "Style",
        name: "borderStyle",
        type: "select",
        options: ["none", "solid", "dashed", "dotted"],
      },
      { label: "Color", name: "borderColor", type: "color" },
      { label: "Outline", name: "outline" },
    ],
  },
  {
    id: "effects",
    title: "Effects",
    icon: SparklesIcon,
    controls: [
      {
        label: "Box Shadow",
        name: "boxShadow",
        placeholder: "0px 4px 10px rgba(0,0,0,0.1)",
      },
      { label: "Text Shadow", name: "textShadow" },
      { label: "Opacity", name: "opacity", placeholder: "0 to 1" },
      { label: "Filter", name: "filter", placeholder: "blur(5px)" },
      { label: "Backdrop", name: "backdropFilter", placeholder: "blur(10px)" },
    ],
  },
  {
    id: "flexbox",
    title: "Flexbox",
    icon: QueueListIcon,
    controls: [
      {
        label: "Direction",
        name: "flexDirection",
        type: "select",
        options: ["row", "row-reverse", "column", "column-reverse"],
      },
      {
        label: "Justify",
        name: "justifyContent",
        type: "select",
        options: [
          "flex-start",
          "center",
          "flex-end",
          "space-between",
          "space-around",
        ],
      },
      {
        label: "Align Items",
        name: "alignItems",
        type: "select",
        options: ["flex-start", "center", "flex-end", "stretch", "baseline"],
      },
      {
        label: "Wrap",
        name: "flexWrap",
        type: "select",
        options: ["nowrap", "wrap", "wrap-reverse"],
      },
      { label: "Grow", name: "flexGrow" },
      { label: "Shrink", name: "flexShrink" },
      { label: "Gap", name: "gap" },
    ],
  },
  {
    id: "grid",
    title: "Grid",
    icon: Squares2X2Icon,
    controls: [
      { label: "Columns", name: "gridTemplateColumns", placeholder: "1fr 1fr" },
      { label: "Rows", name: "gridTemplateRows" },
      { label: "Col Gap", name: "columnGap" },
      { label: "Row Gap", name: "rowGap" },
      { label: "Col Span", name: "gridColumn" },
      { label: "Row Span", name: "gridRow" },
    ],
  },
  {
    id: "transform",
    title: "Transform",
    icon: CubeIcon,
    controls: [
      {
        label: "Transform",
        name: "transform",
        placeholder: "scale(1.1) rotate(5deg)",
      },
      { label: "Origin", name: "transformOrigin" },
    ],
  },
  {
    id: "animation",
    title: "Animation",
    icon: PlayIcon,
    controls: [
      { label: "Transition", name: "transition", placeholder: "all 0.3s ease" },
    ],
  },
];

const GOOGLE_FONTS = [
  "Inter",
  "Poppins",
  "Roboto",
  "Montserrat",
  "Playfair Display",
  "Outfit",
  "Open Sans",
  "Lato",
  "Raleway",
  "Oswald",
  "Lora",
  "Merriweather",
  "Noto Sans",
  "Ubuntu",
  "PT Sans",
  "Josefin Sans",
  "Quicksand",
];

const SearchableDropdown = ({
  label,
  value,
  options,
  onSelect,
  placeholder = "Search...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="flex items-center justify-between gap-3 mb-2">
      <Typography className="text-[9.5px] font-bold text-gray-900 uppercase tracking-widest w-1/3 truncate">
        {label}
      </Typography>
      <Menu placement="bottom-end" open={isOpen} handler={setIsOpen}>
        <MenuHandler>
          <div className="flex-1 cursor-pointer bg-white border border-gray-100 rounded-md px-2 py-1.5 flex items-center justify-between text-[10px] font-bold text-gray-700 hover:border-indigo-400 transition-all shadow-sm">
            <span className="truncate">{value || "Default"}</span>
            <ChevronDownIcon className="h-3 w-3 text-gray-400" />
          </div>
        </MenuHandler>
        <MenuList className="p-2 border-gray-100 rounded-lg shadow-xl min-w-[180px] max-h-72 overflow-hidden flex flex-col z-[9999]">
          <div className="mb-2 shrink-0">
            <input
              autoFocus
              type="text"
              placeholder={placeholder}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-1.5 text-[11px] border border-gray-100 rounded-md focus:border-indigo-500 outline-none font-medium"
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>
          <div className="overflow-y-auto flex-1">
            <MenuItem
              onClick={() => {
                onSelect("");
                setIsOpen(false);
                setFilter("");
              }}
              className="px-3 py-1.5 text-[10px] font-bold text-gray-400 hover:bg-gray-50 uppercase tracking-widest"
            >
              Clear / Default
            </MenuItem>
            {filteredOptions.map((opt) => (
              <MenuItem
                key={opt}
                onClick={() => {
                  onSelect(opt);
                  setIsOpen(false);
                  setFilter("");
                }}
                className={`px-3 py-2 text-[11px] font-bold rounded-lg mb-0.5 ${value === opt ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"}`}
                style={{
                  fontFamily: label.toLowerCase().includes("font")
                    ? opt
                    : "inherit",
                }}
              >
                {opt}
              </MenuItem>
            ))}
            {filteredOptions.length === 0 && (
              <div className="p-4 text-center text-[10px] text-gray-400 font-black uppercase tracking-widest">
                No matches
              </div>
            )}
          </div>
        </MenuList>
      </Menu>
    </div>
  );
};

const StyleControl = ({ control, component, onChange }) => {
  const {
    label,
    name,
    type = "text",
    options = [],
    placeholder = "auto",
  } = control;
  const val = component.styles?.[name] || "";

  if (type === "color") {
    return (
      <div className="flex items-center justify-between gap-3 mb-2">
        <Typography className="text-[9.5px] font-bold text-gray-900 uppercase tracking-widest w-1/3 truncate">
          {label}
        </Typography>
        <div className="flex-1 flex bg-white border border-gray-100 rounded-md overflow-hidden relative group hover:border-indigo-400 focus-within:border-indigo-500 transition-all shadow-sm min-h-[28px]">
          <input
            type="color"
            value={val || "#ffffff"}
            onChange={(e) => onChange(name, e.target.value)}
            className="w-8 h-8 cursor-pointer border-r border-gray-100 scale-150 absolute -left-2 top-0 opacity-0"
          />
          <div
            className="w-6 h-full border-r border-gray-100 shrink-0"
            style={{ backgroundColor: val || "transparent" }}
          ></div>
          <input
            type="text"
            value={val}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder="transparent"
            className="w-full bg-transparent px-2 text-[10px] font-bold text-gray-700 outline-none uppercase"
          />
        </div>
      </div>
    );
  }

  if (name === "fontFamily" || type === "select") {
    return (
      <SearchableDropdown
        label={label}
        value={val}
        options={name === "fontFamily" ? GOOGLE_FONTS : options}
        onSelect={(opt) => onChange(name, opt)}
        placeholder={`Search ${label.toLowerCase()}...`}
      />
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 mb-2">
      <Typography
        className="text-[9.5px] font-bold text-gray-900 uppercase tracking-widest w-1/3 truncate"
        title={label}
      >
        {label}
      </Typography>
      <input
        type="text"
        value={val}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-white border border-gray-100 rounded-md px-2 py-1.5 text-[10px] font-bold text-gray-700 outline-none hover:border-indigo-400 focus:bg-indigo-50/20 transition-all shadow-sm"
      />
    </div>
  );
};

const RightPanel = () => {
  const { currentPage, selectedComponentId, deviceView } = useSelector(
    (state) => state.builder,
  );
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Style");

  // Default open state for first few sections
  const [openSections, setOpenSections] = useState({
    layout: true,
    spacing: true,
    size: true,
    typography: false,
    background: false,
    border: false,
  });

  const findComponent = (items, id) => {
    if (!items) return null;
    for (let item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findComponent(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedComponent = currentPage
    ? findComponent(currentPage.layout, selectedComponentId)
    : null;

  const [searchQuery, setSearchQuery] = useState("");

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleStyleChange = (name, value) => {
    dispatch(
      updateComponent({
        id: selectedComponentId,
        updates: { styles: { ...selectedComponent.styles, [name]: value } },
      }),
    );
  };

  const handlePropChange = (name, value) => {
    dispatch(
      updateComponent({
        id: selectedComponentId,
        updates: { props: { ...selectedComponent.props, [name]: value } },
      }),
    );
  };

  if (!selectedComponent) {
    return (
      <div className="w-full bg-white h-[calc(100vh-80px)] flex flex-col items-center justify-center p-8 text-center bg-gray-50/20 shrink-0 z-10">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-100/50 border border-indigo-50/50">
          <AdjustmentsHorizontalIcon className="h-10 w-10 text-indigo-400 animate-pulse" />
        </div>
        <Typography
          variant="h5"
          className="text-gray-900 font-extrabold tracking-tight mb-2"
        >
          Style Editor
        </Typography>
        <Typography className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.15em] leading-relaxed max-w-[200px]">
          Select an element on the canvas to customize its visual rules.
        </Typography>
      </div>
    );
  }

  const SectionHeader = ({ section, isOpen, onToggle }) => (
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between py-4 px-5 border-b border-gray-50 hover:bg-gray-50/50 transition-all ${isOpen ? "bg-indigo-50/10" : ""}`}
    >
      <div className="flex items-center gap-3">
        {section.icon && (
          <section.icon
            className={`h-4 w-4 ${isOpen ? "text-indigo-600" : "text-gray-900"}`}
          />
        )}
        <Typography
          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isOpen ? "text-indigo-900" : "text-gray-900"}`}
        >
          {section.title}
        </Typography>
      </div>
      {isOpen ? (
        <ChevronUpIcon className="h-3 w-3 text-indigo-400" strokeWidth={3} />
      ) : (
        <ChevronDownIcon className="h-3 w-3 text-gray-300" strokeWidth={3} />
      )}
    </button>
  );

  return (
    <div className="w-full bg-white h-[calc(100vh-80px)] overflow-hidden flex flex-col shrink-0 font-sans shadow-[-20px_0_40px_-20px_rgba(0,0,0,0.08)] z-10">
      {/* Device Toolbar (Webflow/Framer style) */}
      <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Typography className="text-[9px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
            {selectedComponent.type}
          </Typography>
        </div>
        <div className="flex bg-white border border-gray-100 rounded-lg p-0.5 shadow-sm">
          <button
            className={`p-1.5 rounded-md transition-all ${deviceView === "desktop" ? "bg-indigo-50 text-indigo-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            <ComputerDesktopIcon className="h-3.5 w-3.5" />
          </button>
          <button
            className={`p-1.5 rounded-md transition-all ${deviceView === "tablet" ? "bg-indigo-50 text-indigo-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            <DeviceTabletIcon className="h-3.5 w-3.5" />
          </button>
          <button
            className={`p-1.5 rounded-md transition-all ${deviceView === "mobile" ? "bg-indigo-50 text-indigo-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            <DevicePhoneMobileIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 shrink-0 bg-white shadow-sm z-10 w-full relative">
        {[
          { id: "Style", icon: PaintBrushIcon },
          { id: "Settings", icon: AdjustmentsHorizontalIcon },
          { id: "Class", icon: CodeBracketIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1.5 py-4 transition-all relative ${
              activeTab === tab.id
                ? "text-indigo-600 bg-indigo-50/30"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50/50"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span className="text-[9px] font-black uppercase tracking-widest">
              {tab.id}
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600" />
            )}
          </button>
        ))}
      </div>

      {/* Global Style Search */}
      {activeTab === "Style" && (
        <div className="px-5 py-4 border-b border-gray-100 bg-white shrink-0 scroll-mt-20">
          <div className="relative group">
            <ViewfinderCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search properties (e.g. padding, color)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 focus:bg-white focus:border-indigo-500 transition-all outline-none"
            />
          </div>
        </div>
      )}

      {/* Main Edit Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-gray-50/10">
        {/* Style Tab */}
        {activeTab === "Style" && (
          <div className="pb-32">
            <div className="p-4 bg-indigo-600 text-white flex items-center justify-between shadow-inner">
              <Typography className="text-[10px] font-black uppercase tracking-widest">
                State Editor
              </Typography>
              <Menu placement="bottom-end">
                <MenuHandler>
                  <div className="cursor-pointer bg-white/10 border border-white/20 hover:bg-white/20 rounded px-3 py-1.5 flex items-center gap-2 text-[10px] font-bold outline-none uppercase tracking-widest transition-colors shadow-sm w-28 justify-between">
                    <span>{activeTab === "Style" ? "Normal" : "Normal"}</span>
                    <ChevronDownIcon strokeWidth={3} className="h-2.5 w-2.5" />
                  </div>
                </MenuHandler>
                <MenuList className="p-1 min-w-[120px] bg-white border border-gray-100 rounded-lg shadow-2xl z-[9999]">
                  <MenuItem className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 hover:bg-indigo-100">
                    Normal
                  </MenuItem>
                  <MenuItem className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50">
                    Hover
                  </MenuItem>
                  <MenuItem className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50">
                    Active
                  </MenuItem>
                  <MenuItem className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50">
                    Focus
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>

            {SECTIONS.filter((s) => {
              if (!searchQuery) return true;
              const matchesTitle = s.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
              const matchesControls = s.controls?.some(
                (c) =>
                  c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  c.name.toLowerCase().includes(searchQuery.toLowerCase()),
              );
              return matchesTitle || matchesControls;
            }).map((section) => (
              <div key={section.id}>
                <SectionHeader
                  section={section}
                  isOpen={openSections[section.id] || searchQuery.length > 0}
                  onToggle={() => toggleSection(section.id)}
                />

                {(openSections[section.id] || searchQuery.length > 0) && (
                  <div className="p-5 animate-in fade-in duration-300 bg-white">
                    {/* Render standard controls */}
                    {section.controls &&
                      section.controls.map((control) => (
                        <StyleControl
                          key={control.name}
                          control={control}
                          component={selectedComponent}
                          onChange={handleStyleChange}
                        />
                      ))}

                    {/* Render visual spacing editor specifically for spacing section */}
                    {section.custom && section.id === "spacing" && (
                      <BoxModelEditor
                        component={selectedComponent}
                        onChange={handleStyleChange}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab: Handles specific component props (e.g. text content, image src, inputs) */}
        {activeTab === "Settings" && (
          <div className="p-6 space-y-6 pb-32">
            <Typography className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] border-b border-gray-100 pb-3">
              Component Settings
            </Typography>

            {Object.keys(selectedComponent.props || {}).map((propKey) => {
              const val = selectedComponent.props[propKey];
              if (typeof val === "string") {
                return (
                  <div key={propKey} className="space-y-2">
                    <Typography className="text-[10px] font-black text-indigo-400 uppercase tracking-widest px-1">
                      {propKey}
                    </Typography>
                    {propKey === "content" || propKey === "subtitle" ? (
                      <textarea
                        className="w-full bg-white border border-gray-200 rounded-xl p-4 text-[12px] font-medium text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 shadow-sm min-h-[140px] leading-relaxed transition-all"
                        value={val}
                        onChange={(e) =>
                          handlePropChange(propKey, e.target.value)
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[12px] font-medium text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 shadow-sm transition-all"
                        value={val}
                        onChange={(e) =>
                          handlePropChange(propKey, e.target.value)
                        }
                      />
                    )}
                  </div>
                );
              }
              return null;
            })}

            {selectedComponent.type === "image" && (
              <div className="space-y-3 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                <Typography className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                  <PhotoIcon className="h-4 w-4" /> Asset URL
                </Typography>
                <input
                  className="w-full text-[11px] p-3 bg-white border border-indigo-100 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium"
                  value={selectedComponent.props.src || ""}
                  onChange={(e) => handlePropChange("src", e.target.value)}
                  placeholder="https://..."
                />
              </div>
            )}
          </div>
        )}

        {/* Classes & Tailwind Tab */}
        {activeTab === "Class" && (
          <div className="p-6 space-y-6 pb-32">
            <div className="p-6 bg-gradient-to-br from-gray-900 to-indigo-900 rounded-[2rem] shadow-xl text-white space-y-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <CodeBracketIcon className="h-5 w-5 text-indigo-300" />
                </div>
                <Typography className="text-sm font-black tracking-tight">
                  Tailwind Classes
                </Typography>
              </div>
              <Typography className="text-[11px] font-medium text-indigo-200 leading-relaxed">
                Override generated styles by applying Tailwind utilities
                directly to this component.
              </Typography>
              <textarea
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-[12px] font-mono text-indigo-100 focus:outline-none focus:border-indigo-400 min-h-[100px] placeholder:text-white/20 transition-all"
                placeholder="e.g. hover:bg-black focus:ring-2 md:w-1/2"
                value={selectedComponent.props?.className || ""}
                onChange={(e) => handlePropChange("className", e.target.value)}
              />
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center space-y-2">
              <Typography className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Internal Component ID
              </Typography>
              <Typography className="text-xs font-mono font-bold text-gray-900">
                {selectedComponent.id.slice(0, 18)}...
              </Typography>
            </div>
          </div>
        )}
      </div>

      {/* Footer Destruction Action */}
      <div className="p-5 border-t border-gray-200 bg-white sticky bottom-0 shrink-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] z-20">
        <button
          onClick={() => {
            if (
              window.confirm(
                `Permanently remove this ${selectedComponent.type}?`,
              )
            ) {
              dispatch(removeComponent(selectedComponentId));
              dispatch(selectComponent(null));
            }
          }}
          className="w-full py-3.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 border border-red-100/50 shadow-sm hover:shadow-xl hover:shadow-red-500/20 active:scale-[0.98]"
        >
          <TrashIcon className="h-4 w-4 stroke-[2.5]" /> Delete Element
        </button>
      </div>
    </div>
  );
};

export default RightPanel;
