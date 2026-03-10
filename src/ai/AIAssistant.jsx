import React, { useState } from "react";
import {
  IconButton,
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Avatar,
} from "@material-tailwind/react";
import {
  SparklesIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addComponent } from "../store/builderSlice";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const dispatch = useDispatch();

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);

    // Mock AI Section Generation
    setTimeout(() => {
      let newSection = {
        id: uuidv4(),
        type: "hero",
        props: {
          title: `Generated: ${prompt.substring(0, 20)}...`,
          subtitle:
            "This section was automatically created based on your AI prompt.",
          buttonText: "Get Started",
          primaryColor: "#3b82f6",
          backgroundImage:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
        },
        styles: {},
      };

      if (prompt.toLowerCase().includes("testimonial")) {
        newSection.type = "card-section";
        newSection.props = {
          title: "What Our Clients Say",
          items: [
            {
              title: "Amazing Result",
              text: "The AI builder made my job 10x faster!",
            },
            {
              title: "Highly Recommend",
              text: "Stunning designs available at click of button.",
            },
          ],
        };
      } else if (prompt.toLowerCase().includes("service")) {
        newSection.type = "card-section";
        newSection.props = {
          title: "Our Core Services",
          items: [
            { title: "Design", text: "Professional UI/UX" },
            { title: "Development", text: "Scalable solutions" },
            { title: "Marketing", text: "Grow your business" },
          ],
        };
      }

      dispatch(addComponent({ component: newSection }));
      setPrompt("");
      setIsGenerating(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <></>
    // <div className="fixed bottom-8 right-8 z-[100]">
    //   {!isOpen ? (
    //     <Button
    //       onClick={() => setIsOpen(true)}
    //       className="flex items-center gap-2 rounded-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl hover:scale-105 transition-transform"
    //     >
    //       <SparklesIcon className="h-5 w-5" /> AI Assistant
    //     </Button>
    //   ) : (
    //     <Card className="w-80 shadow-2xl border">
    //       <div className="p-4 border-b flex items-center justify-between bg-blue-50/50 rounded-t-xl">
    //         <div className="flex items-center gap-2">
    //           <div className="p-1.5 bg-blue-500 rounded-lg text-white">
    //             <SparklesIcon className="h-4 w-4" />
    //           </div>
    //           <Typography variant="h6" color="blue-gray" className="text-sm">
    //             AI Site Designer
    //           </Typography>
    //         </div>
    //         <IconButton
    //           variant="text"
    //           size="sm"
    //           onClick={() => setIsOpen(false)}
    //         >
    //           <XMarkIcon className="h-5 w-5" />
    //         </IconButton>
    //       </div>
    //       <CardBody className="p-4">
    //         <Typography
    //           variant="small"
    //           color="gray"
    //           className="mb-4 text-xs italic"
    //         >
    //           "Create a services section with 3 columns" or "Generate a hero
    //           section for a bakery"
    //         </Typography>
    //         <div className="flex flex-col gap-4">
    //           <Input
    //             label="What should I build?"
    //             value={prompt}
    //             onChange={(e) => setPrompt(e.target.value)}
    //             autoFocus
    //           />
    //           <Button
    //             color="blue"
    //             fullWidth
    //             className="flex items-center justify-center gap-2"
    //             onClick={handleGenerate}
    //             disabled={isGenerating || !prompt}
    //           >
    //             {isGenerating ? (
    //               "Generating..."
    //             ) : (
    //               <>
    //                 <PaperAirplaneIcon className="h-4 w-4 -rotate-45" /> Create
    //                 Section
    //               </>
    //             )}
    //           </Button>
    //         </div>
    //       </CardBody>
    //     </Card>
    //   )}
    // </div>
  );
};

export default AIAssistant;
