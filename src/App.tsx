import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DualEngineSection } from './components/DualEngineSection';
import { HowItWorksFlow } from './components/HowItWorksFlow';
import { LiveSimulator } from './components/LiveSimulator';
import { ImpactMetrics } from './components/ImpactMetrics';
import { Footer } from './components/Footer';
import { ContractInspectorModal } from './components/ContractInspectorModal';

export default function App() {
  const [isContractModalOpen, setIsContractModalOpen] = useState<boolean>(false);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Top Header Navbar */}
      <Navbar 
        onOpenContractModal={() => setIsContractModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Opening Hook & Flagship Hero Section */}
        <HeroSection 
          onLaunchDemo={() => handleScrollToSection('live-simulator')}
          onViewContract={() => setIsContractModalOpen(true)}
        />

        {/* 2. Core Features (The Dual Engine Grid) */}
        <DualEngineSection 
          onOpenContract={() => setIsContractModalOpen(true)}
          onExploreDemo={() => handleScrollToSection('live-simulator')}
        />

        {/* 3. How It Works (4-Step Sequential Visual Flow) */}
        <HowItWorksFlow />

        {/* 4. Interactive Live Demo Simulator / UI Workbench */}
        <LiveSimulator 
          onOpenContract={() => setIsContractModalOpen(true)}
        />

        {/* 5. Indian Agritech Impact, Comparison & Tech Stack */}
        <ImpactMetrics />
      </main>

      {/* Footer */}
      <Footer 
        onOpenContractModal={() => setIsContractModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Verified Smart Contract & Sepolia Inspector Modal */}
      <ContractInspectorModal 
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
      />

    </div>
  );
}
