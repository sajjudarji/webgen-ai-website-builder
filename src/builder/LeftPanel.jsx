import React, { useEffect, useState, useCallback } from "react";
import { Typography, Card, Spinner, Input } from "@material-tailwind/react";
import * as Icons from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Debounce helper
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const DraggableItem = ({
  type,
  label,
  icon: Icon,
  defaultProps,
  defaultStyles,
}) => {
  return (
    <div
      className="p-3 bg-white border border-gray-500 rounded-xl hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-50/50 cursor-grab active:cursor-grabbing flex flex-col items-center justify-center gap-2 transition-all group scale-100 active:scale-95"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("componentType", type);
        e.dataTransfer.setData(
          "defaultProps",
          JSON.stringify(defaultProps || {}),
        );
        e.dataTransfer.setData(
          "defaultStyles",
          JSON.stringify(defaultStyles || {}),
        );
      }}
    >
      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0">
        {Icon ? (
          <Icon className="h-5 w-5 stroke-[1.5]" />
        ) : (
          <Icons.CubeIcon className="h-5 w-5 stroke-[1.5]" />
        )}
      </div>
      <Typography
        variant="small"
        className="text-[9px] font-black text-gray-700 group-hover:text-gray-800 uppercase tracking-widest text-center leading-tight truncate w-full"
      >
        {label}
      </Typography>
    </div>
  );
};

const LeftPanel = () => {
  const [allWidgets, setAllWidgets] = useState([]);
  const [filteredWidgets, setFilteredWidgets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const res = await axios.get(
          "http://localhost:5000/api/widgets",
          config,
        );
        if (res.data.success) {
          setAllWidgets(res.data.data);
          setFilteredWidgets(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching widgets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWidgets();
  }, [user.token]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = allWidgets.filter(
        (widget) =>
          widget.label
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          widget.category
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()),
      );
      setFilteredWidgets(filtered);
    } else {
      setFilteredWidgets(allWidgets);
    }
  }, [debouncedSearchTerm, allWidgets]);

  // Group widgets by category
  const categories = filteredWidgets.reduce((acc, widget) => {
    const cat = widget.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(widget);
    return acc;
  }, {});

  return (
    <div className="w-full bg-white h-[calc(100vh-80px)] overflow-hidden flex flex-col shrink-0">
      <div className="p-6 border-b border-gray-50 sticky top-0 bg-white/80 backdrop-blur-md z-10 space-y-4">
        <Typography
          variant="small"
          className="font-black text-gray-900 uppercase tracking-[0.2em] text-[11px]"
        >
          Widget Library
        </Typography>

        <div className="relative group">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search widgets (e.g. hero, card)..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 focus:bg-white focus:border-indigo-500 transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide pb-20">
        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner className="h-8 w-8 text-indigo-500" />
          </div>
        ) : filteredWidgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
              <Icons.CommandLineIcon className="h-6 w-6 text-gray-200" />
            </div>
            <Typography className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
              No widgets found
            </Typography>
          </div>
        ) : (
          Object.entries(categories).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <Typography className="text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] pl-1">
                {category}
              </Typography>
              <div className="grid grid-cols-2 gap-3">
                {items.map((widget) => (
                  <DraggableItem
                    key={widget._id}
                    type={widget.type}
                    label={widget.label}
                    icon={Icons[widget.iconName]}
                    defaultProps={widget.defaultProps}
                    defaultStyles={widget.defaultStyles}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Branding */}
      <div className="p-6 border-t border-gray-50 mt-auto bg-gray-50/50">
        <p className="text-[11px] font-bold text-gray-800 text-center uppercase tracking-widest leading-loose">
          Refined Widget System v2.0 <br />
          <span className="text-indigo-400 font-extrabold uppercase">
            Premium Assets
          </span>
        </p>
      </div>
    </div>
  );
};

export default LeftPanel;
