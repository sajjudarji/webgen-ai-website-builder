import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  TrashIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import DashboardLayout from "../layouts/DashboardLayout";

const AdminPanel = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get(
          "http://localhost:5000/api/admin/stats",
          config,
        );
        setStats(res.data.data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [user.token]);

  const deleteWebsite = async (id) => {
    if (window.confirm("Admin Action: Delete this website permanently?")) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios.delete(
          `http://localhost:5000/api/admin/website/${id}`,
          config,
        );
        setStats({
          ...stats,
          recentWebsites: stats.recentWebsites.filter((w) => w._id !== id),
          totalWebsites: stats.totalWebsites - 1,
        });
      } catch (error) {
        console.error("Error deleting website by admin:", error);
      }
    }
  };

  if (isLoading)
    return <div className="text-center py-20">Loading Admin Panel...</div>;

  return (
    <DashboardLayout>
      <main className="max-w-screen-xl mx-auto px-4 mt-8 pb-12">
        <Typography variant="h3" color="blue-gray" className="mb-8">
          Admin Dashboard
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-blue-500 text-white">
            <CardBody className="flex items-center gap-6">
              <div className="p-4 bg-white/20 rounded-xl">
                <UserGroupIcon className="h-10 w-10 text-white" />
              </div>
              <div>
                <Typography variant="h2">{stats?.totalUsers || 0}</Typography>
                <Typography
                  variant="h6"
                  className="opacity-80 uppercase tracking-widest text-[10px]"
                >
                  Total Users
                </Typography>
              </div>
            </CardBody>
          </Card>
          <Card className="bg-indigo-500 text-white">
            <CardBody className="flex items-center gap-6">
              <div className="p-4 bg-white/20 rounded-xl">
                <GlobeAltIcon className="h-10 w-10 text-white" />
              </div>
              <div>
                <Typography variant="h2">
                  {stats?.totalWebsites || 0}
                </Typography>
                <Typography
                  variant="h6"
                  className="opacity-80 uppercase tracking-widest text-[10px]"
                >
                  Total Websites
                </Typography>
              </div>
            </CardBody>
          </Card>
        </div>

        <Typography variant="h5" color="blue-gray" className="mb-4">
          Recent Websites
        </Typography>
        <Card className="mb-12">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    Website
                  </Typography>
                </th>
                <th className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    Owner
                  </Typography>
                </th>
                <th className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    Created
                  </Typography>
                </th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentWebsites?.map((site) => (
                <tr key={site._id} className="border-b hover:bg-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {site.name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray">
                      {site.userId?.name}{" "}
                      <span className="opacity-50">({site.userId?.email})</span>
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray">
                      {new Date(site.createdAt).toLocaleDateString()}
                    </Typography>
                  </td>
                  <td className="p-4 text-right">
                    <IconButton
                      variant="text"
                      color="red"
                      onClick={() => deleteWebsite(site._id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </DashboardLayout>
  );
};

export default AdminPanel;
