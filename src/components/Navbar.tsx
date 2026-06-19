import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Stelcodes
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="/projects" className="hover:text-blue-600 transition-colors">Projects</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          <Link href="/book" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            Book a Call
          </Link>
        </div>
      </div>
    </nav>
  );
}
