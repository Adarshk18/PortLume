// src/components/AnalyticsChart.jsx
import React from 'react';

/**
 * Minimal sparkline / line chart implemented with SVG to avoid adding chart deps.
 * Expects `data` array of numbers.
 */
const AnalyticsChart = ({ data = [], width = 600, height = 140 }) => {
  if (!data || data.length === 0) return <div className="text-sm text-slate-500">No data yet</div>;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const last = data[data.length - 1];

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none" className="rounded-lg">
        <polyline fill="none" stroke="#0ea5e9" strokeWidth="2" points={points} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
        <div>Last: <span className="font-semibold text-slate-800">{last}</span></div>
        <div>Min: {min} • Max: {max}</div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
