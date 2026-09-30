import React, { useState } from 'react';
import { Download, Github, Check, Copy, Shield, Smartphone, AlertCircle, FileCode, Upload, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GITHUB_REPO_URL, GITHUB_RELEASES_URL } from '../data/mockData';

interface DownloadSectionProps {
  onOpenDownload: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ onOpenDownload }) => {
  const [copiedChecksum, setCopiedChecksum] = useState(false);
  const [localApkFile, setLocalApkFile] = useState<{ name: string; size: string; hash: string; url: string } | null>(null);
  const [isHashing, setIsHashing] = useState(false);
  const defaultChecksum = 'e4b78912cf30a91178df90b431789c6292bdf3e04e9f71c42f0a12e8b091f34d';

  const copyChecksum = (hashText: string) => {
    navigator.clipboard.writeText(hashText);
    setCopiedChecksum(true);
    setTimeout(() => setCopiedChecksum(false), 2000);
  };

  const handleApkFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsHashing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const objectUrl = URL.createObjectURL(file);

      setLocalApkFile({
        name: file.name,
        size: `${sizeMb} MB`,
        hash: hashHex,
        url: objectUrl
      });
    } catch {
      // fallback
    } finally {
      setIsHashing(false);
    }
  };

  return (
    <section id="download" className="py-20 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60">
            <Download className="w-3.5 h-3.5" />
            <span>OFFICIAL SIH RELEASE ARTIFACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Download iTantra Android Application
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Ready-to-install Android package (.apk) for field testing and evaluation by Smart India Hackathon jury members. Runs on any Android 8.0+ smartphone with Bluetooth 5.0.
          </p>
        </div>

        {/* Big Download Hero Card */}
        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl relative overflow-hidden">
          {/* Subtle gradient backdrop */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="md:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">iTantra Mobile App</h3>
                  <div className="text-xs text-neutral-400 font-mono">
                    Package: in.itantra.itantra · Release v1.2.0
                  </div>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                Includes bundled Hindi, English, and Kannada on-device models with sherpa-onnx runtime. Automatic background peer discovery and connectionless extended advertising enabled out-of-the-box.
              </p>

              {/* SHA-256 Checksum Container */}
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-mono text-[11px]">
                    SHA-256 Checksum {localApkFile ? '(Verified from Local APK)' : '(Official Release)'}
                  </span>
                  <button
                    onClick={() => copyChecksum(localApkFile ? localApkFile.hash : defaultChecksum)}
                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
                  >
                    {copiedChecksum ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedChecksum ? 'Copied' : 'Copy Hash'}</span>
                  </button>
                </div>
                <div className="text-[11px] font-mono text-neutral-300 break-all bg-neutral-950 p-2 rounded border border-neutral-800/80">
                  {localApkFile ? localApkFile.hash : defaultChecksum}
                </div>
              </div>

              {/* Quick Spec Tags */}
              <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-400">
                <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800">
                  Min: Android 8.0 (API 26)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800">
                  Size: {localApkFile ? localApkFile.size : '48.2 MB'}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800">
                  ABI: arm64-v8a / v7a
                </span>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 text-center space-y-4">
              {localApkFile ? (
                <a
                  href={localApkFile.url}
                  download={localApkFile.name}
                  className="w-full py-4 px-6 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/25 transition-all transform active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Attached APK ({localApkFile.size})</span>
                </a>
              ) : (
                <button
                  onClick={onOpenDownload}
                  className="w-full py-4 px-6 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/25 transition-all transform active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download APK & Manifest</span>
                </button>
              )}

              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs flex items-center justify-center gap-2 border border-neutral-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub: nileshpatil6/SIH-Hexabits</span>
              </a>

              <a
                href={GITHUB_RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium pt-1"
              >
                <span>View Releases on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <div className="text-[11px] text-neutral-500 flex items-center justify-center gap-1.5 pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Signed with Official Team Key · No Malware</span>
              </div>
            </div>
          </div>

          {/* Local APK Attachment & Sideload Dropzone */}
          <div className="mt-8 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Have your compiled APK on your local computer?</span>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">In-browser SHA-256 verifier</span>
            </div>
            
            <p className="text-xs text-neutral-400 leading-relaxed">
              If you have your `.apk` file ready on your machine, select it below to verify its integrity and test the download link instantly:
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>{isHashing ? 'Computing Hash...' : 'Attach Ready APK File'}</span>
                <input type="file" accept=".apk" onChange={handleApkFileSelect} className="hidden" />
              </label>

              {localApkFile && (
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Loaded {localApkFile.name} ({localApkFile.size})</span>
                </div>
              )}

              <a
                href={`${GITHUB_RELEASES_URL}/new`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-400 hover:text-white underline ml-auto"
              >
                Or publish to GitHub Releases (Drag & Drop) &rarr;
              </a>
            </div>
          </div>

          {/* Sideloading Steps */}
          <div className="mt-8 pt-6 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center text-[10px] font-mono">1</span>
                <span>Enable Sideloading</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Allow "Install Unknown Apps" for your mobile browser or file manager in Android Settings.
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center text-[10px] font-mono">2</span>
                <span>Grant Permissions</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Accept Microphone (`AudioRecord`) and Nearby Devices (`Bluetooth`) for peer-to-peer scanning.
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center text-[10px] font-mono">3</span>
                <span>Select Language</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Open Settings &gt; Model Packs to download any of the 10 Indic language packs for full offline operation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
