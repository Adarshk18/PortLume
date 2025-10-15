// src/pages/Dashboard.jsx
import React, { useState } from "react";

/* ---------- Inline SVG icons (small and lightweight) ---------- */
const Icon = ({ children, className = "" }) => (
  <svg className={`inline-block ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

const HomeIcon = (props) => (
  <Icon {...props}><path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Icon>
);
const ProfileIcon = (props) => (
  <Icon {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>
);
const ChartIcon = (props) => (
  <Icon {...props}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></Icon>
);
const ThemeIcon = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="3"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/></Icon>
);
const SettingsIcon = (props) => (
  <Icon {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 0 1 2.3 18.9l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L4.3 5.4A2 2 0 0 1 7.12 2.57l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c.12.59.5 1.08 1 1.51h.03a1.65 1.65 0 0 0 1.82-.33l.06-.06A2 2 0 0 1 21.7 5.1l-.06.06a1.65 1.65 0 0 0-.33 1.82v.02c.5.43.88.92 1 1.51H21a2 2 0 0 1 0 4h-.09c-.59.12-1.08.5-1.51 1z"/></Icon>
);
const ShareIcon = (props) => (
  <Icon {...props}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></Icon>
);
const TrendingIcon = (props) => (
  <Icon {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></Icon>
);
const EyeIcon = (props) => (
  <Icon {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></Icon>
);

/* ---------- Small reusable components ---------- */

function Sidebar() {
  return (
    <aside className="w-64 hidden lg:flex flex-col bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-md border border-gray-100">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-white shadow flex items-center justify-center">
            {/* small logo */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#06b6d4"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800">AutoPortfolio AI</div>
            <div className="text-xs text-gray-400">Your auto portfolio assistant</div>
          </div>
        </div>

        <nav className="space-y-1">
          <div className="rounded-lg p-2 bg-white shadow-sm">
            <button className="w-full text-left px-3 py-2 rounded-md flex items-center gap-3 text-sm font-semibold text-gray-800 bg-indigo-50">
              <HomeIcon className="w-4 h-4 text-indigo-600" /> Home / Overview
            </button>
          </div>

          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-3 text-sm text-gray-700 mt-2">
            <ProfileIcon className="w-4 h-4 text-gray-600" /> Profile Editor
          </button>

          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-3 text-sm text-gray-700">
            <ChartIcon className="w-4 h-4 text-gray-600" /> Analytics
          </button>

          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-3 text-sm text-gray-700">
            <ThemeIcon className="w-4 h-4 text-gray-600" /> Themes / Styles
          </button>

          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-3 text-sm text-gray-700">
            <SettingsIcon className="w-4 h-4 text-gray-600" /> Settings
          </button>
        </nav>
      </div>

      <div>
        <button className="w-full mt-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-lg">
          Upgrade to Pro
        </button>
      </div>
    </aside>
  );
}

function Topbar({ onPublish }) {
  return (
    <div className="sticky top-6 z-20">
      <div className="flex items-center justify-between gap-4 bg-white/70 backdrop-blur-md rounded-3xl p-4 shadow border border-gray-100">
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">Portfolio Status: <span className="font-bold">Published</span></span>
          <button onClick={onPublish} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 text-white font-semibold shadow">
            <ShareIcon className="w-4 h-4" /> Publish & Sync
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-700">Adarsh</div>
          <div className="w-9 h-9 rounded-full bg-yellow-400 text-white font-bold flex items-center justify-center">A</div>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><polyline points="6 9 12 15 18 9" stroke="#374151" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* Small stat card */
function StatCard({ title, value, accent = "from-cyan-400 to-indigo-500" }) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow border border-gray-100">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-3xl font-extrabold text-gray-800">{value}</div>
        <div className={`p-2 rounded-xl bg-gradient-to-br ${accent} text-white`}>
          <TrendingIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function AICard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow border border-gray-100 flex flex-col justify-between">
      <div>
        <div className="text-sm text-gray-500">AI Generations Left</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-yellow-50">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L15 8l6 .9-4.9 4 1 6L12 16l-6.1 3 1-6L2 8.9 8 8 12 2z" fill="#f59e0b"/></svg>
            </div>
            <div className="text-3xl font-extrabold text-gray-800">5/5</div>
          </div>
        </div>
      </div>

      <button className="mt-6 w-full py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow">
        Publish Now
      </button>
    </div>
  );
}

function ChecklistCard() {
  const items = [
    { label: "Github Connected", done: true },
    { label: "Resume Uploaded", done: true },
    { label: "AI Summaries Ready", done: true },
    { label: "Portfolio Published", done: true },
  ];
  return (
    <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Portfolio Checklist/Activity</h3>
      <div className="space-y-2">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={it.done} readOnly className="h-4 w-4 rounded text-cyan-500 bg-white" />
              <div className={it.done ? "text-sm text-gray-500 line-through" : "text-sm text-gray-700"}>{it.label}</div>
            </div>
            {it.done && <div className="text-green-500"><svg width="16" height="16" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></div>}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button className="px-4 py-2 rounded-lg bg-cyan-50 text-cyan-700 font-semibold border border-cyan-100">Publish Now</button>
      </div>
    </div>
  );
}

/* Simple SVG line chart component (pure CSS + SVG) */
function LineChart({ points = [] }) {
  // points: array of numbers (y values). We'll map them to an SVG polyline.
  const width = 1000;
  const height = 220;
  const max = Math.max(...points, 1);
  const gap = width / Math.max(1, points.length - 1);
  const svgPoints = points.map((p, i) => `${i * gap},${height - (p / max) * (height - 20)}`).join(" ");

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-44">
        {/* background grid lines */}
        <defs>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <polyline points={svgPoints} fill="none" stroke="url(#grad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        {/* subtle area fill */}
        <polyline points={`${svgPoints} ${width},${height} 0,${height}`} fill="url(#grad)" fillOpacity="0.08" stroke="none" />
      </svg>
      <p className="text-xs text-center text-gray-400 mt-2">Analytics Chart</p>
    </div>
  );
}

function ShareCard() {
  const [copied, setCopied] = useState(false);
  const url = "yourname.autoclite.ai/adarsh";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow border border-gray-100 flex flex-col items-center">
      <h4 className="text-sm font-semibold text-gray-800 mb-2">Preview & Share</h4>
      <div className="text-xs text-indigo-600 font-medium mb-3">{url}</div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
          {/* QR placeholder */}
          <div className="w-14 h-14 bg-white"></div>
        </div>
        <button onClick={copy} className="px-3 py-2 text-sm rounded-lg bg-indigo-500 text-white font-semibold shadow">
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      <button className="w-full px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow flex items-center justify-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764z" fill="#fff"/></svg>
        <span>Share on LinkedIn</span>
      </button>
    </div>
  );
}

function ActivityCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow border border-gray-100">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity / To-Do</h4>
      <p className="text-sm text-gray-600">Auto-Update Sync last synced 1 hour ago. <span className="text-cyan-600 font-medium cursor-pointer">Sync Now</span></p>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-sm font-semibold text-gray-800 mb-1">To-Do:</p>
        <p className="text-sm text-gray-600">Review new README changes from "Repo-X".</p>
      </div>

      <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-500 text-white shadow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 7h18v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="#fff" /></svg>
        </div>
        <div>
          <div className="text-sm font-bold text-purple-800">Tip:</div>
          <div className="text-xs text-purple-700">Try new gradient theme to make your portfolio stand out!</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page assembly ---------- */

export default function Dashboard() {
  const [published, setPublished] = useState(true);

  const handlePublish = () => {
    // Placeholder action — connect to API later
    setPublished((p) => !p);
    // call your API e.g. api.post('/api/portfolio/publish', {published: !published})
  };

  // sample chart points for the line chart
  const chartPoints = [200, 250, 300, 360, 410, 520, 620, 750, 900, 1100];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Sidebar */}
        <Sidebar />

        {/* Main area */}
        <div className="flex-1 space-y-6">
          <Topbar onPublish={handlePublish} />

          {/* Grid: stats row */}
          <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <StatCard title="Total Views" value="1,540" accent="from-cyan-400 to-indigo-500" />
            <StatCard title="Repo Clicks" value="212" accent="from-green-400 to-teal-400" />
            <AICard />
            {/* empty placeholder for layout alignment on large screens */}
            <div className="hidden lg:block" />
          </section>

          {/* Checklist + chart area */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ChecklistCard />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <LineChart points={chartPoints} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ShareCard />
                <ActivityCard />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
