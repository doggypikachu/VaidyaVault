
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import collections from '@/data/collections.json';
import cultures from '@/data/cultures.json';
export default function Pathway({ params }){
  const router = useRouter();
  const col = collections.find(c=>c.slug===params.slug);
  if(!col) return <div className="card">Not found.</div>;
  const items = col.items.map(id=>cultures.find(c=>c.id===id)).filter(Boolean);
  const [i,setI] = useState(0);
  const c = items[i];
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="text-sm text-white/60">Pathway</div>
        <h1 className="text-2xl font-semibold">{col.title}</h1>
        <p className="text-white/70">{col.description}</p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <div className="text-sm text-white/60">Step {i+1} / {items.length}</div>
          <div className="flex gap-2">
            <button className="ghost" onClick={()=>setI(Math.max(0,i-1))} disabled={i===0}>Back</button>
            <button className="primary" onClick={()=>setI(Math.min(items.length-1,i+1))} disabled={i===items.length-1}>Next</button>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-3">{c.name}</h2>
        <div className="text-xs text-white/60">{c.region}</div>
        <p className="text-white/80 mt-2">{c.summary}</p>
        <a className="link text-sm mt-2 inline-block" href={`/archives/${c.id}`}>Open full entry →</a>
      </div>
    </div>
  );
}
