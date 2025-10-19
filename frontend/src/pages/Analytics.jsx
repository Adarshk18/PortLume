// src/pages/Analytics.jsx
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import AnalyticsChart from '../components/AnalyticsChart';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({ views: 0, repoClicks: 0, trend: [] });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get('/api/analytics');
        setAnalytics(res.data.data || res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto p-6 bg-white/60 rounded-2xl border border-white/30">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-slate-600">Total Views</div>
            <div className="text-2xl font-bold">{analytics?.views ?? 0}</div>
          </div>

          <div>
            <div className="text-sm text-slate-600">Repo Clicks</div>
            <div className="text-2xl font-bold">{analytics?.repoClicks ?? 0}</div>
          </div>
        </div>

        <div className="mt-8">
          <AnalyticsChart data={analytics?.trend || [10, 20, 40, 60, 120]} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
