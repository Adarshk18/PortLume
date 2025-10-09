import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../services/api'

export default function PublicProfile() {
  const { publicUrl } = useParams()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    API.get(`/api/public/${publicUrl}`).then((r) => setProfile(r.data.profile))
    API.post(`/api/track-view/${publicUrl}`).catch(() => {})
  }, [publicUrl])

  if (!profile) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto bg-white/10 p-6 rounded-2xl">
      <div className="flex items-center gap-4">
        <img
          src={profile.user.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full border-2 border-indigo-400"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.user.displayName}</h1>
          <p className="text-sm opacity-80">{profile.headline}</p>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="font-semibold">About</h3>
        <p className="mt-2 text-sm">{profile.about}</p>
      </section>

      <section className="mt-6">
        <h3 className="font-semibold mb-2">Projects</h3>
        <div className="space-y-3">
          {profile.projects.map((p) => (
            <div key={p.repoId} className="p-3 bg-white/5 rounded-lg">
              <a href={p.url} target="_blank" rel="noreferrer" className="font-semibold">
                {p.name}
              </a>
              <p className="text-sm mt-1">{p.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
