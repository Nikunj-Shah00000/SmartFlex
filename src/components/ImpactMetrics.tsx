import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronDown, 
  ExternalLink,
  Users,
  TrendingUp,
  Award,
  Globe,
  Sparkles,
  MapPin,
  Zap,
  Code
} from 'lucide-react';
import { TECH_STACK, IMPACT_METRICS, FAQ_ITEMS } from '../data/mockData';

export const ImpactMetrics: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section id="impact" className="py-20 lg:py-28 bg-[#060911] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 1: Impact Metric Cards */}
        <div>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold">
              <span>AGRITECH IMPACT FOR INDIA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
              Transforming Crop Insurance for <span className="text-emerald-400">120M+ Indian Farmers</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Replacing bureaucratic surveyor bottlenecks with cryptographic guarantees and direct liquidity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_METRICS.map((metric, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  metric.highlight 
                    ? 'bg-gradient-to-b from-emerald-950/70 via-slate-900 to-slate-950 border-emerald-500/50 shadow-xl shadow-emerald-950/30' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-white font-display mb-2">
                  {metric.value}
                </p>
                <h3 className="text-base font-bold text-emerald-300 font-display mb-1">
                  {metric.label}
                </h3>
                <p className="text-xs text-slate-400">
                  {metric.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Comparison Matrix (Legacy PMFBY vs SmartFlexAI) */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/80 to-[#0A0F1D] border border-slate-800 shadow-2xl">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold">PARADIGM SHIFT</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Legacy Paper PMFBY vs. SmartFlexAI Protocol
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono text-xs">
                  <th className="py-3 px-4">Evaluation Dimension</th>
                  <th className="py-3 px-4 text-rose-400 bg-rose-950/20 rounded-t-lg">Legacy Crop Insurance (PMFBY)</th>
                  <th className="py-3 px-4 text-emerald-400 bg-emerald-950/30 rounded-t-lg">SmartFlexAI Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Settlement Turnaround</td>
                  <td className="py-4 px-4 text-rose-300 bg-rose-950/10">45 to 90 days of manual surveys</td>
                  <td className="py-4 px-4 text-emerald-300 bg-emerald-950/20 font-bold">&lt; 4.0 seconds (On-chain execution)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Fraud & Tampering Vector</td>
                  <td className="py-4 px-4 text-rose-300 bg-rose-950/10">Paper documents, high phantom claims</td>
                  <td className="py-4 px-4 text-emerald-300 bg-emerald-950/20 font-bold">Sentinel-2 multi-spectral + radar consensus</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Intermediary & Bribery Risk</td>
                  <td className="py-4 px-4 text-rose-300 bg-rose-950/10">Surveyors often demand 10-25% cuts</td>
                  <td className="py-4 px-4 text-emerald-300 bg-emerald-950/20 font-bold">0% Middlemen, non-custodial smart escrow</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Farmer Access & Interface</td>
                  <td className="py-4 px-4 text-rose-300 bg-rose-950/10">Physical district collector visits</td>
                  <td className="py-4 px-4 text-emerald-300 bg-emerald-950/20 font-bold">Mobile photo + WhatsApp/Voice AI bot</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-white">Public Auditability</td>
                  <td className="py-4 px-4 text-rose-300 bg-rose-950/10">Opaque internal insurer spreadsheets</td>
                  <td className="py-4 px-4 text-emerald-300 bg-emerald-950/20 font-bold">100% Immutable on Sepolia Explorer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Verified Tech Stack Badges */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold">VERIFIED WEB3 & AI FOUNDATION</span>
            <h3 className="text-2xl font-bold text-white font-display">
              Enterprise-Grade Technology Stack
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TECH_STACK.map((tech, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all text-center space-y-2 group"
              >
                <span className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-950 text-emerald-300 border border-slate-800">
                  {tech.badge}
                </span>
                <h4 className="text-sm font-bold text-white font-display group-hover:text-emerald-400 transition-colors">
                  {tech.name}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {tech.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Hackathon Judges & Stakeholder FAQ */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-indigo-400 font-semibold">FREQUENTLY ASKED QUESTIONS</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Architecture & Implementation Insights
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white font-display cursor-pointer hover:text-emerald-300"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-emerald-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
