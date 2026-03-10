import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Input,
  Select,
  Option,
  IconButton,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Slider,
} from "@material-tailwind/react";
import { updateComponent, selectComponent } from "../store/builderSlice";
import {
  ChevronDownIcon,
  SwatchIcon,
  ArrowsPointingOutIcon,
  QueueListIcon,
  CommandLineIcon,
  AdjustmentsVerticalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const RightPanel = () => {
  const { currentPage, selectedComponentId } = useSelector(
    (state) => state.builder,
  );
  const dispatch = useDispatch();
  const [openAccordion, setOpenAccordion] = useState(1);

  const selectedComponent = currentPage?.layout.find(
    (c) => c.id === selectedComponentId,
  );

  const handleAlwaysOpen = (value) =>
    setOpenAccordion(openAccordion === value ? 0 : value);

  if (!selectedComponent) {
    return (
      <div className="w-80 border-l border-gray-100 bg-white h-[calc(100vh-80px)] flex flex-col items-center justify-center p-12 text-center">
        <div className="w-20 h-20 bg-indigo-50/50 rounded-full flex items-center justify-center mb-6">
          <AdjustmentsVerticalIcon className="h-10 w-10 text-indigo-200" />
        </div>
        <Typography variant="h6" className="text-gray-900 font-bold mb-2">
          Design Settings
        </Typography>
        <Typography className="text-gray-400 text-sm font-medium">
          Select a component to customize its visual style and properties.
        </Typography>
      </div>
    );
  }

  const handleStyleChange = (name, value) => {
    dispatch(
      updateComponent({
        id: selectedComponentId,
        updates: {
          styles: { ...selectedComponent.styles, [name]: value },
        },
      }),
    );
  };

  return (
    <div className="w-80 border-l border-gray-100 bg-white h-[calc(100vh-80px)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-10 shrink-0">
        <Typography
          variant="small"
          className="font-black text-gray-900 uppercase tracking-[0.2em] text-[11px]"
        >
          Design Settings
        </Typography>
        <IconButton
          variant="text"
          size="sm"
          onClick={() => dispatch(selectComponent(null))}
          className="rounded-full"
        >
          <ChevronDownIcon className="h-4 w-4" />
        </IconButton>
      </div>

      {/* Accordions */}
      <div className="flex-1 overflow-y-auto p-6 space-y-2 scrollbar-hide pb-20">
        <Accordion
          open={openAccordion === 1}
          icon={
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${openAccordion === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <AccordionHeader
            onClick={() => handleAlwaysOpen(1)}
            className="border-none py-4 px-0"
          >
            <div className="flex items-center gap-3 text-gray-900">
              <CommandLineIcon className="h-5 w-5 text-gray-400" />
              <Typography className="font-bold text-sm">Typography</Typography>
            </div>
          </AccordionHeader>
          <AccordionBody className="pt-0 pb-6 px-0 space-y-6">
            <div className="space-y-2">
              <Typography
                variant="small"
                className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1"
              >
                Font Family
              </Typography>
              <Select
                variant="outlined"
                label="Select Font"
                value="Inter"
                className="rounded-xl border-gray-100 focus:border-indigo-500"
              >
                <Option>Inter</Option>
                <Option>Roboto</Option>
                <Option>Outfit</Option>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Typography
                  variant="small"
                  className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1"
                >
                  Size
                </Typography>
                <Input
                  className="rounded-xl border-gray-100 focus:border-indigo-500"
                  placeholder="16px"
                  value={selectedComponent.styles?.fontSize || ""}
                  onChange={(e) =>
                    handleStyleChange("fontSize", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Typography
                  variant="small"
                  className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1"
                >
                  Weight
                </Typography>
                <Select
                  variant="outlined"
                  label="Normal"
                  className="rounded-xl border-gray-100 focus:border-indigo-500"
                >
                  <Option>Normal</Option>
                  <Option>Medium</Option>
                  <Option>Bold</Option>
                </Select>
              </div>
            </div>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={openAccordion === 2}
          icon={
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${openAccordion === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <AccordionHeader
            onClick={() => handleAlwaysOpen(2)}
            className="border-none py-4 px-0"
          >
            <div className="flex items-center gap-3 text-gray-900">
              <SwatchIcon className="h-5 w-5 text-gray-400" />
              <Typography className="font-bold text-sm">
                Colors & Brand
              </Typography>
            </div>
          </AccordionHeader>
          <AccordionBody className="pt-0 pb-6 px-0">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl border border-gray-100 bg-indigo-500 cursor-pointer shadow-sm"></div>
              <div className="w-10 h-10 rounded-xl border border-gray-100 bg-white cursor-pointer shadow-sm"></div>
              <div className="w-10 h-10 rounded-xl border border-gray-100 bg-black cursor-pointer shadow-sm"></div>
              <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-100 flex items-center justify-center text-gray-300 hover:border-indigo-300 hover:text-indigo-400 cursor-pointer transition-colors">
                +
              </div>
            </div>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={openAccordion === 3}
          icon={
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${openAccordion === 3 ? "rotate-180" : ""}`}
            />
          }
        >
          <AccordionHeader
            onClick={() => handleAlwaysOpen(3)}
            className="border-none py-4 px-0"
          >
            <div className="flex items-center gap-3 text-gray-900">
              <ArrowsPointingOutIcon className="h-5 w-5 text-gray-400" />
              <Typography className="font-bold text-sm">Spacing</Typography>
            </div>
          </AccordionHeader>
          <AccordionBody className="pt-0 pb-6 px-0 space-y-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center">
              <div className="w-full flex justify-between px-2 mb-2">
                <Typography
                  variant="small"
                  className="text-[10px] font-black text-gray-400 uppercase tracking-widest"
                >
                  Padding
                </Typography>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <Input
                  className="rounded-xl border-gray-100 focus:border-indigo-500 bg-white"
                  placeholder="Top"
                  value={selectedComponent.styles?.paddingTop || ""}
                />
                <Input
                  className="rounded-xl border-gray-100 focus:border-indigo-500 bg-white"
                  placeholder="Bottom"
                  value={selectedComponent.styles?.paddingBottom || ""}
                />
              </div>
            </div>
          </AccordionBody>
        </Accordion>
      </div>

      {/* Layers Section */}
      <div className="mt-auto border-t border-gray-50 bg-white p-6 pb-8">
        <Typography
          variant="small"
          className="font-black text-gray-400 uppercase tracking-[0.2em] text-[10px] mb-4"
        >
          Layers
        </Typography>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
          {currentPage?.layout.map((comp) => (
            <div
              key={comp.id}
              onClick={() => dispatch(selectComponent(comp.id))}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                comp.id === selectedComponentId
                  ? "bg-indigo-50 border-indigo-100 text-indigo-700 shadow-sm shadow-indigo-50"
                  : "border-transparent text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-1.5 rounded-lg ${comp.id === selectedComponentId ? "bg-white" : "bg-gray-50"}`}
                >
                  <QueueListIcon className="h-3.5 w-3.5" />
                </div>
                <Typography className="font-bold text-xs capitalize">
                  {comp.type} Element
                </Typography>
              </div>
              <button className="text-gray-300 hover:text-red-500 transition-colors">
                <TrashIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
