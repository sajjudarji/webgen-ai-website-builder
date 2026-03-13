import React from "react";
import { Typography, Button, Card, CardBody } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { SparklesIcon, CheckIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import PublicNavbar from "../components/PublicNavbar";
import AppFooter from "../components/AppFooter";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for testing our AI builder capabilities.",
      features: ["1 AI Generated Website", "Basic Templates", "SiteFlow Subdomain", "Community Support"],
      button: "Start for Free",
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      description: "Everything you need to grow your digital presence.",
      features: ["Unlimited AI Websites", "Premium Component Library", "Custom Domains", "Advanced Analytics", "Priority AI Queue"],
      button: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "Custom solutions for large-scale operations.",
      features: ["White Label Dashboard", "Dedicated Account Manager", "Custom AI Fine-tuning", "SLA Guarantee", "24/7 VIP Support"],
      button: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <PublicNavbar />

      {/* Pricing Header */}
      <div className="max-w-7xl mx-auto px-10 pt-32 pb-20 text-center space-y-6">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100 font-black text-[9px] uppercase tracking-[0.2em]">Simple Pricing</div>
         <Typography variant="h1" className="text-5xl lg:text-7xl font-black text-gray-900 leading-none tracking-tighter">Choose your <span className="text-indigo-600">creative freedom</span></Typography>
         <Typography className="text-gray-500 font-medium text-lg max-w-xl mx-auto">Get access to professional tools and next-generation AI generation with our simple tiered pricing models.</Typography>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-10 pb-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {plans.map((plan) => (
           <Card key={plan.name} className={`rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-100/50 relative p-4 transition-all duration-500 hover:-translate-y-2 ${plan.popular ? 'bg-indigo-600 text-white scale-105 shadow-indigo-200 border-none' : 'bg-white text-gray-900'}`}>
              {plan.popular && (
                <div className="absolute top-8 right-8 px-4 py-1 bg-white text-indigo-600 rounded-full font-black text-[8px] uppercase tracking-widest">Most Popular</div>
              )}
              <CardBody className="p-10 space-y-10">
                 <div className="space-y-2">
                    <Typography className={`text-[10px] font-black uppercase tracking-[0.3em] ${plan.popular ? 'text-indigo-200' : 'text-indigo-600'}`}>{plan.name}</Typography>
                    <div className="flex items-end gap-1">
                       <Typography variant="h2" className="text-6xl font-black tracking-tighter leading-none">{plan.price}</Typography>
                       <Typography className={`text-sm font-bold opacity-60 mb-2 uppercase tracking-widest`}>/month</Typography>
                    </div>
                    <Typography className={`text-sm font-medium leading-relaxed pt-2 ${plan.popular ? 'text-indigo-100' : 'text-gray-400'}`}>{plan.description}</Typography>
                 </div>

                 <div className={`h-px w-full ${plan.popular ? 'bg-white/10' : 'bg-gray-50'}`} />

                 <div className="space-y-6">
                    {plan.features.map((feature, i) => (
                       <div key={i} className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-white text-indigo-600' : 'bg-indigo-50 text-indigo-600'}`}><CheckIcon className="h-3 w-3 stroke-[3]" /></div>
                          <Typography className="text-sm font-bold opacity-90">{feature}</Typography>
                       </div>
                    ))}
                 </div>

                 <Button 
                   size="lg" 
                   className={`w-full rounded-2xl py-4 font-black uppercase tracking-widest text-[10px] shadow-xl transition-all ${plan.popular ? 'bg-white text-indigo-600 hover:bg-gray-50' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                   onClick={() => navigate("/register")}
                 >
                   {plan.button}
                 </Button>
              </CardBody>
           </Card>
         ))}
      </div>

      <AppFooter />
    </div>
  );
};

export default Pricing;
