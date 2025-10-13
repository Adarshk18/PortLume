import React, { useEffect, useState } from 'react';
import api from '../services/api';


const ProfileEditor = () => {
  const [profile, setProfile] = useState({ about: '', name: '' });
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await api.get('/portfolio/me');
        if (mounted && res.data) setProfile({ ...res.data, about: res.data.about || '' });
      } catch (e) { console.error(e); }
    }
    load();
    return () => { mounted = false; };
  }, []);


  async function save() {
    setSaving(true);
    try {
      await api.put('/portfolio', profile);
      alert('Saved');
    } catch (e) {
      console.error(e);
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  }


  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile Editor</h1>
      <label className="block mb-2">Name</label>
      <input className="w-full mb-4 p-3 rounded bg-white/5 border border-white/10" value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />


      <label className="block mb-2">About</label>
      <textarea rows={6} className="w-full mb-4 p-3 rounded bg-white/5 border border-white/10" value={profile.about || ''} onChange={(e) => setProfile({ ...profile, about: e.target.value })} />


      <div className="flex gap-4">
        <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        <button className="btn" onClick={() => alert('Generate using AI (backend integration)')}>Regenerate with AI</button>
      </div>
    </div>
  );
};


export default ProfileEditor;