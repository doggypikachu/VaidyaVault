
'use client';
import { useEffect, useState } from 'react';
import { downloadJSON } from '@/lib/exportLocal';
import archives from '@/data/archives.json';

export default function Exhibits(){
  const [favorites, setFavorites] = useState([]);
  const [title, setTitle] = useState('Untitled Exhibit');
  const [exhibits, setExhibits] = useState([]);

  useEffect(()=>{
    setFavorites(JSON.parse(localStorage.getItem('vv:favorites')||'[]'));
    setExhibits(JSON.parse(localStorage.getItem('vv:exhibits')||'[]'));
  },[]);

  const buildFromFavorites = ()=>{
    const items = archives.filter(a => favorites.includes(a.slug));
    const ex = { title, items, createdAt: new Date().toISOString() };
    const all = [...exhibits, ex];
    setExhibits(all);
    localStorage.setItem('vv:exhibits', JSON.stringify(all));
  };

  const exportExhibit = (ex)=> downloadJSON((ex.title||'exhibit')+'.json', ex);

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Exhibits</h1>
        <p className="text-white/70">Turn your favorited entries into a curated, shareable exhibit. (Favorites are the hearts you toggled in the Explorer.)</p>
        <div className="mt-4 flex gap-2">
          <input value={title} onChange={e=>setTitle(e.target.value)} className="rounded-xl bg-white/10 px-3 py-2 outline-none" placeholder="Exhibit title" />
          <button onClick={buildFromFavorites} className="px-4 py-2 rounded-xl bg-herbal">Create from favorites</button>
          <div className="text-sm text-white/60 self-center">{favorites.length} favorites</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {exhibits.map((ex, i)=> (
          <div key={i} className="card">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{ex.title}</h2>
              <button className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-sm" onClick={()=>exportExhibit(ex)}>Export JSON</button>
            </div>
            <div className="text-xs text-white/60 mt-1">{new Date(ex.createdAt).toLocaleString()}</div>
            <ul className="mt-3 list-disc list-inside text-white/80 space-y-1">
              {ex.items.map(it => <li key={it.slug}>{it.title} <span className="text-white/50">({it.region} · {it.era})</span></li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
