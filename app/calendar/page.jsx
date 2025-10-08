
import events from '@/data/calendar.json';
export const metadata = { title: 'Global Calendar · Vaidya Vault' };
export default function Calendar(){
  const sorted = [...events].sort((a,b)=>a.date.localeCompare(b.date));
  return (
    <div className="space-y-6">
      <div className="card"><h1 className="text-2xl font-semibold">Global Calendar</h1><p className="text-white/70">Festivals, rituals, and observances connected to healing traditions.</p></div>
      <div className="grid md:grid-cols-2 gap-4">
        {sorted.map((e,i)=>(
          <div key={i} className="p-4 rounded-xl bg-white/5">
            <div className="text-sm text-white/60">{new Date(e.date).toDateString()}</div>
            <div className="text-lg font-semibold">{e.title}</div>
            <div className="text-xs text-white/60">{e.region}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
