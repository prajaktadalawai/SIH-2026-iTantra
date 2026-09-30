import React, { useState, useRef } from 'react';
import {
  Mic,
  Radio,
  Settings as SettingsIcon,
  Volume2,
  CheckCircle2,
  Download,
  AlertTriangle,
  Play,
  Share2,
  Smartphone,
  ChevronRight,
  Send,
  RefreshCw,
  Sliders,
  Check
} from 'lucide-react';
import { LANGUAGE_PACKS, INITIAL_CHAT_MESSAGES } from '../data/mockData';
import { ChatMessage } from '../types';

export const InteractiveAppDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'talk' | 'mesh' | 'settings' | 'models' | 'diagnostics'>('talk');
  const [mode, setMode] = useState<'ptt' | 'call'>('ptt');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('kn');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [meshActive, setMeshActive] = useState<boolean>(true);
  const [nearbyCount, setNearbyCount] = useState<number>(1);
  const [installedPacks, setInstalledPacks] = useState<Record<string, boolean>>({
    hi: true,
    en: true,
    kn: true,
    bn: false,
    mr: false,
    gu: false,
    ta: false,
    te: false,
    ml: false,
    or: false
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentLangObj = LANGUAGE_PACKS.find(l => l.code === selectedLanguage) || LANGUAGE_PACKS[2];

  // Audio Playback simulation using Web Speech API or AudioContext fallback
  const playSynthesizedVoice = (text: string, langCode: string = selectedLanguage) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const langMap: Record<string, string> = {
        hi: 'hi-IN',
        mr: 'mr-IN',
        en: 'en-IN',
        kn: 'kn-IN',
        bn: 'bn-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        gu: 'gu-IN',
        ml: 'ml-IN',
        or: 'hi-IN'
      };

      const targetLang = langMap[langCode] || 'en-US';
      const availableVoices = window.speechSynthesis.getVoices();
      
      // Specifically optimize voice selection for Marathi and other Indian languages
      const matchedVoice = availableVoices.find(v => v.lang.toLowerCase() === targetLang.toLowerCase()) ||
                           availableVoices.find(v => v.lang.toLowerCase().startsWith(langCode.toLowerCase())) ||
                           availableVoices.find(v => v.lang === 'hi-IN') || // Hindi voices read Devanagari Marathi natively
                           availableVoices.find(v => v.lang.includes('IN')) ||
                           availableVoices[0];

      if (matchedVoice) {
        utterance.voice = matchedVoice;
        utterance.lang = matchedVoice.lang;
      } else {
        // Fallback to hi-IN for Marathi to ensure Devanagari text is read with authentic Indian cadence
        utterance.lang = langCode === 'mr' ? 'hi-IN' : targetLang;
      }

      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => {
        setIsPlayingAudio(false);
        playChimeFallback();
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        playChimeFallback();
      }
    } else {
      playChimeFallback();
    }
  };

  const playChimeFallback = () => {
    try {
      const AudioCtx = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext || 
                       (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {
      // audio context suppressed
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    timerRef.current = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);
  };

  const handleStopRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);

    // Full 10 Indic languages phrases with accurate regional distress terminology
    const samplePhrases: Record<string, string> = {
      mr: 'नदीच्या पाण्याची पातळी वाढत आहे, तातडीने मदत पाठवा.',
      hi: 'हम पहाड़ी के पास सुरक्षित हैं, नाव भेजिए।',
      kn: 'ನಾನು ಸುರಕ್ಷಿತ ಸ್ಥಳದಲ್ಲಿದ್ದೇನೆ, ನೀರಿನ ಮಟ್ಟ ಹೆಚ್ಚುತ್ತಿದೆ.',
      en: 'We are stranded on the first floor, need medical help.',
      bn: 'আমরা পাহাড়ের কাছে নিরাপদ স্থানে আছি, ওষুধ প্রয়োজন।',
      gu: 'અહીં પીવાના પાણી અને ખોરાકની તાકીદે જરૂર છે.',
      ta: 'நாங்கள் பாதுகாப்பான இடத்தில் இருக்கிறோம், படகு தேவை.',
      te: 'రవాణా సౌకర్యాలు నిలిచిపోయాయి, సహాయం కావాలి.',
      ml: 'വെള്ളം കയറി വീടുകൾ ഒറ്റപ്പെട്ടിരിക്കുകയാണ്, രക്ഷാപ്രവർത്തനം വേണം.',
      or: 'ନଦୀ କୂଳ ଭାଙ୍ଗିଯାଇଛି, ଉଦ୍ଧାରକାରୀ ଦଳ ପଠାନ୍ତୁ।'
    };

    const newText = samplePhrases[selectedLanguage] || 'Emergency report transmitted over BLE mesh.';
    submitMessage(newText, selectedLanguage, true);
  };

  const submitMessage = (text: string, lang: string, isVoice: boolean = false) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    // Calculate exact semantic radio payload bytes:
    // Header (14B) + Script offset compressed text (~1B/char) + IPF prosody frame (24B) + Ed25519 signature (64B)
    const payloadBytes = Math.min(240, 14 + text.length + 24 + 64);
    const latency = isVoice ? Math.floor(Math.random() * 200 + 800) : 120;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Phone-b859 (You)',
      senderId: 'b8599dde',
      text: text,
      originalLanguage: LANGUAGE_PACKS.find(l => l.code === lang)?.name || 'Kannada',
      timestamp: timeStr,
      hops: 0,
      transport: 'BLE',
      packetBytes: payloadBytes,
      latencyMs: latency,
      isSelf: true
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Trigger audible playback of TTS
    playSynthesizedVoice(text, lang);
  };

  const triggerSOSAlert = () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const sosMsg: ChatMessage = {
      id: `sos-${Date.now()}`,
      sender: 'Phone-fdd0',
      senderId: 'fdd078a1',
      text: 'CRITICAL ALERT: Flood water breached embankment. 4 people trapped!',
      originalLanguage: 'English',
      timestamp: timeStr,
      hops: 2,
      transport: 'BLE',
      packetBytes: 134,
      latencyMs: 1420,
      isSelf: false,
      isAlert: true
    };
    setMessages(prev => [...prev, sosMsg]);
    playSynthesizedVoice('Emergency alert: Flood water breached embankment.', 'en');
  };

  const toggleModelPack = (code: string) => {
    setInstalledPacks(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  return (
    <section id="demo" className="py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60">
            <Smartphone className="w-3.5 h-3.5" />
            <span>INTERACTIVE DEVICE SIMULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Experience iTantra Exactly as Built on Android
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Directly test the 5 application screens from our real Android build. Test Push-to-Talk, simulated mesh discovery, offline Indic language switching, and see the verified <strong className="text-emerald-400 font-mono">101-byte</strong> BLE transmission in action.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Console: Simulator Controls & Scenario Testing */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Interactive Test Bench</span>
                </h3>
                <span className="text-xs font-mono text-neutral-400">Node ID: b8599dde</span>
              </div>

              {/* Quick Language Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-neutral-300">
                    Select Local Language Engine:
                  </label>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Active: {currentLangObj.nativeName} ({currentLangObj.name})
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {LANGUAGE_PACKS.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        playSynthesizedVoice(lang.samplePhrase, lang.code);
                      }}
                      className={`px-2.5 py-2 text-xs font-medium rounded-lg border transition-all text-left ${
                        selectedLanguage === lang.code
                          ? 'bg-emerald-950/90 border-emerald-400 text-emerald-300 font-semibold ring-1 ring-emerald-500/30'
                          : 'bg-neutral-800/70 border-neutral-700/60 text-neutral-400 hover:text-white hover:bg-neutral-800'
                      }`}
                    >
                      <div className="truncate font-semibold">{lang.nativeName}</div>
                      <div className="text-[10px] opacity-75 font-mono">{lang.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulation Scenarios */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-neutral-300">
                    Simulate Quick Voice Inputs:
                  </label>
                  <span className="text-[10px] text-neutral-400">1-click PTT simulation</span>
                </div>

                {selectedLanguage === 'mr' ? (
                  /* Marathi specific quick test prompts */
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => submitMessage('नदीच्या पाण्याची पातळी वाढत आहे, तातडीने मदत पाठवा.', 'mr', true)}
                      className="p-2.5 text-xs text-left bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/60 rounded-xl transition-all"
                    >
                      <div className="font-semibold text-emerald-300 truncate">पाण्याची पातळी वाढत आहे</div>
                      <div className="text-[10px] text-neutral-400">Water level rising · ~114 B</div>
                    </button>

                    <button
                      onClick={() => submitMessage('आम्ही टेकडीजवळ सुरक्षित आहोत, अन्न आणि औषधांची गरज आहे.', 'mr', true)}
                      className="p-2.5 text-xs text-left bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-800/60 rounded-xl transition-all"
                    >
                      <div className="font-semibold text-emerald-300 truncate">टेकडीजवळ सुरक्षित आहोत</div>
                      <div className="text-[10px] text-neutral-400">Safe near hills · ~120 B</div>
                    </button>

                    <button
                      onClick={() => submitMessage('तातडीने बचाव बोट पाठवा, ४ लोक अडकले आहेत.', 'mr', true)}
                      className="p-2.5 text-xs text-left bg-red-950/30 hover:bg-red-950/50 border border-red-800/50 rounded-xl transition-all"
                    >
                      <div className="font-semibold text-red-300 truncate">बचाव बोट पाठवा</div>
                      <div className="text-[10px] text-red-400/80">Rescue boat needed · ~108 B</div>
                    </button>

                    <button
                      onClick={triggerSOSAlert}
                      className="p-2.5 text-xs text-left bg-red-950/50 hover:bg-red-900/60 border border-red-800/70 rounded-xl transition-all"
                    >
                      <div className="font-semibold text-red-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                        <span>आणीबाणी अलर्ट (SOS)</span>
                      </div>
                      <div className="text-[10px] text-red-400/80">ALARM max-volume flood</div>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        submitMessage(currentLangObj.samplePhrase, selectedLanguage, true);
                      }}
                      className="p-2.5 text-xs text-left bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-all"
                    >
                      <div className="font-semibold text-neutral-200 truncate">{currentLangObj.name} Voice Note</div>
                      <div className="text-[10px] text-neutral-400">Generates ~101–120 B frame</div>
                    </button>

                    <button
                      onClick={triggerSOSAlert}
                      className="p-2.5 text-xs text-left bg-red-950/40 hover:bg-red-900/50 border border-red-800/60 rounded-xl transition-all"
                    >
                      <div className="font-semibold text-red-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                        <span>Trigger SOS Alert</span>
                      </div>
                      <div className="text-[10px] text-red-400/80">ALARM stream flood</div>
                    </button>
                  </div>
                )}
              </div>

              {/* Link Stats Summary */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2.5">
                <div className="text-xs font-semibold text-neutral-300">Live Telemetry (Phone-b859)</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500">Active Link:</span>{' '}
                    <span className="font-mono text-emerald-400">BLE 5.0 (Coded)</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Radio Power:</span>{' '}
                    <span className="font-mono text-white">0 dBm (Standard)</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Mesh Horizon:</span>{' '}
                    <span className="font-mono text-white">7 Hops max</span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Crypto:</span>{' '}
                    <span className="font-mono text-emerald-400">Ed25519 Verified</span>
                  </div>
                </div>
              </div>

              {/* View Switcher Shortcuts */}
              <div className="pt-2 flex items-center justify-between text-xs text-neutral-400">
                <span>Direct Screen Navigation:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setActiveTab('talk')}
                    className={`px-2 py-1 rounded text-xs ${activeTab === 'talk' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'bg-neutral-800 text-neutral-300'}`}
                  >
                    Talk
                  </button>
                  <button
                    onClick={() => setActiveTab('mesh')}
                    className={`px-2 py-1 rounded text-xs ${activeTab === 'mesh' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'bg-neutral-800 text-neutral-300'}`}
                  >
                    Mesh
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-2 py-1 rounded text-xs ${activeTab === 'settings' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'bg-neutral-800 text-neutral-300'}`}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => setActiveTab('models')}
                    className={`px-2 py-1 rounded text-xs ${activeTab === 'models' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'bg-neutral-800 text-neutral-300'}`}
                  >
                    Models
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Faithfully Rendered Mobile Phone Shell */}
          <div className="lg:col-span-7 flex justify-center order-1 lg:order-2">
            <div className="w-full max-w-[370px] sm:max-w-[400px] rounded-[44px] p-3.5 bg-neutral-900 border-[6px] border-neutral-700/80 shadow-2xl shadow-emerald-950/20 ring-1 ring-white/10 relative">
              {/* Phone Camera Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-neutral-950 rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
              </div>

              {/* Inside Screen Container (Matching exact Android App theme #F4F7F4 / Mint Sage UI) */}
              <div className="w-full h-[660px] rounded-[34px] overflow-hidden bg-[#F2F6F3] text-neutral-900 flex flex-col font-sans relative select-none">
                {/* 1. Android Status Bar */}
                <div className="h-8 px-6 pt-1.5 flex items-center justify-between text-[11px] font-semibold text-neutral-700 z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono">56:38</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono">LTE 0%</span>
                    <div className="w-4 h-2 rounded-sm border border-neutral-700 flex items-center p-0.5">
                      <div className="w-full h-full bg-emerald-700 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* 2. Top Header Bar (Matching Screenshots) */}
                <div className="px-4 py-2.5 bg-[#F2F6F3] border-b border-neutral-300/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold tracking-tight text-neutral-900">
                      {activeTab === 'talk' && `Talk · ${currentLangObj.nativeName}`}
                      {activeTab === 'mesh' && 'Mesh'}
                      {activeTab === 'settings' && 'Settings'}
                      {activeTab === 'models' && 'Model packs'}
                      {activeTab === 'diagnostics' && 'Diagnostics'}
                    </h1>
                  </div>

                  <div className="flex items-center gap-3">
                    {activeTab === 'mesh' && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-neutral-700">On</span>
                        <button
                          onClick={() => setMeshActive(!meshActive)}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors ${meshActive ? 'bg-emerald-700' : 'bg-neutral-400'}`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${meshActive ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    )}
                    {activeTab === 'talk' && (
                      <>
                        <button
                          onClick={() => playSynthesizedVoice('Audio channel active', selectedLanguage)}
                          className="text-amber-600 hover:text-amber-700 p-1"
                          title="Broadcast siren / volume"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setActiveTab('diagnostics')}
                          className="text-neutral-600 hover:text-neutral-900 p-1"
                        >
                          <span className="text-base font-bold leading-none">⋮</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* 3. Subheader Status Strip for Talk Screen */}
                {activeTab === 'talk' && (
                  <div className="px-4 py-1.5 bg-[#E8F0EA] border-b border-neutral-300/40 flex items-center justify-between text-[11px] text-neutral-700">
                    <span className="font-semibold text-emerald-800 flex items-center gap-1">
                      ★ {nearbyCount} nearby
                    </span>
                    <span className="text-neutral-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      STT ready
                    </span>
                    <span className="text-neutral-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      Voice ready
                    </span>
                    <span className="text-emerald-800 font-medium">Offline</span>
                  </div>
                )}

                {/* 4. Main Scrollable Screen Body */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                  {/* TAB 1: TALK SCREEN */}
                  {activeTab === 'talk' && (
                    <div className="space-y-3 min-h-[360px] flex flex-col justify-end">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-xs ${
                              msg.isAlert
                                ? 'bg-red-100 border border-red-300 text-red-950'
                                : msg.isSelf
                                ? 'bg-[#98D8AA]/60 text-neutral-900 rounded-br-xs'
                                : 'bg-[#D3E8D8] text-neutral-900 rounded-bl-xs'
                            }`}
                          >
                            {!msg.isSelf && (
                              <div className="text-xs font-bold text-neutral-800 mb-0.5">
                                {msg.sender}
                              </div>
                            )}
                            <div className="text-sm font-medium leading-relaxed">
                              {msg.text}
                            </div>
                            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-neutral-600 font-mono">
                              <span>{msg.timestamp}</span>
                              <span>·</span>
                              <span>{msg.originalLanguage}</span>
                              {!msg.isSelf && (
                                <>
                                  <span>·</span>
                                  <span>{msg.hops} hop</span>
                                  <span>·</span>
                                  <span>{msg.transport}</span>
                                  <span>·</span>
                                  <span className="font-semibold text-emerald-900">{msg.packetBytes} B</span>
                                  <span>·</span>
                                  <span>{msg.latencyMs} ms</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {isRecording && (
                        <div className="p-3 rounded-xl bg-emerald-100/90 border border-emerald-300 text-center space-y-1">
                          <div className="text-xs font-semibold text-emerald-900 flex items-center justify-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                            <span>Listening... (Speak naturally)</span>
                          </div>
                          <div className="text-[11px] text-emerald-800">
                            Silero VAD active · {recordingSeconds}s
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: MESH SCREEN */}
                  {activeTab === 'mesh' && (
                    <div className="space-y-4 pt-1">
                      {/* Self Node Card */}
                      <div className="p-3.5 rounded-2xl bg-white/80 border border-neutral-300/80 shadow-xs flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                            <Radio className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-neutral-900">Phone-b859</div>
                            <div className="text-xs text-neutral-600">
                              You · {currentLangObj.name} · ID b8599dde
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Nearby Phones Section */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-neutral-700 tracking-wider">
                          Nearby phones
                        </div>

                        {/* Discovered Peer Card (Matching Screenshot) */}
                        <div className="p-3.5 rounded-2xl bg-white border border-neutral-300/80 shadow-xs flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                              <span className="text-xs font-bold">ᛒ</span>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-neutral-900">Phone-fdd0</div>
                              <div className="text-xs text-neutral-600">
                                English · direct · seen 0s ago
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            -54 dBm
                          </span>
                        </div>
                      </div>

                      {/* Searching Status Box */}
                      <div className="p-4 rounded-2xl bg-white/60 border border-neutral-200 text-center space-y-2">
                        <div className="flex justify-center">
                          <RefreshCw className="w-5 h-5 text-emerald-700 animate-spin" />
                        </div>
                        <p className="text-xs text-neutral-700 leading-relaxed">
                          Searching over Bluetooth and Wi-Fi Direct. Keep the other phone within ~30 m with iTantra open.
                        </p>
                        <p className="text-[11px] text-neutral-500 leading-normal pt-1 border-t border-neutral-200">
                          Messages hop through other iTantra phones up to 7 times, so people out of direct range can still hear you.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: SETTINGS SCREEN */}
                  {activeTab === 'settings' && (
                    <div className="space-y-3 pt-1">
                      <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-neutral-500">Name</div>
                        <div className="text-sm font-bold text-neutral-900">Phone-b859</div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-neutral-500">My language</div>
                          <div className="text-sm font-bold text-neutral-900">{currentLangObj.nativeName} · {currentLangObj.name}</div>
                        </div>
                        <span className="text-xs font-semibold text-emerald-700">Change</span>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-neutral-900">Test my voice</div>
                          <button
                            onClick={() => playSynthesizedVoice(currentLangObj.samplePhrase, currentLangObj.code)}
                            className="p-1.5 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>
                        <div className="text-xs text-neutral-600 italic">
                          "{currentLangObj.samplePhrase}"
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-neutral-900">Call mode (no push-to-talk)</div>
                          <div className="text-[11px] text-neutral-500">Mic stays open; each sentence is sent when you pause.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={mode === 'call'}
                          onChange={() => setMode(mode === 'ptt' ? 'call' : 'ptt')}
                          className="w-4 h-4 accent-emerald-700"
                        />
                      </div>

                      <button
                        onClick={() => setActiveTab('models')}
                        className="w-full p-3 bg-white rounded-xl border border-neutral-200 flex items-center justify-between text-left"
                      >
                        <div>
                          <div className="text-xs font-bold text-neutral-900">Model packs</div>
                          <div className="text-[11px] text-neutral-500">
                            {Object.values(installedPacks).filter(Boolean).length} installed
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-400" />
                      </button>

                      <button
                        onClick={() => setActiveTab('diagnostics')}
                        className="w-full p-3 bg-white rounded-xl border border-neutral-200 flex items-center justify-between text-left"
                      >
                        <div>
                          <div className="text-xs font-bold text-neutral-900">Diagnostics</div>
                          <div className="text-[11px] text-neutral-500">Latency, bandwidth, model speed, memory</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-400" />
                      </button>
                    </div>
                  )}

                  {/* TAB 4: MODEL PACKS SCREEN (Matching Screenshot) */}
                  {activeTab === 'models' && (
                    <div className="space-y-3 pt-1 text-neutral-900">
                      <div className="text-xs text-neutral-600 leading-relaxed">
                        Tap a download icon to fetch a pack. Long-press an installed pack to remove it.
                      </div>

                      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden divide-y divide-neutral-100 text-xs">
                        <div className="px-3 py-2 bg-neutral-50 font-bold text-neutral-600 flex justify-between">
                          <span>Language</span>
                          <div className="flex gap-4 pr-1">
                            <span>STT</span>
                            <span>Voice</span>
                          </div>
                        </div>

                        {LANGUAGE_PACKS.map((lang) => {
                          const isInst = installedPacks[lang.code];
                          return (
                            <div key={lang.code} className="px-3 py-2.5 flex items-center justify-between">
                              <span className="font-medium text-neutral-900">
                                {lang.nativeName} · {lang.name}
                              </span>
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => toggleModelPack(lang.code)}
                                  className={`p-1 rounded ${isInst ? 'text-emerald-700' : 'text-neutral-400'}`}
                                >
                                  {isInst ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                                </button>
                                <button
                                  onClick={() => toggleModelPack(lang.code)}
                                  className={`p-1 rounded ${isInst ? 'text-emerald-700' : 'text-neutral-400'}`}
                                >
                                  {isInst ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="text-[10px] font-mono text-neutral-500 px-1 pt-1 break-all">
                        Storage: /data/user/0/in.itantra.itantra/files/models
                      </div>
                    </div>
                  )}

                  {/* TAB 5: DIAGNOSTICS */}
                  {activeTab === 'diagnostics' && (
                    <div className="space-y-3 pt-1 text-xs">
                      <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-2">
                        <div className="font-bold text-neutral-800">Hardware & Engine Telemetry</div>
                        <div className="space-y-1.5 font-mono text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-neutral-500">STT Decode RTF:</span>
                            <span className="font-semibold text-emerald-800">0.08 (12x faster than real-time)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">TTS Audio RTF:</span>
                            <span className="font-semibold text-emerald-800">0.62 (1.6x faster)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Resident RAM:</span>
                            <span className="font-semibold text-neutral-800">842 MB / 3000 MB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">VAD CPU Usage:</span>
                            <span className="font-semibold text-emerald-800">3.8% (Single Core)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Last BLE 1-Hop:</span>
                            <span className="font-semibold text-emerald-800">907 ms · 101 Bytes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Bottom Interactive Controls (PTT, Message Input, Mic FAB) */}
                {activeTab === 'talk' && (
                  <div className="p-3 bg-[#EAF0EB] border-t border-neutral-300/80 space-y-2.5">
                    {/* Input Field */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Or type a message"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submitMessage(inputText, selectedLanguage)}
                        className="flex-1 bg-white border border-neutral-300 rounded-lg px-3 py-1.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      />
                      <button
                        onClick={() => submitMessage(inputText, selectedLanguage)}
                        className="p-1.5 text-neutral-700 hover:text-emerald-800"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Mode Toggle & Mic Button */}
                    <div className="flex items-center justify-between">
                      {/* PTT / Call Segmented Switch */}
                      <div className="flex items-center bg-[#D6E3D8] p-0.5 rounded-lg border border-neutral-300">
                        <button
                          onClick={() => setMode('ptt')}
                          className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                            mode === 'ptt' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600'
                          }`}
                        >
                          PTT
                        </button>
                        <button
                          onClick={() => setMode('call')}
                          className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                            mode === 'call' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600'
                          }`}
                        >
                          Call
                        </button>
                      </div>

                      {/* Large Circular Green Mic Button */}
                      <button
                        onMouseDown={handleStartRecording}
                        onMouseUp={handleStopRecording}
                        onTouchStart={handleStartRecording}
                        onTouchEnd={handleStopRecording}
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md transition-all active:scale-95 ${
                          isRecording ? 'bg-red-600 ring-4 ring-red-300' : 'bg-[#1E6F45] hover:bg-[#185A38]'
                        }`}
                        title="Hold to speak, release to send"
                      >
                        <Mic className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 6. Android Bottom Navigation Bar (Matching App Screenshots) */}
                <div className="h-16 px-4 bg-[#EAF0EB] border-t border-neutral-300/80 flex items-center justify-around text-neutral-700">
                  {/* Talk Tab */}
                  <button
                    onClick={() => setActiveTab('talk')}
                    className={`flex flex-col items-center gap-1 py-1 px-3 rounded-full transition-all ${
                      activeTab === 'talk' ? 'bg-[#D3E8D8] text-emerald-900 font-bold' : 'text-neutral-600'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    <span className="text-[10px]">Talk</span>
                  </button>

                  {/* Mesh Tab (with red notification badge like screenshot) */}
                  <button
                    onClick={() => setActiveTab('mesh')}
                    className={`flex flex-col items-center gap-1 py-1 px-3 rounded-full transition-all relative ${
                      activeTab === 'mesh' ? 'bg-[#D3E8D8] text-emerald-900 font-bold' : 'text-neutral-600'
                    }`}
                  >
                    <div className="relative">
                      <Radio className="w-4 h-4" />
                      <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[9px] flex items-center justify-center font-bold">
                        1
                      </span>
                    </div>
                    <span className="text-[10px]">Mesh</span>
                  </button>

                  {/* Settings Tab */}
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex flex-col items-center gap-1 py-1 px-3 rounded-full transition-all ${
                      activeTab === 'settings' ? 'bg-[#D3E8D8] text-emerald-900 font-bold' : 'text-neutral-600'
                    }`}
                  >
                    <SettingsIcon className="w-4 h-4" />
                    <span className="text-[10px]">Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
