import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import ProjectCard from '../components/ProjectCard';


const PublicProfile = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await api.get(`/portfolio/public/${username}`);
        if (mounted) setData(res.data);
      } catch (e) { console.error(e); }
      finally { if (mounted) setLoading(false); }
    }
    load();
    return () => { mounted = false; };
  }, [username]);


  if (loading) return <div className="p-8">Loading...</div>;
  if (!data) return <div className="p-8">No public profile found.</div>;


  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{data.name}</h1>
        <p className="mt-2 text-lg text-slate-300">{data.about}</p>
      </header>


      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.projects?.map((p) => <ProjectCard key={p._id || p.name} project={p} />)}
      </section>
    </div>
  );
};


export default PublicProfile;