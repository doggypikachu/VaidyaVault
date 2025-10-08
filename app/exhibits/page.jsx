
'use client';
import { useEffect, useState } from 'react';
import { downloadJSON } from '@/lib/exportLocal';
import cultures from '@/data/cultures.json';
export default function Exhibits(){const[favorites,setFavorites]=useState([]);const[title,setTitle]=useState('Untitled Exhibit');const[exhibits,setExhibits]=useState([]);
  useEffect(()=>{setFavorites(JSON.parse(localStorage.getItem('vv:favorites')||'[]'));setExhibits(JSON.parse(localStorage.getItem('vv:exhibits')||'[]'));},[]);
  const build=()=>{const items=cultures.filter(c=>favorites.includes(c.id));const ex={title,items,createdAt:new Date().toISOString()};const all=[...exhibits,ex];setExhibits(all);localStorage.setItem('vv:exhibits',JSON.stringify(all));};
  const exportEx=(ex)=>downloadJSON((ex.title||'exhibit')+'.json',ex);
  return(<div className='space-y-6'><div className='card'><h1 className='text-2xl font-semibold'>Exhibits</h1><p className='text-white/70'>Curate your own collections from favorites.</p><div className='mt-4 flex gap-2'><input value={title} onChange={e=>setTitle(e.target.value)} className='rounded-xl bg-white/10 px-3 py-2 outline-none' placeholder='Exhibit title'/><button onClick={build} className='primary'>Create from favorites</button></div></div>
    <div className='grid md:grid-cols-2 gap-4'>{exhibits.map((ex,i)=>(<div key={i} className='card'><div className='flex items-center justify-between'><h2 className='text-xl font-semibold'>{ex.title}</h2><button className='ghost text-sm' onClick={()=>exportEx(ex)}>Export JSON</button></div><div className='text-xs text-white/60 mt-1'>{new Date(ex.createdAt).toLocaleString()}</div><ul className='mt-3 list-disc list-inside text-white/80 space-y-1'>{ex.items.map(it=>(<li key={it.id}>{it.name} <span className='text-white/50'>({it.region})</span></li>))}</ul></div>))}</div></div>);}
