
'use client';
import dynamic from 'next/dynamic';
import cultures from '@/data/cultures.json';
import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import L from 'leaflet';
const MapContainer=dynamic(()=>import('react-leaflet').then(m=>m.MapContainer),{ssr:false});
const TileLayer=dynamic(()=>import('react-leaflet').then(m=>m.TileLayer),{ssr:false});
const Marker=dynamic(()=>import('react-leaflet').then(m=>m.Marker),{ssr:false});
const Popup=dynamic(()=>import('react-leaflet').then(m=>m.Popup),{ssr:false});
const MarkerClusterGroup = dynamic(()=>import('react-leaflet-cluster').then(m=>m.default), { ssr:false });
export default function MapPage(){
  const [q,setQ]=useState('');const[era,setEra]=useState('');const[loc,setLoc]=useState(null);
  useEffect(()=>{if(navigator.geolocation){navigator.geolocation.getCurrentPosition(p=>setLoc([p.coords.latitude,p.coords.longitude]));}},[]);
  const [theme,setTheme]=useState('');
const [year,setYear]=useState(0);
const themes = useMemo(()=> Array.from(new Set(cultures.flatMap(c=>c.themes||[]))), []);

const filtered=useMemo(()=> cultures.filter(c=>{
  const MQ = q ? (c.name.toLowerCase().includes(q.toLowerCase()) || (c.summary||'').toLowerCase().includes(q.toLowerCase())) : true;
  const MT = theme ? (c.themes||[]).includes(theme) : true;
  const MY = year ? ((c.years||[])[0]||0) <= year : true;
  return MQ && MT && MY;
}), [q, theme, year]);

const iconFor = (c)=>{
  const theme = (c.themes&&c.themes[0]) || 'General';
  const emoji = theme.includes('Plant')?'🌿': theme.includes('Ritual')?'🕯': theme.includes('Women')?'👩‍⚕️': theme.includes('Epidemics')?'🦠': '📜';
  return L.divIcon({ html:`<div style="font-size:18px">${emoji}</div>`, className:'' });
};

const flyToNearby=()=>{if(!loc)return alert('Location unavailable');const near=filtered.filter(c=>{const[lat,lng]=c.coordinates;const[la,lo]=loc;const d=Math.hypot((lat-la)*111,(lng-lo)*90);return d<1500;});alert(`${near.length} traditions near you`);};
  return(<div className='space-y-4'>
    <div className='card'><h1 className='text-2xl font-semibold'>Global Map</h1>
      <div className='mt-3 grid md:grid-cols-6 gap-2'>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder='Search...' className='rounded-xl bg-white/10 px-3 py-2 outline-none'/>
        <select value={era} onChange={e=>setEra(e.target.value)} className='rounded-xl bg-white/10 px-3 py-2 outline-none'><option value=''>All eras</option>{['Ancient','Medieval','Early Modern','Modern','Contemporary'].map(e=>(<option key={e} value={e}>{e}</option>))}</select>
        <button onClick={flyToNearby} className='ghost'>Explore Nearby</button>
        <Link className='ghost' href='/archives'>Open Explorer</Link>
      </div>
      <div className='text-sm text-white/60 mt-2'>{filtered.length} entries</div>
      <div className='mt-3 grid md:grid-cols-6 gap-2'>
        <select value={theme} onChange={e=>setTheme(e.target.value)} className='rounded-xl bg-white/10 px-3 py-2 outline-none'><option value=''>All themes</option>{themes.map(t=>(<option key={t} value={t}>{t}</option>))}</select>
        <div className='col-span-5 flex items-center gap-3'>
          <span className='text-xs text-white/60'>Timeline ≤</span>
          <input type='range' min='-500' max='2025' value={year} onChange={e=>setYear(parseInt(e.target.value))} className='w-full' />
          <span className='text-xs text-white/60 w-16 text-right'>{year||'All'}</span>
        </div>
      </div>
    </div>
    <MapContainer center={[20,0]} zoom={2} scrollWheelZoom={true}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributors'/>
      {filtered.map(c=>(<Marker key={c.id} position={c.coordinates} icon={iconFor(c)}><Popup><div className='text-sm'><div className='font-semibold'>{c.name}</div><div className='text-white/60'>{c.region}</div><Link href={`/archives/${c.id}`} className='link'>View entry →</Link></div></Popup></Marker>))}
    </MapContainer>
    <div className='card mt-4'>
      <div className='text-sm text-white/60 mb-2'>Quick list (click to open entry):</div>
      <div className='grid md:grid-cols-3 gap-2'>
        {filtered.slice(0,12).map(c=>(<Link key={c.id} href={`/archives/${c.id}`} className='p-3 rounded-xl bg-white/5 hover:bg-white/10'>{c.name}<div className='text-xs text-white/60'>{c.region}</div></Link>))}
      </div>
    </div>
  </div>);
}
