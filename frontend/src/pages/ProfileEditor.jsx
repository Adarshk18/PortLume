// src/pages/ProfileEditor.jsx
import React, { useEffect, useState } from 'react';
import API from '../services/api';

const ProfileEditor = () => {
  const [profile, setProfile] = useState({ about: '', name: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get('/api/portfolio/me');
        setProfile(res.data.data?.profile || { about: '', name: '' });
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await API.put('/api/portfolio', { profile });
      setSaving(false);
      alert('Profile saved');
    } catch (err) {
      setSaving(false);
      console.error(err);
      alert('Save failed');
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto bg-white/60 rounded-2xl p-6 border border-white/30">
        <h2 className="text-xl font-semibold mb-4">Profile Editor</h2>

        <label className="block text-sm text-slate-700">Name</label>
        <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full mt-2 p-3 rounded-lg border" />

        <label className="block text-sm text-slate-700 mt-4">About</label>
        <textarea rows={6} value={profile.about} onChange={(e) => setProfile({ ...profile, about: e.target.value })} className="w-full mt-2 p-3 rounded-lg border" />

        <div className="mt-4 flex gap-3">
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-sky-500 text-white">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
