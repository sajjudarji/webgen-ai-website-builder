import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setWebsite } from "../store/builderSlice";
import BuilderTopBar from "../builder/BuilderTopBar";
import LeftPanel from "../builder/LeftPanel";
import RightPanel from "../builder/RightPanel";
import Canvas from "../builder/Canvas";
import AIAssistant from "../ai/AIAssistant";

const Builder = () => {
  const { websiteId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { currentWebsite, currentPage } = useSelector((state) => state.builder);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedLayoutStr, setLastSavedLayoutStr] = useState(null);

  // Debounced Auto-Save
  useEffect(() => {
    if (!currentPage || !currentWebsite) return;

    const currentLayoutStr = JSON.stringify(currentPage.layout);

    // Initialize the last saved string on first load to prevent immediate auto-save
    if (lastSavedLayoutStr === null) {
      setLastSavedLayoutStr(currentLayoutStr);
      return;
    }

    // Don't auto-save if layout hasn't changed
    if (lastSavedLayoutStr === currentLayoutStr) return;

    const saveTimer = setTimeout(async () => {
      try {
        setIsSaving(true);
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };

        await axios.put(
          `http://localhost:5000/api/pages/${currentPage._id}`,
          {
            layout: currentPage.layout,
            name: currentPage.name,
            slug: currentPage.slug,
          },
          config
        );

        setLastSavedLayoutStr(currentLayoutStr);
      } catch (error) {
        console.error("Auto-save failed:", error);
      } finally {
        setIsSaving(false);
      }
    }, 1000); // 1000ms debounce

    return () => clearTimeout(saveTimer);
  }, [currentPage, currentWebsite, user.token, lastSavedLayoutStr]);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get(
          `http://localhost:5000/api/websites/${websiteId}`,
          config,
        );
        dispatch(setWebsite(res.data.data));
      } catch (error) {
        console.error("Error fetching website:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebsite();
  }, [websiteId, user.token, dispatch, navigate]);

  const saveWebsite = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Save the current page
      if (currentPage) {
        await axios.put(
          `http://localhost:5000/api/pages/${currentPage._id}`,
          {
            layout: currentPage.layout,
            name: currentPage.name,
            slug: currentPage.slug,
          },
          config,
        );
      }

      // Save website metadata/settings
      await axios.put(
        `http://localhost:5000/api/websites/${websiteId}`,
        {
          name: currentWebsite.name,
          description: currentWebsite.description,
          settings: currentWebsite.settings,
        },
        config,
      );

      alert("Website saved successfully!");
    } catch (error) {
      console.error("Error saving website:", error);
      alert("Failed to save website progress.");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-10 w-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <BuilderTopBar
        onSave={saveWebsite}
        isPreview={isPreview}
        setIsPreview={setIsPreview}
        isSaving={isSaving}
      />
      <div className="flex flex-1 overflow-hidden relative">
        {!isPreview && <LeftPanel />}
        <Canvas />
        {!isPreview && <RightPanel />}
        {!isPreview && <AIAssistant />}
      </div>
    </div>
  );
};

export default Builder;
