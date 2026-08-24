import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Cpu, 
  FileCode2, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  MapPin, 
  Satellite, 
  CloudRain, 
  ShieldAlert, 
  Sparkles,
  Sliders,
  TrendingDown,
  Lock,
  Zap,
  Info
} from 'lucide-react';
import { PRESET_SCENARIOS, CONTRACT_ADDRESS_SEPOLIA } from '../data/mockData';
import { ClaimScenario, ContractOutcome } from '../types';

interface LiveSimulatorProps {
  onOpenContract: () => void;
}

export const LiveSimulator: React.FC<LiveSimulatorProps> = ({ onOpenContract }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(PRESET_SCENARIOS[0].id);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [executionStep, setExecutionStep] = useState<number>(0);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'sandbox'>('presets');

  // Custom sandbox controls
  const [sandboxCrop, setSandboxCrop] = useState<string>('Cotton & Soybean');
  const [sandboxDisaster, setSandboxDisaster] = useState<string>('Precipitation Anomaly');
  const [sandboxRainfallDev, setSandboxRainfallDev] = useState<number>(280); // mm
  const [sandboxNdviDrop, setSandboxNdviDrop] = useState<number>(68); // %
  const [sandboxGpsValid, setSandboxGpsValid] = useState<boolean>(true);
  const [sandboxExifValid, setSandboxExifValid] = useState<boolean>(true);
  const [sandboxClaimINR, setSandboxClaimINR] = useState<number>(50000);

  const activeScenario = PRESET_SCENARIOS.find(s => s.id === selectedScenarioId) || PRESET_SCENARIOS[0];

  // Calculate sandbox risk score dynamically
  const calculateSandboxScore = () => {
    let score = 10;
    // Anomaly checks
    if (!sandboxGpsValid) score += 40;
    if (!sandboxExifValid) score += 30;
    if (sandboxNdviDrop < 25) score += 35;
    if (Math.abs(sandboxRainfallDev) < 20) score += 20;
    return Math.min(99, Math.max(8, score));
  };

  const currentRiskScore = activeTab === 'presets' ? activeScenario.aiRiskScore : calculateSandboxScore();

  const getOutcome = (score: number): ContractOutcome => {
    if (score <= 30) return 'AUTO_APPROVE';
    if (score <= 70) return 'HUMAN_REVIEW';
    return 'REJECT_FRAUD';
  };

  const outcome = getOutcome(currentRiskScore);

  const runSimulation = () => {
    setIsSimulating(true);
    setExecutionStep(1);
    setSimulationLogs([]);

    const logs: { time: number; msg: string; step: number }[] = [
      { time: 300, msg: `[0.3s] INGESTION: Received Claim ID ${activeTab === 'presets' ? activeScenario.id : 'CLM-2026-SANDBOX'} with farmer geo-telemetry...`, step: 1 },
      { time: 900, msg: `[0.9s] ORACLE: Polling Copernicus Sentinel-2 NDVI spectral loss & IMD Doppler radar feeds...`, step: 2 },
      { time: 1600, msg: `[1.6s] ML_ENGINE: Off-chain XGBoost inference completed. Computed AI Risk Score: ${currentRiskScore}/100.`, step: 3 },
      { time: 2400, msg: `[2.4s] CHAINLINK: Cryptographically signing score proof -> Relaying to Sepolia contract (0x71C9...B84F)...`, step: 4 },
      { time: 3200, msg: `[3.2s] SOLIDITY: fulfillAiRiskAssessment() invoked. Evaluating threshold parameters...`, step: 5 },
      { time: 3800, msg: outcome === 'AUTO_APPROVE' 
        ? `[3.8s] EXECUTION_SUCCESS: Auto-Approved! Disbursed funds to farmer wallet on Block #6294812.` 
        : outcome === 'HUMAN_REVIEW'
        ? `[3.8s] ESCROW_ROUTED: Risk score within 31-70. Transferred to Agronomist DAO multisig vault.`
        : `[3.8s] REVERT_FRAUD: High anomaly detected (>70). Claim blocked and fraudulent reason logged on-chain.`, step: 6 }
    ];

    logs.forEach(({ time, msg, step }) => {
      setTimeout(() => {
        setSimulationLogs(prev => [...prev, msg]);
        setExecutionStep(step);
        if (step === 6) {
          setIsSimulating(false);
          if (outcome === 'AUTO_APPROVE') {
            confetti({
              particleCount: 75,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#10B981', '#34D399', '#059669', '#6EE7B7']
            });
          }
        }
      }, time);
    });
  };

  // Run initial simulation on load once
  useEffect(() => {
    runSimulation();
  }, [selectedScenarioId, activeTab]);

  const copyTxHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <section id="live-simulator" className="py-20 lg:py-28 bg-[#070B14] relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>INTERACTIVE VERIFICATION WORKBENCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            Live AI Risk &times; Smart Contract Simulator
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Select a verified real-world test case or adjust environmental parameters to observe how the AI scoring layer dictates autonomous EVM payouts.
          </p>
        </div>

        {/* Tab Selector: Presets vs Custom Sandbox */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex gap-1">
            <button
              onClick={() => setActiveTab('presets')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold font-mono transition-all cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              id="simulator-tab-presets"
            >
              Curated Test Scenarios (4 Presets)
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold font-mono transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'sandbox'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              id="simulator-tab-sandbox"
            >
              <Sliders className="w-3.5 h-3.5" />
              Custom Interactive Sandbox
            </button>
          </div>
        </div>

        {/* Scenario Toggle Pills (When Presets active) */}
        {activeTab === 'presets' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {PRESET_SCENARIOS.map((scenario) => {
              const isSelected = scenario.id === selectedScenarioId;
              const isLow = scenario.outcome === 'AUTO_APPROVE';
              const isHigh = scenario.outcome === 'REJECT_FRAUD';
              return (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenarioId(scenario.id)}
                  id={`scenario-pill-${scenario.id}`}
                  className={`p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? isLow
                        ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg shadow-emerald-950/40'
                        : isHigh
                          ? 'bg-rose-950/80 border-rose-500 text-white shadow-lg shadow-rose-950/40'
                          : 'bg-amber-950/80 border-amber-500 text-white shadow-lg shadow-amber-950/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                      {scenario.id}
                    </span>
                    <span className={`text-xs font-mono font-bold ${
                      isLow ? 'text-emerald-400' : isHigh ? 'text-rose-400' : 'text-amber-400'
                    }`}>
                      Risk: {scenario.aiRiskScore}/100
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white font-display mb-1 line-clamp-1">
                    {scenario.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {scenario.farmerName} &bull; {scenario.location}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Custom Sandbox Controls (When Sandbox active) */}
        {activeTab === 'sandbox' && (
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 mb-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                <Sliders className="w-4 h-4" />
                <span>SANDBOX TELEMETRY CONTROLS</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Simulate edge cases & fraud vectors</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Rain Anomaly */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Precipitation Telemetry:</span>
                  <span className="text-emerald-300 font-bold">{sandboxRainfallDev} mm</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="350"
                  value={sandboxRainfallDev}
                  onChange={(e) => setSandboxRainfallDev(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <span className="text-[10px] text-slate-500 font-mono">Doppler Radar Ground Truth</span>
              </div>

              {/* NDVI Drop */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Sentinel-2 NDVI Loss:</span>
                  <span className="text-cyan-300 font-bold">{sandboxNdviDrop}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sandboxNdviDrop}
                  onChange={(e) => setSandboxNdviDrop(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <span className="text-[10px] text-slate-500 font-mono">Spectral Biomass Depletion</span>
              </div>

              {/* GPS Geotag Validity */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-mono block">Cadastral GPS Match:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSandboxGpsValid(true)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold border cursor-pointer ${
                      sandboxGpsValid ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Matched (0km)
                  </button>
                  <button
                    onClick={() => setSandboxGpsValid(false)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold border cursor-pointer ${
                      !sandboxGpsValid ? 'bg-rose-950 border-rose-500 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Spoofed (45km)
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">India AgriStack Boundary</span>
              </div>

              {/* Photo EXIF Authenticity */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-mono block">Photo EXIF Hash:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSandboxExifValid(true)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold border cursor-pointer ${
                      sandboxExifValid ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Authentic
                  </button>
                  <button
                    onClick={() => setSandboxExifValid(false)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold border cursor-pointer ${
                      !sandboxExifValid ? 'bg-rose-950 border-rose-500 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Stock Photo
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Camera Hardware Signature</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Simulator Workbench Card */}
        <div className="rounded-2xl bg-[#090E1A] border border-slate-800 overflow-hidden shadow-2xl">
          
          {/* Workbench Header */}
          <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-bold text-white font-display">
                Claim Verification & Settlement Engine
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-700">
                {activeTab === 'presets' ? activeScenario.id : 'CLM-2026-CUSTOM'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                id="simulator-rerun-btn"
              >
                {isSimulating ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Protocol...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run AI & Contract Execution</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Workbench Body: 2 Columns (Left: Telemetry & Risk Score; Right: Real-time Terminal & Sepolia Receipt) */}
          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Telemetry & AI Risk Analysis (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Farmer & Plot Card */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">CLAIMANT DOSSIER</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {activeTab === 'presets' ? activeScenario.cropType : sandboxCrop}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white font-display">
                    {activeTab === 'presets' ? activeScenario.farmerName : 'Sandbox Simulated Farmer'}
                  </h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {activeTab === 'presets' ? `${activeScenario.location}, ${activeScenario.state}` : 'Nashik District, Maharashtra'}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <p className="font-medium text-slate-200 mb-1">Claimed Disaster Event:</p>
                  <p className="text-slate-400">
                    {activeTab === 'presets' ? activeScenario.claimDescription : 'Crop failure requested due to severe environmental stress.'}
                  </p>
                </div>

                <div className="flex justify-between text-xs font-mono pt-1">
                  <span className="text-slate-400">Claim Value:</span>
                  <span className="text-white font-bold">
                    ₹{activeTab === 'presets' ? activeScenario.claimAmountINR.toLocaleString('en-IN') : sandboxClaimINR.toLocaleString('en-IN')} (0.38 Sepolia ETH)
                  </span>
                </div>
              </div>

              {/* Multi-Modal Telemetry Data Cards */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">OFF-CHAIN SENSOR MATRIX</span>
                  <span className="text-[10px] font-mono text-emerald-400">4 DATA FEEDS</span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <CloudRain className="w-4 h-4 text-cyan-400" />
                      <span>IMD Doppler Weather:</span>
                    </div>
                    <span className="text-white font-bold">
                      {activeTab === 'presets' ? `${activeScenario.rainfallDeviationPct > 0 ? '+' : ''}${activeScenario.rainfallDeviationPct}% Dev` : `${sandboxRainfallDev} mm`}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Satellite className="w-4 h-4 text-indigo-400" />
                      <span>Sentinel-2 NDVI Loss:</span>
                    </div>
                    <span className="text-white font-bold">
                      {activeTab === 'presets' ? `-${activeScenario.ndviVegetationDropPct}% Drop` : `-${sandboxNdviDrop}% Drop`}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span>Cadastral Boundary:</span>
                    </div>
                    <span className={activeTab === 'presets' ? (activeScenario.gpsGeotagMatch ? 'text-emerald-400' : 'text-rose-400') : (sandboxGpsValid ? 'text-emerald-400' : 'text-rose-400')}>
                      {activeTab === 'presets' ? (activeScenario.gpsGeotagMatch ? 'Verified 100%' : 'Mismatch >40km') : (sandboxGpsValid ? 'Verified 100%' : 'Mismatch >40km')}
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Risk Score Gauge Output */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80 text-center space-y-3">
                <span className="text-xs font-mono text-slate-400">COMPUTED RISK SCORE</span>
                
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-5xl font-extrabold font-display ${
                    outcome === 'AUTO_APPROVE' ? 'text-emerald-400' : outcome === 'HUMAN_REVIEW' ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {currentRiskScore}
                  </span>
                  <span className="text-slate-500 font-mono text-base">/ 100</span>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${
                      outcome === 'AUTO_APPROVE' 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                        : outcome === 'HUMAN_REVIEW'
                          ? 'bg-gradient-to-r from-amber-500 to-orange-400'
                          : 'bg-gradient-to-r from-rose-500 to-red-600'
                    }`}
                    style={{ width: `${currentRiskScore}%` }}
                  />
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 text-left">
                  <span className="font-bold text-white block mb-0.5">AI Explanation:</span>
                  {activeTab === 'presets' ? activeScenario.outcomeReason : (
                    outcome === 'AUTO_APPROVE'
                      ? 'High correlation across sensor matrices. Zero anomaly flags detected.'
                      : outcome === 'HUMAN_REVIEW'
                        ? 'Moderate sensor variance detected. Escalated for human agronomist review.'
                        : 'Severe telemetry contradiction detected. Claim rejected to protect insurance pool.'
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Execution Terminal & Sepolia Receipt (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Terminal Logs Window */}
              <div className="rounded-xl bg-[#03060E] border border-slate-800 overflow-hidden shadow-inner">
                <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>smartflex_node_execution.log</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">RPC: SEPOLIA</span>
                </div>

                <div className="p-4 sm:p-5 font-mono text-xs text-slate-200 min-h-[220px] max-h-[240px] overflow-y-auto space-y-2">
                  {simulationLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2 animate-fadeIn">
                      <span className="text-emerald-400 shrink-0">&gt;</span>
                      <span className={log.includes('REVERT') ? 'text-rose-400' : log.includes('SUCCESS') ? 'text-emerald-300 font-bold' : log.includes('ESCROW') ? 'text-amber-300 font-bold' : 'text-slate-300'}>
                        {log}
                      </span>
                    </div>
                  ))}
                  {isSimulating && (
                    <div className="flex items-center gap-2 text-emerald-400/80 animate-pulse">
                      <span className="inline-block w-2 h-4 bg-emerald-400 animate-ping" />
                      <span>Computing on-chain state transition...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* On-Chain Solidity Result & Receipt */}
              <div className={`p-6 rounded-xl border transition-all duration-300 ${
                outcome === 'AUTO_APPROVE' 
                  ? 'bg-emerald-950/40 border-emerald-500/50' 
                  : outcome === 'HUMAN_REVIEW'
                    ? 'bg-amber-950/40 border-amber-500/50'
                    : 'bg-rose-950/40 border-rose-500/50'
              } space-y-5`}>
                
                {/* Result Title */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {outcome === 'AUTO_APPROVE' && <CheckCircle2 className="w-7 h-7 text-emerald-400" />}
                    {outcome === 'HUMAN_REVIEW' && <AlertTriangle className="w-7 h-7 text-amber-400" />}
                    {outcome === 'REJECT_FRAUD' && <XCircle className="w-7 h-7 text-rose-400" />}
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">SMART CONTRACT STATUS</span>
                      <h4 className={`text-xl font-bold font-display ${
                        outcome === 'AUTO_APPROVE' ? 'text-emerald-300' : outcome === 'HUMAN_REVIEW' ? 'text-amber-300' : 'text-rose-300'
                      }`}>
                        {outcome === 'AUTO_APPROVE' ? 'AUTO-APPROVED & SETTLED' : outcome === 'HUMAN_REVIEW' ? 'ESCROWED FOR DAO MULTISIG' : 'FRAUDULENT CLAIM REVERTED'}
                      </h4>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                    outcome === 'AUTO_APPROVE' 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : outcome === 'HUMAN_REVIEW'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}>
                    {outcome === 'AUTO_APPROVE' ? 'PAYOUT DISBURSED' : outcome === 'HUMAN_REVIEW' ? 'ESCROW LOCKED' : 'ON-CHAIN BLOCKED'}
                  </span>
                </div>

                {/* Technical Receipt Details */}
                <div className="p-4 rounded-lg bg-slate-950/90 border border-slate-800 space-y-2.5 text-xs font-mono text-slate-300">
                  <div className="flex justify-between items-center py-1 border-b border-slate-800">
                    <span className="text-slate-400">Contract Target:</span>
                    <span className="text-emerald-400 font-semibold">{CONTRACT_ADDRESS_SEPOLIA.slice(0, 10)}...{CONTRACT_ADDRESS_SEPOLIA.slice(-8)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800">
                    <span className="text-slate-400">Tx Hash:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-300">0x8f3c...def1</span>
                      <button 
                        onClick={() => copyTxHash('0x8f3c6d5a1e7b9204bc912384a140f7d5490a21bc9e1028374a58b901239cdef1')}
                        className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
                        title="Copy Tx Hash"
                      >
                        {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-slate-800">
                    <span className="text-slate-400">Solidity Event Emitted:</span>
                    <span className="text-indigo-300 font-bold">
                      {outcome === 'AUTO_APPROVE' 
                        ? 'PayoutDisbursed(claimId, farmer, 0.38 ETH)' 
                        : outcome === 'HUMAN_REVIEW' 
                          ? 'ClaimEscrowedForReview(claimId, riskScore)' 
                          : 'ClaimRejected(claimId, reason)'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-400">Gas Used:</span>
                    <span className="text-slate-300">28.4 Gwei (Sepolia EVM)</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={onOpenContract}
                    className="text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>View contract code & ABI</span>
                  </button>

                  <span className="text-[11px] font-mono text-slate-400">
                    Execution time: <strong className="text-white font-bold">3.8 seconds</strong>
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
