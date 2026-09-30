import React from 'react';
import { Milestone, Flag, TrendingUp, CheckCircle, ShieldAlert, Award, Activity } from 'lucide-react';
import teamLabImg from '../assets/images/team_hexabits_lab_1790769074371.jpg';

export const DevelopmentJourney: React.FC = () => {
  const milestones = [
    {
      quarter: 'Problem Validation',
      title: 'Disaster Communication Breakdown Analysis',
      description: 'Studied communication blackouts during the Kerala 2018 and Chennai 2015 floods. Verified that when power grids submerge, cellular base stations fail within 4 hours. Identified that citizens need voice-like expressiveness, not just raw text, yet raw audio cannot scale over Bluetooth.',
      outcome: 'Formulated the "Semantic Radio" hypothesis: transmit authenticated text + prosody side-channel under 150 Bytes.'
    },
    {
      quarter: 'Sprint 1 · STT',
      title: 'Offline IndicConformer on Budget Hardware',
      description: 'Quantized AI4Bharat IndicConformer (120M parameters) into 8-bit ONNX weights (~188–194 MB) running locally on sherpa-onnx. Tuned Silero VAD for whispered emergency speech and integrated WebRTC AGC2 software gain control (+24 dB boost).',
      outcome: 'Achieved real-time factor (RTF) of 0.08 on OnePlus Nord CE 2, running speech recognition 12x faster than real-time.'
    },
    {
      quarter: 'Sprint 2 · Prosody',
      title: 'IPF v1 & Script-Offset Text Compression',
      description: 'Devised a custom Devanagari/Dravidian 1-byte code point offset compressor (cutting 3-byte UTF-8 by 66%). Designed the 24-byte iTantra Prosody Frame (IPF) encoding pitch register, speech rate, measured pauses, and filler markers.',
      outcome: 'Achieved verified 101–114 Byte single-frame payload for emergency sentences, fitting entirely inside one BLE 5.0 extended advertisement.'
    },
    {
      quarter: 'Sprint 3 · Mesh',
      title: 'Connectionless Flood & Coded PHY Range',
      description: 'Eliminated slow GATT connection handshakes (saving ~1s per hop) by leveraging BLE Extended Advertising. Implemented counter-based suppressed flooding (canceling rebroadcast after hearing >= 3 times) to halt broadcast storms in relief camps.',
      outcome: 'Extended single-hop outdoor reach to ~120m via BLE Coded PHY, supporting up to 7-hop propagation in real field trials.'
    },
    {
      quarter: 'Sprint 4 · Field Test',
      title: 'Multi-Brand Field Deployment & Security Audit',
      description: 'Tested across 10 mixed-brand smartphones (OnePlus, Samsung, Xiaomi, Realme). Implemented Ed25519 signature checks before packet relay to immunize against cache poisoning flaws discovered in BitChat. Integrated SMS gateway bridging for edge nodes.',
      outcome: 'Verified 907 ms 1-hop latency, <5% idle listening CPU drain, and full background survivability on aggressive OEM battery managers.'
    }
  ];

  const fieldBenchmarks = [
    { metric: 'Single-Hop Range (1M PHY)', result: '60 – 85 meters', note: 'Line-of-sight in open flood ground' },
    { metric: 'Single-Hop Range (Coded PHY S=8)', result: '120 – 160 meters', note: 'Supported on Samsung & OnePlus devices' },
    { metric: '1-Hop Packet Delivery Latency', result: '907 ms', note: 'Measured on-device via BLE extended advertising' },
    { metric: 'Duplicate Flood Suppression', result: '74.2% Reduction', note: 'Counter threshold K=3 eliminates congestion storms' },
    { metric: 'Idle Listening Battery Drain', result: '1.8% per hour', note: 'Screen-off foreground service with VAD batching' },
    { metric: 'RAM Resident Working Set', result: '842 MB', note: 'Fits comfortably on 2GB & 3GB Indian budget phones' }
  ];

  return (
    <section id="journey" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60">
            <Milestone className="w-3.5 h-3.5" />
            <span>DEVELOPMENT TIMELINE & RIGOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            From Disaster Research to Working Field Deployment
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            The evolution of iTantra by Team Hexabits across 4 development sprints: validating hardware constraints, inventing the prosody side-channel, and benchmarking multi-phone mesh hopping.
          </p>
        </div>

        {/* Top Story Card with Team Lab Image */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                Built for Smart India Hackathon
              </span>
              <h3 className="text-2xl font-bold text-white leading-snug">
                Engineering Disaster Resilience for the Next 1 Billion Citizens
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                During natural disasters like floods, landslides, and cyclones, internet infrastructure is the first point of failure. Existing offline messaging apps either require expensive hardware (like LoRa radios) or send plain text without vocal urgency.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Team Hexabits set out to solve this with a single radical principle: <em>rely solely on the smartphones already in people's pockets</em>. By transforming human voice into a high-density, authenticated semantic stream, we proved that voice notes can travel through standard Bluetooth mesh networks with zero cell towers.
              </p>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-neutral-800 shadow-xl">
              <img
                src={teamLabImg}
                alt="Team Hexabits engineering laboratory during SIH development sprint"
                className="w-full aspect-[4/3] object-cover hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="space-y-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
            >
              <div className="md:col-span-3">
                <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-950 border border-emerald-800/80">
                  {m.quarter}
                </span>
                <h4 className="text-base font-bold text-white mt-2">{m.title}</h4>
              </div>

              <div className="md:col-span-9 space-y-3">
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {m.description}
                </p>
                <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-start gap-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-neutral-200">
                    <strong className="text-emerald-400">Validated Outcome:</strong> {m.outcome}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Field Testing Results Table */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <span>Empirical Field Test Benchmarks</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Measurements collected on 10 Android test handsets in outdoor multi-hop scenarios.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
              10-Phone Outdoor Testbed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fieldBenchmarks.map((b, i) => (
              <div key={i} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1">
                <div className="text-xs text-neutral-400 font-medium">{b.metric}</div>
                <div className="text-base font-bold text-emerald-400 font-mono">{b.result}</div>
                <div className="text-[11px] text-neutral-500 leading-snug">{b.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
