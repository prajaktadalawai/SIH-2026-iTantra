import React from 'react';
import { Download, ArrowRight, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';
import heroImg from '../assets/images/hero_disaster_mesh_1790769046150.jpg';

interface HeroProps {
  onOpenDownload: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload }) => {
  return (
    <section id="overview" className="relative pt-12 pb-20 overflow-hidden border-b border-neutral-800/80">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-emerald-950/5 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">Smart India Hackathon 2024/2025</span>
              <span className="text-neutral-500">·</span>
              <span className="text-emerald-400 font-mono">Team Hexabits</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]" style={{ textWrap: 'balance' }}>
              Offline Indic Semantic Radio & Phone-Only Disaster Mesh
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed">
              When floods knock out cell towers and internet, <strong className="text-white font-semibold">iTantra</strong> turns standard budget Android phones into an emergency ad-hoc radio network. Compresses spoken Indic voice into a <strong className="text-emerald-400 font-semibold font-mono">~101–150 Byte</strong> authenticated packet that hops phone-to-phone up to 7 times.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenDownload}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/25 transition-all transform active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download Android APK (v1.2.0)</span>
              </button>

              <a
                href="#demo"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-xl transition-all"
              >
                <span>Interactive App Demo</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </a>
            </div>

            {/* Validation Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Ed25519 Signed Packets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Runs on 2GB & 3GB RAM Phones</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>10 Indian Languages</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with HUD Telemetry */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
              <img
                src={heroImg}
                alt="Emergency disaster responders using iTantra offline mesh during monsoon flood relief"
                className="w-full aspect-[4/3] object-cover group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

              {/* Verified Telemetry HUD Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    LIVE SENSOR LINK · 1-HOP
                  </span>
                  <span className="text-neutral-400 font-mono">BLE EXT-ADV 254B</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-neutral-800/80 text-center">
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Payload Size</div>
                    <div className="text-sm font-bold font-mono text-white">101 Bytes</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Hop Latency</div>
                    <div className="text-sm font-bold font-mono text-emerald-400">907 ms</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Internet Req.</div>
                    <div className="text-sm font-bold font-mono text-white">0% (Offline)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee Proof Quantitative Metrics Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              101 B
            </div>
            <div className="text-xs font-semibold text-neutral-200">Semantic Radio Frame</div>
            <div className="text-xs text-neutral-400">98% smaller than 7,000 B Opus 16kbps</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tabular-nums tracking-tight">
              10
            </div>
            <div className="text-xs font-semibold text-neutral-200">Indic Languages Offline</div>
            <div className="text-xs text-neutral-400">Hindi, Kannada, Bengali, Tamil, +6</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              7 Hops
            </div>
            <div className="text-xs font-semibold text-neutral-200">Relay Mesh Horizon</div>
            <div className="text-xs text-neutral-400">Store-carry-forward DTN architecture</div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tabular-nums tracking-tight">
              &lt; 5%
            </div>
            <div className="text-xs font-semibold text-neutral-200">Idle Listening CPU</div>
            <div className="text-xs text-neutral-400">Silero VAD batching on 1 CPU core</div>
          </div>
        </div>
      </div>
    </section>
  );
};
