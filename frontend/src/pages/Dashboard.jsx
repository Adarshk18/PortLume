// src/views/Dashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Home,
  User,
  BarChart3,
  Palette,
  Settings,
  TrendingUp,
  Eye,
  MousePointerClick,
  Lightbulb,
  Check,
  Square,
  ArrowRight,
  Loader2,
  FileText,
  ExternalLink,
} from "lucide-react";
import API, { getPortfolioData } from "../services/api";

/**
 * Updated Dashboard
 * - Uses real API (API + getPortfolioData from services/api)
 * - Fixes missing imports and states (generatingAI, uploading)
 * - Real-time checklist derived from live portfolio object
 * - Re-fetches after actions so checklist & sections update immediately
 * - Fixed Preview & Share rendering & copy/view actions
 * - Basic error handling and loading states
 *
 * NOTE: This file assumes your ../services/api exports:
 *  - default axios instance `API` with .get/.post
 *  - named `getPortfolioData()` that returns portfolio object
 *
 * Paste over your existing Dashboard.jsx
 */

export default function Dashboard() {
  const navigate = useNavigate();

  // Data
  const [portfolio, setPortfolio] = useState(null);
  const [user, setUser] = useState(null);

  // UI state
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [syncing, setSyncing] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [publicUrl, setPublicUrl] = useState("");
  const pollingRef = useRef(null);

  // Derived stats
  const stats = {
    views: portfolio?.views || 0,
    repoClicks: portfolio?.repoClicks || 0,
  };

  // Derived checklist (live)
  const checklistItems = [
    { key: "githubConnected", text: "Github Connected", checked: !!portfolio?.githubConnected },
    { key: "resumeUploaded", text: "Resume Uploaded", checked: !!portfolio?.resumeUrl },
    { key: "about", text: "AI About Generated", checked: !!portfolio?.about },
    { key: "projects", text: "Projects Added", checked: (portfolio?.projects?.length || 0) > 0 },
    { key: "published", text: "Portfolio Published", checked: !!portfolio?.portfolioPublished },
  ];

  // Load user + portfolio
  const loadData = async (opts = { showErrors: false }) => {
    try {
      setLoading((s) => s || false); // only true first time
      const [pData, userRes] = await Promise.allSettled([
        getPortfolioData(),
        API.get("/api/user/me"),
      ]);

      if (pData.status === "fulfilled") {
        setPortfolio(pData.value);
        setPublicUrl(pData.value.publicUrl || "");
      } else {
        if (opts.showErrors) console.error("Portfolio fetch failed:", pData.reason);
      }

      if (userRes.status === "fulfilled") {
        setUser(userRes.value.data?.data || null);
      } else {
        if (opts.showErrors) console.error("User fetch failed:", userRes.reason);
        // if unauthorized, redirect
        const errMsg = String(userRes.reason || "");
        if (errMsg.includes("401") || errMsg.includes("No authentication")) {
          navigate("/login");
        }
      }
    } catch (err) {
      console.error("loadData error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Start polling and initial load
  useEffect(() => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("ap_token");
    if (!token) {
      navigate("/login");
      return;
    }

    // initial load
    loadData();

    // polling every 5s to show "realtime-like" updates
    pollingRef.current = setInterval(() => {
      loadData();
    }, 5000);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // Quick helper: refresh portfolio only (avoid fetching user again)
  const refreshPortfolio = async () => {
    try {
      const p = await getPortfolioData();
      setPortfolio(p);
      setPublicUrl(p.publicUrl || "");
    } catch (err) {
      console.error("refreshPortfolio error:", err);
    }
  };

  // Sync GitHub
  const handleSyncGithub = async () => {
    try {
      setSyncing(true);
      const res = await API.post("/api/portfolio/sync-github");
      if (res.data?.ok) {
        // reload portfolio (projects will be pulled)
        await refreshPortfolio();
        alert("GitHub synced successfully!");
      } else {
        alert(res.data?.message || "Sync failed");
      }
    } catch (err) {
      console.error("Sync error:", err);
      alert(err.response?.data?.message || "GitHub sync failed");
    } finally {
      setSyncing(false);
    }
  };

  // Publish portfolio
  const handlePublish = async () => {
    if (!publicUrl.trim()) {
      alert("Please enter a public URL first");
      return;
    }

    try {
      setPublishing(true);
      const res = await API.post("/api/portfolio/publish", { publicUrl: publicUrl.trim() });
      if (res.data?.ok) {
        await refreshPortfolio();
        alert("Portfolio published successfully!");
      } else {
        alert(res.data?.message || "Publish failed");
      }
    } catch (err) {
      console.error("Publish error:", err);
      alert(err.response?.data?.message || "Publish failed");
    } finally {
      setPublishing(false);
    }
  };

  // Generate About with AI
  const handleGenerateAbout = async () => {
    try {
      setGeneratingAI(true);
      const res = await API.post("/api/portfolio/generate-about");
      if (res.data?.ok) {
        await refreshPortfolio();
        alert("About section generated!");
      } else {
        alert(res.data?.message || "AI generation failed");
      }
    } catch (err) {
      console.error("Generate error:", err);
      alert(err.response?.data?.message || "AI generation failed");
    } finally {
      setGeneratingAI(false);
    }
  };

  // Upload resume
  const handleUploadResume = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploadingResume(true);
      const res = await API.post("/api/portfolio/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.ok) {
        await refreshPortfolio();
        alert("Resume uploaded successfully!");
      } else {
        alert(res.data?.message || "Resume upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.message || "Resume upload failed");
    } finally {
      setUploadingResume(false);
    }
  };

  // Copy preview link
  const handleCopyLink = () => {
    const url = `${window.location.origin}/u/${portfolio?.publicUrl || publicUrl}`;
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  };

  // Open live portfolio
  const handleOpenLive = () => {
    const path = `/u/${portfolio?.publicUrl || publicUrl}`;
    window.open(path, "_blank", "noopener");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-cyan-500" size={40} />
          <div className="text-lg text-slate-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 p-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-6">
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-12 lg:col-span-3"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6 sticky top-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" />
                  <circle cx="8" cy="10" r="1.5" fill="white" />
                  <circle cx="16" cy="10" r="1.5" fill="white" />
                  <path d="M8 14 Q12 16 16 14" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div className="font-bold text-lg text-slate-800">PortLume AI</div>
            </div>

            <nav className="space-y-2 mb-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 font-medium"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Home size={20} />
                Home/Overview
              </button>

              <button
                onClick={() => navigate("/profile-editor")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
              >
                <User size={20} />
                Profile Editor
              </button>

              <button
                onClick={() => navigate("/analytics")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
              >
                <BarChart3 size={20} />
                Analytics
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
                <Palette size={20} />
                Themes/Styles
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
                <Settings size={20} />
                Settings
              </button>
            </nav>

            <button className="bg-gradient-to-r from-blue-500 to-orange-500 text-white font-semibold px-14 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50">
              Upgrade to Pro
              <TrendingUp size={18} />
            </button>
          </div>
        </motion.aside>

        <div className="col-span-12 lg:col-span-9 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${
                    portfolio?.portfolioPublished
                      ? "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200"
                      : "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 border-amber-200"
                  }`}
                >
                  Portfolio Status: {portfolio?.portfolioPublished ? "Published" : "Draft"}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handlePublish}
                  disabled={publishing}
                  className="bg-gradient-to-r from-blue-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {publishing ? <Loader2 className="animate-spin" size={20} /> : null}
                  {publishing ? "Publishing..." : "Publish & Sync"}
                </button>

                <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3">
                  {user?.githubAvatarUrl ? (
                    <img
                      src={user.githubAvatarUrl}
                      alt={user.displayName || user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {user?.displayName?.[0]?.toUpperCase() ||
                        user?.username?.[0]?.toUpperCase() ||
                        "U"}
                    </div>
                  )}
                  <div className="text-sm">
                    <div className="font-semibold text-slate-800">
                      {user?.displayName || user?.username || "User"}
                    </div>
                    <div className="text-xs text-slate-500">{user?.email}</div>
                  </div>
                  <button className="ml-2 text-slate-400">▼</button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-slate-600 text-sm font-medium">Total Views</div>
                <Eye className="text-slate-400" size={20} />
              </div>
              <div className="text-4xl font-bold text-cyan-500 mb-2">{stats.views}</div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <TrendingUp size={16} className="text-emerald-500" />
                <span>Analytics available</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-slate-600 text-sm font-medium">Repo Clicks</div>
                <MousePointerClick className="text-slate-400" size={20} />
              </div>
              <div className="text-4xl font-bold text-cyan-500 mb-2">{stats.repoClicks}</div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <TrendingUp size={16} className="text-emerald-500" />
                <span>Track engagement</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-slate-600 text-sm font-medium">AI Generations Left</div>
                <Lightbulb className="text-slate-400" size={20} />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-amber-400">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" />
                </svg>
                <div className="text-4xl font-bold text-slate-800">
                  {user?.plan === "pro" ? "∞" : `${5 - (user?.aiUsageThisMonth || 0)}/5`}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Projects */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">Your Projects</h3>
                  <span className="text-sm text-slate-500">{portfolio?.projects?.length || 0} repos</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolio?.projects && portfolio.projects.length > 0 ? (
                    portfolio.projects.slice(0, 4).map((project, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-slate-800 text-sm">{project.name}</h4>
                          <span className="text-xs text-amber-600">⭐ {project.stars || 0}</span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-2">{project.description || "No description"}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {project.languages?.slice(0, 2).map((lang, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">{lang}</span>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 text-slate-500">
                      <p>No projects yet. Click "Sync GitHub Now" to import your repos!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* About */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">About You</h3>
                {portfolio?.about ? (
                  <>
                    <p className="text-slate-700 leading-relaxed">{portfolio.about}</p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={handleGenerateAbout}
                        disabled={generatingAI}
                        className="px-3 py-2 bg-purple-50 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-100 transition disabled:opacity-50 flex items-center gap-2"
                      >
                        {generatingAI ? <Loader2 className="animate-spin" size={14} /> : "✨"}
                        {generatingAI ? "Regenerating..." : "Regenerate with AI"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-slate-500">
                    <p>No About section yet. Generate it using AI to get started.</p>
                    <div className="mt-4">
                      <button
                        onClick={handleGenerateAbout}
                        disabled={generatingAI}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2"
                      >
                        {generatingAI ? <Loader2 className="animate-spin" size={14} /> : "Generate About with AI"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Resume */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">Your Resume</h3>
                      <p className="text-sm text-slate-500">
                        {portfolio?.resumeUrl ? "Uploaded successfully" : "Not uploaded"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {portfolio?.resumeUrl ? (
                      <a
                        href={portfolio.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-md text-sm font-medium hover:bg-emerald-200 transition flex items-center gap-2"
                      >
                        View <ExternalLink size={14} />
                      </a>
                    ) : null}

                    <label className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition ${uploadingResume ? "opacity-60" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
                      {uploadingResume ? "Uploading..." : "Upload Resume"}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleUploadResume}
                        className="hidden"
                        disabled={uploadingResume}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Views Chart (placeholder) */}
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-6">Views over the last 7 days</h3>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[10, 30, 20, 60, 80, 120, 140].map((val, i) => {
                    const height = (val / 140) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-t-lg transition-all hover:from-cyan-500 hover:to-cyan-400" style={{ height: `${height}%`, minHeight: "20px" }} />
                        <span className="text-xs text-slate-500">{["0", "100", "200", "300", "400", "500", "1000"][i]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-center text-sm text-slate-500 mt-4">AnalyticsChart</div>
            </motion.div>

            <div className="space-y-6">
              {/* Checklist */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Portfolio Checklist</h3>
                <div className="space-y-3">
                  {checklistItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.checked ? (
                        <div className="w-5 h-5 bg-emerald-400 rounded flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      ) : (
                        <Square size={20} className="text-slate-300" />
                      )}
                      <span className={`text-sm ${item.checked ? "text-slate-700" : "text-slate-500"}`}>{item.text}</span>
                    </div>
                  ))}
                </div>

                <input type="text" placeholder="Enter your username (e.g., john-doe)" value={publicUrl} onChange={(e) => setPublicUrl(e.target.value)} className="w-full mt-4 px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400" />
                <button onClick={handlePublish} disabled={publishing} className="w-full mt-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50">
                  {publishing ? <Loader2 className="animate-spin" size={18} /> : null}
                  {publishing ? "Publishing..." : "Publish Now"}
                  {!publishing && <ArrowRight size={18} />}
                </button>
              </motion.div>

              {/* Preview & Share */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Preview & Share</h3>

                {portfolio?.portfolioPublished && (portfolio?.publicUrl || publicUrl) ? (
                  <>
                    <div className="text-sm text-slate-600 mb-4 break-all">{`${window.location.origin}/u/${portfolio.publicUrl || publicUrl}`}</div>

                    <div className="flex gap-2 mb-4">
                      <button onClick={handleCopyLink} className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">Copy Link</button>

                      <a href={portfolio?.publicUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + "/u/" + portfolio.publicUrl)}` : "#"} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                        LinkedIn
                      </a>
                    </div>

                    <button onClick={handleOpenLive} className="w-full px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition flex items-center justify-center gap-2">
                      View Live Portfolio <ExternalLink size={14} />
                    </button>

                    <p className="mt-3 text-xs text-slate-500">👁 {portfolio?.views || 0} Views • 🔗 {portfolio?.repoClicks || 0} Repo Clicks</p>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-slate-500 text-sm mb-3">Publish your portfolio to get a shareable link!</p>
                    <p className="text-xs text-slate-400">Enter a username above and click "Publish Now"</p>
                  </div>
                )}
              </motion.div>

              {/* Quick Actions */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button onClick={handleSyncGithub} disabled={syncing} className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition flex items-center justify-center gap-2 disabled:opacity-50">
                    {syncing ? <Loader2 className="animate-spin" size={16} /> : null}
                    {syncing ? "Syncing..." : "Sync GitHub Now"}
                  </button>

                  <button onClick={handleGenerateAbout} disabled={generatingAI} className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition disabled:opacity-50">
                    {generatingAI ? <Loader2 className="animate-spin" size={16} /> : null}
                    Generate About with AI
                  </button>

                  <label className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition cursor-pointer flex items-center justify-center gap-2">
                    Upload Resume
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleUploadResume} className="hidden" />
                  </label>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl shadow-xl p-6 text-white">
                <div className="font-semibold mb-2">Tip:</div>
                <div className="text-sm">Complete all checklist items to unlock your full portfolio potential!</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
