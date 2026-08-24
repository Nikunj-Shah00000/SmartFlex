import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ExternalLink, 
  Zap, 
  Activity, 
  Lock, 
  Sparkles,
  Layers,
  FileCode2,
  TrendingDown,
  Clock,
  Radio,
  Sliders
} from 'lucide-react';
import { CONTRACT_ADDRESS_SEPOLIA } from '../data/mockData';

interface HeroSectionProps {
  onLaunchDemo: () => void;
  onViewContract: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunchDemo, onViewContract }) => {
  // Interactive Hero Preview State
  const [activeScore, setActiveScore] = useState<number>(14);
  const [isAutomatedRunning, setIsAutomatedRunning] = useState<boolean>(true);
  const [pulseStep, setPulseStep] = useState<number>(2);

  // Auto-cycle through 3 representative states to immediately capture judge attention
  useEffect(() => {
    if (!isAutomatedRunning) return;
    const interval = setInterval(() => {
      setActiveScore((prev) => {
        if (prev === 14) return 88;
        if (prev === 88) return 46;
        return 14;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutomatedRunning]);

  // Determine outcome based on score
  const getOutcome = (score: number) => {
    if (score <= 30) {
      return {
        label: 'AUTO-APPROVED & PAID',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/80 border-emerald-500/50',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        actionText: 'Instant 0.38 ETH (₹48,500) disbursed via Sepolia',
        icon: CheckCircle2,
        speed: '3.8s execution',
        category: 'LOW RISK'
      };
    } else if (score <= 70) {
      return {
        label: 'ESCROWED FOR DAO REVIEW',
        color: 'text-amber-400',
        bg: 'bg-amber-950/80 border-amber-500/50',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        actionText: 'Locked in MultiSig Escrow Vault (12h SLA)',
        icon: AlertTriangle,
        speed: 'Flagged for inspection',
        category: 'MEDIUM RISK'
      };
    } else {
      return {
        label: 'TRANSACTION REVERTED & BLOCKED',
        color: 'text-rose-400',
        bg: 'bg-rose-950/80 border-rose-500/50',
        badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        actionText: 'Fraud Blocked: Weather precipitation contradiction',
        icon: XCircle,
        speed: '0 Gas wasted on payout',
        category: 'HIGH RISK'
      };
    }
  };

  const currentOutcome = getOutcome(activeScore);
  const OutcomeIcon = currentOutcome.icon;

  return (
    <section id="hero" className="relative pt-8 pb-20 lg:pt-14 lg:pb-32 overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[300px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Pitch Tag & Audience Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>AI Risk-Scoring &times; EVM Smart Contracts</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 font-mono">
            <span>Target: Indian Smallholder Agritech</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.12]">
            Traditional crop insurance takes <span className="text-rose-400 line-through decoration-rose-500/60 decoration-4">60 days</span>.
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              SmartFlexAI settles claims in 4 seconds.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Fusing off-chain AI risk scoring with on-chain Solidity contracts to deliver instant, 
            fraud-resistant micro-insurance payouts for Indian farmers without surveyors, bribery, or delays.
          </p>

          {/* Dual Action Buttons */}
          <div className="pt-3 pb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchDemo}
              id="hero-primary-cta"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-base shadow-xl shadow-emerald-900/40 hover:shadow-emerald-900/60 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-current text-slate-950 group-hover:scale-110 transition-transform" />
              <span>Launch Live Demo Simulator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onViewContract}
              id="hero-secondary-cta"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/50 text-slate-200 font-semibold text-base transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
            >
              <FileCode2 className="w-4 h-4 text-emerald-400" />
              <span>View Smart Contract on Sepolia</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Quick trust metrics bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Settlement Speed</span>
              </div>
              <p className="text-xl font-bold text-white font-display">&lt; 4.0s</p>
              <p className="text-[11px] text-slate-400">Autonomous execution</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Middlemen</span>
              </div>
              <p className="text-xl font-bold text-white font-display">0% Leakage</p>
              <p className="text-[11px] text-slate-400">Direct to farmer wallet / UPI</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>AI Anomaly Filter</span>
              </div>
              <p className="text-xl font-bold text-white font-display">98.4% Precision</p>
              <p className="text-[11px] text-slate-400">Radar & Sentinel-2 check</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Audit Trail</span>
              </div>
              <p className="text-xl font-bold text-white font-display">100% On-Chain</p>
              <p className="text-[11px] text-slate-400">Immutable Sepolia logs</p>
            </div>
          </div>
        </div>

        {/* Dynamic Hero Visual Pipeline: Interactive Risk Score to On-Chain Settlement Visualizer */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/80 via-slate-900/90 to-[#070B14] p-1 border border-slate-700/80 shadow-2xl shadow-emerald-950/20">
            
            {/* Top Widget Bar */}
            <div className="px-5 py-3.5 bg-slate-900/90 rounded-t-xl border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 pl-2 border-l border-slate-700 text-xs font-mono text-slate-300">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-slate-400">Pipeline Preview:</span>
                  <span className="font-semibold text-emerald-300">Live AI Risk Score &rarr; Smart Contract Execution</span>
                </div>
              </div>

              {/* Quick Interactive Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">Try Scenario:</span>
                <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs">
                  <button
                    onClick={() => { setActiveScore(14); setIsAutomatedRunning(false); }}
                    className={`px-2.5 py-1 rounded-md transition-all font-mono font-medium ${
                      activeScore <= 30 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    id="hero-preset-genuine"
                  >
                    Low Risk (14)
                  </button>
                  <button
                    onClick={() => { setActiveScore(46); setIsAutomatedRunning(false); }}
                    className={`px-2.5 py-1 rounded-md transition-all font-mono font-medium ${
                      activeScore > 30 && activeScore <= 70 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    id="hero-preset-review"
                  >
                    Review (46)
                  </button>
                  <button
                    onClick={() => { setActiveScore(88); setIsAutomatedRunning(false); }}
                    className={`px-2.5 py-1 rounded-md transition-all font-mono font-medium ${
                      activeScore > 70 
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    id="hero-preset-fraud"
                  >
                    Fraud (88)
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Pipeline Body */}
            <div className="p-6 sm:p-8 bg-[#090E1B]/95 rounded-b-xl space-y-6">
              
              {/* Interactive Pipeline Nodes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                
                {/* Node 1: Multi-Modal AI Ingestion */}
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                      STEP 1: OFF-CHAIN TELEMETRY
                    </span>
                    <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-display">Weather & Satellite Telemetry</h4>
                  
                  <div className="space-y-2 text-xs font-mono text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">IMD Doppler:</span>
                      <span className="text-emerald-300 font-semibold">
                        {activeScore > 70 ? '114.2mm (Surplus)' : '148.6mm (Storm)'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Sentinel-2 NDVI:</span>
                      <span className={activeScore > 70 ? 'text-rose-400 font-semibold' : 'text-emerald-300 font-semibold'}>
                        {activeScore > 70 ? '+6.2% Normal Canopy' : '-71.4% Crop Damage'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Cadastral GPS:</span>
                      <span className={activeScore > 70 ? 'text-rose-400' : 'text-emerald-400'}>
                        {activeScore > 70 ? 'Mismatch (42km off)' : 'Verified Polygon'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Node 2: The AI Risk Gauge & Chainlink Bridge */}
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800/60">
                      STEP 2: ML RISK INFERENCE
                    </span>
                    <Cpu className="w-4 h-4 text-indigo-400" />
                  </div>
                  
                  <div className="text-center py-1">
                    <div className="text-[11px] font-mono text-slate-400 mb-1">AI Risk Assessment Model</div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-4xl font-extrabold font-display ${
                        activeScore <= 30 ? 'text-emerald-400' : activeScore <= 70 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {activeScore}
                      </span>
                      <span className="text-slate-500 font-mono text-sm">/ 100</span>
                    </div>
                    
                    {/* Animated Progress Bar */}
                    <div className="w-full bg-slate-950 rounded-full h-2.5 mt-2 p-0.5 border border-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          activeScore <= 30 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                            : activeScore <= 70 
                              ? 'bg-gradient-to-r from-amber-500 to-orange-400' 
                              : 'bg-gradient-to-r from-rose-500 to-red-600'
                        }`}
                        style={{ width: `${activeScore}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1 px-1">
                      <span>0 (Auto-Pay)</span>
                      <span>30</span>
                      <span>70</span>
                      <span>100 (Reject)</span>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-center px-2 py-1 rounded bg-slate-950/80 border border-slate-800/90 text-slate-300">
                    Signed by Chainlink Oracle &rarr; EVM Calldata
                  </div>
                </div>

                {/* Node 3: Smart Contract On-Chain Resolution */}
                <div className={`p-5 rounded-xl border transition-all duration-300 ${currentOutcome.bg} space-y-3 relative`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${currentOutcome.badgeBg}`}>
                      STEP 3: SEPOLIA SETTLEMENT
                    </span>
                    <OutcomeIcon className={`w-4 h-4 ${currentOutcome.color}`} />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400">Contract Outcome:</span>
                    <h4 className={`text-sm font-bold font-display ${currentOutcome.color}`}>
                      {currentOutcome.label}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-200 leading-snug">
                    {currentOutcome.actionText}
                  </p>

                  <div className="pt-1 text-[11px] font-mono flex items-center justify-between text-slate-400 border-t border-slate-800/80">
                    <span>Block: #6294812</span>
                    <span className="text-emerald-400">{currentOutcome.speed}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Score Slider directly on the visual element */}
              <div className="pt-2 px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>Test any Risk Score (0-100):</span>
                </div>
                <div className="flex items-center gap-4 flex-1 max-w-md">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={activeScore}
                    onChange={(e) => {
                      setActiveScore(Number(e.target.value));
                      setIsAutomatedRunning(false);
                    }}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    id="hero-risk-slider"
                  />
                  <span className="font-mono text-xs font-bold text-white px-2 py-1 rounded bg-slate-900 border border-slate-700 min-w-10 text-center">
                    {activeScore}
                  </span>
                </div>
                <button
                  onClick={onLaunchDemo}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Sandbox</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
