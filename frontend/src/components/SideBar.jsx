// src/components/Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-72 p-5 bg-white/40 border border-white/30 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
          {user?.name?.[0] || 'A'}
        </div>
        <div>
          <div className="font-semibold">{user?.name || 'Adarsh'}</div>
          <div className="text-xs text-slate-600">{user?.email || 'you@example.com'}</div>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className="p-2 rounded-lg hover:bg-white/20">Home/Overview</Link>
        <Link to="/profile-editor" className="p-2 rounded-lg hover:bg-white/20">Profile Editor</Link>
        <Link to="/analytics" className="p-2 rounded-lg hover:bg-white/20">Analytics</Link>
        <Link to="/themes" className="p-2 rounded-lg hover:bg-white/20">Themes/Styles</Link>
        <Link to="/settings" className="p-2 rounded-lg hover:bg-white/20">Settings</Link>
      </nav>

      <div className="mt-6">
        <motion.button whileHover={{ scale: 1.02 }} className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-400 to-pink-500 text-white">
          Upgrade to Pro
        </motion.button>
      </div>
    </aside>
  );
};

export default Sidebar;
