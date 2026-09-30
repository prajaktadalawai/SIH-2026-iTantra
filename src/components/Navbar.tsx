import React from 'react';
import { Download, Github, Radio } from 'lucide-react';

interface NavbarProps {
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload }) => {
  return (
    <header className="sticky top-0 z-50 bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element brand wordmark */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <Radio className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              iTantra
              <span className="hidden sm:inline text-xs font-mono text-emerald-400/80 font-normal px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/50">
                SIH 26173/26174
              </span>
            </span>
          </a>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a href="#overview" className="hover:text-emerald-400 transition-colors">Overview</a>
          <a href="#demo" className="hover:text-emerald-400 transition-colors">Live App Demo</a>
          <a href="#screenshots" className="hover:text-emerald-400 transition-colors">Screenshots</a>
          <a href="#semantic-radio" className="hover:text-emerald-400 transition-colors">Semantic Radio</a>
          <a href="#mesh" className="hover:text-emerald-400 transition-colors">Disaster Mesh</a>
          <a href="#journey" className="hover:text-emerald-400 transition-colors">Journey & Tests</a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/nileshpatil6/SIH-Hexabits"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/60 rounded-lg transition-colors whitespace-nowrap"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <button
            onClick={onOpenDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm shadow-emerald-950/40 hover:shadow-emerald-500/20 transition-all whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK</span>
          </button>
        </div>
      </div>
    </header>
  );
};
