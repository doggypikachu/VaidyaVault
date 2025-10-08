
'use client';
import { useEffect, useState } from 'react';
import { downloadJSON } from '@/lib/exportLocal';
import baseData from '@/data/cultures.json';
export default function MergeTool(){
  const [approved,setApproved]=useState([]);
  const [merged,setMerged]=useState(baseData);
  useEffect(()=>{setApproved(JSON.parse(localStorage.getItem('vv:approved')||'[]'));},[]);
  const doMerge=()=>{
    const map = new Map(baseData.map(x=>[x.id,x]));
    approved.forEach(a=>map.set(a.id,a));
    const out = Array.from(map.values()).sort((a,b)=>a.name.localeCompare(b.name));
    setMerged(out);
  };
  const exportMerged=()=>downloadJSON('cultures.merged.json', merged);
  return (<div className="space-y-6">
    <div className="card"><h1 className="text-2xl font-semibold">Merge Approved Submissions</h1><p className="text-white/70">Combine local approved entries with repository data, then export a JSON ready for a PR.</p></div>
    <div className="card">
      <div className="text-sm text-white/60">{approved.length} approved · {baseData.length} in repo</div>
      <div className="mt-3 flex gap-2"><button className="primary" onClick={doMerge}>Merge</button><button className="ghost" onClick={exportMerged} disabled={!merged || merged.length===baseData.length}>Export merged JSON</button></div>
    </div>
  </div>);
}
