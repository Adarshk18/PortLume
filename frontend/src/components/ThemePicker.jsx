import React from 'react'

export default function ThemePicker({ theme, setTheme }) {
  const themes = ['default', 'light', 'neon', 'gradient']

  return (
    <div className="flex gap-3">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-3 py-2 rounded-md ${
            t === theme ? 'bg-indigo-500' : 'bg-white/10'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
