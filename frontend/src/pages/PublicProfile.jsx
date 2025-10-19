// src/pages/PublicProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import ProjectCard from "../components/ProjectCard.jsx";

const PublicProfile = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await API.get(`/api/portfolio/${username}`);
        setPortfolio(res.data?.data || {});
      } catch (err) {
        console.error("Error loading public profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white">
        <div className="text-slate-600">Loading profile...</div>
      </div>
    );

  if (!portfolio)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-slate-700">Profile not found</div>
      </div>
    );

  const { user, about, projects, theme } = portfolio;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-${theme || "sky"}-50 via-white to-${theme || "sky"}-100 text-slate-800`}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center mb-12">
          <img
            src={user?.avatar || "https://avatars.githubusercontent.com/u/1?v=4"}
            alt={user?.name}
            className="w-24 h-24 rounded-full shadow-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{user?.name || username}</h1>
          <p className="text-slate-600 mt-2">{user?.headline || "AI-Generated Portfolio"}</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow border border-white/20 mb-8">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-slate-700 leading-relaxed">{about || "This developer hasn't written an about section yet."}</p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects?.length > 0 ? (
            projects.map((p) => <ProjectCard key={p.id || p.name} project={p} />)
          ) : (
            <div className="text-slate-600">No public projects available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
