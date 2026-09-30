import React, { useState } from 'react';
import { Radio, MessageSquare, Layers, Settings, Eye, CheckCircle, Smartphone, Upload, ZoomIn, X, Activity } from 'lucide-react';
import { SCREENSHOTS_DATA } from '../data/mockData';
import { AppScreenshot } from '../types';

export const ScreenshotsGallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'talk' | 'mesh' | 'settings' | 'models'>('all');
  const [selectedShot, setSelectedShot] = useState<AppScreenshot | null>(null);
  const [userUploadedImages, setUserUploadedImages] = useState<{ name: string; url: string }[]>([]);

  const filteredShots = filter === 'all'
    ? SCREENSHOTS_DATA
    : SCREENSHOTS_DATA.filter(s => s.category === filter);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file)
      }));
      setUserUploadedImages(prev => [...newImages, ...prev]);
    }
  };

  return (
    <section id="screenshots" className="py-20 bg-neutral-900/50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60">
            <Radio className="w-3.5 h-3.5" />
            <span>AUTHENTIC FIELD TEST ARTIFACTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Production App Screenshots & Field Results
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Direct captures from our physical Android testbed running on OnePlus and Samsung hardware. Demonstrating real two-way disaster dispatch, autonomous BLE peer discovery, sub-150B packets, and 10-language local storage.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="inline-flex flex-wrap items-center justify-center p-1 bg-neutral-950 rounded-xl border border-neutral-800 mt-4 gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-neutral-800 text-white font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All 8 Screenshots
            </button>
            <button
              onClick={() => setFilter('talk')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'talk'
                  ? 'bg-neutral-800 text-white font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Talk & Dispatch (4)
            </button>
            <button
              onClick={() => setFilter('mesh')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'mesh'
                  ? 'bg-neutral-800 text-white font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Mesh Radar (2)
            </button>
            <button
              onClick={() => setFilter('settings')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'settings'
                  ? 'bg-neutral-800 text-white font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Settings (1)
            </button>
            <button
              onClick={() => setFilter('models')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filter === 'models'
                  ? 'bg-neutral-800 text-white font-semibold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Model Packs (1)
            </button>
          </div>
        </div>

        {/* User-Uploaded Image Showcase (if user attached custom files) */}
        {userUploadedImages.length > 0 && (
          <div className="mb-12 p-6 rounded-2xl bg-neutral-950 border border-emerald-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Your Attached Device Screenshots ({userUploadedImages.length})</span>
              </h3>
              <button
                onClick={() => setUserUploadedImages([])}
                className="text-xs text-neutral-400 hover:text-red-400"
              >
                Clear uploads
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {userUploadedImages.map((img, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 group relative">
                  <img src={img.url} alt={img.name} className="w-full aspect-[9/16] object-cover" />
                  <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center text-[10px] text-white font-mono break-all">
                    {img.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bento Grid of 8 Comprehensive Screenshots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredShots.map((shot) => (
            <div
              key={shot.id}
              className="group p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                {/* Visual Phone Frame Replicating the Exact Screenshot UI */}
                <div
                  onClick={() => setSelectedShot(shot)}
                  className="cursor-pointer relative aspect-[9/16] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-[#F2F6F3] text-neutral-900 flex flex-col justify-between p-3 shadow-inner group-hover:ring-2 group-hover:ring-emerald-500/40 transition-all font-sans select-none"
                >
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-[9px] font-semibold text-neutral-700 pb-1 border-b border-neutral-300/60">
                    <span className="font-mono">{shot.timestamp}</span>
                    <span className="text-emerald-800 text-[8px] uppercase font-bold tracking-tight">
                      {shot.keyMetric.split('·')[0]}
                    </span>
                  </div>

                  {/* Header in Screenshot */}
                  <div className="text-[11px] font-bold text-neutral-900 border-b border-neutral-300/40 pb-1 flex justify-between items-center">
                    <span>
                      {shot.category === 'talk' && (shot.id === 'shot-live-multi-stt' ? 'Talk · हिन्दी' : 'Talk · ಕನ್ನಡ')}
                      {shot.category === 'mesh' && 'Mesh'}
                      {shot.category === 'settings' && 'Settings'}
                      {shot.category === 'models' && 'Model packs'}
                    </span>
                    <span className="text-[9px] text-neutral-500 font-mono">Offline</span>
                  </div>

                  {/* Center Screen Representation */}
                  <div className="flex-1 my-auto flex flex-col justify-center text-left py-2 space-y-2 overflow-hidden text-[10px]">
                    {shot.id === 'shot-live-multi-stt' && (
                      <div className="space-y-1.5 w-full">
                        <div className="p-1.5 rounded-lg bg-[#D3E8D8] text-neutral-900">
                          <div className="font-bold text-[9px]">Phone-fdd0</div>
                          <div className="font-medium text-[9px] leading-tight">Hey, I'm drowning here near the hills</div>
                          <div className="text-[7.5px] text-neutral-600 font-mono">1 hop · BLE · 134 B · 941 ms</div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-[#98D8AA]/70 ml-auto max-w-[90%] text-neutral-900">
                          <div className="font-semibold text-[9px]">ನನ್ನ ಹೆಸರು ಅಭಿಷೇಕ್ ನಾನು</div>
                          <div className="text-[7.5px] text-neutral-600 font-mono">Kannada · STT 496 ms</div>
                        </div>
                        <div className="p-1.5 rounded-lg bg-[#98D8AA]/70 ml-auto max-w-[90%] text-neutral-900">
                          <div className="font-semibold text-[9px]">मेरा नाम इ अभिषेक है</div>
                          <div className="text-[7.5px] text-neutral-600 font-mono">Hindi · STT 202 ms</div>
                        </div>
                        <div className="flex justify-end pt-1">
                          <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-[8px] shadow-sm animate-pulse">
                            ●
                          </div>
                        </div>
                      </div>
                    )}

                    {shot.id === 'shot-talk-active' && (
                      <div className="space-y-2 w-full">
                        <div className="p-2 rounded-lg bg-[#D3E8D8] text-neutral-900">
                          <div className="font-bold text-[9px]">Phone-fdd0</div>
                          <div className="font-semibold">help</div>
                          <div className="text-[8px] text-neutral-600 font-mono">1 hop · BLE · 101 B · 907 ms</div>
                        </div>
                        <div className="p-2 rounded-lg bg-[#98D8AA]/70 ml-auto max-w-[85%] text-neutral-900">
                          <div className="font-medium">I am near hills</div>
                          <div className="text-[8px] text-neutral-600 font-mono">17:15:24 · Kannada</div>
                        </div>
                      </div>
                    )}

                    {shot.id === 'shot-talk-received' && (
                      <div className="space-y-2 w-full">
                        <div className="p-2 rounded-lg bg-[#D3E8D8] text-neutral-900">
                          <div className="font-bold text-[9px]">Phone-fdd0</div>
                          <div className="font-semibold">help</div>
                          <div className="text-[8px] text-neutral-600 font-mono">1 hop · BLE · 101 B · 907 ms</div>
                        </div>
                      </div>
                    )}

                    {shot.id === 'shot-talk-empty' && (
                      <div className="text-center p-2 text-neutral-600 space-y-1">
                        <div className="text-base">🎙</div>
                        <div className="text-[9px] leading-tight">Hold the mic button and speak. Sent when you pause.</div>
                      </div>
                    )}

                    {shot.id === 'shot-mesh-discovery' && (
                      <div className="space-y-1.5 w-full">
                        <div className="p-2 rounded-lg bg-white border border-neutral-300">
                          <div className="font-bold text-[9px]">Phone-b859</div>
                          <div className="text-[8px] text-neutral-500">You · Kannada · b8599dde</div>
                        </div>
                        <div className="text-[9px] font-bold text-neutral-700">Nearby phones</div>
                        <div className="p-2 rounded-lg bg-white border border-neutral-300 flex items-center justify-between">
                          <div>
                            <div className="font-bold text-[9px]">Phone-fdd0</div>
                            <div className="text-[8px] text-neutral-500">English · direct · seen 0s ago</div>
                          </div>
                          <span className="text-[8px] text-emerald-800 font-bold">Direct</span>
                        </div>
                      </div>
                    )}

                    {shot.id === 'shot-mesh-searching' && (
                      <div className="p-2 rounded-lg bg-white/80 border border-neutral-200 text-center space-y-1">
                        <div className="text-[9px] font-semibold text-neutral-800">Searching Bluetooth & Wi-Fi Direct...</div>
                        <div className="text-[8px] text-neutral-500">Messages hop up to 7 times.</div>
                      </div>
                    )}

                    {shot.id === 'shot-settings' && (
                      <div className="space-y-1 w-full text-[9px]">
                        <div className="p-1.5 rounded bg-white border border-neutral-200">
                          <div className="text-neutral-500 text-[8px]">My language</div>
                          <div className="font-bold">ಕನ್ನಡ · Kannada</div>
                        </div>
                        <div className="p-1.5 rounded bg-white border border-neutral-200">
                          <div className="text-neutral-500 text-[8px]">Test my voice</div>
                          <div className="italic text-[8px]">"ನಮಸ್ಕಾರ, ಇದು ಒಂದು ಪರೀಕ್ಷಾ ಸಂದೇಶ."</div>
                        </div>
                        <div className="p-1.5 rounded bg-white border border-neutral-200 flex justify-between">
                          <span>Model packs</span>
                          <span className="font-bold">6 installed</span>
                        </div>
                      </div>
                    )}

                    {shot.id === 'shot-model-packs' && (
                      <div className="space-y-1 w-full text-[8.5px]">
                        <div className="p-1 rounded bg-white flex justify-between">
                          <span>हिन्दी · Hindi</span>
                          <span className="text-emerald-700 font-bold">✓ ✓</span>
                        </div>
                        <div className="p-1 rounded bg-white flex justify-between">
                          <span>English · English</span>
                          <span className="text-emerald-700 font-bold">✓ ✓</span>
                        </div>
                        <div className="p-1 rounded bg-white flex justify-between">
                          <span>ಕನ್ನಡ · Kannada</span>
                          <span className="text-emerald-700 font-bold">✓ ✓</span>
                        </div>
                        <div className="p-1 rounded bg-neutral-100 flex justify-between text-neutral-500">
                          <span>मराठी · Marathi</span>
                          <span>⤓ ⤓</span>
                        </div>
                        <div className="text-[7px] text-neutral-500 font-mono pt-1">
                          /in.itantra.itantra/files/models
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Frame Footer Action */}
                  <div className="pt-1.5 border-t border-neutral-300/60 flex items-center justify-between text-[8px] text-neutral-600">
                    <span className="flex items-center gap-1 text-emerald-800 font-bold">
                      <Eye className="w-2.5 h-2.5" />
                      <span>Click to Inspect</span>
                    </span>
                    <span className="font-mono text-neutral-500">Android Build</span>
                  </div>
                </div>

                {/* Card Title & Prose Description */}
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    {shot.title}
                  </h3>
                  <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-3">
                    {shot.description}
                  </p>
                </div>

                {/* Key Metric Pill */}
                <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-emerald-400 font-semibold flex items-center justify-between">
                  <span>Metric:</span>
                  <span className="text-right text-[10px] text-neutral-200">{shot.keyMetric}</span>
                </div>
              </div>

              {/* Bottom Trigger */}
              <div className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedShot(shot)}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Enlarge Screen &rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* User Local Screenshot Upload Box */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 mx-auto flex items-center justify-center text-emerald-400">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Have New Test Run Screenshots from Your Device?</h4>
            <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1">
              Select or drop additional phone screenshots to preview them live in this inspection gallery.
            </p>
          </div>
          <div>
            <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Select Screenshots (.jpg, .png)</span>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Modal for In-Depth Technical Inspection */}
        {selectedShot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md">
            <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <div className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                    {selectedShot.keyMetric}
                  </div>
                  <h3 className="text-lg font-bold text-white">{selectedShot.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedShot(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <p>{selectedShot.description}</p>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5">
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Technical Highlights for SIH Jury</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-400">
                    {selectedShot.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">·</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-xs text-neutral-400 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-800">
                  <span>Field Device: OnePlus Nord CE 2 & Samsung A14 5G</span>
                  <span className="font-mono text-emerald-400">Time: {selectedShot.timestamp}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedShot(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
