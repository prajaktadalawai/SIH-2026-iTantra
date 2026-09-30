import React from 'react';
import { Users, Award, Code, Globe, Sparkles, BookOpen } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const teamCompetencies = [
    {
      role: 'Embedded On-Device AI',
      focus: 'int8 ONNX Quantization, sherpa-onnx runtime, IndicConformer CTC, FastPitch/VITS vocoder optimization.',
      members: 'Core AI Lead'
    },
    {
      role: 'Wireless Mesh & Ad-Hoc Routing',
      focus: 'BLE 5.0 Extended Advertising, Coded PHY S=8, Counter-Suppressed Flooding, DTN store-carry-forward.',
      members: 'Network Systems Lead'
    },
    {
      role: 'Acoustic Front-End & DSP',
      focus: 'WebRTC AGC2 implementation, Silero VAD whisper tuning, Smart Turn v3 endpointing, YIN pitch extraction.',
      members: 'DSP & Audio Lead'
    },
    {
      role: 'Android Platform & Security',
      focus: 'Kotlin Native foreground services, StrongBox Keystore, Ed25519 cryptography, OEM battery manager bypass.',
      members: 'Android Core Lead'
    }
  ];

  return (
    <section className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60">
            <Users className="w-3.5 h-3.5" />
            <span>SIH SUBMISSION PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Built with Conviction by Team Hexabits
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Representing innovative student engineering at Smart India Hackathon. Solving the hardest constraint in disaster response: sending human voice through thin air without infrastructure.
          </p>
        </div>

        {/* SIH Problem Statement Card */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Problem Statement ID
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                SIH 26173 & SIH 26174: Zero-Infrastructure Disaster Mesh Communication
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-semibold">
                Category: Disaster Management
              </span>
            </div>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed">
            <strong>Target Mandate:</strong> Develop an ultra-low bitrate offline peer-to-peer audio and dispatch communication system operating across heterogeneous mobile devices during catastrophic communication blackouts, supporting major Indian regional languages with maximum geographical coverage and low latency.
          </p>
        </div>

        {/* Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamCompetencies.map((comp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">
                  {comp.members}
                </span>
                <h4 className="text-base font-bold text-white">{comp.role}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {comp.focus}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800 text-[11px] text-neutral-500 font-mono">
                Team Hexabits · 2026
              </div>
            </div>
          ))}
        </div>

        {/* Open Source & Academic Commitments */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" />
            <span>Open Source Core: MIT License</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Model Corpus: AI4Bharat, SYSPIN (CC-BY-4.0), IndicVoices-R</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Built for India's 10 Official Linguistic Regions</span>
          </div>
        </div>
      </div>
    </section>
  );
};
