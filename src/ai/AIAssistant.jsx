import React, { useState } from "react";
import {
  IconButton,
  Card,
  CardBody,
  Typography,
  Textarea,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
} from "@material-tailwind/react";
import {
  SparklesIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  ChevronDownIcon,
  SwatchIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setPageLayout } from "../store/builderSlice";
import axios from "axios";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-1.5-flash");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const modelLabels = {
    "gemini-1.5-flash": "Gemini 1.5 Flash",
    "gemini-1.5-pro": "Gemini 1.5 Pro",
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const res = await axios.post(
        "http://localhost:5000/api/ai/generate-layout",
        { prompt, model: selectedModel },
        config
      );

      if (res.data.success && res.data.data.layout) {
        dispatch(setPageLayout(res.data.data.layout));
        setIsOpen(false);
        setPrompt("");
      }
    } catch (error) {
      console.error("AI Layout Generation failed:", error);
      alert("Failed to generate layout. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[50]">
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 rounded-2xl py-4 px-8 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 shadow-[0_20px_50px_rgba(99,102,241,0.3)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.5)] transition-all transform hover:-translate-y-1 active:scale-95 border border-white/20 group"
      >
        <SparklesIcon className="h-5 w-5 text-white animate-pulse group-hover:rotate-12 transition-transform" />
        <span className="text-sm font-black uppercase tracking-widest">Generate with AI</span>
      </Button>

      <Dialog
        open={isOpen}
        handler={() => setIsOpen(false)}
        size="md"
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[500px] rounded-[2.5rem] border border-white/50 bg-white/80 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="p-8 pb-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                <SparklesIcon className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-0.5">
                <Typography variant="h5" className="text-gray-900 font-black tracking-tight leading-none">
                  AI Layout Engine
                </Typography>
                <Typography className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  Synthesize Next-Gen UI
                </Typography>
              </div>
            </div>
            <IconButton
              variant="text"
              color="gray"
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-gray-50 hover:bg-gray-100"
            >
              <XMarkIcon className="h-5 w-5 stroke-[2.5]" />
            </IconButton>
          </div>

          <CardBody className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <Typography className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <BeakerIcon className="h-4 w-4 text-indigo-500" /> Choose Model
              </Typography>
              <Menu placement="bottom-end">
                <MenuHandler>
                  <div className="px-4 py-2 cursor-pointer bg-white border border-gray-200 text-gray-700 rounded-xl flex items-center justify-between shadow-sm outline-none min-w-[160px] hover:border-indigo-300 transition-all">
                    <span className="text-[10px] uppercase font-black tracking-widest">
                      {modelLabels[selectedModel]}
                    </span>
                    <ChevronDownIcon strokeWidth={2.5} className="h-3 w-3 ml-2 text-indigo-400" />
                  </div>
                </MenuHandler>
                <MenuList className="p-1 min-w-[180px] border-gray-100 bg-white shadow-2xl z-[9999] rounded-2xl">
                  {Object.entries(modelLabels).map(([val, label]) => (
                    <MenuItem
                      key={val}
                      onClick={() => setSelectedModel(val)}
                      className={`flex items-center gap-2 rounded-xl py-3 text-[11px] font-bold ${
                        selectedModel === val ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>

            <div className="space-y-3">
              <Typography className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <SwatchIcon className="h-4 w-4 text-violet-500" /> Design Intent
              </Typography>
              <Textarea
                placeholder="e.g. Create a minimalist landing page for a creative agency with a hero section, 3-column services grid, and a dark themed contact section..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="!border-gray-200 focus:!border-indigo-500 rounded-2xl bg-gray-50/50 p-6 text-sm font-medium text-gray-900 min-h-[160px] leading-relaxed"
                labelProps={{ className: "hidden" }}
              />
            </div>

            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 text-[11px] font-medium text-indigo-700 leading-relaxed italic">
              "Every generation event is unique. The engine will synthesize a 
              custom layout structure and apply modern design rules."
            </div>

            <div className="pt-2">
              <Button
                fullWidth
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="bg-indigo-600 rounded-2xl py-4 flex items-center justify-center gap-3 normal-case shadow-xl shadow-indigo-100 hover:shadow-indigo-200 transition-all transform active:scale-95 disabled:bg-gray-200"
              >
                {isGenerating ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm font-black uppercase tracking-widest">Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="h-5 w-5 text-white -rotate-45" />
                    <span className="text-sm font-black uppercase tracking-widest">Generate Blueprint</span>
                  </>
                )}
              </Button>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </div>
  );
};

export default AIAssistant;
