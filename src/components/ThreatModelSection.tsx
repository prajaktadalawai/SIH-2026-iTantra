import React from 'react';
import { ShieldAlert, Lock, CheckCircle2, AlertTriangle, Key, Terminal } from 'lucide-react';
import { THREAT_MODEL_DATA } from '../data/mockData';

export const ThreatModelSection: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>AGENTIC THREAT MODELING & OWASP AUDIT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            5-Zone Security Architecture & Threat Summary
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            In compliance with our agentic security framework and OWASP LLM/Web directives, iTantra enforces strict isolation across input surfaces, memory states, and wireless communication links.
          </p>
        </div>

        {/* Threat Summary Table (Mandatory Execution Criteria) */}
        <div className="rounded-3xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                Threat Matrix Across the 5 Attack Surfaces
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
              OWASP Top 10 & LLM01–LLM05
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900 text-neutral-300 font-mono uppercase text-[11px] border-b border-neutral-800">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Threat Zone</th>
                  <th className="py-3.5 px-4 font-semibold">Identified Attack Vector</th>
                  <th className="py-3.5 px-4 font-semibold">OWASP Category</th>
                  <th className="py-3.5 px-4 font-semibold">Severity</th>
                  <th className="py-3.5 px-4 font-semibold">Engineered Countermeasure</th>
                  <th className="py-3.5 px-4 font-semibold">Verification Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                {THREAT_MODEL_DATA.map((t, idx) => (
                  <tr key={idx} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                      {t.zone}
                    </td>
                    <td className="py-4 px-4 max-w-xs text-neutral-300 leading-relaxed">
                      {t.threat}
                    </td>
                    <td className="py-4 px-4 font-mono text-neutral-400 whitespace-nowrap">
                      {t.owaspCategory}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          t.riskSeverity === 'Critical'
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {t.riskSeverity}
                      </span>
                    </td>
                    <td className="py-4 px-4 max-w-sm text-neutral-300 leading-relaxed">
                      {t.countermeasure}
                    </td>
                    <td className="py-4 px-4 text-emerald-400/90 font-mono text-[11px]">
                      {t.verificationMethod}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Principles Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Key className="w-4 h-4 text-emerald-400" />
              <span>Zero-Hardcoded Credentials</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              No private keys, Google Cloud API tokens, or secrets are hardcoded in application bytecode. Handsets generate hardware-backed Ed25519 keypairs in Android Keystore with StrongBox support.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Anti-Impersonation Authority</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              In response to the July 2026 MHA/I4C regulatory review, iTantra is explicitly built as an authenticated, signed emergency system. Official alerts from disaster authorities carry cryptographic badges.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Bounded Payload Ingestion</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              All incoming RF packets are treated as untrusted bytes. Parser enforces strict schema validation, 254-byte clamping, and undefined-stripping prior to state persistence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
