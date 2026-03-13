import React, { useRef } from "react";
import {
  Typography,
  Button,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { selectComponent, removeComponent, addComponent, updateComponent, deleteComponentProp } from "../store/builderSlice";
import { TrashIcon, PlusIcon, BeakerIcon, ArrowRightIcon, MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";

// Helper to render styles object properly
const getInlineStyles = (styles = {}) => {
  return { ...styles };
};

// Helper to fix Unsplash URLs for better reliability
const fixImageUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('unsplash.com') && !url.includes('?')) {
    return `${url}?auto=format&fit=crop&q=80&w=1200`;
  }
  return url;
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
  const { selectedComponentId, isPreview } = useSelector((state) => state.builder);
  const dispatch = useDispatch();
  const isSelected = selectedComponentId === id && !isPreview;

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isPreview) {
      dispatch(selectComponent(id));
    }
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
  const { isPreview } = useSelector((state) => state.builder);
  return (
    <>
      {children && children.map((child) => (
        <WidgetRenderer key={child.id} component={child} />
      ))}
      {!isPreview && <DropZone parentId={parentId} />}
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
      const columns = props.columns || 3;
      const gap = props.gap || "24px";
      
      let gridClass = "";
      if (type === 'grid') {
        if (columns === 1) gridClass = "grid-cols-1";
        else if (columns === 2) gridClass = "grid-cols-1 md:grid-cols-2";
        else if (columns === 3) gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
        else if (columns === 4) gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
        else gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      }

      return (
        <ComponentWrapper id={id} type={type} styles={styles}>
          <div 
            className={`
              ${isContainer ? 'max-w-7xl mx-auto' : 'w-full'} 
              ${type === 'flex' ? 'flex flex-col md:flex-row' : ''} 
              ${type === 'grid' ? `grid ${gridClass}` : ''}
              min-h-[20px]
            `} 
            style={{
              gap: type === 'grid' || type === 'flex' ? gap : '0',
              ...commonStyles
            }}
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
            className="px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-full shadow-xl transition-all active:scale-95 text-center disabled:opacity-50 hover:shadow-indigo-200/50"
            style={commonStyles} 
          >
            {props.label || "Button Text"}
          </button>
        </ComponentWrapper>
      );
    
    case "img":
    case "image":
    case "picture":
    case "photo":
      const rawImgSrc = props.src || props.image || props.img || styles.backgroundImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
      const imgSrc = fixImageUrl(typeof rawImgSrc === 'string' ? rawImgSrc : (rawImgSrc?.url || rawImgSrc?.src));
      
      return (
        <ComponentWrapper id={id} type="image" styles={styles}>
          <img 
            src={imgSrc} 
            alt={props.alt || ""} 
            className="w-full h-auto block m-0"
            style={{ borderRadius: 'inherit', ...commonStyles }}
          />
        </ComponentWrapper>
      );

    case "hero":
      const isFashion = props.style === "fashion" || styles.borderRadius === "40px";
      const heroImageRaw = props.image || props.img || props.src || styles.backgroundImage;
      const heroImage = fixImageUrl(typeof heroImageRaw === 'string' ? heroImageRaw : (heroImageRaw?.url || heroImageRaw?.src));
      const bgImageStyle = heroImage ? (heroImage.startsWith('url') ? heroImage : `url('${heroImage}')`) : undefined;
      
      return (
        <ComponentWrapper id={id} type="hero" styles={styles}>
          <div
            className={`relative py-32 px-12 overflow-hidden min-h-[600px] flex flex-col items-center justify-center gap-6 ${isFashion ? 'mx-6 rounded-[40px] shadow-2xl' : ''}`}
            style={{
              ...commonStyles,
              ...(bgImageStyle ? { backgroundImage: bgImageStyle } : {}),
              backgroundColor: commonStyles.backgroundColor || "#F3F4F6",
              color: commonStyles.color || "#111827",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className={`relative z-10 w-full ${isFashion ? 'text-left max-w-7xl px-8' : 'text-center max-w-4xl mx-auto'}`}>
              {children && children.length > 0 ? (
                <RenderChildren children={children} parentId={id} />
              ) : (
                <div className="space-y-8">
                  {props.title && (
                    <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tighter leading-[0.85] max-w-[800px]">
                      {props.title}
                    </h1>
                  )}
                  {props.subtitle && (
                    <p className="text-xl opacity-70 max-w-md leading-relaxed">
                      {props.subtitle}
                    </p>
                  )}
                  {props.ctaText && (
                    <button 
                      className="mt-8 px-10 py-4 font-bold rounded-full flex items-center gap-3 hover:scale-105 transition-all shadow-xl group"
                      style={{ 
                        backgroundColor: commonStyles.accentColor || "#000000",
                        color: "#FFFFFF"
                      }}
                    >
                      {props.ctaText}
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition-colors">
                        <ArrowRightIcon className="w-4 h-4" />
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
            {isFashion && (
              <svg className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FB8C00" d="M440.5,322.5Q413,395,338.5,431.5Q264,468,193,428.5Q122,389,82,319.5Q42,250,84,183Q126,116,200.5,82.5Q275,49,343.5,88Q412,127,440,201Q468,275,440.5,322.5Z" />
              </svg>
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

    case "navbar":
      return (
        <ComponentWrapper id={id} type="navbar" styles={styles}>
          <nav className="w-full relative z-[100] px-12 py-8 flex items-center justify-between" style={commonStyles}>
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-black rounded-lg transform rotate-45 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
               </div>
               <div className="font-black text-2xl tracking-tighter text-black uppercase">
                 {props.logo || "LOGO"}
               </div>
            </div>
            <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {props.links && props.links.map((link, i) => (
                <a key={i} href={link.href} className="text-sm font-bold text-gray-800 hover:text-black transition-all">
                  {link.text || link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-800 cursor-pointer" />
              <div className="flex items-center gap-2 cursor-pointer">
                <ShoppingBagIcon className="w-5 h-5 text-gray-800" />
                <span className="text-xs font-bold uppercase">Cart</span>
              </div>
            </div>
            {children && children.length > 0 && <RenderChildren children={children} parentId={id} />}
          </nav>
        </ComponentWrapper>
      );

    case "footer":
      return (
        <ComponentWrapper id={id} type="footer" styles={styles}>
          <footer className="w-full py-12 px-8 border-t border-gray-100" style={commonStyles}>
            <div className="flex flex-col items-center gap-6">
              <div className="font-black text-xl tracking-tighter text-gray-400 opacity-50">
                {props.logo || "BRAND"}
              </div>
              <p className="text-sm font-medium text-gray-400">
                {props.text || "© 2026 All rights reserved."}
              </p>
              <div className="flex gap-6">
                {props.links && props.links.map((link, i) => (
                  <a key={i} href={link.href} className="text-xs font-bold text-gray-400 hover:text-indigo-600 transition-colors">
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
            {children && children.length > 0 && <RenderChildren children={children} parentId={id} />}
          </footer>
        </ComponentWrapper>
      );

    case "card":
      const isPayment = props.type === "payment";
      return (
        <ComponentWrapper id={id} type="card" styles={styles}>
          <div 
            className="transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer group bg-white overflow-hidden"
            style={{ 
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              ...commonStyles 
            }}
          >
            {isPayment ? (
               <div className="p-8 space-y-6">
                 <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                       <BeakerIcon className="h-6 w-6 text-indigo-500" />
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Balance</p>
                       <p className="text-2xl font-black text-gray-900 leading-tight">$1,876,580</p>
                    </div>
                 </div>
                 <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-6 rounded-2xl text-white shadow-xl">
                    <p className="text-[9px] font-bold uppercase opacity-60 mb-8">Visa Premium</p>
                    <p className="text-xl font-medium tracking-[0.2em] mb-4">234 **** ****</p>
                    <div className="flex justify-between items-end">
                       <p className="text-[10px] font-bold">VISA</p>
                       <div className="w-6 h-6 bg-white/20 rounded-full" />
                    </div>
                 </div>
                 <button className="w-full bg-indigo-900 text-white py-3 rounded-xl font-bold text-xs shadow-lg">Pay Invoice</button>
               </div>
            ) : (
              <div className="flex flex-col h-full">
                {(props.img || props.image || props.src) && (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl m-3">
                    <img 
                      src={fixImageUrl(props.img || props.image || props.src)} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    {props.badge && (
                       <div className="absolute top-4 left-4 px-3 py-1 bg-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
                         {props.badge}
                       </div>
                    )}
                  </div>
                )}
                <div className="p-6 pt-2 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      {props.title && <h3 className="text-lg font-black text-gray-900 leading-tight">{props.title}</h3>}
                      {props.content && <p className="text-xs font-medium text-gray-400 leading-relaxed max-w-[200px]">{props.content}</p>}
                    </div>
                    <div className="px-3 py-1 border border-gray-100 rounded-lg text-[10px] font-black uppercase bg-gray-50">
                      Detail
                    </div>
                  </div>
                  {props.price && <p className="text-xl font-black text-gray-900">{props.price}</p>}
                  <RenderChildren children={children} parentId={id} />
                </div>
              </div>
            )}
          </div>
        </ComponentWrapper>
      );

    case "logo-bar":
      return (
        <ComponentWrapper id={id} type="logo-bar" styles={styles}>
          <div className="py-12 flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all" style={commonStyles}>
             <span className="text-lg font-black tracking-tighter">Klarna.</span>
             <span className="text-lg font-black tracking-tighter">coinbase</span>
             <span className="text-lg font-black tracking-tighter">instacart</span>
             <span className="text-lg font-black tracking-tighter">stripe</span>
          </div>
        </ComponentWrapper>
      );

    default:
      return null;
  }
};
