import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import API from '../services/api'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend
} from 'recharts'

export default function Analytics() {
  const [data, setData] = useState({
    views: [],
    aiUsage: [],
    syncHistory: []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await API.get('/api/analytics')
        setData(r.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const viewsData = data.views.map((v, i) => ({
    day: `Day ${i + 1}`,
    views: v
  }))
  const aiData = data.aiUsage.map((v, i) => ({
    day: `Day ${i + 1}`,
    uses: v
  }))
  const syncData = data.syncHistory.map((v, i) => ({
    day: `Day ${i + 1}`,
    syncs: v
  }))

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Profile Views */}
        <div className="bg-white/10 rounded-xl p-5 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Profile Views</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={viewsData}>
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AI Usage */}
        <div className="bg-white/10 rounded-xl p-5 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">AI Usage (Generations)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={aiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uses" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* GitHub Syncs */}
        <div className="bg-white/10 rounded-xl p-5 shadow-lg md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">GitHub Sync History</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={syncData}>
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="syncs" stroke="#a855f7" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
