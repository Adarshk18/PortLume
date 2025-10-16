import React, { useState } from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------- Inline SVG icons ---------- */
const Icon = ({ children, className = "" }) => (
  <svg
    className={`inline-block ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const HomeIcon = (p) => (
  <Icon {...p}>
    <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </Icon>
);
const ProfileIcon = (p) => (
  <Icon {...p}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);
const ChartIcon = (p) => (
  <Icon {...p}>
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </Icon>
);
const ThemeIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
  </Icon>
);
const SettingsIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 0 1 2.3 18.9l.06-.06a1.65 1.65 0 0 0 .33-1.82" />
  </Icon>
);
const ShareIcon = (p) => (
  <Icon {...p}>
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" x2="12" y1="2" y2="15" />
    <rect x="4" y="12" width="16" height="10" rx="2" />
  </Icon>
);
const TrendingIcon = (p) => (
  <Icon {...p}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </Icon>
);

/* ---------- Sidebar ---------- */
function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-gray-100">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <div className="font-bold text-gray-800 text-sm">AutoPortfolio AI</div>
            <div className="text-xs text-gray-400">Dashboard</div>
          </div>
        </div>

        <nav className="space-y-2">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm">
            <HomeIcon className="w-4 h-4" /> Overview
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-700 text-sm">
            <ProfileIcon className="w-4 h-4" /> Profile Editor
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-700 text-sm">
            <ChartIcon className="w-4 h-4" /> Analytics
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-700 text-sm">
            <ThemeIcon className="w-4 h-4" /> Themes
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl hover:bg-gray-50 text-gray-700 text-sm">
            <SettingsIcon className="w-4 h-4" /> Settings
          </button>
        </nav>
      </div>

      <button className="mt-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-white font-semibold shadow">
        Upgrade to Pro
      </button>
    </aside>
  );
}

/* ---------- Topbar ---------- */
function Topbar({ onPublish }) {
  return (
    <div className="sticky top-6 z-20 bg-white/80 backdrop-blur-lg rounded-3xl shadow border border-gray-100 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="px-3 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-semibold text-green-700">
          Portfolio Status: <span className="font-bold">Published</span>
        </span>
        <button
          onClick={onPublish}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 text-white font-semibold shadow"
        >
          <ShareIcon className="w-4 h-4" /> Publish & Sync
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex text-sm text-gray-700 font-medium">Adarsh</div>
        <div className="w-9 h-9 rounded-full bg-yellow-400 text-white font-bold flex items-center justify-center">
          A
        </div>
      </div>
    </div>
  );
}

/* ---------- Stat Card ---------- */
const StatCard = ({ title, value, color }) => (
  <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-5 shadow border border-gray-100">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="mt-3 flex justify-between items-center">
      <h3 className="text-3xl font-extrabold text-gray-800">{value}</h3>
      <div className={`p-2 rounded-xl ${color}`}>
        <TrendingIcon className="w-5 h-5 text-white" />
      </div>
    </div>
  </div>
);

/* ---------- Checklist Card ---------- */
const ChecklistCard = () => {
  const items = [
    { label: "GitHub Connected", done: true },
    { label: "Resume Uploaded", done: true },
    { label: "AI Summaries Ready", done: true },
    { label: "Portfolio Published", done: false },
  ];
  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow border border-gray-100">
      <h3 className="font-semibold text-lg mb-4 text-gray-800">Portfolio Checklist</h3>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-2 border-b border-gray-100"
          >
            <span
              className={`${
                it.done ? "text-gray-500 line-through" : "text-gray-800"
              } text-sm`}
            >
              {it.label}
            </span>
            {it.done && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- Recharts Line Chart ---------- */
const ChartCard = () => {
  const data = [
    { day: "Mon", views: 200 },
    { day: "Tue", views: 300 },
    { day: "Wed", views: 450 },
    { day: "Thu", views: 600 },
    { day: "Fri", views: 800 },
    { day: "Sat", views: 1100 },
    { day: "Sun", views: 1300 },
  ];

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow border border-gray-100">
      <h3 className="font-semibold text-lg mb-4 text-gray-800">
        Views (Last 7 Days)
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart data={data}>
            <defs>
              <linearGradient id="lineColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              stroke="url(#lineColor)"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

/* ---------- Share + Activity Cards ---------- */
const ShareCard = () => {
  const [copied, setCopied] = useState(false);
  const url = "adarsh.autoclite.ai";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow border border-gray-100 flex flex-col items-center">
      <h4 className="font-semibold text-sm mb-2 text-gray-800">Preview & Share</h4>
      <div className="text-xs text-indigo-600 font-medium mb-4">{url}</div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-20 h-20 bg-gray-100 border border-gray-200 rounded-lg"></div>
        <button
          onClick={handleCopy}
          className="px-3 py-2 rounded-lg bg-indigo-500 text-white text-sm font-semibold shadow"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
      <button className="w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow">
        Share on LinkedIn
      </button>
    </div>
  );
};

const ActivityCard = () => (
  <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow border border-gray-100">
    <h4 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h4>
    <p className="text-sm text-gray-600">
      Last sync: <span className="text-cyan-600 font-medium">1 hour ago</span>
    </p>
    <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
      <p className="text-sm text-gray-700">
        💡 Tip: Try a new gradient theme to enhance your portfolio.
      </p>
    </div>
  </div>
);

/* ---------- Page Layout ---------- */
export default function Dashboard() {
  const [published, setPublished] = useState(true);
  const togglePublish = () => setPublished(!published);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto flex gap-6">
        <Sidebar />
        <main className="flex-1 space-y-6">
          <Topbar onPublish={togglePublish} />
          {/* Stats Row */}
          <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <StatCard title="Total Views" value="1,540" color="bg-blue-500" />
            <StatCard title="Repo Clicks" value="212" color="bg-green-500" />
            <StatCard title="AI Generations" value="5/5" color="bg-yellow-400" />
          </section>

          {/* Checklist + Chart */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChecklistCard />
            <div className="lg:col-span-2 space-y-6">
              <ChartCard />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ShareCard />
                <ActivityCard />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
