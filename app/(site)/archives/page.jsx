
'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import cultures from '@/data/cultures.json';
import EraFilter from '@/components/EraFilter';
import { yearsToEra } from '@/lib/util';
export default function Archives(){
  const [q,setQ]=useState('');const[region,setRegion]=useState('');const[era,setEra]=useState('');const[theme,setTheme]=useState('');
  const themes=useMemo(()=>Array.from(new Set(cultures.flatMap(c=>c.themes||[]))),[]);
  const regions=useMemo(()=>Array.from(new Set(cultures.map(c=>c.region))).sort(),[]);
  const filtered=cultures.filter(c=>{const mQ=q?(c.name.toLowerCase().includes(q.toLowerCase())||(c.summary||'').toLowerCase().includes(q.toLowerCase())):True=>true;return true;});
  const f=cultures.filter(c=>{const MQ=q?(c.name.toLowerCase().includes(q.toLowerCase())||(c.summary||'').toLowerCase().includes(q.toLowerCase())):true;const MR=region?c.region===region:true;const e=yearsToEra((c.years||[])[0]||0);const ME=era?e===era:true;const MT=theme?(c.themes||[]).includes(theme):true;return MQ&&MR&&ME&&MT;});
  return(<div className="space-y-6">
    <div className="card">
      <h1 className="text-2xl font-semibold">Archive Explorer</h1>
      <div className="mt-4 grid md:grid-cols-4 gap-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="rounded-xl bg-white/10 px-3 py-2 outline-none"/>
        <select value={region} onChange={e=>setRegion(e.target.value)} className="rounded-xl bg-white/10 px-3 py-2 outline-none"><option value=''>All regions</option>{regions.map(r=>(<option key={r} value={r}>{r}</option>))}</select>
        <EraFilter value={era} onChange={setEra}/>
        <select value={theme} onChange={e=>setTheme(e.target.value)} className="rounded-xl bg-white/10 px-3 py-2 outline-none"><option value=''>All themes</option>{themes.map(t=>(<option key={t} value={t}>{t}</option>))}</select>
      </div>
      <div className="text-sm text-white/60 mt-2">{f.length} results</div>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      {f.map(c=>(<div key={c.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10">
        <div className="flex items-center justify-between"><span className="badge">{c.region}</span><span className="text-xs text-white/60">{(c.themes||[]).slice(0,2).join(' · ')}</span></div>
        <Link href={`/archives/${c.id}`}><h3 className="mt-2 text-lg font-semibold">{c.name}</h3><p className="text-sm text-white/70 line-clamp-3">{c.summary}</p></Link>
      </div>))}
    </div>
  </div>);}
