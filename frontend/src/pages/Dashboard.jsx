import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CheckCircle,
  LogOut,
  User,
  Sparkles,
  Loader2,
} from "lucide-react";
import { getPortfolioData } from "../services/api";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/";
          return;
        }
        const data = await getPortfolioData(token);
        setPortfolio(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );

  const { views, repoClicks, aiGenerationsLeft, checklist, chartData, publicUrl, lastSynced } =
    portfolio;

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col justify-between">
        <div>
          <div className="p-6 flex items-center space-x-2">
            <span className="text-2xl">🤖</span>
            <h1 className="font-bold text-lg">PortLume AI</h1>
          </div>
          <nav className="flex flex-col space-y-1 px-4">
            {["Home / Overview", "Profile Editor", "Analytics", "Themes / Styles", "Settings"].map(
              (item, i) => (
                <a
                  key={i}
                  href="#"
                  className="py-2 px-3 rounded-md hover:bg-blue-50 text-gray-700 font-medium"
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>
        <div className="p-4">
          <button className="w-full py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg">
            Upgrade to Pro
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col p-6 overflow-y-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-6 sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              Portfolio Status:
            </span>
            <span
              className={`px-2 py-1 rounded-md text-xs ${
                checklist.portfolioPublished
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {checklist.portfolioPublished ? "Published" : "Draft"}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg font-semibold shadow hover:shadow-md">
              Publish & Sync
            </button>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Adarsh</span>
              <LogOut
                onClick={handleLogout}
                className="w-4 h-4 text-gray-600 cursor-pointer hover:text-red-500"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
            <p className="text-3xl font-bold text-blue-600">{views}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <h3 className="text-sm font-medium text-gray-500">Repo Clicks</h3>
            <p className="text-3xl font-bold text-blue-600">{repoClicks}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition flex flex-col">
            <h3 className="text-sm font-medium text-gray-500">AI Generations Left</h3>
            <p className="text-3xl font-bold text-blue-600">{aiGenerationsLeft}/5</p>
          </div>
        </div>

        {/* Checklist + Chart */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-1 bg-white rounded-xl p-5 shadow">
            <h3 className="font-semibold mb-4">Portfolio Checklist</h3>
            <ul className="space-y-3">
              {Object.entries(checklist).map(([key, done]) => (
                <li key={key} className="flex items-center space-x-2">
                  <CheckCircle
                    className={`w-5 h-5 ${
                      done ? "text-green-500" : "text-gray-300"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      done ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                </li>
              ))}
            </ul>
            <button className="mt-5 w-full py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg">
              Publish Now
            </button>
          </div>

          <div className="col-span-2 bg-white rounded-xl p-5 shadow">
            <h3 className="font-semibold mb-4">Views over the last 7 days</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#60a5fa" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right section (widgets) */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 bg-white rounded-xl p-5 shadow">
            <h3 className="font-semibold mb-3">Preview & Share</h3>
            <p className="text-sm text-gray-600 mb-2">{publicUrl}</p>
            <button className="text-sm text-blue-500 border border-blue-500 px-3 py-1 rounded-md">
              Copy Link
            </button>
            <div className="mt-4">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Share on LinkedIn</span>
              </button>
            </div>
          </div>

          <div className="col-span-1 bg-white rounded-xl p-5 shadow">
            <h3 className="font-semibold mb-3">Recent Activity / To-Do</h3>
            <p className="text-sm text-gray-500 mb-1">
              Auto-Update Sync last synced {lastSynced || "recently"}.
            </p>
            <button className="text-blue-600 text-sm font-semibold mb-3">
              Sync Now
            </button>
            <div className="p-3 border rounded-lg bg-gray-50 text-sm">
              <p className="font-semibold">To-Do:</p>
              <p className="text-gray-600">Review new README changes from “Repo-X”.</p>
            </div>
          </div>

          <div className="col-span-1 bg-white rounded-xl p-5 shadow">
            <h3 className="font-semibold mb-3">Tip</h3>
            <p className="text-sm text-gray-600">
              Try the new gradient theme to make your portfolio stand out!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
