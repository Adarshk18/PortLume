import React from "react";
import { BarChart3, User, FileText, Settings, LineChart, CheckCircle2, Sun, Link2 } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-gray-100 to-gray-200 font-inter text-gray-800">

      {/* ==== Sidebar ==== */}
      <aside className="w-72 hidden md:flex flex-col justify-between p-5 bg-white/70 backdrop-blur-lg border-r border-white/40 shadow-lg rounded-r-3xl">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-tr from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow">
              A
            </div>
            <h1 className="text-xl font-bold text-gray-800">AutoPortfolio AI</h1>
          </div>

          <nav className="flex flex-col space-y-3 text-gray-700">
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-sky-100 text-sky-700 font-medium rounded-xl">
              <BarChart3 className="w-5 h-5" /> Home / Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-sky-50 rounded-xl transition">
              <User className="w-5 h-5" /> Profile Editor
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-sky-50 rounded-xl transition">
              <LineChart className="w-5 h-5" /> Analytics
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-sky-50 rounded-xl transition">
              <FileText className="w-5 h-5" /> Themes / Styles
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-sky-50 rounded-xl transition">
              <Settings className="w-5 h-5" /> Settings
            </a>
          </nav>
        </div>

        <button className="mt-10 py-3 text-sm font-semibold bg-gradient-to-tr from-sky-400 to-orange-400 text-white rounded-xl shadow-md hover:shadow-lg transition">
          Upgrade to Pro
        </button>
      </aside>

      {/* ==== Main Content ==== */}
      <main className="flex-1 p-8 md:p-12 overflow-auto">
        {/* ==== Top Bar ==== */}
        <div className="flex flex-wrap justify-between items-center mb-10 bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white/40">
          <div className="flex items-center gap-3">
            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              Portfolio Status: Published
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-5 py-2.5 bg-gradient-to-tr from-sky-400 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition">
              Publish & Sync
            </button>
            <div className="w-10 h-10 rounded-full bg-sky-200 text-sky-700 font-bold flex items-center justify-center">
              A
            </div>
            <span className="font-semibold">Adarsh</span>
          </div>
        </div>

        {/* ==== Stats Cards ==== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Views */}
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow border border-white/40">
            <h3 className="text-gray-600 font-medium mb-2">Total Views</h3>
            <p className="text-4xl font-bold text-sky-600 mb-1">1,540</p>
            <p className="text-sm text-gray-400">All time total</p>
          </div>

          {/* Repo Clicks */}
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow border border-white/40">
            <h3 className="text-gray-600 font-medium mb-2">Repo Clicks</h3>
            <p className="text-4xl font-bold text-sky-600 mb-1">212</p>
            <p className="text-sm text-gray-400">Tracked via GitHub</p>
          </div>

          {/* AI Generations Left */}
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow border border-white/40 flex flex-col justify-between">
            <div>
              <h3 className="text-gray-600 font-medium mb-2">AI Generations Left</h3>
              <p className="text-4xl font-bold text-sky-600 mb-1">5 / 5</p>
              <p className="text-sm text-gray-400">Resets monthly</p>
            </div>
            <button className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition">
              Publish Now
            </button>
          </div>
        </div>

        {/* ==== Checklist + Share ==== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Checklist */}
          <div className="col-span-2 p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow border border-white/40">
            <h3 className="text-lg font-semibold mb-4">Portfolio Checklist / Activity</h3>
            <ul className="space-y-3">
              {[
                "GitHub Connected",
                "Resume Uploaded",
                "AI Summaries Ready",
                "Portfolio Published",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Preview & Share */}
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow border border-white/40 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-3">Preview & Share</h3>
              <p className="text-sm text-gray-500 mb-3">
                yourname.autofolio.ai/adarsh
              </p>
              <div className="flex items-center gap-3">
                <button className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium">
                  Copy Link
                </button>
                <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-2">
                  <Link2 className="w-4 h-4" /> Share on LinkedIn
                </button>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-400 border-t pt-3">
              <strong>Recent Activity:</strong> Auto-sync 1 hr ago.{" "}
              <a href="#" className="text-sky-600 hover:underline">
                Sync now
              </a>
            </div>
          </div>
        </div>

        {/* ==== Analytics Chart Placeholder ==== */}
        <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow border border-white/40">
          <h3 className="text-lg font-semibold mb-4">Views over the last 7 days</h3>
          <div className="h-64 bg-gradient-to-t from-sky-100 to-sky-50 rounded-xl flex items-center justify-center text-gray-400">
            Analytics Chart (Coming Soon)
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
