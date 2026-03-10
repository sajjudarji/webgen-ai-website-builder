import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
  IconButton,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
} from "@material-tailwind/react";
import {
  PhotoIcon,
  CloudArrowUpIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const MediaLibrary = ({ open, handleOpen, onSelect }) => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadUrl, setUploadUrl] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (open) {
      fetchMedia();
    }
  }, [open]);

  const fetchMedia = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.get("http://localhost:5000/api/media", config);
      setMedia(res.data.data);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulatedUpload = async () => {
    if (!uploadUrl) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post(
        "http://localhost:5000/api/media/upload",
        {
          name: uploadUrl.split("/").pop() || "Uploaded Image",
          url: uploadUrl,
          type: "image",
          size: 0,
          format: "url",
        },
        config,
      );
      setMedia([res.data.data, ...media]);
      setUploadUrl("");
      alert("Media added to library!");
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };

  const deleteMedia = async (id, e) => {
    e.stopPropagation();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`http://localhost:5000/api/media/${id}`, config);
      setMedia(media.filter((m) => m._id !== id));
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  return (
    <Dialog open={open} handler={handleOpen} size="lg">
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Media Library
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={handleOpen}>
          <XMarkIcon className="h-5 w-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody divider className="p-0">
        <Tabs value="gallery">
          <TabsHeader className="mx-4 mt-2">
            <Tab value="gallery" className="text-sm">
              <div className="flex items-center gap-2">
                <PhotoIcon className="h-4 w-4" /> Gallery
              </div>
            </Tab>
            <Tab value="upload" className="text-sm">
              <div className="flex items-center gap-2">
                <CloudArrowUpIcon className="h-4 w-4" /> Add by URL
              </div>
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value="gallery" className="h-[400px] overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Typography>Loading library...</Typography>
                </div>
              ) : media.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {media.map((item) => (
                    <div
                      key={item._id}
                      className="group relative h-40 rounded-lg overflow-hidden border hover:border-blue-500 cursor-pointer transition-all"
                      onClick={() => {
                        onSelect(item.url);
                        handleOpen();
                      }}
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <IconButton
                          variant="text"
                          color="white"
                          onClick={(e) => deleteMedia(item._id, e)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 flex flex-col items-center">
                  <PhotoIcon className="h-16 w-16 text-gray-200 mb-4" />
                  <Typography color="gray">
                    No media found. Add some by URL!
                  </Typography>
                </div>
              )}
            </TabPanel>
            <TabPanel value="upload" className="p-10 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <CloudArrowUpIcon className="h-20 w-20 text-blue-100 mx-auto" />
                <Typography variant="h6">Add Image URL</Typography>
                <Typography variant="small" color="gray">
                  Paste an image URL from Unsplash or any other public source to
                  add it to your library.
                </Typography>
                <Input
                  label="Image URL"
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                />
                <Button
                  fullWidth
                  onClick={handleSimulatedUpload}
                  disabled={!uploadUrl}
                >
                  Add to Library
                </Button>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </DialogBody>
    </Dialog>
  );
};

export default MediaLibrary;
