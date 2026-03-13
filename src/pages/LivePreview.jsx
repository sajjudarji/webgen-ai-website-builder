import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { WidgetRenderer } from "../builder/ComponentLibrary";

const LivePreview = () => {
  const { websiteId } = useParams();
  const [layout, setLayout] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const res = await axios.get(`http://localhost:5000/api/websites/${websiteId}`, config);
        const website = res.data.data;
        const mainPage = website.pages.find(p => p.isHome) || website.pages[0];
        setLayout(mainPage.layout);
      } catch (err) {
        console.error("Preview failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [websiteId, user.token]);

  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {layout.map((component) => (
        <WidgetRenderer key={component.id} component={component} />
      ))}
    </div>
  );
};

export default LivePreview;
