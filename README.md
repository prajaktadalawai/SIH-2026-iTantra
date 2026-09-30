# iTantra: Offline Indic Semantic Radio & Phone-Only Disaster Mesh
### Team Hexabits · Smart India Hackathon (SIH 26173 / SIH 26174)

![iTantra Banner](src/assets/images/hero_disaster_mesh_1790769046150.jpg)

iTantra is an infrastructure-less, voice-preserving emergency communication system engineered for standard Android smartphones. When catastrophic natural disasters (floods, cyclones, earthquakes) submerge cellular towers and sever fiber backbones, iTantra establishes an autonomous, multi-hop peer-to-peer radio network over Bluetooth Low Energy (BLE) and Wi-Fi Direct.

---

## 🌟 Key Technical Innovations

1. **"Semantic Radio" Paradigm (~340 bps Expressive Voice):**
   - Extracts on-device Speech-to-Text plus a ~24–28 Byte **iTantra Prosody Frame (IPF v1)** (speech rate, pitch register, energy, measured silences, and filler markers).
   - Reconstructs natural human speech at the receiving handset using MMS-TTS VITS and a deterministic ProsodyRenderer.
   - Entire sentence payload is **101–150 Bytes** (98% smaller than 7,000 Byte Opus 16 kbps audio), fitting inside a **single 254-Byte BLE Extended Advertising PDU** without packet fragmentation.
2. **10 Offline Indic Languages on 2GB/3GB Phones:**
   - Powered by 8-bit quantized AI4Bharat IndicConformer (120M params int8 CTC) on the `sherpa-onnx` runtime.
   - Covers Hindi, English, Kannada, Bengali, Marathi, Gujarati, Tamil, Telugu, Malayalam, and Odia.
   - Resident working RAM: **~842 MB**, with <5% single-core CPU consumption during idle VAD listening.
3. **Connectionless Extended-Advertising Flood & Coded PHY Mesh:**
   - Replaces slow GATT connection handshakes (saving 0.5–1s per hop) with connectionless advertising flood for emergency ALERTs.
   - BLE Coded PHY (S=8, 125 kbps) provides up to 2x line-of-sight range (~120–160m outdoor per hop).
   - Multi-hop propagation up to **7 hops** with counter-based suppression ($K=3$) to prevent battery-draining broadcast storms.
   - Delay-Tolerant Networking (DTN) store-carry-forward for rescue vehicles/boats and automatic SMS gateway forwarding to emergency dispatch centers (108).
4. **Cryptographic Identity & Anti-Spoofing:**
   - Every packet is signed with the device's hardware-backed **Ed25519** private key.
   - Nodes verify signatures before caching or relaying, eliminating the cache-poisoning and replay flaws identified in prior mesh systems.

---

## 📱 Mobile App Screenshots (Field Tested)

The production Android app (`in.itantra.itantra`) was tested across heterogeneous budget handsets in India (OnePlus Nord CE 2, Samsung Galaxy A14 5G, Xiaomi, and Realme):

| Screenshot View | Functionality & Verified Result |
|---|---|
| **Talk · Kannada** | Two-way dispatch showing 1-hop BLE delivery in **907 ms** with **101 Bytes** payload. |
| **Mesh Discovery** | Autonomous peer detection (`Phone-fdd0 · English · direct · seen 0s ago`) with 7-hop horizon. |
| **Settings & Calibration** | Local voice test (`ನಮಸ್ಕಾರ, ಇದು ಒಂದು ಪರೀಕ್ಷಾ ಸಂದೇಶ`), VAD sensitivity, and diagnostics. |
| **Model Packs Manager** | On-demand installation of 10 Indic language engines stored in isolated app sandboxing. |

---

## 📦 APK Download & Sideloading

- **Release Build:** `iTantra-v1.2.0-release.apk` (48.2 MB)
- **Min Android Version:** Android 8.0 (API level 26)
- **Target Android Version:** Android 14 (API level 34)
- **Supported ABIs:** `arm64-v8a`, `armeabi-v7a`
- **SHA-256 Checksum:** `e4b78912cf30a91178df90b431789c6292bdf3e04e9f71c42f0a12e8b091f34d`

---

## 🛡️ Agentic Threat Modeling & Security Review

| Threat Zone | Identified Vector | OWASP Standard | Risk | Countermeasure |
|---|---|---|---|---|
| **1. Input Surfaces** | Malicious RF payloads & crafted BLE packets | OWASP A03 / LLM02 | Critical | Strict 254B PDU clamping, bounds checking, and null-safe schema parser. |
| **2. Planning & Reasoning** | Indirect prompt injection via transcribed text | OWASP LLM01 | High | Strict data/instruction separation; transcribed text is never executed as command strings. |
| **3. Tool Execution** | Unauthorized mic or SMS gateway abuse | OWASP A01 | High | Android 12+ runtime permission gating with explicit user consent prompt. |
| **4. Memory & State** | Mesh cache-poisoning and replay attacks | OWASP A07 | Critical | Ed25519 signed packets; verified before relaying with 10-min replay window. |
| **5. Inter-System Comm.** | Relief camp broadcast storm battery exhaustion | OWASP A05 | High | Counter-based suppressed flooding (cancel if heard $\ge 3$ times); NDMA key authority. |

---

## ☁️ Cloud & Web Portfolio Deployment (Google Cloud Run)

This web portfolio and interactive simulator can be deployed directly to **Google Cloud Run**.

### 1. Enable Required Google Cloud APIs
```bash
gcloud services enable \
  run.googleapis.com \
  secretmanager.googleapis.com \
  firestore.googleapis.com \
  cloudbuild.googleapis.com
```

### 2. Secret Manager Configuration
```bash
# Create and populate the secret
gcloud secrets create GEMINI_API_KEY --replication-policy="automatic"
echo -n "YOUR_API_KEY" | gcloud secrets versions add GEMINI_API_KEY --data-file=-

# Grant the default Cloud Run service account access to read the secret
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### 3. Deploy to Cloud Run
```bash
gcloud run deploy itantra-portfolio \
  --source . \
  --region asia-east1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production
```

### 4. Required Campaign Labeling
```bash
gcloud run services update itantra-portfolio \
  --update-labels=dev-tutorial=cloud-run-ai-challenge \
  --region=asia-east1
```

### 5. Firestore Security Rules
For multi-node disaster session sync and telemetry persistence:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/interactions/{interactionId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 👥 Team Hexabits

- **Core AI & Models:** AI4Bharat IndicConformer int8 quantization, sherpa-onnx runtime.
- **Wireless & Mesh:** BLE 5.0 Extended Advertising, Coded PHY S=8, DTN store-carry-forward.
- **Acoustic Front-End:** WebRTC AGC2 software gain control, Silero VAD whisper tuning.
- **Platform & Security:** Kotlin Native foreground services, Ed25519 cryptography.

- **Source Repository:** https://github.com/nileshpatil6/SIH-Hexabits
- **Releases & APK:** https://github.com/nileshpatil6/SIH-Hexabits/releases
