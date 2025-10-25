import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, User, BarChart3, Palette, Settings, TrendingUp, Eye, MousePointerClick, Lightbulb, Check, Square, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setTimeout(() => {
      setData({
        user: { name: 'Adarsh', username: 'adarsh' },
        analytics: { views: 1540, repoClicks: 212 },
        published: true
      });
      setLoading(false);
    }, 500);

    const interval = setInterval(() => {
      setData(prev => prev ? {
        ...prev,
        analytics: {
          views: prev.analytics.views + Math.floor(Math.random() * 5),
          repoClicks: prev.analytics.repoClicks + Math.floor(Math.random() * 3)
        }
      } : prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePublish = () => {
    alert('Publishing portfolio...');
  };

  const handleSyncNow = () => {
    alert('Syncing now...');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="text-lg text-slate-600">Loading dashboard...</div>
      </div>
    );
  }

  const user = data?.user || { name: 'Adarsh', username: 'adarsh' };
  const stats = data?.analytics || { views: 1540, repoClicks: 212 };
  const checklist = [
    { text: 'Github Connected', checked: true },
    { text: 'Resume Uploaded', checked: true },
    { text: 'AI Summaries Ready', checked: false },
    { text: 'AI Summaries Ready', checked: false },
    { text: 'Portfolio Published', checked: false }
  ];

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
                  <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2"/>
                  <circle cx="8" cy="10" r="1.5" fill="white"/>
                  <circle cx="16" cy="10" r="1.5" fill="white"/>
                  <path d="M8 14 Q12 16 16 14" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div className="font-bold text-lg text-slate-800">AutoPortfolio AI</div>
            </div>

            <nav className="space-y-2 mb-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'overview' 
                    ? 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 font-medium' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Home size={20} />
                Home/Overview
              </button>
              
              <button 
                onClick={() => setActiveTab('profile')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
              >
                <User size={20} />
                Profile Editor
              </button>
              
              <button 
                onClick={() => setActiveTab('analytics')}
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

            <button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
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
                <span className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                  Portfolio Status: Published
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={handlePublish}
                  className="bg-gradient-to-r from-blue-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  Publish & Sync
                </button>
                
                <div className="flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {user.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-slate-800">{user.name || 'Adarsh'}</div>
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
              <div className="text-4xl font-bold text-cyan-500 mb-2">{stats.views || 1540}</div>
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
              <div className="text-4xl font-bold text-cyan-500 mb-2">{stats.repoClicks || 212}</div>
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
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor"/>
                </svg>
                <div className="text-4xl font-bold text-slate-800">5/5</div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6"
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Views over the last 7 days</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {[10, 30, 20, 60, 80, 120, 140].map((val, i) => {
                  const height = (val / 140) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-t-lg transition-all hover:from-cyan-500 hover:to-cyan-400"
                        style={{ height: `${height}%`, minHeight: '20px' }}
                      />
                      <span className="text-xs text-slate-500">{['0', '100', '200', '300', '400', '500', '1000'][i]}</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-center text-sm text-slate-500 mt-4">AnalyticsChart</div>
            </motion.div>

            <div className="space-y-6">
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Portfolio Checklist/Activity</h3>
                <div className="space-y-3">
                  {checklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.checked ? (
                        <div className="w-5 h-5 bg-emerald-400 rounded flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      ) : (
                        <Square size={20} className="text-slate-300" />
                      )}
                      <span className={`text-sm ${item.checked ? 'text-slate-700' : 'text-slate-500'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={handlePublish}
                  className="w-full mt-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  Publish Now
                  <ArrowRight size={18} />
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Preview & Share</h3>
                <div className="text-sm text-slate-600 mb-4 break-all">
                  yourname.autokile.ai/adarsh
                </div>
                <div className="flex gap-2 mb-4">
                  <button className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition">
                    Copy Link
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    LinkedIn
                  </button>
                </div>
                <div className="bg-slate-100 rounded-xl p-4 flex items-center justify-center">
                  <div className="w-24 h-24 bg-slate-800 rounded-lg flex items-center justify-center text-white text-xs">
                    QR Code
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200/50 p-6"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity/To-Do</h3>
                <div className="space-y-3">
                  <div className="text-sm text-slate-600">
                    Auto-Update Sync Last synced 1 hour ago.
                    <button onClick={handleSyncNow} className="ml-2 text-cyan-500 font-medium hover:underline">
                      Sync Now
                    </button>
                    <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">Beta</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <div className="text-sm">
                      <div className="font-medium text-slate-700">To-Do:</div>
                      <div className="text-slate-600">Review new README changes from "Repo-X"</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl shadow-xl p-6 text-white"
              >
                <div className="font-semibold mb-2">Tip:</div>
                <div className="text-sm">Try new gradient theme to stand out!</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}