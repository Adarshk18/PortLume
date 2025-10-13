import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Fetch analytics data (example endpoint)
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/portfolio/analytics");
        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b1b33] to-[#2c2c54] text-gray-100">
      <Navbar />

      <motion.div
        className="max-w-5xl mx-auto p-6 mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-6">📈 Portfolio Analytics</h1>

        {analytics ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#232347] rounded-xl shadow-lg">
              <p className="text-gray-400">Profile Views</p>
              <h2 className="text-3xl font-bold">{analytics.views}</h2>
            </div>
            <div className="p-6 bg-[#232347] rounded-xl shadow-lg">
              <p className="text-gray-400">Project Clicks</p>
              <h2 className="text-3xl font-bold">{analytics.clicks}</h2>
            </div>
            <div className="p-6 bg-[#232347] rounded-xl shadow-lg">
              <p className="text-gray-400">GitHub Repos</p>
              <h2 className="text-3xl font-bold">{analytics.repos}</h2>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 mt-10 text-center">
            Loading analytics data or no analytics found.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Analytics;
