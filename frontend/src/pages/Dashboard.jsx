import React, { useEffect, useState } from 'react'
import API from '../services/api'
import ProjectCard from '../components/ProjectCard'

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState(null)

  useEffect(() => {
    API.get('/api/me').then((r) => setPortfolio(r.data.portfolio)).catch(() => {})
  }, [])

  const syncGithub = async () => {
    await API.post('/api/sync-github')
    const r = await API.get('/api/me')
    setPortfolio(r.data.portfolio)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Your Dashboard</h1>
      <button
        onClick={syncGithub}
        className="px-4 py-2 bg-indigo-500 rounded mb-5"
      >
        Sync GitHub Projects
      </button>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white/10 p-4 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="mt-2 text-sm">{portfolio?.about || 'No About section yet'}</p>
        </div>

        <div className="bg-white/10 p-4 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-3">Projects</h2>
          <div className="space-y-3">
            {portfolio?.projects?.length ? (
              portfolio.projects.map((p) => <ProjectCard key={p.repoId} project={p} />)
            ) : (
              <div>No projects yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
