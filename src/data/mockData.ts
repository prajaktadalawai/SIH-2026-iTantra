import { LanguagePack, AppScreenshot, ThreatItem, ChatMessage } from '../types';

export const GITHUB_REPO_URL = 'https://github.com/nileshpatil6/SIH-Hexabits';
export const APK_RELEASE_URL = 'https://github.com/nileshpatil6/SIH-Hexabits/releases/latest/download/iTantra-v1.2.0.apk';
export const GITHUB_RELEASES_URL = 'https://github.com/nileshpatil6/SIH-Hexabits/releases';

export const LANGUAGE_PACKS: LanguagePack[] = [
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    sttInstalled: true,
    voiceInstalled: true,
    sttSize: '188 MB',
    voiceSize: '109 MB',
    sttWer: '15.0%',
    ttsRtf: '0.62',
    samplePhrase: 'बाढ़ का पानी बढ़ रहा है, तुरंत सहायता की आवश्यकता है।'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    sttInstalled: true,
    voiceInstalled: true,
    sttSize: '190 MB',
    voiceSize: '108 MB',
    sttWer: '18.2%',
    ttsRtf: '0.66',
    samplePhrase: 'नदीच्या पाण्याची पातळी वाढत आहे, तातडीने मदत पाठवा.'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    sttInstalled: true,
    voiceInstalled: true,
    sttSize: '142 MB',
    voiceSize: '105 MB',
    sttWer: '8.4%',
    ttsRtf: '0.54',
    samplePhrase: 'Emergency rescue boat required at bridge crossing.'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    sttInstalled: true,
    voiceInstalled: true,
    sttSize: '190 MB',
    voiceSize: '109 MB',
    sttWer: '30.3%',
    ttsRtf: '0.68',
    samplePhrase: 'ನಮಸ್ಕಾರ, ಇದು ಒಂದು ಪರೀಕ್ಷಾ ಸಂದೇಶ. ನಾನು ಬೆಟ್ಟದ ಹತ್ತಿರ ಇದ್ದೇನೆ.'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    sttInstalled: false,
    voiceInstalled: false,
    sttSize: '189 MB',
    voiceSize: '110 MB',
    sttWer: '15.9%',
    ttsRtf: '0.64',
    samplePhrase: 'ত্রাণ শিবিরের কাছে জল জমে গেছে, ওষুধ প্রয়োজন।'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    sttInstalled: false,
    voiceInstalled: false,
    sttSize: '188 MB',
    voiceSize: '109 MB',
    sttWer: '21.4%',
    ttsRtf: '0.67',
    samplePhrase: 'અહીં પીવાના પાણી અને ખોરાકની તાકીદે જરૂર છે.'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    sttInstalled: false,
    voiceInstalled: false,
    sttSize: '192 MB',
    voiceSize: '111 MB',
    sttWer: '31.2%',
    ttsRtf: '0.71',
    samplePhrase: 'மழை வெள்ளம் காரணமாக பாதை துண்டிக்கப்பட்டுள்ளது.'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    sttInstalled: false,
    voiceInstalled: false,
    sttSize: '191 MB',
    voiceSize: '110 MB',
    sttWer: '26.8%',
    ttsRtf: '0.69',
    samplePhrase: 'రవాణా సౌకర్యాలు నిలిచిపోయాయి, సహాయం కావాలి.'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    sttInstalled: false,
    voiceInstalled: false,
    sttSize: '194 MB',
    voiceSize: '112 MB',
    sttWer: '40.5%',
    ttsRtf: '0.74',
    samplePhrase: 'വെള്ളം കയറി വീടുകൾ ഒറ്റപ്പെട്ടിരിക്കുകയാണ്.'
  },
  {
    code: 'or',
    name: 'Odia',
    nativeName: 'ଓଡ଼ିଆ',
    sttInstalled: false,
    voiceInstalled: false,
    sttSize: '190 MB',
    voiceSize: '109 MB',
    sttWer: '23.4%',
    ttsRtf: '0.70',
    samplePhrase: 'ନଦୀ କୂଳ ଭାଙ୍ଗିଯାଇଛି, ଉଦ୍ଧାରକାରୀ ଦଳ ପଠାନ୍ତୁ।'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'Phone-fdd0',
    senderId: 'fdd078a1',
    text: 'Hey, I\'m drowning here near the hills',
    originalLanguage: 'English',
    timestamp: '17:18:48',
    hops: 1,
    transport: 'BLE',
    packetBytes: 134,
    latencyMs: 941,
    isSelf: false,
    isAlert: true
  },
  {
    id: 'msg-2',
    sender: 'Phone-b859 (You)',
    senderId: 'b8599dde',
    text: 'ನನ್ನ ಹೆಸರು ಅಭಿಷೇಕ್ ನಾನು',
    originalLanguage: 'Kannada',
    timestamp: '17:19:20',
    hops: 0,
    transport: 'BLE',
    packetBytes: 112,
    latencyMs: 496,
    isSelf: true
  },
  {
    id: 'msg-3',
    sender: 'Phone-b859 (You)',
    senderId: 'b8599dde',
    text: 'मेरा नाम इ अभिषेक है',
    originalLanguage: 'Hindi',
    timestamp: '17:20:08',
    hops: 0,
    transport: 'BLE',
    packetBytes: 110,
    latencyMs: 202,
    isSelf: true
  }
];

export const SCREENSHOTS_DATA: AppScreenshot[] = [
  {
    id: 'shot-live-multi-stt',
    title: 'Talk View: Live Cross-Lingual STT & Distress Alert (Latest Field Run)',
    category: 'talk',
    description: 'Screenshot from test run showing real emergency voice receipt: Phone-fdd0: "Hey, I\'m drowning here near the hills" (17:18:48 · English · 1 hop · BLE · 134 B · 941 ms), followed by real-time voice speech-to-text turns in Kannada and Hindi ("ನನ್ನ ಹೆಸರು ಅಭಿಷೇಕ್ ನಾನು" · STT 496 ms, "मेरा नाम इ अभिषेक है" · STT 202 ms, "माय नम इस अभिषेक" · STT 121 ms) with active recording state.',
    keyMetric: '134 Bytes · 941 ms BLE · 121–202 ms STT',
    timestamp: '17:20:15',
    highlights: [
      'Multi-lingual turn capture: English distress dispatch received over 1 hop BLE',
      'Ultra-fast on-device STT: 121 ms, 161 ms, 202 ms inference latency',
      'Active voice recording indicated by glowing red mic button (Pigeon audio bridge)',
      'Sub-150 byte semantic transmission with zero internet or cellular connectivity'
    ]
  },
  {
    id: 'shot-talk-active',
    title: 'Talk View: Kannada Reply & Distress Routing',
    category: 'talk',
    description: 'Kannada node receiving emergency "help" from Phone-fdd0 (101 B, 907 ms) and sending reply "I am near hills" (17:15:24 · Kannada) with 1 nearby node connected.',
    keyMetric: '101 Bytes · 907 ms 1-Hop BLE',
    timestamp: '17:15:24',
    highlights: [
      'Sub-150B single-frame packet transmission',
      'Real-time link diagnostics: hop count, transport, byte weight',
      'Instant toggle between Push-to-Talk (PTT) and Call mode',
      'Status indicators for STT ready, Voice ready, and Offline mesh'
    ]
  },
  {
    id: 'shot-talk-received',
    title: 'Talk View: Single Hop Distress Receipt',
    category: 'talk',
    description: 'Distress message capture showing exact byte footprint (101 Bytes) delivered under 1 second without internet connectivity.',
    keyMetric: 'Zero Data Connection Required',
    timestamp: '17:14:44',
    highlights: [
      '1 nearby node active in cluster',
      'Incoming message automatically tagged with sender ID and language',
      'Text accompanied by reconstructed synthetic speech audio'
    ]
  },
  {
    id: 'shot-talk-empty',
    title: 'Talk View: Initial Ready & Standby State',
    category: 'talk',
    description: 'Initial standby state on Kannada node showing "0 nearby · STT ready · Voice ready · Offline". Displays "Hold the mic button and speak. Each sentence is sent as soon as you pause."',
    keyMetric: 'Zero Idle Battery Drain (<5% CPU)',
    timestamp: '17:05:30',
    highlights: [
      'Clean intuitive field UI designed for stressed responders',
      'PTT vs Call mode toggle for hands-free operation',
      'Silero VAD standby listening without continuous network polling'
    ]
  },
  {
    id: 'shot-mesh-discovery',
    title: 'Mesh View: Autonomous Peer Discovery (Phone-fdd0)',
    category: 'mesh',
    description: 'Background discovery showing newly located node "Phone-fdd0" (English · direct · seen 0s ago) discovered via Bluetooth Extended Advertising.',
    keyMetric: 'Autonomous Neighbor Table',
    timestamp: '17:13:00',
    highlights: [
      'Zero user pairing required',
      'Automatic neighbor RSSI tracking',
      '7-hop relay warning and hop capacity notice'
    ]
  },
  {
    id: 'shot-mesh-searching',
    title: 'Mesh View: Searching & Relay Mode',
    category: 'mesh',
    description: 'Active mesh radio searching over BLE and Wi-Fi Direct. Visualizes the continuous scanning mode during emergency incidents.',
    keyMetric: 'Dual-Radio Scanning',
    timestamp: '17:10:36',
    highlights: [
      'Multi-protocol fallback: BLE 1M, BLE Coded PHY, Wi-Fi Direct',
      'Deterministic group owner tie-breaking to avoid split-brain networks'
    ]
  },
  {
    id: 'shot-settings',
    title: 'Settings & Voice Persona Calibration',
    category: 'settings',
    description: 'User settings showing device ID Phone-b859, selected native tongue Kannada, interactive voice testing ("ನಮಸ್ಕಾರ, ಇದು ಒಂದು ಪರೀಕ್ಷಾ ಸಂದೇಶ"), and diagnostics.',
    keyMetric: 'Offline Voice Calibration',
    timestamp: '17:10:39',
    highlights: [
      'Local speech synthesis test before field deployment',
      'Hands-free Voice Activity Detection (VAD) sensitivity configuration',
      'Access to system diagnostics (memory, CPU, battery, RTF)'
    ]
  },
  {
    id: 'shot-model-packs',
    title: 'Model Packs: 10 Offline Indic Engines',
    category: 'models',
    description: 'On-device language package manager. Shows Hindi, English, and Kannada STT + Voice installed in local isolated storage (/data/user/0/in.itantra.itantra/files/models).',
    keyMetric: '10 Indic Languages On-Demand',
    timestamp: '17:10:43',
    highlights: [
      'Modular downloads: install only required disaster regional languages',
      'Zero cloud dependency once downloaded',
      'Isolated app storage compliant with Android security sandboxing'
    ]
  }
];

export const THREAT_MODEL_DATA: ThreatItem[] = [
  {
    zone: '1. Input Surfaces',
    threat: 'Malicious or oversized RF audio payloads and crafted BLE advertisement packets designed to cause buffer overflow or crash parser.',
    owaspCategory: 'OWASP A03 / LLM02 (Input Validation)',
    riskSeverity: 'Critical',
    countermeasure: 'Strict PDU length clamping (max 254 bytes for Extended Advertising). Schema deserialization with null-safe type assertions and bounds checking before parsing IPF frames.',
    verificationMethod: 'Automated fuzz testing on BLE packet ingestion parser with malformed payload frames.'
  },
  {
    zone: '2. Planning & Reasoning',
    threat: 'Indirect prompt injection or control hijacking via transcribed distress text if parsed by downstream LLM rescue dispatch summaries.',
    owaspCategory: 'OWASP LLM01 (Indirect Prompt Injection)',
    riskSeverity: 'High',
    countermeasure: 'Strict separation of text content and control instructions. Treat all speech-to-text strings as passive untrusted payloads; never execute user text as agent instructions.',
    verificationMethod: 'Injection test suite with payload boundary markers and XML/JSON structured isolation.'
  },
  {
    zone: '3. Tool Execution',
    threat: 'Unauthorized access to device audio recording, background BLE scanning, or SMS gateway privileges without explicit user intent.',
    owaspCategory: 'OWASP A01 (Broken Access Control)',
    riskSeverity: 'High',
    countermeasure: 'Runtime permission gating with Android 12+ BLUETOOTH_SCAN, ADVERTISE, CONNECT, and RECORD_AUDIO. Explicit user opt-in required for SMS Gateway forwarding.',
    verificationMethod: 'Permission state inspection and unit tests ensuring gateway never fires without granted SMS consent.'
  },
  {
    zone: '4. Memory & State',
    threat: 'Mesh cache-poisoning, duplicate packet floods, and replay attacks injecting fabricated emergency alerts (BitChat vulnerability).',
    owaspCategory: 'OWASP A07 (Identification & Auth Failures)',
    riskSeverity: 'Critical',
    countermeasure: 'Every packet is signed with sender Ed25519 private key. Relays verify signature before caching or rebroadcasting. 10-minute sliding timestamp window and nonce Bloom filter.',
    verificationMethod: 'Replay harness injecting duplicate and modified packets; confirmed rejection at router boundary.'
  },
  {
    zone: '5. Inter-System Comm.',
    threat: 'Broadcast storms exhausting handset battery in crowded relief camps; unauthorized broadcast impersonating government relief agencies.',
    owaspCategory: 'OWASP A05 (Security Misconfiguration / DoS)',
    riskSeverity: 'High',
    countermeasure: 'Counter-based suppressed flooding (cancel rebroadcast if heard >= 3 times). Cryptographic verification badge for official NDMA/ISRO public keys.',
    verificationMethod: 'Multi-node network simulation measuring transmission counts and battery drop with flood suppression.'
  }
];

export const TECHNICAL_SPECIFICATIONS = [
  {
    label: 'STT Architecture',
    value: 'AI4Bharat IndicConformer (120M params, int8 quantized ~188–194 MB)',
    detail: 'Per-language hybrid CTC-RNNT architecture running on sherpa-onnx engine.'
  },
  {
    label: 'TTS Synthesis',
    value: 'MMS-TTS (VITS) + Custom ProsodyRenderer & Voice Bank',
    detail: 'Phrase-streamed audio playback, filler audio clip injection, and pitch/speed scaling.'
  },
  {
    label: 'Network Bitrate',
    value: '101–150 Bytes / 3.5s sentence (~340 bps)',
    detail: '98% bandwidth reduction vs standard Opus 16 kbps (7,000 Bytes).'
  },
  {
    label: 'Mesh Transports',
    value: 'BLE 5.0 Extended Advertising + BLE Coded PHY (S=8) + Wi-Fi Direct',
    detail: 'Connectionless alert flooding up to 7 hops with store-carry-forward DTN.'
  },
  {
    label: 'Hardware Target',
    value: 'Low-cost Android smartphones (2 GB – 3 GB RAM, Android 8.0+ API 26)',
    detail: 'Optimized for high-volume Indian budget devices (OnePlus, Samsung, Xiaomi, Realme).'
  },
  {
    label: 'Security & Auth',
    value: 'Ed25519 Cryptographic Signatures + Sliding Replay Nonce Window',
    detail: 'Verified identity for all nodes; authenticated public-key authority for NDMA/ISRO.'
  }
];
