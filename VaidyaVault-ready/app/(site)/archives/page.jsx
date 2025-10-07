
'use client';
import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import archives from '@/data/archives.json';
import EraFilter from '@/components/EraFilter';

export default function Archives() {
  const [q, setQ] = useState('');
  const [region, setRegion] = useState('');
  const [type, setType] = useState('');
  const [era, setEra] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(()=>{
    const f = JSON.parse(localStorage.getItem('vv:favorites')||'[]');
    setFavorites(f);
  },[]);

  const toggleFav = (slug)=>{
    setFavorites(prev=>{
      const s = new Set(prev);
      if(s.has(slug)) s.delete(slug); else s.add(slug);
      const arr = Array.from(s);
      localStorage.setItem('vv:favorites', JSON.stringify(arr));
      return arr;
    });
  };

  const regions = useMemo(() => Array.from(new Set(archives.map(a => a.region))).sort(), []);
  const types = useMemo(() => Array.from(new Set(archives.map(a => a.type))).sort(), []);

  const filtered = archives.filter(a => {
    const matchesQ = q ? (a.title.toLowerCase().includes(q.toLowerCase()) || (a.summary||'').toLowerCase().includes(q.toLowerCase())) : true;
    const matchesRegion = region ? a.region === region : true;
    const matchesType = type ? a.type === type : true;
    const matchesEra = era ? a.era === era : true;
    return matchesQ && matchesRegion && matchesType && matchesEra;
  });

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Archive Explorer</h1>
        <div className="mt-4 grid md:grid-cols-4 gap-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="rounded-xl bg-white/10 px-3 py-2 outline-none" />
          <select value={region} onChange={e=>setRegion(e.target.value)} className="rounded-xl bg-white/10 px-3 py-2 outline-none">
            <option value="">All regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={type} onChange={e=>setType(e.target.value)} className="rounded-xl bg-white/10 px-3 py-2 outline-none">
            <option value="">All types</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="self-center"><EraFilter value={era} onChange={setEra}/></div>
        </div>
        <div className="text-sm text-white/60 mt-2">{filtered.length} results</div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map(a => (
          <div key={a.slug} className="p-4 rounded-xl bg-white/5 hover:bg-white/10">
            <div className="flex items-center justify-between">
              <span className="badge">{a.region}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/60">{a.type}</span>
                <button onClick={()=>toggleFav(a.slug)} title="Add to exhibit">
                  <Heart size={18} className={favorites.includes(a.slug) ? 'fill-gold text-gold' : 'text-white/60'} />
                </button>
              </div>
            </div>
            <Link href={`/archives/${a.slug}`}>
              <h3 className="mt-2 text-lg font-semibold">{a.title}</h3>
              <p className="text-sm text-white/70 line-clamp-3">{a.summary}</p>
            </Link>
            <div className="text-xs text-white/60 mt-2">{a.era}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
