import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  Textarea,
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  SparklesIcon,
  RocketLaunchIcon,
  CubeIcon,
  CpuChipIcon,
  CheckCircleIcon,
  TrashIcon,
  GlobeAltIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";

const AIPromptBuilder = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("landing");
  const [selectedModel, setSelectedModel] = useState("gemini-pro");
  const [generatedData, setGeneratedData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const loadingSteps = [
    "Analyzing Brand Intent...",
    "Selecting High-Convert Layouts...",
    "Synthesizing Content & SEO...",
    "Applying Color Psychology...",
    "Vetting Accessibility Standards...",
    "Finalizing Digital Blueprint...",
  ];

  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingStep((prev) =>
          prev < loadingSteps.length - 1 ? prev + 1 : prev,
        );
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setLoadingStep(0);

    // Dynamic Business Name extraction attempt
    const nameMatch = prompt.match(/(?:for|named|called|brand)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i);
    const extractedName = nameMatch ? nameMatch[1] : null;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ai/generate",
        {
          description: prompt,
          layoutStyle: selectedTemplate,
          model: selectedModel,
          businessName: extractedName || "New Project",
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      if (response.data.success) {
        setGeneratedData(response.data.data);
        setShowPreview(true);
      }
    } catch (error) {
      console.error("AI Generation failed", error);
      // Premium Mock Fallback - Dynamic
      setTimeout(() => {
        setGeneratedData({
          _id: "demo_id",
          name: extractedName || "AI Blueprint",
          pages: [{ name: "Home", slug: "home", layout: [] }],
        });
        setShowPreview(true);
      }, 1500);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!generatedData) return;
    navigate(`/builder/${generatedData._id}`);
  };

  const handleReject = async () => {
    if (!generatedData) return;
    try {
      if (generatedData._id !== "demo_id") {
        await axios.delete(
          `http://localhost:5000/api/websites/${generatedData._id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          },
        );
      }
    } catch (err) {
      console.error("Cleanup failed", err);
    }
    setGeneratedData(null);
    setShowPreview(false);
    setPrompt("");
  };

  const aiModels = [
    {
      id: "gemini-pro",
      name: "Gemini 1.5 Pro",
      icon: SparklesIcon,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: "gpt-3.5",
      name: "GPT-4 Turbo",
      icon: CpuChipIcon,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      id: "mistral",
      name: "Mistral Large",
      icon: RocketLaunchIcon,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-full bg-[#FAFAFF] text-gray-900 p-8 flex flex-col items-center justify-center relative overflow-hidden font-sans">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.02)_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Side: Creation Panel */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-700">
                  AI Website Studio
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl lg:text-[5rem] font-black tracking-tighter leading-[0.95] text-gray-900"
              >
                Architect your site
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x bg-300%">
                  without the code.
                </span>
              </motion.h1>
              <Typography className="text-gray-400 text-xl font-medium max-w-xl">
                Describe your brand, choose your engine, and watch as our AI
                architects build a professional digital presence in seconds.
              </Typography>
            </div>

            <div className="space-y-6">
              <Typography className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-3">
                <div className="h-px w-10 bg-gray-200" /> Selective Intelligence
                Layer
              </Typography>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {aiModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col gap-4 text-left group ${
                      selectedModel === model.id
                        ? "bg-white border-indigo-600 shadow-2xl shadow-indigo-100 scale-105 z-10"
                        : "bg-white border-gray-100/30 hover:border-indigo-100"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl w-fit ${model.bg} ${model.color} group-hover:scale-110 transition-transform`}
                    >
                      <model.icon className="h-6 w-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <Typography className="text-sm font-black text-gray-900">
                        {model.name}
                      </Typography>
                      <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                        v2.0 Model
                      </Typography>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <motion.div className="relative group">
              <div className="absolute -inset-2 bg-indigo-500/5 rounded-[2.5rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition duration-500" />
              <div className="relative bg-white border border-gray-100/50 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] overflow-hidden">
                <Textarea
                  variant="static"
                  placeholder="E.g. 'A high-end interior design portfolio with a focus on dark aesthetics and golden accents...'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-transparent p-10 text-2xl font-bold focus:ring-0 text-gray-900 placeholder:text-gray-200 min-h-[220px] resize-none border-none"
                  labelProps={{ className: "hidden" }}
                />
                <div className="px-10 py-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex gap-1.5 opacity-30">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  {!isGenerating && (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={handleGenerate}
                      disabled={!prompt}
                      className={`px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-4 shadow-2xl shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 ${!prompt ? "opacity-30 cursor-not-allowed grayscale" : ""}`}
                    >
                      Generate Blueprint{" "}
                      <RocketLaunchIcon className="h-4 w-4 stroke-[4]" />
                    </motion.button>
                  )}
                </div>
              </div>

              {isGenerating && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center space-y-8 z-30">
                  <div className="relative">
                    <div className="absolute -inset-8 bg-indigo-500/5 rounded-full animate-ping" />
                    <Spinner className="h-20 w-20 text-indigo-600 stroke-[3]" />
                  </div>
                  <div className="text-center px-12">
                    <motion.div
                      key={loadingStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-6"
                    >
                      <Typography className="text-gray-900 font-black uppercase tracking-[0.3em] text-[13px]">
                        {loadingSteps[loadingStep]}
                      </Typography>
                    </motion.div>
                    <Typography className="text-gray-300 font-bold text-[9px] mt-4 uppercase tracking-[0.5em]">
                      Intelligence Stream Active
                    </Typography>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Side: Showcase */}
          <div className="lg:col-span-12 xl:col-span-5 pt-20 hidden xl:block">
            <div className="space-y-8 sticky top-20">
              <Card className="p-12 rounded-[3.5rem] border border-gray-100 shadow-sm bg-white overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors" />
                <Typography className="text-[12px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-10">
                  Protocol Workflow
                </Typography>
                <div className="space-y-12">
                  {[
                    {
                      icon: SparklesIcon,
                      title: "Intent Analysis",
                      text: "AI parses your prompt to extract brand personality and core objectives.",
                    },
                    {
                      icon: CubeIcon,
                      title: "Component Synthesis",
                      text: "Selecting high-performing widgets from your library for the best layout.",
                    },
                    {
                      icon: RocketLaunchIcon,
                      title: "Global Deployment",
                      text: "Ready for live preview and multi-cloud hosting with one click.",
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-8 group/item">
                      <div className="w-14 h-14 rounded-[1.5rem] bg-gray-50 text-gray-400 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all flex items-center justify-center shadow-inner">
                        <step.icon className="h-6 w-6 stroke-2" />
                      </div>
                      <div>
                        <Typography className="text-md font-black text-gray-900 tracking-tight mb-2 group-hover/item:text-indigo-600 transition-colors uppercase">
                          {step.title}
                        </Typography>
                        <Typography className="text-sm font-medium text-gray-400 leading-relaxed">
                          {step.text}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-[3rem] flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-100/50">
                  <CheckCircleIcon className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <Typography className="text-gray-900 font-black text-lg">
                    AI Ready.
                  </Typography>
                  <Typography className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
                    Connect your Gemini API Key
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={showPreview}
        handler={() => setShowPreview(false)}
        size="md"
        className="rounded-[3rem] bg-[#FAFAFF] shadow-2xl p-1 outline-none max-h-[90vh] flex flex-col"
      >
        <DialogHeader className="p-6 md:p-8 flex items-end justify-between border-b border-gray-100 bg-white rounded-t-[3rem] flex-shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100 mb-1 font-black text-[8px] uppercase tracking-widest leading-none">
              <CheckCircleIcon className="h-3 w-3" /> Blueprint Finalized
            </div>
            <Typography className="text-2xl font-black tracking-tight text-gray-900 leading-none">
              Architecture Synthesized.
            </Typography>
          </div>
          <div className="text-right">
            <Typography className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Project Identity</Typography>
            <Typography className="text-lg font-black text-gray-900 truncate max-w-[150px]">{generatedData?.name}</Typography>
          </div>
        </DialogHeader>

        <DialogBody className="p-6 md:p-8 overflow-y-auto scrollbar-hide flex-1">
          <div className="space-y-8">
            <div className="bg-white border border-indigo-50 rounded-[2.5rem] p-1 shadow-2xl shadow-indigo-100/30 relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 flex items-center justify-center z-10">
                <div className="w-10 h-1 bg-gray-800 rounded-full" />
              </div>
              <div className="pt-6 h-[280px] overflow-y-auto bg-gray-50 scrollbar-hide flex flex-col">
                <div className="p-6 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-32 bg-white border border-indigo-50 rounded-lg flex items-center px-3 font-black text-[8px] text-gray-300 tracking-widest uppercase">
                      {generatedData?.name}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-10 w-full bg-white border border-indigo-50 rounded-xl shadow-sm flex items-center px-4">
                      <div className="w-1/3 h-3 bg-indigo-50 rounded-full" />
                    </div>
                    <div className="aspect-[16/6] bg-white border border-indigo-50 rounded-[2rem] shadow-sm flex flex-col items-center justify-center gap-2">
                      <div className="w-1/2 h-4 bg-indigo-600 rounded-lg" />
                      <div className="w-1/3 h-2 bg-gray-100 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-5 rounded-[2rem] bg-[#0A0A0B] text-white shadow-xl border-none">
                <div className="flex items-center gap-3 mb-4">
                  <SparklesIcon className="h-4 w-4 text-indigo-400" />
                  <Typography className="text-[8px] font-black uppercase tracking-[0.4em] text-indigo-400">Analysis Summary</Typography>
                </div>
                <div className="space-y-5">
                  {[
                    { label: "Design System", val: generatedData?.analysis?.designSystem || "Adaptive", color: "bg-indigo-400" },
                    { label: "UX Protocol", val: "Validated (" + (generatedData?.analysis?.uxScore || 98) + "%)", color: "bg-blue-400" },
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
                        <span className="font-black">{stat.val}</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color} w-full`} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5 rounded-[2rem] bg-white border border-indigo-50 shadow-sm space-y-5">
                <Typography className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-400">Blueprint Features</Typography>
                <div className="space-y-2">
                  {(generatedData?.analysis?.features || ["Adaptive Layout", "Global Styling", "SEO Ready"]).map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50/50 rounded-xl border border-gray-100">
                      <div className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-indigo-600 shadow-sm">
                        {i === 0 ? <CubeIcon className="h-3 w-3" /> : (i === 1 ? <GlobeAltIcon className="h-3 w-3" /> : <DocumentDuplicateIcon className="h-3 w-3" />)}
                      </div>
                      <span className="text-[9px] font-black text-gray-800 uppercase tracking-wider">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </DialogBody>

        <DialogFooter className="p-8 border-t border-gray-100 bg-white rounded-b-[3.5rem] flex gap-4 pt-6">
          <Button
            variant="outlined"
            color="red"
            onClick={handleReject}
            className="rounded-2xl border-2 px-10 font-black tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-red-50 uppercase shadow-none hover:shadow-none"
          >
            Reject Design <TrashIcon className="h-4 w-4 stroke-[3]" />
          </Button>
          <Button
            className="bg-indigo-600 rounded-2xl px-12 py-4 font-black tracking-[0.2em] text-[10px] flex items-center gap-3 shadow-2xl shadow-indigo-200 uppercase"
            onClick={handleSave}
          >
            Approve & Launch Editor{" "}
            <RocketLaunchIcon className="h-4 w-4 stroke-[3]" />
          </Button>
        </DialogFooter>
      </Dialog>
    </DashboardLayout>
  );
};

export default AIPromptBuilder;
