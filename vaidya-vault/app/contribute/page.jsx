
'use client';
import { useState } from 'react';
import { downloadJSON } from '@/lib/exportLocal';

const defaultForm = {
  title:'', region:'', culture:'', type:'', summary:'', languages:'', media:'',
  access:'', license:'', url:'', lat:'', lng:'', era:''
};

export default function Contribute() {
  const [form, setForm] = useState(defaultForm);
  const [entries, setEntries] = useState(JSON.parse(typeof window==='undefined' ? '[]' : (localStorage.getItem('vv:submissions')||'[]')));

  const onChange = (k, v)=> setForm(prev=>({ ...prev, [k]: v }));

  const submit = ()=>{
    const entry = {
      ...form,
      languages: form.languages.split(',').map(s=>s.trim()).filter(Boolean),
      media: form.media.split(',').map(s=>s.trim()).filter(Boolean),
      lat: parseFloat(form.lat), lng: parseFloat(form.lng)
    };
    const all = [...entries, entry];
    setEntries(all);
    localStorage.setItem('vv:submissions', JSON.stringify(all));
    setForm(defaultForm);
    alert('Saved locally. You can export your submissions as JSON.');
  };

  const exportAll = ()=> downloadJSON('vaidya-vault-submissions.json', entries);

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-2">Contribute to Vaidya Vault</h1>
        <p className="text-white/80">This form stores your submissions in your browser only (no server). Export the JSON and send it to curators for review.</p>
      </div>

      <div className="card grid md:grid-cols-2 gap-3">
        {Object.entries({title:'Title', region:'Region', culture:'Culture', type:'Type', era:'Era', summary:'Summary (short)', languages:'Languages (comma-separated)', media:'Media types (comma-separated)', access:'Access', license:'License', url:'Primary URL', lat:'Latitude', lng:'Longitude'}).map(([k,label])=>(
          <div key={k} className="flex flex-col gap-1">
            <label className="text-sm text-white/70">{label}</label>
            {k==='summary' ? (
              <textarea value={form[k]} onChange={e=>onChange(k,e.target.value)} className="rounded-xl bg-white/10 px-3 py-2 outline-none" rows={4}/>
            ):(
              <input value={form[k]} onChange={e=>onChange(k,e.target.value)} className="rounded-xl bg-white/10 px-3 py-2 outline-none" />
            )}
          </div>
        ))}
        <div className="md:col-span-2 flex gap-3">
          <button onClick={submit} className="px-4 py-2 rounded-xl bg-herbal">Save locally</button>
          <button onClick={exportAll} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20">Export JSON</button>
        </div>
      </div>

      {entries.length>0 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Your submissions</h2>
          <ul className="text-white/80 space-y-2">
            {entries.map((e,i)=>(
              <li key={i}><span className="badge">{e.region}</span> <strong>{e.title}</strong> — {e.era}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
