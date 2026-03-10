import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Typography,
  Progress,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  SparklesIcon,
  UserCircleIcon,
  SwatchIcon,
  RocketLaunchIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { setWebsite } from "../store/builderSlice";
import DashboardLayout from "../layouts/DashboardLayout";

const AIOnboarding = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "Technology Agency", // Default
    description: "",
    colorPreference: "indigo",
    layoutStyle: "modern",
  });

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const colorMap = {
        indigo: "#4f46e5",
        emerald: "#10b981",
        rose: "#f43f5e",
        amber: "#f59e0b",
        slate: "#475569",
        violet: "#8b5cf6",
      };

      const payload = {
        ...formData,
        colorPreference:
          colorMap[formData.colorPreference] || formData.colorPreference,
      };

      const res = await axios.post(
        "http://localhost:5000/api/ai/generate",
        payload,
        config,
      );

      if (res.data.success) {
        dispatch(setWebsite(res.data.data));
        navigate(`/builder/${res.data.data._id}`);
      }
    } catch (error) {
      console.error("Error generating website:", error);
      alert("Failed to generate website. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const paletteOptions = [
    {
      id: "indigo",
      name: "Indigo",
      desc: "Modern & Professional",
      colors: ["bg-indigo-500", "bg-indigo-300", "bg-indigo-100"],
    },
    {
      id: "emerald",
      name: "Emerald",
      desc: "Natural & Calm",
      colors: ["bg-emerald-500", "bg-emerald-300", "bg-emerald-100"],
    },
    {
      id: "rose",
      name: "Rose",
      desc: "Warm & Energetic",
      colors: ["bg-rose-500", "bg-rose-300", "bg-rose-100"],
    },
    {
      id: "amber",
      name: "Amber",
      desc: "Bright & Friendly",
      colors: ["bg-amber-500", "bg-amber-300", "bg-amber-100"],
    },
    {
      id: "slate",
      name: "Slate",
      desc: "Neutral & Clean",
      colors: ["bg-slate-500", "bg-slate-300", "bg-slate-100"],
    },
    {
      id: "violet",
      name: "Violet",
      desc: "Creative & Bold",
      colors: ["bg-violet-500", "bg-violet-300", "bg-violet-100"],
    },
  ];

  const steps = [
    {
      id: 1,
      title: "Business Info",
      desc: "Essential details",
      icon: BriefcaseIcon,
    },
    { id: 2, title: "Design Theme", desc: "Look and feel", icon: SwatchIcon },
    {
      id: 3,
      title: "Final Launch",
      desc: "Deploy website",
      icon: RocketLaunchIcon,
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex bg-[#F8F9FD] font-sans selection:bg-indigo-100 selection:text-indigo-900 border-l border-gray-100">
        {/* Step Tracker Sidebar (Internal) */}
        <aside className="w-[300px] bg-white border-r border-gray-100 flex flex-col p-10 shrink-0 h-[calc(100vh-80px)] sticky top-0">
          <div className="flex items-center gap-2 mb-16">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <SparklesIcon className="h-4 w-4" />
            </div>
            <Typography
              variant="h6"
              className="text-gray-900 font-black tracking-tight text-sm uppercase"
            >
              SiteFlow AI
            </Typography>
          </div>

          <div className="space-y-12">
            <Typography className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
              Setup Progress
            </Typography>
            <div className="space-y-10 relative">
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gray-100 -z-10"></div>
              {steps.map((s) => (
                <div key={s.id} className="flex items-center gap-6 group">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 relative ${step > s.id ? "bg-green-50 text-green-500 shadow-none" : step === s.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-110" : "bg-white border-2 border-gray-50 text-gray-300"}`}
                  >
                    {step > s.id ? (
                      <CheckIcon className="h-6 w-6" strokeWidth={3} />
                    ) : (
                      <s.icon className="h-5 w-5" />
                    )}
                    {step === s.id && (
                      <span className="absolute -inset-2 bg-indigo-600/10 rounded-[1.5rem] animate-pulse -z-10"></span>
                    )}
                  </div>
                  <div>
                    <Typography
                      className={`text-[12px] font-black transition-colors ${step >= s.id ? "text-gray-900" : "text-gray-400"}`}
                    >
                      {s.title}
                    </Typography>
                    <Typography className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {s.desc}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-10 border-t border-gray-50">
            <div className="flex justify-between items-end mb-4">
              <Typography className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">
                Step {step} of 3
              </Typography>
              <Typography className="text-[11px] font-black text-gray-400">
                {Math.round((step / 3) * 100)}% Complete
              </Typography>
            </div>
            <Progress
              value={(step / 3) * 100}
              size="sm"
              color="indigo"
              className="rounded-full bg-gray-50"
            />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
          <div className="max-w-[1000px] w-full mx-auto px-12 py-16">
            {/* Step Header */}
            <div className="mb-12">
              <Typography
                variant="h2"
                className="text-gray-900 font-black tracking-tight mb-3"
              >
                Create Website - Step {step}
              </Typography>
              <Typography className="text-gray-500 font-medium text-lg max-w-2xl leading-relaxed">
                {step === 1 &&
                  "Tell us about your project. We'll use this information to pre-generate layouts and content specifically for your niche."}
                {step === 2 &&
                  "Select a color palette that defines your brand identity. These colors will be applied throughout your generated website."}
                {step === 3 &&
                  "Review your configuration before we generate your production-ready site. Our AI is ready to transform your ideas into reality."}
              </Typography>
            </div>

            {/* Content Steps */}
            <div className="min-h-[500px]">
              {step === 1 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="space-y-3">
                    <Typography className="text-sm font-black text-gray-900 ml-1">
                      What is your business called?
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="e.g. Stellar Creative Agency"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="!border-white !bg-white shadow-xl shadow-gray-200/50 rounded-3xl py-8 px-8 text-lg font-bold placeholder:text-gray-300 focus:!border-indigo-600 !transition-all"
                      labelProps={{ className: "hidden" }}
                    />
                  </div>
                  <div className="space-y-3">
                    <Typography className="text-sm font-black text-gray-900 ml-1">
                      Tell us about your business
                    </Typography>
                    <Typography className="text-xs font-bold text-gray-400 ml-1 mb-2">
                      Include your core services, target audience, and unique
                      value proposition.
                    </Typography>
                    <Textarea
                      size="lg"
                      placeholder="Describe what you do..."
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={8}
                      className="!border-white !bg-white shadow-xl shadow-gray-200/50 rounded-3xl p-8 text-lg font-medium placeholder:text-gray-300 focus:!border-indigo-600 !transition-all"
                      labelProps={{ className: "hidden" }}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {paletteOptions.map((palette) => (
                    <Card
                      key={palette.id}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          colorPreference: palette.id,
                        })
                      }
                      className={`cursor-pointer rounded-[2.5rem] border-4 transition-all duration-300 group overflow-hidden ${formData.colorPreference === palette.id ? "border-indigo-600 bg-white shadow-2xl shadow-indigo-100" : "border-transparent bg-white shadow-sm hover:shadow-xl hover:shadow-gray-200/50"}`}
                    >
                      <CardBody className="p-8">
                        <div className="relative mb-8 flex justify-center py-4">
                          <div className="flex -space-x-4">
                            {palette.colors.map((color, i) => (
                              <div
                                key={i}
                                className={`w-16 h-16 rounded-full border-4 border-white shadow-lg ${color} transform transition-transform group-hover:scale-110`}
                                style={{ zIndex: 10 - i }}
                              ></div>
                            ))}
                          </div>
                          {formData.colorPreference === palette.id && (
                            <div className="absolute -top-3 -right-5 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce z-10">
                              <CheckIcon className="h-5 w-5" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <Typography
                          variant="h5"
                          className="text-gray-900 font-black mb-1 leading-tight"
                        >
                          {palette.name}
                        </Typography>
                        <Typography className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          {palette.desc}
                        </Typography>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Card className="rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-white p-10">
                    <div className="flex flex-col gap-10">
                      <div className="flex gap-10 items-start">
                        <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center shrink-0">
                          <BriefcaseIcon className="h-8 w-8 text-indigo-600" />
                        </div>
                        <div>
                          <Typography className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">
                            Business Information
                          </Typography>
                          <Typography
                            variant="h4"
                            className="text-gray-900 font-black tracking-tight mb-2"
                          >
                            {formData.businessName || "Your Business Name"}
                          </Typography>
                          <Typography className="text-gray-500 font-medium leading-relaxed italic">
                            "
                            {formData.description ||
                              "No description provided yet."}
                            "
                          </Typography>
                        </div>
                      </div>
                      <div className="h-px bg-gray-50"></div>
                      <div className="flex gap-10 items-start">
                        <div className="w-20 h-20 bg-purple-50 rounded-[2rem] flex items-center justify-center shrink-0">
                          <SwatchIcon className="h-8 w-8 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <Typography className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-4">
                            Design Selection
                          </Typography>
                          <div className="flex items-center gap-6 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                            <div className="flex -space-x-3">
                              {paletteOptions
                                .find((p) => p.id === formData.colorPreference)
                                ?.colors.map((c, i) => (
                                  <div
                                    key={i}
                                    className={`w-10 h-10 rounded-full border-2 border-white shadow-sm ${c}`}
                                  ></div>
                                ))}
                            </div>
                            <div>
                              <Typography className="text-sm font-black text-gray-900">
                                Palette:{" "}
                                {formData.colorPreference
                                  .charAt(0)
                                  .toUpperCase() +
                                  formData.colorPreference.slice(1)}
                              </Typography>
                              <Typography className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                v2.4.0 • AI Optimized Scale
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-px bg-gray-50"></div>
                      <div className="bg-indigo-50/30 rounded-[2.5rem] p-8 border border-indigo-50 flex items-center gap-6">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 shrink-0">
                          <RocketLaunchIcon className="h-7 w-7 text-indigo-600" />
                        </div>
                        <div>
                          <Typography className="text-sm font-black text-indigo-900 mb-1">
                            Interactive AI Generation
                          </Typography>
                          <Typography className="text-xs font-medium text-indigo-600/70">
                            Estimated build time: &lt; 2 minutes. No credit card
                            required.
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="mt-16 flex items-center justify-between">
              <div className="flex items-center gap-6">
                {step > 1 && (
                  <Button
                    variant="text"
                    onClick={handleBack}
                    className="flex items-center gap-3 text-gray-400 font-black normal-case hover:bg-transparent hover:text-gray-900"
                  >
                    <ArrowLeftIcon className="h-5 w-5" /> Back
                  </Button>
                )}
                <button className="text-[12px] font-black text-gray-300 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                  Save for later
                </button>
              </div>
              <div className="flex items-center gap-8">
                <div className="hidden sm:flex flex-col items-end">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#CED5E3]">
                    <ShieldCheckIcon className="h-4 w-4" /> Secure Data Storage
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#CED5E3] mt-1">
                    <BoltIcon className="h-4 w-4" /> AI Powered Analysis
                  </div>
                </div>
                {step < 3 ? (
                  <Button
                    size="lg"
                    onClick={handleNext}
                    disabled={!formData.businessName}
                    className="bg-indigo-600 rounded-[1.5rem] px-12 py-5 shadow-2xl shadow-indigo-200 normal-case font-black text-base flex items-center gap-4 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                  >
                    Continue{" "}
                    <ArrowRightIcon className="h-5 w-5" strokeWidth={3} />
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-indigo-600 rounded-[1.5rem] px-12 py-5 shadow-2xl shadow-indigo-200 normal-case font-black text-base flex items-center gap-4 transition-all hover:scale-105 active:scale-95"
                  >
                    {loading ? "Generating..." : "Build My Website 🚀"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
};

export default AIOnboarding;
