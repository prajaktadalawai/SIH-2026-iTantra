import React, { useState, useEffect } from 'react';
import { Radio, ShieldAlert, Cpu, Smartphone, Play, RotateCcw, CheckCircle2, Send } from 'lucide-react';
import meshMapImg from '../assets/images/mesh_network_map_1790769060120.jpg';

interface SimNode {
  id: string;
  name: string;
  role: 'Origin' | 'Relay' | 'Data Mule' | 'SMS Gateway';
  x: number; // percentage
  y: number; // percentage
  battery: number;
  hops: number;
  reached: boolean;
  receivedTime?: number;
}

const INITIAL_NODES: SimNode[] = [
  { id: 'n1', name: 'Phone-b859 (Origin)', role: 'Origin', x: 15, y: 50, battery: 92, hops: 0, reached: true },
  { id: 'n2', name: 'Phone-fdd0 (Relay 1)', role: 'Relay', x: 35, y: 35, battery: 78, hops: 1, reached: false },
  { id: 'n3', name: 'Phone-c112 (Relay 2)', role: 'Relay', x: 38, y: 68, battery: 84, hops: 1, reached: false },
  { id: 'n4', name: 'Rooftop Repeater', role: 'Relay', x: 60, y: 45, battery: 99, hops: 2, reached: false },
  { id: 'n5', name: 'Volunteer Boat (Mule)', role: 'Data Mule', x: 75, y: 70, battery: 65, hops: 3, reached: false },
  { id: 'n6', name: 'Relay Camp Gateway', role: 'SMS Gateway', x: 88, y: 40, battery: 90, hops: 3, reached: false }
];

export const MeshSimulator: React.FC = () => {
  const [nodes, setNodes] = useState<SimNode[]>(INITIAL_NODES);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [phyMode, setPhyMode] = useState<'1m' | 'coded'>('coded');
  const [currentHop, setCurrentHop] = useState<number>(0);
  const [heardByCount, setHeardByCount] = useState<number>(1);
  const [logMessages, setLogMessages] = useState<string[]>([
    'Mesh ready: 6 peer nodes in topology. Coded PHY S=8 enabled.'
  ]);

  const runSimulation = () => {
    setIsSimulating(true);
    setCurrentHop(0);
    setHeardByCount(1);
    setNodes(INITIAL_NODES.map(n => ({
      ...n,
      reached: n.id === 'n1',
      receivedTime: n.id === 'n1' ? 0 : undefined
    })));

    setLogMessages([
      `[T+0ms] Origin Phone-b859 broadcasts 101B ALERT packet via BLE Extended Advertising.`
    ]);

    // Hop 1: n2 and n3 reached
    setTimeout(() => {
      setCurrentHop(1);
      setHeardByCount(3);
      setNodes(prev => prev.map(n => (n.id === 'n2' || n.id === 'n3') ? { ...n, reached: true, receivedTime: 907 } : n));
      setLogMessages(prev => [
        `[T+907ms] 1-Hop Receipt: Phone-fdd0 and Phone-c112 verified Ed25519 signature.`,
        ...prev
      ]);
    }, 1000);

    // Hop 2: Rooftop Repeater reached
    setTimeout(() => {
      setCurrentHop(2);
      setHeardByCount(4);
      setNodes(prev => prev.map(n => n.id === 'n4' ? { ...n, reached: true, receivedTime: 1450 } : n));
      setLogMessages(prev => [
        `[T+1450ms] 2-Hop Rebroadcast: Rooftop Repeater suppresses duplicate echo from c112.`,
        ...prev
      ]);
    }, 2000);

    // Hop 3: Data Mule & Relief Camp Gateway reached
    setTimeout(() => {
      setCurrentHop(3);
      setHeardByCount(6);
      setNodes(prev => prev.map(n => (n.id === 'n5' || n.id === 'n6') ? { ...n, reached: true, receivedTime: 2180 } : n));
      setLogMessages(prev => [
        `[T+2180ms] Gateway Reached! Relief Camp Phone-b890 dispatches SMS alert to District Emergency Officer (108).`,
        `[T+2350ms] "Heard by 6 nodes" aggregated receipt returned to Origin.`,
        ...prev
      ]);
      setIsSimulating(false);
    }, 3200);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setCurrentHop(0);
    setHeardByCount(1);
    setNodes(INITIAL_NODES);
    setLogMessages(['Simulation reset. Ready for next packet dispatch.']);
  };

  return (
    <section id="mesh" className="py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60">
            <Radio className="w-3.5 h-3.5" />
            <span>PHONE-ONLY DISASTER NETWORKING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Multi-Hop Mesh Architecture with Zero Infrastructure
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Standard BLE operates point-to-point. iTantra implements connectionless extended-advertising flooding with counter-based suppression, BLE Coded PHY for 2x range extension, and store-carry-forward DTN to bridge kilometres without cell reception.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Visual Network Canvas */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-neutral-800 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-white">Disaster Mesh Field Simulator</span>
                <span className="font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  {heardByCount} / {nodes.length} Nodes Reached
                </span>
              </div>

              {/* Radio PHY Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">Radio Mode:</span>
                <div className="flex bg-neutral-900 p-0.5 rounded-lg border border-neutral-800">
                  <button
                    onClick={() => setPhyMode('1m')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      phyMode === '1m' ? 'bg-neutral-800 text-white font-bold' : 'text-neutral-400'
                    }`}
                  >
                    BLE 1M PHY (~60m)
                  </button>
                  <button
                    onClick={() => setPhyMode('coded')}
                    className={`px-2.5 py-1 rounded text-xs transition-colors ${
                      phyMode === 'coded' ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-800' : 'text-neutral-400'
                    }`}
                  >
                    BLE Coded PHY (~120–150m)
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Canvas Area */}
            <div className="relative w-full h-[380px] rounded-2xl bg-neutral-900/80 border border-neutral-800 overflow-hidden">
              {/* Subtle Terrain Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#26262615_1px,transparent_1px),linear-gradient(to_bottom,#26262615_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* River Flood Area Representation */}
              <div className="absolute top-1/4 bottom-1/4 left-1/3 right-1/3 bg-blue-950/20 border-y border-blue-900/20 rounded-full blur-xl pointer-events-none" />

              {/* Connecting Wave Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* n1 to n2 */}
                <line
                  x1="15%" y1="50%" x2="35%" y2="35%"
                  stroke={nodes[1].reached ? '#10B981' : '#404040'}
                  strokeWidth="2" strokeDasharray={nodes[1].reached ? 'none' : '4'}
                  className={isSimulating && currentHop >= 1 ? 'animate-pulse' : ''}
                />
                {/* n1 to n3 */}
                <line
                  x1="15%" y1="50%" x2="38%" y2="68%"
                  stroke={nodes[2].reached ? '#10B981' : '#404040'}
                  strokeWidth="2" strokeDasharray={nodes[2].reached ? 'none' : '4'}
                />
                {/* n2 to n4 */}
                <line
                  x1="35%" y1="35%" x2="60%" y2="45%"
                  stroke={nodes[3].reached ? '#10B981' : '#404040'}
                  strokeWidth="2" strokeDasharray={nodes[3].reached ? 'none' : '4'}
                />
                {/* n3 to n5 */}
                <line
                  x1="38%" y1="68%" x2="75%" y2="70%"
                  stroke={nodes[4].reached ? '#10B981' : '#404040'}
                  strokeWidth="2" strokeDasharray={nodes[4].reached ? 'none' : '4'}
                />
                {/* n4 to n6 */}
                <line
                  x1="60%" y1="45%" x2="88%" y2="40%"
                  stroke={nodes[5].reached ? '#10B981' : '#404040'}
                  strokeWidth="2" strokeDasharray={nodes[5].reached ? 'none' : '4'}
                />
              </svg>

              {/* Node Markers */}
              {nodes.map((node) => (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                >
                  {/* Pulse ring when reached */}
                  {node.reached && (
                    <div className="absolute w-12 h-12 rounded-full bg-emerald-500/20 animate-ping -z-10" />
                  )}

                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center border shadow-lg transition-all ${
                      node.reached
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </div>

                  <div className="mt-1 px-2 py-0.5 rounded bg-neutral-950/90 border border-neutral-800 text-[10px] text-center font-medium whitespace-nowrap">
                    <div className="text-white font-bold">{node.name}</div>
                    <div className="text-neutral-400 font-mono">
                      {node.role} · {node.battery}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Play & Reset Simulation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 text-xs font-bold transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isSimulating ? 'Propagating Hops...' : 'Trigger Multi-Hop Flood'}</span>
                </button>

                <button
                  onClick={resetSimulation}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Nodes</span>
                </button>
              </div>

              <div className="text-xs text-neutral-400 font-mono">
                {currentHop === 0 && 'Ready to dispatch'}
                {currentHop > 0 && `Hop ${currentHop} Active · Counter-Suppression Guard On`}
              </div>
            </div>
          </div>

          {/* Right: Live Mesh Event Console */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-5">
            <div className="pb-3 border-b border-neutral-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Router Event Journal</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">TTL = 7</span>
            </div>

            {/* Scrollable Log Area */}
            <div className="h-64 overflow-y-auto space-y-2 p-3 rounded-xl bg-neutral-900 border border-neutral-800/80 font-mono text-xs text-neutral-300">
              {logMessages.map((msg, i) => (
                <div key={i} className="leading-relaxed border-b border-neutral-800/40 pb-1 text-[11px]">
                  <span className="text-emerald-400">&gt;</span> {msg}
                </div>
              ))}
            </div>

            {/* Key Mesh Innovations */}
            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="font-bold text-white text-xs uppercase tracking-wider">
                SIH Innovations Over BitChat / Bridgefy
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Counter-Suppressed Flood:</strong> Rebroadcast canceled if heard &ge; 3 times. Prevents broadcast storm battery collapse.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>SMS Gateway Bridging:</strong> Moving relief boats or edge phones with cellular automatically convert distress to SMS.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Heard-by-N Receipts:</strong> Sender gets cryptographic feedback: "Alert heard by 37 phones, max 5 hops".
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
