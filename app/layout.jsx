
import "../styles/globals.css";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
export const metadata={title:"Vaidya Vault",description:"Preserving humanity’s healing heritage with integrity, innovation, and respect."};
export default function RootLayout({children}){
  return(<html lang="en" suppressHydrationWarning><body className="min-h-screen">
    <header className="border-b border-white/10 sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-midnight/80 z-50">
      <div className="container py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold tracking-tight">Vaidya Vault</Link>
        <nav className="flex flex-wrap gap-5 text-sm items-center">
          <Link className="navlink" href="/archives">Explore</Link>
          <Link className="navlink" href="/map">Map</Link>
          <Link className="navlink" href="/collections">Collections</Link>
          <Link className="navlink" href="/pathways/ancient-healing-manuscripts">Pathways</Link>
          <Link className="navlink" href="/exhibits">Exhibits</Link>
          <Link className="navlink" href="/contribute">Contribute</Link>
          <Link className="navlink" href="/about">About</Link>
          <Link className="navlink" href="/calendar">Calendar</Link>
          <Link className="navlink" href="/moderation">Moderation</Link>
          <Link className="navlink" href="/tools/merge">Tools</Link>
          <DarkModeToggle/>
        </nav>
      </div>
    </header>
    <main className="container py-8">{children}</main>
    <footer className="border-t border-white/10 mt-16"><div className="container py-6 text-sm text-white/60">© {new Date().getFullYear()} Vaidya Vault · An ethical, community-guided archive of traditional medical knowledge.</div></footer>
  </body></html>);
}
