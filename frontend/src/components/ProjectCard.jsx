// src/components/ProjectCard.jsx
import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="p-4 bg-white/10 rounded-xl shadow-lg">
      <a href={project.url || '#'} target="_blank" rel="noreferrer" className="text-lg font-semibold text-slate-900">
        {project.name}
      </a>
      <p className="text-sm mt-2 text-slate-600">{project.description || project.summary || 'No description available'}</p>
      <div className="flex items-center gap-3 mt-3 text-xs opacity-80 text-slate-700">
        <span>⭐ {project.stars ?? 0}</span>
        <span>{(project.languages || []).slice(0, 3).join(', ')}</span>
      </div>
    </motion.div>
  )
}
