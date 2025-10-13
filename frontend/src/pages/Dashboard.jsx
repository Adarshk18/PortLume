import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch user and portfolio data from backend (example endpoint)
    const fetchData = async () => {
      try {
        const res = await fetch("/api/portfolio/dashboard");
        const data = await res.json();
        setUser(data.user);
        setProjects(data.projects || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b1b33] to-[#2c2c54] text-gray-100">
      <Navbar />

      <motion.div
        className="max-w-6xl mx-auto p-6 mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name || "Developer"} 👋</h1>
        <p className="text-gray-400 mb-8">
          Manage your AI-generated portfolio, edit projects, and view analytics.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-10">
          <Link to="/profile">
            <button className="btn btn-primary">Edit Portfolio</button>
          </Link>
          <Link to="/analytics">
            <button className="btn btn-cta-secondary">View Analytics</button>
          </Link>
          <Link to={`/public/${user?.username || "yourname"}`}>
            <button className="btn btn-cta-secondary">View Public Profile</button>
          </Link>
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((proj, i) => (
              <motion.div
                key={i}
                className="p-5 bg-[#232347] rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.03 }}
              >
                <h2 className="text-xl font-semibold mb-2">{proj.name}</h2>
                <p className="text-gray-400 text-sm mb-3 line-clamp-3">{proj.description}</p>
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View on GitHub →
                </a>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No projects found. Connect GitHub or upload a resume.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
