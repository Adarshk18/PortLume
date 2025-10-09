import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-4 bg-white/10 rounded-xl shadow-lg"
    >
      <a href={project.url} target="_blank" rel="noreferrer" className="text-lg font-semibold">
        {project.name}
      </a>
      <p className="text-sm mt-1">{project.description}</p>
      <div className="flex items-center gap-3 mt-2 text-xs opacity-80">
        <span>⭐ {project.stars}</span>
        <span>{project.languages?.join(', ')}</span>
      </div>
    </motion.div>
  )
}
