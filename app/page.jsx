
import Link from "next/link";
import { Map, PlusCircle, Compass, Sparkles } from "lucide-react";
import cultures from "@/data/cultures.json";
import Carousel from "@/components/Carousel";
import SearchBox from "@/components/SearchBox";
const featured=[
  {href:'/collections/ancient-healing-manuscripts',title:'Ancient Healing Manuscripts',type:'Collection',description:'Foundational texts that shaped medical lineages.'},
  {href:'/collections',title:'Women Healers Across History',type:'Collection',description:'Midwives, herbalists, and community healers.'},
  {href:'/map',title:'Global Map',type:'Explore',description:'Fly across regions and traditions.'},
];
export default function Page(){return(<div className="space-y-10">
  <section className="card">
    <h1 className="text-4xl md:text-5xl font-semibold mb-4">Preserving the world’s healing heritage.</h1>
    <p className="text-white/80 max-w-2xl">A living, ethical archive for traditional and cultural medical knowledge — from manuscripts to living practice.</p>
    <div className="mt-6 grid md:grid-cols-2 gap-4">
      <SearchBox data={cultures}/>
      <div className="flex gap-3">
        <Link href="/archives" className="primary flex items-center gap-2"><Compass size={18}/>Explore</Link>
        <Link href="/map" className="ghost flex items-center gap-2"><Map size={18}/>Map</Link>
        <Link href="/contribute" className="ghost flex items-center gap-2"><PlusCircle size={18}/>Contribute</Link>
      </div>
    </div>
  </section>
  <section className="card">
    <div className="flex items-center gap-2 mb-2"><Sparkles size={18}/><h2 className="text-2xl font-semibold">Featured collections</h2></div>
    <Carousel items={featured}/>
  </section>
</div>);}
