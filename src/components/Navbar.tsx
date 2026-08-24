import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Cpu, 
  ExternalLink, 
  Wallet, 
  CheckCircle2, 
  ChevronDown,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { CONTRACT_ADDRESS_SEPOLIA } from '../data/mockData';

interface NavbarProps {
  onOpenContractModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContractModal, onScrollToSection }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060911]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onScrollToSection('hero')}
          id="nav-brand-logo"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-800 p-[1px] shadow-lg shadow-emerald-950/40">
            <div className="w-full h-full bg-[#090E1A] rounded-[11px] flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-display">
                SmartFlex<span className="text-emerald-400">AI</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono tracking-wider font-semibold rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                v2.4 SEPOLIA
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block font-medium tracking-wide">
              Adaptive On-Chain Crop Micro-Insurance
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button 
            onClick={() => onScrollToSection('dual-engine')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
            id="nav-link-dual-engine"
          >
            The Dual Engine
          </button>
          <button 
            onClick={() => onScrollToSection('how-it-works')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
            id="nav-link-how-it-works"
          >
            4-Step Architecture
          </button>
          <button 
            onClick={() => onScrollToSection('live-simulator')}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            id="nav-link-simulator"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Simulator
          </button>
          <button 
            onClick={onOpenContractModal}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
            id="nav-link-contract"
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Smart Contract
          </button>
          <button 
            onClick={() => onScrollToSection('impact')}
            className="hover:text-emerald-400 transition-colors cursor-pointer"
            id="nav-link-impact"
          >
            Impact & Tech
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Network indicator pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Sepolia: #11155111</span>
          </div>

          {/* Web3 Wallet Connect Button */}
          <button
            onClick={() => setWalletConnected(!walletConnected)}
            id="connect-wallet-btn"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer ${
              walletConnected
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-600'
            }`}
          >
            <Wallet className="w-4 h-4 text-emerald-400" />
            {walletConnected ? (
              <span className="flex items-center gap-1.5 font-mono">
                <span>0x8A4...3E91</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-300">2.4 ETH</span>
              </span>
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            id="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-[#090E1A] border-b border-slate-800 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
            <span className="text-xs font-mono text-slate-400">Network</span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Sepolia Testnet
            </span>
          </div>
          <button
            onClick={() => { onScrollToSection('dual-engine'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-sm text-slate-200 hover:text-emerald-400"
          >
            The Dual Engine
          </button>
          <button
            onClick={() => { onScrollToSection('how-it-works'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-sm text-slate-200 hover:text-emerald-400"
          >
            4-Step Architecture
          </button>
          <button
            onClick={() => { onScrollToSection('live-simulator'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-sm text-emerald-300 font-semibold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Launch Live Simulator
          </button>
          <button
            onClick={() => { onOpenContractModal(); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-sm text-slate-200 hover:text-emerald-400"
          >
            View Solidity Contract
          </button>
          <button
            onClick={() => { onScrollToSection('impact'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-sm text-slate-200 hover:text-emerald-400"
          >
            Impact & Tech Stack
          </button>
        </div>
      )}
    </header>
  );
};
