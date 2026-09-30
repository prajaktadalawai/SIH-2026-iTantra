export interface LanguagePack {
  code: string;
  name: string;
  nativeName: string;
  sttInstalled: boolean;
  voiceInstalled: boolean;
  sttSize: string;
  voiceSize: string;
  sttWer: string;
  ttsRtf: string;
  samplePhrase: string;
}

export interface AppScreenshot {
  id: string;
  title: string;
  category: 'talk' | 'mesh' | 'settings' | 'models';
  description: string;
  keyMetric: string;
  timestamp: string;
  highlights: string[];
}

export interface MeshNode {
  id: string;
  name: string;
  language: string;
  status: 'active' | 'relaying' | 'gateway' | 'idle';
  x: number;
  y: number;
  battery: number;
  role: 'Leaf' | 'Relay' | 'Data Mule' | 'SMS Gateway';
  hopsFromSource?: number;
  delivered?: boolean;
}

export interface ThreatItem {
  zone: string;
  threat: string;
  owaspCategory: string;
  riskSeverity: 'Critical' | 'High' | 'Medium';
  countermeasure: string;
  verificationMethod: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderId: string;
  text: string;
  originalLanguage: string;
  timestamp: string;
  hops: number;
  transport: 'BLE' | 'Wi-Fi Direct' | 'LoRa Gateway';
  packetBytes: number;
  latencyMs: number;
  isSelf?: boolean;
  isAlert?: boolean;
}
