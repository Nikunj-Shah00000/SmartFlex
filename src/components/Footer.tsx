import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  ExternalLink, 
  Github, 
  BookOpen, 
  Heart, 
  FileCode2,
  Cpu
} from 'lucide-react';
import { CONTRACT_ADDRESS_SEPOLIA, ORACLE_ADDRESS_CHAINLINK } from '../data/mockData';

interface FooterProps {
  onOpenContractModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContractModal, onScrollToSection }) => {
  return (
    <footer className="bg-[#04070F] border-t border-slate-900 py-16 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Pitch */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white font-display">
                SmartFlex<span className="text-emerald-400">AI</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Adaptive Smart Contracts for Fair, Fraud-Resistant Agreements. Fusing Blockchain and Artificial Intelligence for transparent, automated micro-insurance crop claims in India.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1 max-w-md">
              <div className="flex justify-between">
                <span>Sepolia Contract:</span>
                <span className="text-emerald-400 font-semibold">{CONTRACT_ADDRESS_SEPOLIA.slice(0, 8)}...{CONTRACT_ADDRESS_SEPOLIA.slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span>Oracle Router:</span>
                <span className="text-cyan-400 font-semibold">{ORACLE_ADDRESS_CHAINLINK.slice(0, 8)}...{ORACLE_ADDRESS_CHAINLINK.slice(-6)}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onScrollToSection('hero')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Hero Overview
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('dual-engine')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  The Dual Engine
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('how-it-works')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  4-Step Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('live-simulator')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Interactive Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('impact')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Impact & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Web3 & Agritech Resources */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Protocol</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenContractModal} className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <FileCode2 className="w-3.5 h-3.5" />
                  Solidity Contract
                </button>
              </li>
              <li>
                <span className="text-slate-400">Sepolia Testnet Explorer</span>
              </li>
              <li>
                <span className="text-slate-400">Chainlink Functions ABI</span>
              </li>
              <li>
                <span className="text-slate-400">Sentinel-2 NDVI Pipeline</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Hackathon Target */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Target Audience</h4>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                Hackathon Judges
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                Web3 Builders
              </span>
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                Agritech Stakeholders
              </span>
              <span className="px-2 py-1 rounded bg-emerald-950 border border-emerald-500/30 text-[11px] text-emerald-300">
                Indian Smallholder Farmers
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
              Engineered for transparent parametric and AI-adjudicated micro-insurance claims under Indian climatic conditions.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>&copy; 2026 SmartFlexAI Protocol. Built with Solidity, Chainlink, Python XGBoost & React.</p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              All Systems Operational on Sepolia
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
