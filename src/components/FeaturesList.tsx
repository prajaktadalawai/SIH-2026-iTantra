import React from 'react';
import { Mic, Volume2, Radio, ShieldCheck, AlertOctagon, Cpu, Zap, WifiOff, FileCheck } from 'lucide-react';
import { TECHNICAL_SPECIFICATIONS } from '../data/mockData';

export const FeaturesList: React.FC = () => {
  const featurePillars = [
    {
      icon: <Mic className="w-5 h-5 text-emerald-400" />,
      title: 'Offline Indic STT & Acoustic Front-End',
      points: [
        'AI4Bharat IndicConformer (120M params int8 CTC) for 9 Indic languages + FastConformer for English.',
        'Software AGC (WebRTC AGC2-style) providing up to +24 dB gain for whispered or distant speech.',
        'Silero VAD retuned with quiet-speaker hysteresis (0.35 threshold) and spectral flatness detector.',
        'Smart Turn v3 (8 MB) adaptive endpointing eliminating the slow 450 ms fixed silence timeout.'
      ]
    },
    {
      icon: <Volume2 className="w-5 h-5 text-emerald-400" />,
      title: 'Expressive Voice-Preserving TTS',
      points: [
        'MMS-TTS (VITS) paired with deterministic on-device ProsodyRenderer for expressive playback.',
        'Measured silence injection (clamped 80–1,500 ms) and matched filler clips ("umm", "अं…").',
        'Phrase-streamed playback: audio starts playing within ~300–700 ms without waiting for full sentence.',
        'Voice bank nearest-match with ±3 semitone pitch shifting toward sender\'s natural vocal register.'
      ]
    },
    {
      icon: <Radio className="w-5 h-5 text-emerald-400" />,
      title: 'Single-Frame Semantic Radio',
      points: [
        '101–150 Bytes per 3.5s sentence (~340 bps) compared to 7,000 Bytes in standard Opus 16 kbps.',
        'Script-offset text compression: 1 byte per Indic glyph instead of 3 bytes in UTF-8 Unicode.',
        'IPF v1 (iTantra Prosody Frame) packs rate, pitch, energy, and pauses into just 24–28 bytes.',
        'Fits entirely within one BLE Extended Advertising PDU (254B), eliminating packet fragmentation.'
      ]
    },
    {
      icon: <WifiOff className="w-5 h-5 text-emerald-400" />,
      title: 'Phone-Only Multi-Hop Mesh & DTN',
      points: [
        'Extended advertising connectionless flood for ALERTs + GATT links for directed voice messages.',
        'BLE Coded PHY (S=8, 125 kbps) delivering up to 2x single-hop range over standard 1M PHY.',
        'Counter-based suppressed flooding (cancels rebroadcast if heard >= 3 times) to prevent broadcast storms.',
        'Delay-Tolerant Networking (DTN) store-carry-forward with automatic SMS Gateway bridging.'
      ]
    },
    {
      icon: <AlertOctagon className="w-5 h-5 text-emerald-400" />,
      title: 'Distress Auto-Tagging & Alert Authority',
      points: [
        'Acoustic sound-event tagging detects screams, crying, sirens, and rushing water automatically.',
        'Distress keyword spotting across 10 languages triggers ALERT priority and bypasses chat queues.',
        'Receiver plays emergency alerts on the Android ALARM stream at max volume with siren prefix.',
        'Cryptographic support for NDMA/ISRO official public keys to verify genuine government warnings.'
      ]
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Zero-Anonymity Cryptographic Integrity',
      points: [
        'Every packet is signed with the node\'s Ed25519 private key before transmission.',
        'Nodes verify cryptographic signatures before caching or relaying (immunizing against BitChat flaws).',
        '10-minute sliding timestamp window and nonce deduplication prevent replay attacks.',
        'Designed as an authenticated disaster relief tool complying with Indian MHA/I4C directives.'
      ]
    }
  ];

  return (
    <section className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60">
            <Cpu className="w-3.5 h-3.5" />
            <span>FULL SYSTEM CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Comprehensive Feature Matrix
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Engineered specifically for Smart India Hackathon problem statements SIH 26173 & 26174: Low-bitrate communications over infrastructure-less disaster environments.
          </p>
        </div>

        {/* 6 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featurePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-white">{pillar.title}</h3>
              <ul className="space-y-2 text-xs text-neutral-300 leading-relaxed">
                {pillar.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">·</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Technical Specifications Table */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <span>Verified System Specifications</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Hardware, model weights, and latency benchmarks verified on Android testbeds.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
              OnePlus Nord CE 2 & Samsung A14
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TECHNICAL_SPECIFICATIONS.map((spec, i) => (
              <div key={i} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                <div className="text-xs text-neutral-400 font-medium">{spec.label}</div>
                <div className="text-sm font-bold text-white font-mono">{spec.value}</div>
                <div className="text-xs text-neutral-400 pt-1 leading-snug">{spec.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
