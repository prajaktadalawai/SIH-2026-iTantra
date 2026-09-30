import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveAppDemo } from './components/InteractiveAppDemo';
import { ScreenshotsGallery } from './components/ScreenshotsGallery';
import { SemanticRadioSection } from './components/SemanticRadioSection';
import { MeshSimulator } from './components/MeshSimulator';
import { FeaturesList } from './components/FeaturesList';
import { DownloadSection } from './components/DownloadSection';
import { DevelopmentJourney } from './components/DevelopmentJourney';
import { ThreatModelSection } from './components/ThreatModelSection';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';
import { ApkDownloadModal } from './components/ApkDownloadModal';

export default function App() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar onOpenDownload={() => setIsDownloadModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section with Value Proposition and Telemetry HUD */}
        <Hero onOpenDownload={() => setIsDownloadModalOpen(true)} />

        {/* 2. Interactive App Demo & Android Mobile Simulator (Screenshots Replicated) */}
        <InteractiveAppDemo />

        {/* 3. Screenshots Gallery with Field Inspection & Metrics */}
        <ScreenshotsGallery />

        {/* 4. Semantic Radio & Audio Prosody Breakdown */}
        <SemanticRadioSection />

        {/* 5. Phone-Only Multi-Hop Disaster Mesh Simulator */}
        <MeshSimulator />

        {/* 6. Comprehensive 6-Pillar Features List & System Specs */}
        <FeaturesList />

        {/* 7. Direct APK Download Center, Verification Hash & Sideloading */}
        <DownloadSection onOpenDownload={() => setIsDownloadModalOpen(true)} />

        {/* 8. Development Journey & Field Testing Benchmarks */}
        <DevelopmentJourney />

        {/* 9. Agentic Threat Modeling & OWASP Compliance Table */}
        <ThreatModelSection />

        {/* 10. Team Hexabits & SIH Submission Profile */}
        <TeamSection />
      </main>

      {/* Footer */}
      <Footer onOpenDownload={() => setIsDownloadModalOpen(true)} />

      {/* Interactive APK Download Modal */}
      <ApkDownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
