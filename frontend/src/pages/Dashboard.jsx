import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import io from "socket.io-client";
import API, { API_BASE, getPortfolioData } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import ThemePicker from "../components/ThemePicker";
import { useNavigate } from "react-router-dom";

// ============================================================
// 📦 Sidebar
// ============================================================
const Sidebar = ({ user, onPublish, onSync }) => (
  <aside className="w-72 bg-white/30 backdrop-blur border border-white/20 rounded-2xl p-4 flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-white flex items-center justify-center font-medium">
        {user?.name ? user.name[0].toUpperCase() : "A"}
      </div>
      <div>
        <div className="font-semibold text-slate-800">
          {user?.name || "Adarsh"}
        </div>
        <div className="text-xs text-slate-600">
          {user?.email || "Connected via GitHub"}
        </div>
      </div>
    </div>

    <nav className="flex flex-col gap-2 mt-2">
      <button className="text-left px-3 py-2 rounded-md bg-white/20">
        Home / Overview
      </button>
      <button className="text-left px-3 py-2 rounded-md hover:bg-white/10">
        Profile Editor
      </button>
      <button className="text-left px-3 py-2 rounded-md hover:bg-white/10">
        Analytics
      </button>
      <button className="text-left px-3 py-2 rounded-md hover:bg-white/10">
        Themes
      </button>
      <button className="text-left px-3 py-2 rounded-md hover:bg-white/10">
        Settings
      </button>
    </nav>

    <div className="mt-auto">
      <button
        onClick={onPublish}
        className="w-full px-3 py-2 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold"
      >
        Publish & Sync
      </button>
      <button
        onClick={onSync}
        className="w-full mt-3 px-3 py-2 rounded-md border border-white/20"
      >
        Sync Now
      </button>
    </div>
  </aside>
);

// ============================================================
// 📊 Small Stat
// ============================================================
const SmallStat = ({ title, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 rounded-xl bg-white/30 border border-white/20"
  >
    <div className="text-xs text-slate-600">{title}</div>
    <div className="text-2xl font-semibold text-slate-900 mt-2">{value}</div>
  </motion.div>
);

// ============================================================
// 📈 Analytics Chart (Sparkline)
// ============================================================
const AnalyticsChart = ({ values = [] }) => {
  const max = Math.max(...values, 1);
  const points = values
    .map(
      (v, i) =>
        `${(i / (values.length - 1 || 1)) * 100},${100 - (v / max) * 100}`
    )
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" className="w-full h-40">
      <polyline
        fill="none"
        stroke="#06b6d4"
        strokeWidth="2"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ============================================================
// 🧠 Main Dashboard Component
// ============================================================
export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("ap_token") || localStorage.getItem("token");

  // --------------------------------------
  // Load portfolio data
  // --------------------------------------
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    setLoading(true);
    getPortfolioData()
      .then((d) => {
        setData(d);
      })
      .catch((err) => {
        console.error("Dashboard load error:", err);
        if (err.message.includes("401")) navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate, token]);

  // --------------------------------------
  // 🧩 Connect Socket.IO for live updates
  // --------------------------------------
  useEffect(() => {
    if (!data?.user?._id) return;

    const s = io(API_BASE, {
      transports: ["websocket"],
      auth: { token },
    });

    setSocket(s);
    console.log("🔌 Connected to socket:", s.id);

    // Join the user's room
    s.emit("join-room", data.user._id);

    // Listen for live portfolio updates
    s.on("portfolio:update", (payload) => {
      console.log("📡 Live update received:", payload);
      setData((prev) => ({ ...prev, ...payload }));
    });

    // Optional: handle disconnects/reconnects
    s.on("disconnect", () => console.warn("Socket disconnected"));
    s.on("connect_error", (err) => console.error("Socket error:", err));

    return () => s.disconnect();
  }, [data?.user?._id, token]);

  // --------------------------------------
  // Publish handler
  // --------------------------------------
  const handlePublish = async () => {
    try {
      setPublishing(true);
      await API.post("/api/portfolio/publish");
      const updated = await getPortfolioData();
      setData(updated);
    } catch (err) {
      console.error("Publish error", err);
      alert("Publish failed");
    } finally {
      setPublishing(false);
    }
  };

  // --------------------------------------
  // Sync handler
  // --------------------------------------
  const handleSync = async () => {
    try {
      await API.post("/api/portfolio/sync");
      const updated = await getPortfolioData();
      setData(updated);
      alert("Sync completed");
    } catch (err) {
      console.error(err);
      alert("Sync failed");
    }
  };

  // --------------------------------------
  // Render loading state
  // --------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8fafc] to-white">
        <div className="text-slate-700">Loading dashboard…</div>
      </div>
    );
  }

  // --------------------------------------
  // Extract data
  // --------------------------------------
  const user = data?.user || {};
  const projects = data?.projects || [];
  const stats = data?.analytics || { views: 0, repoClicks: 0, recent: [] };

  // --------------------------------------
  // UI Layout
  // --------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        <div className="lg:col-span-3">
          <Sidebar user={user} onPublish={handlePublish} onSync={handleSync} />
        </div>

        <div className="lg:col-span-9 space-y-6">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-sm text-slate-600">Portfolio Status</div>
              <div className="text-lg font-semibold">
                {data?.published ? "Published" : "Draft"}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-700">AI Generations Left</div>
              <div className="px-3 py-2 rounded-md bg-white/30 border border-white/20">
                {data?.limits?.aiGenerationsLeft ?? 5}/5
              </div>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow"
              >
                {publishing ? "Publishing..." : "Publish Now"}
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SmallStat title="Total Views" value={stats.views ?? 0} />
            <SmallStat title="Repo Clicks" value={stats.repoClicks ?? 0} />
            <SmallStat
              title="AI Generations Left"
              value={`${data?.limits?.aiGenerationsLeft ?? 5}/5`}
            />
          </div>

          {/* Projects and analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* left: projects */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-white/40 border border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Projects</div>
                  <div className="text-sm text-slate-600">
                    {projects.length} repos
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.length === 0 ? (
                    <div className="text-sm text-slate-600">
                      No projects found. Connect GitHub / Sync to load repos.
                    </div>
                  ) : (
                    projects.map((p) => (
                      <ProjectCard key={p.id || p.name} project={p} />
                    ))
                  )}
                </div>
              </motion.div>

              {/* Recent activity */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-white/40 border border-white/20"
              >
                <div className="font-semibold mb-2">Recent Activity / To-Do</div>
                <ul className="text-sm text-slate-600 space-y-2">
                  {(data?.recentActivity || []).map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-sky-400 rounded-full mt-2" />
                      <div>
                        <div className="font-medium text-slate-800">
                          {r.title}
                        </div>
                        <div className="text-xs text-slate-600">{r.meta}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* right: preview + charts */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/40 border border-white/20">
                <div className="font-semibold">Preview & Share</div>
                <div className="text-sm text-slate-600 mt-2 break-all">
                  {data?.publicUrl || "yourname.autofolio.ai/you"}
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(data?.publicUrl || "")
                    }
                    className="px-3 py-2 rounded-md bg-white/20"
                  >
                    Copy Link
                  </button>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      data?.publicUrl || ""
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-md bg-blue-600 text-white"
                  >
                    Share on LinkedIn
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/40 border border-white/20">
                <div className="font-semibold">Views over the last 7 days</div>
                <div className="mt-3">
                  <AnalyticsChart
                    values={stats.recent || [10, 30, 20, 60, 80, 120, 140]}
                  />
                </div>
              </div>

              <ThemePicker onPick={(t) => console.log("theme", t)} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
