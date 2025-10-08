
import Link from 'next/link';
import cultures from '@/data/cultures.json';
import dynamic from 'next/dynamic';
const IIIFViewer = dynamic(()=>import('@/components/IIIFViewer'),{ssr:false});
import PDFButton from '@/components/PDFButton';
export async function generateStaticParams(){return cultures.map(c=>({slug:c.id}));}
function related(current){
  const score=(a,b)=>{
    let s=0;
    const ka=new Set((a.keywords||[]).map(x=>x.toLowerCase()));
    const kb=new Set((b.keywords||[]).map(x=>x.toLowerCase()));
    ka.forEach(k=>{ if(kb.has(k)) s+=2; });
    const ta=new Set(a.themes||[]); const tb=new Set(b.themes||[]);
    ta.forEach(t=>{ if(tb.has(t)) s+=3; });
    if(a.region===b.region) s+=1;
    return s;
  };
  return cultures
    .filter(x=>x.id!==current.id)
    .map(x=>({x, s:score(current,x)}))
    .sort((u,v)=>v.s-u.s)
    .slice(0,6)
    .map(p=>p.x);
}
function cite(c){
  const date=new Date().toISOString().slice(0,10);
  return `"${c.name}." Vaidya Vault, accessed ${date}.`;
}
export default function Culture({params}){
  const c=cultures.find(x=>x.id===params.slug);if(!c)return <div className='card'>Not found.</div>;
  return(<div className='space-y-6'>
    <div className='card'><div className='flex items-center justify-between gap-3'><h1 className='text-3xl font-semibold'>{c.name}</h1><span className='badge'>{c.region}</span></div>
      <div className='text-sm text-white/60 mt-1'>{(c.keywords||[]).slice(0,6).join(' · ')}</div><p className='mt-4 text-white/80'>{c.summary}</p>
      {c.tips&&<p className='mt-2 text-white/70'><b>Tips:</b> {c.tips}</p>}</div>
      <div className='mt-3 text-xs text-white/60'>Cite: {cite(c)}</div>
    {c.iiifManifest&&(<div className='card'><h2 className='text-xl font-semibold mb-3'>Manuscript Viewer</h2><IIIFViewer manifestUrl={c.iiifManifest}/></div>)}
    <div className='card'><h2 className='text-xl font-semibold'>Documents</h2><ul className='mt-2 list-disc list-inside text-white/80 space-y-1'>{(c.documents||[]).map((d,i)=>(<li key={i}><a className='link' href={d.url} target='_blank' rel='noreferrer'>{d.title}</a> <span className='text-white/50'>({d.type})</span></li>))}</ul></div>

    <div className='card'>
      <h2 className='text-xl font-semibold'>Related traditions</h2>
      <div className='grid md:grid-cols-3 gap-3 mt-3'>
        {rel.map(r=>(<Link key={r.id} href={`/archives/${r.id}`} className='p-3 rounded-xl bg-white/5 hover:bg-white/10'>{r.name}<div className='text-xs text-white/60'>{r.region}</div></Link>))}
      </div>
    </div>

    <Link href='/archives' className='text-sm link'>← Back to all</Link>
  </div>);
}
