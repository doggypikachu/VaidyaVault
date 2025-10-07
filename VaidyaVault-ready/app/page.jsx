
import Link from "next/link";
import { ScrollText, ShieldCheck, Compass, Map, PlusCircle } from "lucide-react";
import archives from "@/data/archives.json";

export default function Page() {
  return (
    <div className="space-y-10">
      <section className="card">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">Preserving the world’s healing heritage.</h1>
        <p className="text-white/80 max-w-2xl">
          Vaidya Vault is a living, ethical archive for traditional and cultural medical knowledge — 
          from Ayurvedic manuscripts and Arabic medical texts to San healing practices and Navajo oral histories.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/archives" className="px-4 py-2 rounded-xl bg-herbal hover:opacity-90 flex items-center gap-2"><ScrollText size={18}/>Explore</Link>
          <Link href="/map" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 flex items-center gap-2"><Map size={18}/>Map</Link>
          <Link href="/contribute" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 flex items-center gap-2"><PlusCircle size={18}/>Contribute</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="card"><Compass className="mb-2" /><h3 className="text-xl font-semibold">Global & Multilingual</h3><p className="text-white/70">Browse entries by region, culture, practice, and media type.</p></div>
        <div className="card"><ShieldCheck className="mb-2" /><h3 className="text-xl font-semibold">Ethical by Design</h3><p className="text-white/70">Consent layers, licensing, and community control built-in.</p></div>
        <div className="card"><ScrollText className="mb-2" /><h3 className="text-xl font-semibold">Scholar-Ready</h3><p className="text-white/70">Structured metadata, citations, and links to primary sources.</p></div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-semibold mb-3">Featured entries</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {archives.slice(0, 6).map((a) => (
            <Link key={a.slug} href={`/archives/${a.slug}`} className="block rounded-xl bg-white/5 hover:bg-white/10 p-4">
              <div className="flex items-center justify-between">
                <span className="badge">{a.region}</span>
                <span className="text-xs text-white/60">{a.type}</span>
              </div>
              <h4 className="mt-2 text-lg font-semibold">{a.title}</h4>
              <p className="text-sm text-white/70 line-clamp-3 mt-1">{a.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
