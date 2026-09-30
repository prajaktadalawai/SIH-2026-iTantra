import React from 'react';
import { Radio, Github, Download, FileText } from 'lucide-react';

interface FooterProps {
  onOpenDownload: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Radio className="w-3.5 h-3.5" />
              </div>
              <span>iTantra</span>
            </div>
            <p className="text-neutral-400 text-xs max-w-md leading-relaxed">
              Offline Indic Semantic Radio & Phone-Only Disaster Mesh. Built by Team Hexabits for Smart India Hackathon problem statements SIH 26173 & SIH 26174.
            </p>
            <div className="text-[11px] text-neutral-500">
              Tested on OnePlus Nord CE 2 & Samsung Galaxy A14 5G in open-field flood conditions.
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white uppercase text-[11px] tracking-wider">Navigation</div>
            <ul className="space-y-1.5 text-neutral-400">
              <li><a href="#overview" className="hover:text-emerald-400 transition-colors">Project Overview</a></li>
              <li><a href="#demo" className="hover:text-emerald-400 transition-colors">Interactive App Demo</a></li>
              <li><a href="#screenshots" className="hover:text-emerald-400 transition-colors">Field Screenshots</a></li>
              <li><a href="#semantic-radio" className="hover:text-emerald-400 transition-colors">Semantic Radio Codec</a></li>
              <li><a href="#mesh" className="hover:text-emerald-400 transition-colors">Disaster Mesh Network</a></li>
              <li><a href="#journey" className="hover:text-emerald-400 transition-colors">Development Journey</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white uppercase text-[11px] tracking-wider">Resources</div>
            <ul className="space-y-1.5 text-neutral-400">
              <li>
                <button onClick={onOpenDownload} className="hover:text-emerald-400 transition-colors text-left">
                  Download APK (v1.2.0)
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/nileshpatil6/SIH-Hexabits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <span className="text-neutral-500">Core Engine: MIT License</span>
              </li>
              <li>
                <span className="text-neutral-500">Models: AI4Bharat, SYSPIN</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            &copy; 2026 Team Hexabits · Smart India Hackathon Submission Portfolio. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Authored for SIH 26173 & SIH 26174</span>
            <span>·</span>
            <span>Government of India Disaster Relief Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
