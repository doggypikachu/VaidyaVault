
'use client';
import { useEffect, useState } from 'react';
import { downloadJSON } from '@/lib/exportLocal';

export default function Moderation(){
  const [subs, setSubs] = useState([]);
  const [approved, setApproved] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(()=>{
    setSubs(JSON.parse(localStorage.getItem('vv:submissions')||'[]'));
    setApproved(JSON.parse(localStorage.getItem('vv:approved')||'[]'));
  },[]);

  const approve = ()=>{
    const chosen = subs.filter(s => selected[s.id]);
    const nextApproved = [...approved, ...chosen];
    setApproved(nextApproved);
    localStorage.setItem('vv:approved', JSON.stringify(nextApproved));
  };

  const remove = ()=>{
    const remaining = subs.filter(s => !selected[s.id]);
    setSubs(remaining);
    localStorage.setItem('vv:submissions', JSON.stringify(remaining));
    setSelected({});
  };

  const exportApproved = ()=> downloadJSON('approved-cultures.json', approved);

  const toggle = (id)=> setSelected(prev=> ({...prev, [id]: !prev[id]}));

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Moderation Dashboard</h1>
        <p className="text-white/70">Review user submissions stored locally in your browser. Approve selected to add to an exportable batch.</p>
      </div>

      <div className="card">
        <div className="flex gap-2 mb-3">
          <button className="primary" onClick={approve}>Approve selected</button>
          <button className="ghost" onClick={remove}>Delete selected</button>
          <button className="ghost" onClick={exportApproved}>Export approved JSON</button>
          <div className="text-sm text-white/60 ml-auto">{subs.length} pending · {approved.length} approved</div>
        </div>
        <div className="space-y-2 max-h-[60vh] overflow-auto">
          {subs.map(s => (
            <div key={s.id} className="p-3 rounded-xl bg-white/5 flex gap-3 items-start">
              <input type="checkbox" checked={!!selected[s.id]} onChange={()=>toggle(s.id)} />
              <div className="flex-1">
                <div className="font-semibold">{s.name} <span className="text-white/50">({s.region})</span></div>
                <div className="text-xs text-white/60">{(s.keywords||[]).join(', ')}</div>
                <div className="text-sm text-white/80 mt-1 line-clamp-3">{s.summary}</div>
              </div>
            </div>
          ))}
          {subs.length===0 && <div className="text-white/60 text-sm">No pending submissions.</div>}
        </div>
      </div>
    </div>
  );
}
