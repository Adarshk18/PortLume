import React, { useEffect, useState } from 'react'
import API from '../services/api'
import ThemePicker from '../components/ThemePicker'

export default function ProfileEditor() {
  const [portfolio, setPortfolio] = useState(null)
  const [about, setAbout] = useState('')
  const [theme, setTheme] = useState('default')
  const [publicUrl, setPublicUrl] = useState('')

  useEffect(() => {
    API.get('/api/me')
      .then((r) => {
        const p = r.data.portfolio
        setPortfolio(p)
        setAbout(p?.about || '')
        setTheme(p?.theme || 'default')
        setPublicUrl(p?.publicUrl || '')
      })
      .catch(() => {})
  }, [])

  const generateAbout = async () => {
    const r = await API.post('/api/generate-about')
    setAbout(r.data.about)
  }

  const publish = async () => {
    if (!publicUrl.trim()) return alert('Enter a public URL name')
    await API.post('/api/publish', { publicUrl })
    alert('Portfolio published!')
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold mb-4">Profile Editor</h1>
      <textarea
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        className="w-full p-3 rounded-md text-black"
        rows={8}
      />
      <div className="flex gap-2">
        <button onClick={generateAbout} className="bg-indigo-500 px-3 py-2 rounded-md">
          Generate with AI
        </button>
        <button onClick={publish} className="bg-green-500 px-3 py-2 rounded-md">
          Publish
        </button>
      </div>

      <div className="space-y-2">
        <label>Public URL:</label>
        <input
          type="text"
          className="p-2 rounded-md text-black"
          value={publicUrl}
          onChange={(e) => setPublicUrl(e.target.value)}
        />
        {portfolio?.publicUrl && (
          <div className="mt-2 text-sm">
            Live URL:{' '}
            <a
              href={`/p/${portfolio.publicUrl}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              View Portfolio
            </a>
          </div>
        )}
      </div>

      <ThemePicker theme={theme} setTheme={setTheme} />
    </div>
  )
}
