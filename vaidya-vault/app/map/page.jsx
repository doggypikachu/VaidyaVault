
'use client';
import dynamic from 'next/dynamic';
import archives from '@/data/archives.json';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

export default function MapPage(){
  const [era, setEra] = useState('');
  const filtered = useMemo(()=> archives.filter(a => era ? a.era===era : true), [era]);

  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-2xl font-semibold">Global Map</h1>
        <div className="mt-3 flex gap-2 flex-wrap">
          {['All','Ancient','Medieval','Early Modern','Modern','Contemporary'].map(e=> (
            <button key={e} onClick={()=>setEra(e==='All'?'':e)} className={`px-3 py-1 rounded-full text-sm ${era===e || (e==='All' && era==='') ? 'bg-herbal' : 'bg-white/10 hover:bg-white/20'}`}>{e}</button>
          ))}
          <div className="text-sm text-white/60 ml-auto">{filtered.length} entries</div>
        </div>
      </div>
      <MapContainer center={[20,0]} zoom={2} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        {filtered.map(a => (
          <CircleMarker key={a.slug} center={[a.lat, a.lng]} radius={6}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold">{a.title}</div>
                <div className="text-white/60">{a.region} · {a.era}</div>
                <Link href={`/archives/${a.slug}`} className="link">View entry →</Link>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
