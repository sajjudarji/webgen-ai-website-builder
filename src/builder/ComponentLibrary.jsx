import React from "react";
import { Typography, Button, Card, CardBody } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { selectComponent } from "../store/builderSlice";

const ComponentWrapper = ({ id, children, type }) => {
  const { selectedComponentId } = useSelector((state) => state.builder);
  const dispatch = useDispatch();
  const isSelected = selectedComponentId === id;

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(selectComponent(id));
  };

  return (
    <div
      className={`relative group cursor-pointer border-2 transition-all ${isSelected ? "border-blue-500 rounded-sm" : "border-transparent hover:border-blue-200"}`}
      onClick={handleClick}
    >
      {isSelected && (
        <div className="absolute top-0 left-0 -translate-y-full bg-blue-500 text-white text-[10px] px-2 py-1 rounded-t-sm uppercase font-bold z-10">
          {type}
        </div>
      )}
      {children}
    </div>
  );
};

export const Hero = ({ id, props, styles }) => {
  const { title, subtitle, buttonText, backgroundImage, primaryColor } = props;

  return (
    <ComponentWrapper id={id} type="hero">
      <div
        className="relative py-24 px-8 text-center bg-gray-900 overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...styles,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Typography
            variant="h1"
            color="white"
            className="mb-4 text-4xl font-bold leading-tight sm:text-6xl"
          >
            {title}
          </Typography>
          <Typography variant="lead" color="white" className="mb-8 opacity-80">
            {subtitle}
          </Typography>
          <Button
            size="lg"
            className="px-8 py-4 rounded-full"
            style={{ backgroundColor: primaryColor }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export const CardSection = ({ id, props, styles }) => {
  const { title, items } = props;

  return (
    <ComponentWrapper id={id} type="features">
      <div className="py-20 px-8 bg-white" style={styles}>
        <div className="max-w-6xl mx-auto">
          {title && (
            <Typography
              variant="h3"
              color="blue-gray"
              className="text-center mb-12"
            >
              {title}
            </Typography>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items?.map((item, idx) => (
              <Card
                key={idx}
                className="border shadow-none hover:shadow-md transition-shadow"
              >
                <CardBody className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-xl">{idx + 1}</span>
                  </div>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {item.title}
                  </Typography>
                  <Typography variant="small" color="gray">
                    {item.text}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export const Footer = ({ id, props, styles }) => {
  const { businessName, year } = props;
  return (
    <ComponentWrapper id={id} type="footer">
      <footer
        className="py-8 px-4 border-t text-center bg-gray-50"
        style={styles}
      >
        <Typography variant="small" color="gray">
          &copy; {year || new Date().getFullYear()} {businessName}. All rights
          reserved.
        </Typography>
      </footer>
    </ComponentWrapper>
  );
};

export const Pricing = ({ id, props, styles }) => {
  const { title, plans } = props;
  return (
    <ComponentWrapper id={id} type="pricing">
      <div className="py-20 px-8 bg-gray-50" style={styles}>
        <div className="max-w-6xl mx-auto">
          <Typography
            variant="h3"
            color="blue-gray"
            className="text-center mb-12"
          >
            {title}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans?.map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 border ${plan.popular ? "border-blue-500 shadow-xl scale-105 z-10" : "border-gray-200"}`}
              >
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-2 uppercase tracking-widest"
                >
                  {plan.name}
                </Typography>
                <div className="flex items-baseline gap-1 mb-6">
                  <Typography variant="h2" color="blue-gray">
                    ${plan.price}
                  </Typography>
                  <Typography color="gray">/mo</Typography>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features?.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <svg
                        className="h-4 w-4 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>{" "}
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  fullWidth
                  variant={plan.popular ? "filled" : "outlined"}
                  className={plan.popular ? "bg-blue-600" : ""}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export const Contact = ({ id, props, styles }) => {
  const { title, email, phone, address } = props;
  return (
    <ComponentWrapper id={id} type="contact">
      <div className="py-20 px-8 bg-white" style={styles}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Typography variant="h3" color="blue-gray" className="mb-6">
              {title}
            </Typography>
            <div className="space-y-4">
              {email && (
                <div className="flex items-center gap-3 text-gray-600 font-medium">
                  <svg
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {email}
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-3 text-gray-600 font-medium">
                  <svg
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {phone}
                </div>
              )}
              {address && (
                <div className="flex items-center gap-3 text-gray-600 font-medium">
                  <svg
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {address}
                </div>
              )}
            </div>
          </div>
          <Card className="p-8 border border-gray-100 shadow-sm">
            <form className="flex flex-col gap-4">
              <Input label="Name" placeholder="Your Name" />
              <Input label="Email" placeholder="your@email.com" />
              <Textarea
                label="Message"
                rows={4}
                placeholder="How can we help?"
              />
              <Button color="blue">Send Message</Button>
            </form>
          </Card>
        </div>
      </div>
    </ComponentWrapper>
  );
};

// Mapping object for the renderer
export const COMPONENT_MAP = {
  hero: Hero,
  "card-section": CardSection,
  footer: Footer,
  features: CardSection, // Alias for features from AI generator
  pricing: Pricing,
  contact: Contact,
};
