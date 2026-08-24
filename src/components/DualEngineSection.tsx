import React from 'react';
import { 
  FileCode2, 
  Cpu, 
  Network, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Lock, 
  Layers, 
  Satellite, 
  ArrowRight,
  Database,
  BarChart3
} from 'lucide-react';

interface DualEngineSectionProps {
  onOpenContract: () => void;
  onExploreDemo: () => void;
}

export const DualEngineSection: React.FC<DualEngineSectionProps> = ({ onOpenContract, onExploreDemo }) => {
  return (
    <section id="dual-engine" className="py-20 lg:py-28 relative bg-[#070B14] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold">
            <span>CORE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            The Dual Engine: <br className="hidden sm:block" />
            <span className="text-emerald-400">Autonomous Settlement</span> Meets <span className="text-cyan-400">Machine Intelligence</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A symbiotic protocol where off-chain multi-modal AI acts as the impartial validator, 
            and on-chain EVM smart contracts act as the unstoppable execution engine.
          </p>
        </div>

        {/* The 2 Primary Pillars (Dual Engine Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Engine 1: The Smart Contract */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-[#0A0F1D] border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 relative group shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
                <FileCode2 className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-semibold">
                SOLIDITY 0.8.24
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">ENGINE A &bull; THE AUTOMATIC AGREEMENT</span>
              <h3 className="text-2xl font-bold text-white font-display">
                Tamper-Proof Smart Contract Layer
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Autonomous EVM contract holding micro-insurance liquidity in non-custodial escrow. 
                When a valid AI risk score arrives, payouts disburse programmatically with zero administrative friction or surveyor bribery.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2.5 mb-8 text-xs font-mono text-slate-300">
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Sub-4 Second Settlement:</strong> Direct transfers to farmer Web3 wallet or instant UPI rail.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Adaptive Thresholds:</strong> Auto-Approve (&le;30), Escrow Review (31-70), Revert Fraud (&gt;70).</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Immutable Event Logging:</strong> Emits verifiable event hashes for state auditing.</span>
              </div>
            </div>

            <button
              onClick={onOpenContract}
              className="w-full py-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-semibold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
            >
              <span>Inspect SmartFlexAgrinsurance.sol</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Engine 2: The AI Risk Layer */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-[#0A0F1D] border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 relative group shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-inner">
                <Cpu className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold">
                XGBOOST &bull; SENTINEL-2
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">ENGINE B &bull; THE SMART CHECKER</span>
              <h3 className="text-2xl font-bold text-white font-display">
                Multi-Modal AI Risk Scoring Layer
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Evaluates off-chain multi-spectral satellite imagery, IMD Doppler precipitation anomalies, 
                and image metadata to compute a definitive 0–100 risk score that eliminates fraudulent claims.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2.5 mb-8 text-xs font-mono text-slate-300">
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Optical & SAR Telemetry:</strong> Sentinel-2 NDVI spectral drop checks crop biomass loss.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">IMD & ERA5 Reanalysis:</strong> Validates claimed rain deficit/surplus vs radar ground truth.</span>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Spoofing Detection:</strong> Photo EXIF analysis and historical velocity fraud filters.</span>
              </div>
            </div>

            <button
              onClick={onExploreDemo}
              className="w-full py-3 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 font-semibold text-xs font-mono transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
            >
              <span>Test AI Anomaly Detection in Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Supporting Pillars (Chainlink Oracle + Indian Agri-Stack) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Pillar 3: Chainlink Oracle Bridge */}
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 shrink-0">
              <Network className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-white font-display">Chainlink Functions Consensus</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">ORACLE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Securely bridges verified off-chain Python inferences into the Solidity smart contract via a decentralized oracle network, preventing single-point tampering.
              </p>
            </div>
          </div>

          {/* Pillar 4: Indian AgriStack & Cadastral GPS */}
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-white font-display">PMFBY AgriStack & Vernacular Voice</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">INDIA READY</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Integrates with PM-KISAN cadastral plot coordinates, Aadhaar hash identity, and Bhashini AI voice guidance in Hindi, Marathi, Telugu, and Gujarati.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
