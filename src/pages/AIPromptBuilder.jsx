import React, { useState } from "react";
import {
  Typography,
  Button,
  Textarea,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
} from "@material-tailwind/react";
import {
  PaperAirplaneIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  DevicePhoneMobileIcon,
  EyeIcon,
  LockClosedIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Recursive renderer for live preview
const PreviewRenderer = ({ component, primaryColor }) => {
  if (!component) return null;
  const { type, props = {}, styles = {}, children = [] } = component;

  const commonStyles = { ...styles };

  const renderChildren = () =>
    children.map((child) => (
      <PreviewRenderer
        key={child.id}
        component={child}
        primaryColor={primaryColor}
      />
    ));

  switch (type) {
    case "section":
      return <section style={commonStyles}>{renderChildren()}</section>;
    case "container":
      return (
        <div className="max-w-7xl mx-auto w-full px-6" style={commonStyles}>
          {renderChildren()}
        </div>
      );
    case "div":
    case "flex":
    case "grid":
      return (
        <div
          className={`w-full ${type === "flex" ? "flex flex-col md:flex-row gap-6" : type === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-6" : ""}`}
          style={commonStyles}
        >
          {renderChildren()}
        </div>
      );
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
    case "p":
    case "span":
      const Tag = type;
      return <Tag style={commonStyles}>{props.content}</Tag>;
    case "button":
    case "submit":
      return (
        <button
          style={{ ...commonStyles, backgroundColor: primaryColor }}
          className="px-8 py-3.5 text-white font-bold rounded-2xl shadow-xl transition-transform hover:scale-105"
        >
          {props.label || "Button"}
        </button>
      );
    case "img":
      return (
        <img
          src={props.src}
          alt={props.alt}
          style={{ width: "100%", borderRadius: "inherit", ...commonStyles }}
        />
      );
    case "hero":
      return (
        <div
          style={{
            ...commonStyles,
            backgroundColor: commonStyles.backgroundColor || "#111827",
            color: commonStyles.color || "#FFFFFF",
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="max-w-7xl mx-auto relative z-10 w-full px-8">
            {renderChildren()}
          </div>
        </div>
      );
    case "navbar":
    case "footer":
    case "logo-bar":
      return (
        <div
          className="w-full relative"
          style={{
            ...commonStyles,
            padding: commonStyles.padding || "24px 80px",
            backgroundColor:
              commonStyles.backgroundColor ||
              (type === "logo-bar" ? "transparent" : "#FFFFFF"),
          }}
        >
          {type === "navbar" && (
            <div className="flex justify-between items-center w-full">
              <div className="font-black text-2xl text-indigo-600 tracking-tighter">
                {" "}
                {props.logo || "LOGO"}{" "}
              </div>
              <div className="flex gap-8 text-[12px] font-bold text-gray-500 items-center">
                <span>Products</span>
                <span>Pricing</span>
                <span className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg">
                  Join
                </span>
              </div>
            </div>
          )}
          {type === "logo-bar" && (
            <div className="flex justify-center flex-wrap gap-12 opacity-30 grayscale text-[18px] font-black italic py-10">
              <span>Klarna.</span>
              <span>COINBASE</span>
              <span>instacart</span>
              <span>stripe</span>
            </div>
          )}
          <div className="w-full">{renderChildren()}</div>
          {type === "footer" && (
            <div className="text-center py-12 text-[11px] text-gray-400 font-bold uppercase tracking-widest border-t border-gray-100 mt-12">
              {props.text || "© 2026 Brand. All rights reserved."}
            </div>
          )}
        </div>
      );
    case "card":
      const isPayment = props.type === "payment";
      return (
        <div
          className="transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
          style={{
            background: "#FFFFFF",
            borderRadius: "32px",
            padding: "40px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.03)",
            border: "1px solid #F1F5F9",
            ...commonStyles,
          }}
        >
          {isPayment ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl" />
                <div className="text-right">
                  <div className="h-2 w-16 bg-gray-100 rounded ml-auto mb-2" />
                  <div className="h-6 w-32 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="h-40 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl shadow-xl p-6 flex flex-col justify-between overflow-hidden relative">
                <div className="w-10 h-10 bg-white/20 rounded-full" />
                <div className="h-4 w-40 bg-white/30 rounded" />
              </div>
              <div className="h-12 bg-indigo-900 rounded-2xl flex items-center justify-center font-bold text-white text-xs">
                Pay Securely
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-black text-xl text-gray-900">
                {props.title || "Card Title"}
              </h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                {props.content || "Card description text..."}
              </p>
              {renderChildren()}
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
};

const AIPromptBuilder = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Ready for your instructions. What kind of website would you like to build today?",
    },
  ]);
  const [generatedWebsiteId, setGeneratedWebsiteId] = useState(null);
  const [generatedLayout, setGeneratedLayout] = useState(null);
  const [glassBlur, setGlassBlur] = useState(12);
  const [panelOpacity, setPanelOpacity] = useState(40);
  const [primaryColor, setPrimaryColor] = useState("#5046e5");
  const [selectedModel, setSelectedModel] = useState("gemini-2.0-flash");
  const [viewport, setViewport] = useState("desktop");
  const [showFullPreview, setShowFullPreview] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const modelLabels = {
    "gemini-1.5-flash": "Gemini 1.5 Flash",
    "gemini-1.5-pro": "Gemini 1.5 Pro",
    "gpt-4o": "GPT-4o (Coming Soon)",
  };

  const paletteColors = [
    { hex: "#5046e5", bg: "bg-[#5046e5]" },
    { hex: "#0ea5e9", bg: "bg-[#0ea5e9]" },
    { hex: "#f43f5e", bg: "bg-[#f43f5e]" },
    { hex: "#0f172a", bg: "bg-[#0f172a]" },
  ];

  const panelStyle = {
    backdropFilter: `blur(${glassBlur}px)`,
    backgroundColor: `rgba(238, 242, 255, ${panelOpacity / 100})`, // base indigo-50 color
  };

  const renderStructure = (components, level = 0) => {
    return components.map((comp) => (
      <React.Fragment key={comp.id}>
        <div
          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white/50 transition-colors text-left group"
          style={{ paddingLeft: `${12 + level * 16}px` }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-6 h-6 rounded flex items-center justify-center ${level === 0 ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"}`}
            >
              <span className="text-[11px] font-black uppercase">
                {comp.type.charAt(0)}
              </span>
            </div>
            <span
              className={`text-[12px] ${level === 0 ? "font-bold text-gray-800" : "font-medium text-gray-600"} capitalize`}
            >
              {comp.type}
            </span>
          </div>
          <EyeIcon className="h-4 w-4 text-gray-400 group-hover:text-indigo-600" />
        </div>
        {comp.children &&
          comp.children.length > 0 &&
          renderStructure(comp.children, level + 1)}
      </React.Fragment>
    ));
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    const userPrompt = prompt;
    setPrompt("");
    setMessages((prev) => [...prev, { role: "user", text: userPrompt }]);
    setIsGenerating(true);

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      // 1. Ask the AI what we should do
      const chatRes = await axios.post(
        "http://localhost:5000/api/ai/chat",
        { prompt: userPrompt, history: messages, model: selectedModel },
        config,
      );
      const aiResponse = chatRes.data.data;

      if (!aiResponse.shouldGenerate) {
        // Just a conversational response
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: aiResponse.text },
        ]);
        setIsGenerating(false);
        return; // Stop here, no generation needed
      }

      // 2. If shouldGenerate is true, we proceed to create the website
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Got it! Initiating the Architecture synthesis protocol now...",
        },
      ]);

      const payload = {
        businessName: userPrompt.split(' ').slice(0, 3).join(' '),
        description: userPrompt,
        colorPreference: primaryColor,
        layoutStyle: "creative",
        model: selectedModel,
      };

      const res = await axios.post(
        "http://localhost:5000/api/ai/generate",
        payload,
        config,
      );

      if (res.data.success) {
        setGeneratedWebsiteId(res.data.data._id);

        // Extract layout to render preview
        if (res.data.data.pages && res.data.data.pages.length > 0) {
          setGeneratedLayout(res.data.data.pages[0].layout);
        }

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "I've generated a premium architecture. You can switch viewports or open the live preview to inspect it.",
          },
        ]);
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I ran into an error generating your architecture. Please try again.",
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#f8fafc] overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/20 mix-blend-multiply blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/20 mix-blend-multiply blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-blue-500/20 mix-blend-multiply blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute top-6 left-6 z-20">
        <Button
          variant="outlined"
          size="sm"
          onClick={() => navigate("/dashboard")}
          className="bg-white/80 backdrop-blur-md border-gray-200 text-gray-700 hover:bg-white shadow-sm normal-case font-bold py-2.5 px-6 rounded-2xl flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Dashboard
        </Button>
      </div>

      <div className="relative z-10 flex h-full p-6 pt-20 gap-6 font-sans">
        {/* Left Panel: Architect GPT */}
        <div
          className="w-[320px] shrink-0 flex flex-col p-6 rounded-[2.5rem] border border-white/50 shadow-sm h-[calc(100vh-100px)]"
          style={panelStyle}
        >
          <div className="flex  justify-between mb-4">
            <p className="text-gray-900 font-black text-lg">Architect GPT</p>
            <Menu placement="bottom-end">
              <MenuHandler>
                <div className="px-3 py-1.5 cursor-pointer bg-indigo-100/50 text-indigo-600 rounded-lg border border-indigo-100 flex items-center justify-between shadow-sm outline-none min-w-[130px]">
                  <span className="text-[9px] uppercase font-black tracking-widest">
                    {modelLabels[selectedModel]}
                  </span>
                  <ChevronDownIcon strokeWidth={2.5} className="h-3 w-3 ml-2" />
                </div>
              </MenuHandler>
              <MenuList className="p-1 min-w-[150px] border-white/50 bg-white/90 backdrop-blur-xl shadow-xl z-[9999]">
                <MenuItem
                  onClick={() => setSelectedModel("gemini-1.5-flash")}
                  className="flex items-center gap-2 text-[11px] font-bold text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Gemini 1.5 Flash
                </MenuItem>
                <MenuItem
                  onClick={() => setSelectedModel("gemini-1.5-pro")}
                  className="flex items-center gap-2 text-[11px] font-bold text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Gemini 1.5 Pro
                </MenuItem>
                <MenuItem
                  disabled
                  className="flex items-center gap-2 text-[11px] font-bold text-gray-400"
                >
                  GPT-4o (Coming Soon)
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <p className="text-[11px] font-bold text-gray-800">
              Ready for your instructions
            </p>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-6 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-1">
                <p
                  className={`text-[9px] font-black uppercase tracking-widest px-2 ${msg.role === "user" ? "text-indigo-400 text-right" : "text-gray-800 "}`}
                >
                  {msg.role === "user" ? "You" : "Architect AI"}
                </p>
                <div
                  className={`${msg.role === "user" ? "bg-indigo-50/80 border-indigo-100 rounded-tr-sm" : "bg-white/60 border-white rounded-tl-sm"} backdrop-blur-md p-4 rounded-2xl border shadow-sm`}
                >
                  <p
                    className={`${msg.role === "user" ? "text-gray-800" : "text-gray-800"} text-[12px] font-medium leading-relaxed`}
                  >
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase  text-gray-800 tracking-widest px-2">
                  Architect AI
                </p>
                <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white rounded-tl-sm shadow-sm flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                  <Typography className="text-gray-500 text-[11px] font-bold">
                    Synthesizing blueprint...
                  </Typography>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="mt-auto space-y-4">
            <div className="relative bg-white rounded-3xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <Textarea
                placeholder="Tell me what to build..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                disabled={isGenerating}
                className="w-full bg-transparent px-4 py-3 text-sm font-medium border-none focus:ring-0 resize-none min-h-[80px]"
                labelProps={{ className: "hidden" }}
              />
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="absolute bottom-4 right-4 w-10 h-10 bg-indigo-600 disabled:bg-gray-400 rounded-2xl flex items-center justify-center text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30"
              >
                <PaperAirplaneIcon className="h-4 w-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Canvas: Live Preview */}
        <div className="flex-1 flex flex-col items-center h-[calc(100vh-100px)]">
          {/* Top Toolbar */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/50 px-6 py-3 rounded-3xl shadow-sm mb-6 flex items-center gap-8">
            <div className="flex items-center gap-4 text-indigo-600">
              {/* <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                <SparklesSolid className="h-4 w-4" />
              </div> */}
              <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                <ComputerDesktopIcon
                  onClick={() => setViewport("desktop")}
                  className={`h-5 w-5 cursor-pointer transition-all ${viewport === "desktop" ? "text-indigo-600" : "text-gray-300 hover:text-gray-400"}`}
                />
                <DeviceTabletIcon
                  onClick={() => setViewport("tablet")}
                  className={`h-4 w-4 cursor-pointer transition-all ${viewport === "tablet" ? "text-indigo-600" : "text-gray-300 hover:text-gray-400"}`}
                />
                <DevicePhoneMobileIcon
                  onClick={() => setViewport("mobile")}
                  className={`h-4 w-4 cursor-pointer transition-all ${viewport === "mobile" ? "text-indigo-600" : "text-gray-300 hover:text-gray-400"}`}
                />
              </div>
              <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                <Typography className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  {viewport} Mode
                </Typography>
              </div>
            </div>
            <Button
              variant="text"
              size="sm"
              onClick={() => setShowFullPreview(true)}
              className="hidden lg:flex items-center gap-2 rounded-xl text-gray-600 hover:bg-gray-50 capitalize font-bold"
            >
              <EyeIcon className="h-4 w-4" /> Live Preview
            </Button>
          </div>

          {/* Browser Frame */}
          <div
            className={`flex-1 w-full transition-all duration-500 bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col overflow-hidden ${
              viewport === "mobile"
                ? "max-w-[375px]"
                : viewport === "tablet"
                  ? "max-w-[768px]"
                  : "max-w-[900px]"
            }`}
          >
            {/* Browser Header */}
            <div className="h-12 bg-white/50 flex items-center px-6 gap-4 border-b border-gray-50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <div className="w-3 h-3 rounded-full bg-gray-200" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white border border-gray-100 rounded-xl px-10 py-1.5 text-[10px] font-bold text-gray-400">
                  project-architect-01.webgen.ai
                </div>
              </div>
              <div className="w-10"></div> {/* Spacer for symmetry */}
            </div>

            {/* Generated Page Content */}
            <div className="flex-1 w-full relative bg-white overflow-y-auto overflow-x-hidden flex flex-col no-scrollbar">
              {generatedWebsiteId ? (
                <>
                  <div className="absolute top-4 right-4 z-50">
                    <Button
                      onClick={() => navigate(`/builder/${generatedWebsiteId}`)}
                      className="bg-indigo-600 rounded-2xl px-6 py-3 normal-case font-bold text-xs hover:scale-105 transition-transform shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                    >
                      <ComputerDesktopIcon className="h-4 w-4" />
                      Open Full Editor
                    </Button>
                  </div>

                  {generatedLayout && generatedLayout.length > 0 ? (
                    <div className="w-full flex-1 flex flex-col">
                      {generatedLayout.map((component) => (
                        <PreviewRenderer
                          key={component.id}
                          component={component}
                          primaryColor={primaryColor}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 animate-in zoom-in-95 duration-500">
                      {/* <div className="w-20 h-20 bg-green-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm border border-green-100">
                        <SparklesSolid className="h-8 w-8 text-green-500" />
                      </div> */}

                      <div className="space-y-2">
                        <p className="text-gray-900 font-black text-2xl tracking-tight">
                          Architecture Synthesized!
                        </p>
                        <p className="text-gray-500 font-medium max-w-sm mx-auto">
                          Your AI website layout has been generated and is ready
                          for refinement.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-16 animate-pulse bg-gray-50/50">
                  <p className="text-gray-800 font-bold uppercase tracking-widest text-[11px] mb-2">
                    Workspace Idle
                  </p>
                  <p className="text-gray-900 font-medium text-lg">
                    Send instructions to generate your AI canvas...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Live Preview Dialog */}
      <Dialog
        open={showFullPreview}
        handler={() => setShowFullPreview(false)}
        size="xxl"
        className="bg-white overflow-hidden p-0 rounded-none h-screen w-screen"
      >
        <div className="h-screen w-screen flex flex-col bg-white overflow-hidden">
          <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-[100]">
            <div className="flex items-center gap-6">
              <Typography className="font-black text-indigo-600 tracking-tighter">
                PREVIEW MODE
              </Typography>
              <div className="h-6 w-px bg-gray-100" />
              <div className="flex items-center gap-4">
                <ComputerDesktopIcon
                  onClick={() => setViewport("desktop")}
                  className={`h-5 w-5 cursor-pointer ${viewport === "desktop" ? "text-indigo-600" : "text-gray-300"}`}
                />
                <DeviceTabletIcon
                  onClick={() => setViewport("tablet")}
                  className={`h-4 w-4 cursor-pointer ${viewport === "tablet" ? "text-indigo-600" : "text-gray-300"}`}
                />
                <DevicePhoneMobileIcon
                  onClick={() => setViewport("mobile")}
                  className={`h-4 w-4 cursor-pointer ${viewport === "mobile" ? "text-indigo-600" : "text-gray-300"}`}
                />
              </div>
            </div>
            <Button
              onClick={() => setShowFullPreview(false)}
              variant="text"
              color="gray"
              className="rounded-xl flex items-center gap-2"
            >
              Close Preview
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-50/50 p-12 flex justify-center no-scrollbar">
            <div
              className={`w-full bg-white shadow-2xl transition-all duration-500 min-h-full ${
                viewport === "mobile"
                  ? "max-w-[390px]"
                  : viewport === "tablet"
                    ? "max-w-[768px]"
                    : "max-w-full"
              }`}
            >
              {generatedLayout &&
                generatedLayout.map((comp) => (
                  <PreviewRenderer
                    key={comp.id}
                    component={comp}
                    primaryColor={primaryColor}
                  />
                ))}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AIPromptBuilder;
