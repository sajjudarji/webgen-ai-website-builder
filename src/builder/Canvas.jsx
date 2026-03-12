import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { WidgetRenderer } from "./ComponentLibrary";
import { addComponent, selectComponent } from "../store/builderSlice";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@material-tailwind/react";
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
    const rawProps = e.dataTransfer.getData("defaultProps");
    const rawStyles = e.dataTransfer.getData("defaultStyles");

    let props = {};
    let styles = {};
    if (rawProps) props = JSON.parse(rawProps);
    if (rawStyles) styles = JSON.parse(rawStyles);

    if (type) {
      dispatch(
        addComponent({
          parentId: null,
          component: {
            id: uuidv4(),
            type: type,
            props: props,
            styles: styles,
            children: [],
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
        className={`${getCanvasWidth()} mx-auto min-h-[600px] bg-white shadow-2xl rounded-2xl overflow-hidden ring-1 ring-gray-200 transition-all duration-500 ease-in-out pb-40`}
      >
        {currentPage?.layout.length > 0 ? (
          <div className="flex flex-col min-h-full">
            {currentPage.layout.map((component) => (
              <WidgetRenderer key={component.id} component={component} />
            ))}
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
              Canvas is Ready
            </Typography>
            <Typography className="text-gray-500 font-medium max-w-sm mb-10 leading-relaxed">
              Drag a Section or Widget to begin. Build your interface like a
              pro.
            </Typography>
            <div className="flex items-center gap-1.5 text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              <PlusIcon className="h-4 w-4" /> Start Building
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
