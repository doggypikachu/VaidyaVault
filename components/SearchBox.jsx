
'use client';
import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';
import Link from 'next/link';
export default function SearchBox({ data }){
  const [q,setQ]=useState('');
  const fuse=useMemo(()=>new Fuse(data,{keys:['name','keywords','region','documents.title','summary'],threshold:0.34,includeScore:true}),[data]);
  const results=q?fuse.search(q).slice(0,10).map(r=>r.item):[];
  return(<div className="relative">
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search cultures, keywords, regions..." className="w-full rounded-xl bg-white/10 px-3 py-2 outline-none"/>
    {q&&(<div className="absolute mt-2 bg-[#101826] border border-white/10 rounded-xl w-full z-20 max-h-80 overflow-auto">
      {results.length===0&&<div className="p-3 text-white/60 text-sm">No results</div>}
      {results.map(it=>(<Link key={it.id} href={`/archives/${it.id}`} className="block p-3 hover:bg-white/10"><div className="text-sm">{it.name} <span className="text-white/50">· {it.region}</span></div><div className="text-xs text-white/60">{(it.keywords||[]).slice(0,6).join(', ')}</div></Link>))}
    </div>)}
  </div>);
}
