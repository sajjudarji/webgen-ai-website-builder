import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { WidgetRenderer } from "./ComponentLibrary";
import { addComponent, selectComponent } from "../store/builderSlice";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@material-tailwind/react";
import { SparklesIcon, PlusIcon } from "@heroicons/react/24/outline";

const DUMMY_PAGE = {
  name: "Ecommerce Landing Page",
  slug: "ecommerce-landing-page",
  layout: [
    {
      id: "hero_174178660001",
      type: "hero",
      props: {
        title: "Shop the Latest Trends",
        subtitle:
          "Discover premium products at unbeatable prices. Fast delivery and easy returns.",
        ctaText: "Shop Now",
      },
      styles: {
        padding: "80px 20px",
        textAlign: "center",
        background: "#111827",
        color: "#ffffff",
      },
    },
    {
      id: "section_174178660002",
      type: "section",
      props: {},
      styles: {
        padding: "40px 20px",
        background: "#ffffff",
      },
      children: [
        {
          id: "container_174178660003",
          type: "container",
          props: {},
          styles: {
            maxWidth: "1200px",
            margin: "0 auto",
          },
          children: [
            {
              id: "h2_174178660004",
              type: "h2",
              props: {
                text: "Featured Products",
              },
              styles: {
                fontSize: "32px",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "30px",
              },
            },
            {
              id: "grid_174178660005",
              type: "grid",
              props: {
                columns: 4,
                gap: "20px",
              },
              styles: {},
              children: [
                {
                  id: "div_174178660006",
                  type: "div",
                  props: {},
                  styles: {
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    padding: "15px",
                    textAlign: "center",
                  },
                  children: [
                    {
                      id: "img_174178660007",
                      type: "img",
                      props: {
                        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
                        alt: "Product",
                      },
                      styles: {
                        width: "100%",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      },
                    },
                    {
                      id: "p_174178660008",
                      type: "p",
                      props: {
                        text: "Premium Watch",
                      },
                      styles: {
                        fontWeight: "600",
                      },
                    },
                    {
                      id: "span_174178660009",
                      type: "span",
                      props: {
                        text: "$89",
                      },
                      styles: {
                        display: "block",
                        margin: "8px 0",
                      },
                    },
                    {
                      id: "button_174178660010",
                      type: "button",
                      props: {
                        text: "Add to Cart",
                      },
                      styles: {
                        padding: "8px 14px",
                        background: "#2563eb",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                      },
                    },
                  ],
                },
                {
                  id: "div_174178660011",
                  type: "div",
                  props: {},
                  styles: {
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    padding: "15px",
                    textAlign: "center",
                  },
                  children: [
                    {
                      id: "img_174178660012",
                      type: "img",
                      props: {
                        src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
                        alt: "Product",
                      },
                      styles: {
                        width: "100%",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      },
                    },
                    {
                      id: "p_174178660013",
                      type: "p",
                      props: {
                        text: "Running Shoes",
                      },
                      styles: {
                        fontWeight: "600",
                      },
                    },
                    {
                      id: "span_174178660014",
                      type: "span",
                      props: {
                        text: "$59",
                      },
                      styles: {
                        display: "block",
                        margin: "8px 0",
                      },
                    },
                    {
                      id: "button_174178660015",
                      type: "button",
                      props: {
                        text: "Add to Cart",
                      },
                      styles: {
                        padding: "8px 14px",
                        background: "#2563eb",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                      },
                    },
                  ],
                },
                {
                  id: "div_174178660016",
                  type: "div",
                  props: {},
                  styles: {
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    padding: "15px",
                    textAlign: "center",
                  },
                  children: [
                    {
                      id: "img_174178660017",
                      type: "img",
                      props: {
                        src: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
                        alt: "Product",
                      },
                      styles: {
                        width: "100%",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      },
                    },
                    {
                      id: "p_174178660018",
                      type: "p",
                      props: {
                        text: "Wireless Headphones",
                      },
                      styles: {
                        fontWeight: "600",
                      },
                    },
                    {
                      id: "span_174178660019",
                      type: "span",
                      props: {
                        text: "$129",
                      },
                      styles: {
                        display: "block",
                        margin: "8px 0",
                      },
                    },
                    {
                      id: "button_174178660020",
                      type: "button",
                      props: {
                        text: "Add to Cart",
                      },
                      styles: {
                        padding: "8px 14px",
                        background: "#2563eb",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                      },
                    },
                  ],
                },
                {
                  id: "div_174178660021",
                  type: "div",
                  props: {},
                  styles: {
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    padding: "15px",
                    textAlign: "center",
                  },
                  children: [
                    {
                      id: "img_174178660022",
                      type: "img",
                      props: {
                        src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
                        alt: "Product",
                      },
                      styles: {
                        width: "100%",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      },
                    },
                    {
                      id: "p_174178660023",
                      type: "p",
                      props: {
                        text: "Fashion Backpack",
                      },
                      styles: {
                        fontWeight: "600",
                      },
                    },
                    {
                      id: "span_174178660024",
                      type: "span",
                      props: {
                        text: "$49",
                      },
                      styles: {
                        display: "block",
                        margin: "8px 0",
                      },
                    },
                    {
                      id: "button_174178660025",
                      type: "button",
                      props: {
                        text: "Add to Cart",
                      },
                      styles: {
                        padding: "8px 14px",
                        background: "#2563eb",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section_174178660026",
      type: "section",
      props: {},
      styles: {
        padding: "40px 20px",
        background: "#f9fafb",
      },
      children: [
        {
          id: "container_174178660027",
          type: "container",
          props: {},
          styles: {
            maxWidth: "1200px",
            margin: "0 auto",
          },
          children: [
            {
              id: "flex_174178660028",
              type: "flex",
              props: {
                gap: "30px",
                align: "center",
              },
              styles: {},
              children: [
                {
                  id: "img_174178660029",
                  type: "img",
                  props: {
                    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
                    alt: "Shopping experience",
                  },
                  styles: {
                    width: "50%",
                    borderRadius: "12px",
                  },
                },
                {
                  id: "div_174178660030",
                  type: "div",
                  props: {},
                  styles: {
                    width: "50%",
                  },
                  children: [
                    {
                      id: "h2_174178660031",
                      type: "h2",
                      props: {
                        text: "A Better Shopping Experience",
                      },
                      styles: {
                        fontSize: "30px",
                        marginBottom: "15px",
                      },
                    },
                    {
                      id: "p_174178660032",
                      type: "p",
                      props: {
                        text: "Enjoy secure checkout, fast delivery, and easy returns on all your purchases.",
                      },
                      styles: {
                        marginBottom: "20px",
                      },
                    },
                    {
                      id: "button_174178660033",
                      type: "button",
                      props: {
                        text: "Browse Products",
                      },
                      styles: {
                        padding: "12px 20px",
                        background: "#111827",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "section_174178660034",
      type: "section",
      props: {},
      styles: {
        padding: "40px 20px",
        background: "#111827",
        color: "#ffffff",
        textAlign: "center",
      },
      children: [
        {
          id: "container_174178660035",
          type: "container",
          props: {},
          styles: {
            maxWidth: "900px",
            margin: "0 auto",
          },
          children: [
            {
              id: "h2_174178660036",
              type: "h2",
              props: {
                text: "Get Exclusive Deals",
              },
              styles: {
                fontSize: "30px",
                marginBottom: "15px",
              },
            },
            {
              id: "p_174178660037",
              type: "p",
              props: {
                text: "Subscribe to our newsletter for special offers and new product launches.",
              },
              styles: {
                marginBottom: "20px",
              },
            },
            {
              id: "form_174178660038",
              type: "form",
              props: {},
              styles: {
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              },
              children: [
                {
                  id: "input_174178660039",
                  type: "input",
                  props: {
                    placeholder: "Enter your email",
                  },
                  styles: {
                    padding: "10px",
                    borderRadius: "6px",
                    border: "none",
                    minWidth: "250px",
                  },
                },
                {
                  id: "submit_174178660040",
                  type: "submit",
                  props: {
                    text: "Subscribe",
                  },
                  styles: {
                    padding: "10px 16px",
                    background: "#22c55e",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

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
        className={`${getCanvasWidth()} mx-auto min-h-[600px] bg-white shadow-2xl rounded-2xl overflow-hidden ring-1 ring-gray-200 transition-all duration-500 ease-in-out pb-40 p-4 sm:p-8`}
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
