import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { COMPONENT_MAP } from "./ComponentLibrary";
import { addComponent, selectComponent } from "../store/builderSlice";
import { v4 as uuidv4 } from "uuid";
import { Typography, Button } from "@material-tailwind/react";
import { SparklesIcon, PlusIcon } from "@heroicons/react/24/outline";

const Canvas = () => {
  const { currentPage, deviceView } = useSelector((state) => state.builder);
  const dispatch = useDispatch();

  const getCanvasWidth = () => {
    switch (deviceView) {
      case "mobile":
        return "max-w-[390px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "max-w-[1200px]";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("componentType");

    const defaultProps = {
      hero: {
        title: "Designing digital masterpieces.",
        subtitle:
          "We combine aesthetic beauty with functional precision to build websites that convert visitors into loyal customers.",
        buttonText: "View Our Work",
        secondaryButtonText: "The Process",
        backgroundImage: "",
      },
      text: { content: "Add your text here" },
      image: { src: "" },
      button: { label: "Click Me" },
    };

    if (type && defaultProps[type]) {
      dispatch(
        addComponent({
          component: {
            id: uuidv4(),
            type: type,
            props: defaultProps[type],
            styles: {},
          },
        }),
      );
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className="flex-1 bg-gray-50 overflow-y-auto min-h-[calc(100vh-80px)] relative p-12 scroll-smooth"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => dispatch(selectComponent(null))}
      style={{
        backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div
        className={`${getCanvasWidth()} mx-auto min-h-full bg-white shadow-2xl rounded-2xl overflow-hidden ring-1 ring-gray-200 transition-all duration-500 ease-in-out`}
      >
        {currentPage?.layout.length > 0 ? (
          <div className="flex flex-col">
            {currentPage.layout.map((component) => {
              const Component = COMPONENT_MAP[component.type];
              if (!Component) return null;
              return (
                <div key={component.id} className="relative group/canvas">
                  <Component
                    id={component.id}
                    props={component.props}
                    styles={component.styles}
                  />
                  {/* Selection Frame */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover/canvas:border-indigo-500/30 pointer-events-none transition-colors"></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-24 text-center min-h-[600px]">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-8 border border-white shadow-lg shadow-indigo-100">
              <SparklesIcon className="h-10 w-10 text-indigo-500" />
            </div>
            <Typography
              variant="h4"
              className="text-gray-900 font-extrabold tracking-tight mb-4"
            >
              Let's build your vision
            </Typography>
            <Typography className="text-gray-500 font-medium max-w-sm mb-10 leading-relaxed">
              Drag a component from the left panel to begin. Your
              high-performance website starts here.
            </Typography>
            <div className="flex items-center gap-1.5 text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              <PlusIcon className="h-4 w-4" /> Drop Components Here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
