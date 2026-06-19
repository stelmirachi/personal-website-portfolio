export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-8 mt-auto">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Stelcodes. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-gray-500">
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
