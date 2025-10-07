
import archives from '@/data/archives.json';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const IIIFViewer = dynamic(() => import('@/components/IIIFViewer'), { ssr: false });

export async function generateStaticParams() {
  return archives.map(a => ({ slug: a.slug }));
}

export default function ArchiveDetail({ params }) {
  const item = archives.find(a => a.slug === params.slug);
  if (!item) return <div className="card">Not found.</div>;
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold">{item.title}</h1>
          <span className="badge">{item.region}</span>
        </div>
        <div className="text-sm text-white/60 mt-1">{item.type} · {item.culture || '—'} · {item.era}</div>
        <p className="mt-4 text-white/80">{item.summary}</p>
      </div>

      {item.iiifManifest && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-3">Manuscript Viewer</h2>
          <IIIFViewer manifestUrl={item.iiifManifest} />
          <p className="text-xs text-white/60 mt-2">Powered by IIIF · Source licensing may vary by item.</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card md:col-span-2">
          <h2 className="text-xl font-semibold">About</h2>
          <ul className="mt-2 text-white/80 space-y-2">
            <li><strong>Institution:</strong> {item.institution || '—'}</li>
            <li><strong>Languages:</strong> {item.languages?.join(', ') || '—'}</li>
            <li><strong>Media:</strong> {item.media?.join(', ') || '—'}</li>
            <li><strong>Access:</strong> {item.access || '—'}</li>
            <li><strong>License/Use:</strong> {item.license || '—'}</li>
            <li><strong>Coordinates:</strong> {item.lat}, {item.lng}</li>
          </ul>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold">Links</h2>
          <ul className="mt-2 text-white/80 space-y-2">
            <li><a className="link" href={item.url} target="_blank">Primary source</a></li>
            {item.extraLinks?.map((u, i) => (
              <li key={i}><a className="link" href={u} target="_blank">Related</a></li>
            ))}
          </ul>
        </div>
      </div>
      <Link href="/archives" className="text-sm link">← Back to all</Link>
    </div>
  );
}
