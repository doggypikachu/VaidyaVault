
import "../styles/globals.css";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

export const metadata = {
  title: "Vaidya Vault",
  description: "Preserving humanity’s healing heritage with integrity, innovation, and respect."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-white/10 sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-midnight/80 z-50">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-semibold tracking-tight">Vaidya Vault</Link>
            <nav className="flex flex-wrap gap-5 text-sm">
              <Link className="hover:underline" href="/archives">Explore</Link>
              <Link className="hover:underline" href="/map">Map</Link>
              <Link className="hover:underline" href="/exhibits">Exhibits</Link>
              <Link className="hover:underline" href="/ethics">Ethics</Link>
              <Link className="hover:underline" href="/contribute">Contribute</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="border-t border-white/10 mt-16">
          <div className="container py-6 text-sm text-white/60">
            © {new Date().getFullYear()} Vaidya Vault · An ethical archive of traditional medical knowledge.
          </div>
        </footer>
      </body>
    </html>
  );
}
