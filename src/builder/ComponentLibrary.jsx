import React, { useRef } from "react";
import {
  Typography,
  Button,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { selectComponent, removeComponent, addComponent, updateComponent, deleteComponentProp } from "../store/builderSlice";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

// Helper to render styles object properly
const getInlineStyles = (styles = {}) => {
  return { ...styles };
};

// The main Drop Zone UI
const DropZone = ({ parentId }) => {
  const dispatch = useDispatch();

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const dropType = e.dataTransfer.getData("componentType");
    const dropProps = JSON.parse(e.dataTransfer.getData("defaultProps") || "{}");
    const dropStyles = JSON.parse(e.dataTransfer.getData("defaultStyles") || "{}");

    if (dropType) {
      dispatch(addComponent({
        parentId,
        component: {
          id: uuidv4(),
          type: dropType,
          props: dropProps,
          styles: dropStyles,
          children: []
        }
      }));
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="p-3 border-2 border-dashed border-indigo-100/30 rounded-xl flex flex-col items-center justify-center gap-1 text-indigo-200/50 hover:border-indigo-400 hover:text-indigo-400 hover:bg-indigo-50/50 transition-all group/dz m-1 min-h-[40px]"
    >
      <PlusIcon className="h-3 w-3 stroke-[3]" />
      <span className="text-[8px] font-black uppercase tracking-[0.2em]">Add Element</span>
    </div>
  );
};

const ComponentWrapper = ({ id, children, type, styles = {} }) => {
  const { selectedComponentId } = useSelector((state) => state.builder);
  const dispatch = useDispatch();
  const isSelected = selectedComponentId === id;

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(selectComponent(id));
  };

  // The wrapper handles the selection UI, while the inner element handles the background/visuals
  return (
    <div
      className={`relative group/wrapper transition-all duration-300 min-h-[5px] flex flex-col ${
        isSelected 
          ? "ring-4 ring-indigo-500 ring-offset-4 z-40" 
          : "hover:ring-2 hover:ring-indigo-100 hover:ring-offset-2"
      } rounded-lg`}
      onClick={handleClick}
    >
      {isSelected && (
        <div className="absolute top-0 left-0 -translate-y-full mb-1 flex items-center bg-indigo-500 text-white rounded-t-xl shadow-2xl z-[100] overflow-hidden">
          <div className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border-r border-white/10 bg-indigo-600/50">
            {type}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(removeComponent(id));
            }}
            className="p-1.5 hover:bg-red-500 transition-all"
          >
            <TrashIcon className="h-4 w-4 stroke-[3]" />
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

const RenderChildren = ({ children, parentId }) => {
  return (
    <>
      {children && children.map((child) => (
        <WidgetRenderer key={child.id} component={child} />
      ))}
      <DropZone parentId={parentId} />
    </>
  );
};

export const WidgetRenderer = ({ component }) => {
  const { type, id, props = {}, styles = {}, children = [] } = component;
  const dispatch = useDispatch();
  
  const handleInlineEdit = (propKey, e) => {
    const newContent = e.target.innerText;
    dispatch(updateComponent({
      id,
      updates: {
        props: { ...props, [propKey]: newContent }
      }
    }));
  };

  const commonStyles = getInlineStyles(styles);

  switch (type) {
    case "section":
      return (
        <ComponentWrapper id={id} type="section" styles={styles}>
          <section className="w-full relative overflow-hidden min-h-[100px]" style={commonStyles}>
            <RenderChildren children={children} parentId={id} />
          </section>
        </ComponentWrapper>
      );
    case "div":
    case "flex":
    case "grid":
    case "container":
      const isContainer = type === "container";
      return (
        <ComponentWrapper id={id} type={type} styles={styles}>
          <div 
            className={`${isContainer ? 'max-w-6xl mx-auto' : ''} w-full h-full min-h-[30px] ${type === 'grid' ? 'grid' : (type === 'flex' ? 'flex' : '')}`} 
            style={commonStyles}
          >
             <RenderChildren children={children} parentId={id} />
          </div>
        </ComponentWrapper>
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
      return (
        <ComponentWrapper id={id} type={type} styles={styles}>
          <Tag 
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleInlineEdit("content", e)}
            style={commonStyles}
            className="m-0 focus:outline-none outline-none cursor-text px-2 w-full transition-colors"
          >
            {props.content || (type.startsWith('h') ? "Heading" : "Text")}
          </Tag>
        </ComponentWrapper>
      );

    case "button":
    case "submit":
      return (
        <ComponentWrapper id={id} type="button" styles={styles}>
          <button 
            type={type === "submit" ? "submit" : "button"}
            className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 text-center disabled:opacity-50"
            style={commonStyles} 
          >
            {props.label || "Button Text"}
          </button>
        </ComponentWrapper>
      );
    
    case "img":
      return (
        <ComponentWrapper id={id} type="image" styles={styles}>
          <img 
            src={props.src || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"} 
            alt={props.alt || ""} 
            style={{ width: "100%", height: "auto", borderRadius: 'inherit', ...commonStyles }}
          />
        </ComponentWrapper>
      );

    case "hero":
      return (
        <ComponentWrapper id={id} type="hero" styles={styles}>
          <div
            className="relative py-32 px-12 text-center overflow-hidden min-h-[300px] flex flex-col items-center justify-center gap-6"
            style={{
              ...commonStyles,
              backgroundColor: commonStyles.backgroundColor || "#111827",
              color: commonStyles.color || "#FFFFFF",
            }}
          >
            <div className="max-w-4xl mx-auto relative z-10 w-full">
              {children && children.length > 0 ? (
                <RenderChildren children={children} parentId={id} />
              ) : (
                <div className="space-y-6">
                  {props.title && (
                    <h1 className="text-5xl md:text-6xl font-black mb-4">
                      {props.title}
                    </h1>
                  )}
                  {props.subtitle && (
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                      {props.subtitle}
                    </p>
                  )}
                  {props.ctaText && (
                    <button className="mt-8 px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl">
                      {props.ctaText}
                    </button>
                  )}
                </div>
              )}
            </div>
            {!commonStyles.backgroundImage && (
              <div className="absolute top-0 left-0 w-full h-full bg-black/5 pointer-events-none" />
            )}
          </div>
        </ComponentWrapper>
      );

    case "form":
      return (
        <ComponentWrapper id={id} type="form" styles={styles}>
          <form className="w-full space-y-4" style={commonStyles}>
            <RenderChildren children={children} parentId={id} />
          </form>
        </ComponentWrapper>
      );

    case "input":
      return (
        <ComponentWrapper id={id} type="input" styles={styles}>
          <input
            type={props.type || "text"}
            placeholder={props.placeholder || "Enter text..."}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            style={commonStyles}
          />
        </ComponentWrapper>
      );

    case "textarea":
      return (
        <ComponentWrapper id={id} type="textarea" styles={styles}>
          <textarea
            placeholder={props.placeholder || "Enter message..."}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all min-h-[120px]"
            style={commonStyles}
          />
        </ComponentWrapper>
      );

    default:
      return null;
  }
};
