import React from "react";
import { Typography, Input, Button, Card } from "@material-tailwind/react";
import {
  Squares2X2Icon,
  ChatBubbleBottomCenterTextIcon,
  PhotoIcon,
  RectangleStackIcon,
  CursorArrowRaysIcon,
  ViewColumnsIcon,
  ListBulletIcon,
  VideoCameraIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const DraggableItem = ({ type, label, icon: Icon }) => {
  return (
    <div
      className="p-4 bg-white border border-gray-100 rounded-2xl hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-50/50 cursor-grab active:cursor-grabbing flex flex-col items-center justify-center gap-3 transition-all group scale-100 active:scale-95"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", type);
      }}
    >
      <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
        <Icon className="h-6 w-6 stroke-[1.5]" />
      </div>
      <Typography
        variant="small"
        className="text-[11px] font-bold text-gray-500 group-hover:text-gray-900 uppercase tracking-widest"
      >
        {label}
      </Typography>
    </div>
  );
};

const LeftPanel = () => {
  const categories = [
    {
      title: "Components",
      items: [
        { type: "hero", label: "Section", icon: RectangleStackIcon },
        {
          type: "text",
          label: "Text Block",
          icon: ChatBubbleBottomCenterTextIcon,
        },
        { type: "image", label: "Image", icon: PhotoIcon },
        { type: "button", label: "Button", icon: CursorArrowRaysIcon },
        { type: "form", label: "Form", icon: ListBulletIcon },
        { type: "grid", label: "Grid", icon: ViewColumnsIcon },
        { type: "list", label: "List", icon: Squares2X2Icon },
        { type: "video", label: "Video", icon: VideoCameraIcon },
      ],
    },
  ];

  return (
    <div className="w-80 border-r border-gray-100 bg-white h-[calc(100vh-80px)] overflow-y-auto flex flex-col">
      {/* Search Header */}
      <div className="p-6 border-b border-gray-50 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center justify-between mb-6">
          <Typography
            variant="small"
            className="font-black text-gray-900 uppercase tracking-[0.2em] text-[11px]"
          >
            Components
          </Typography>
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 cursor-pointer hover:text-indigo-600 transition-colors" />
        </div>
        <div className="relative">
          <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search components..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-500 outline-none text-xs font-medium transition-all"
          />
        </div>
      </div>

      <div className="p-6 scrollbar-hide flex-1">
        {categories.map((cat) => (
          <div key={cat.title}>
            <div className="grid grid-cols-2 gap-4">
              {cat.items.map((item) => (
                <DraggableItem key={item.label} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade CTA */}
      <div className="p-6 border-t border-gray-50 mt-auto">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-none border border-indigo-100 rounded-[2rem] overflow-hidden relative group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <Typography
            variant="small"
            className="text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2"
          >
            <SparklesIcon className="h-4 w-4" /> Pro Feature
          </Typography>
          <Typography
            variant="h6"
            className="text-gray-900 font-extrabold leading-tight mb-4"
          >
            Unlock custom animations and advanced CMS features.
          </Typography>
          <Button
            fullWidth
            className="bg-indigo-600 rounded-xl py-3 shadow-none hover:shadow-lg hover:shadow-indigo-200 normal-case font-bold text-xs transition-all"
          >
            Upgrade Now
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default LeftPanel;
