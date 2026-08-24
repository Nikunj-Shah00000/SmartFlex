import React, { useState } from 'react';
import { 
  UploadCloud, 
  Cpu, 
  GitMerge, 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight,
  Code2,
  Terminal,
  ShieldAlert,
  Sparkles,
  Layers
} from 'lucide-react';

export const HowItWorksFlow: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const steps = [
    {
      stepNumber: '01',
      title: 'Submit Claim & Geo-Telemetry',
      subtitle: 'Farmer Proof Upload via Mobile / Kiosk',
      desc: 'Farmer captures crop damage photo. The client bundle extracts cryptographic GPS polygon coordinates, camera EXIF timestamp, and linked Kisan Aadhaar hash.',
      icon: UploadCloud,
      tag: 'CLIENT INGESTION',
      codeSnippet: `// Step 1: Client Ingestion Payload
const claimPayload = {
  claimId: "CLM-2026-IN-8891",
  farmerWallet: "0x98Db4c87123A09Ef8941aB2aB74431e7bE6B309A",
  cadastralPlot: { lat: 20.0768, lng: 74.1086 }, // Niphad, Nashik
  crop: "Onions & Grapes",
  damageType: "UNSEASONAL_HAIL_FLOOD",
  claimedAmountWei: ethers.parseEther("0.38"),
  exifHash: "0x89e21...verified"
};`,
      highlights: [
        'Geofenced plot matching against India PMFBY registry',
        'Anti-spoof camera sensor & timestamp signature',
        'Multi-lingual voice/IVR support in vernacular languages'
      ]
    },
    {
      stepNumber: '02',
      title: 'Off-Chain AI Risk Scoring',
      subtitle: 'Multi-Modal Weather & NDVI Anomaly Check',
      desc: 'The off-chain Python/XGBoost engine ingests Sentinel-2 optical/SAR imagery and IMD radar feeds to generate an impartial 0–100 risk score.',
      icon: Cpu,
      tag: 'MACHINE LEARNING',
      codeSnippet: `# Step 2: Off-Chain Risk Engine (Python/XGBoost)
def evaluate_risk(claim_data, satellite_telemetry, radar_data):
    ndvi_drop = calculate_spectral_drop(claim_data.plot, date_range=14)
    rain_anomaly = cross_check_imd_radar(claim_data.plot, claim_data.event_time)
    
    # Feature Vector: [ndvi_drop=71.4%, rain=148.6mm, gps_match=1.0, exif=1.0]
    risk_score = risk_model.predict_proba([features])[0][1] * 100
    
    # Risk Score: 12 / 100 (High Correlation, Low Fraud Probability)
    return {"risk_score": 12, "status": "APPROVED", "proof_hash": "0x7a81...b2" }`,
      highlights: [
        'Copernicus Sentinel-2 NDVI spectral loss index (-71.4%)',
        'ERA5 & IMD Doppler radar ground truth cross-check',
        'Outputs a cryptographically signed 0-100 risk score'
      ]
    },
    {
      stepNumber: '03',
      title: 'Smart Contract Adaptive Routing',
      subtitle: 'Autonomous Solidity Execution on Sepolia',
      desc: 'Chainlink oracle calls fulfillAiRiskAssessment(). The smart contract evaluates thresholds and dispatches capital or flags anomalies autonomously.',
      icon: GitMerge,
      tag: 'SMART CONTRACT',
      codeSnippet: `// Step 3: Solidity Execution (SmartFlexAgrinsurance.sol)
if (riskScore <= AUTO_APPROVE_MAX_RISK) { // 0 - 30
    c.status = ClaimStatus.AI_VERIFIED_APPROVED;
    c.farmerWallet.transfer(c.claimAmountWei); // Instant 0.38 ETH Payout!
    emit PayoutDisbursed(claimId, c.farmerWallet, c.claimAmountWei);
} else if (riskScore <= HUMAN_REVIEW_MAX_RISK) { // 31 - 70
    c.status = ClaimStatus.ESCROW_DAO_REVIEW;
    emit ClaimEscrowedForReview(claimId, riskScore);
} else { // 71 - 100
    c.status = ClaimStatus.REJECTED_FRAUD;
    emit ClaimRejected(claimId, rejectionCode);
}`,
      highlights: [
        'Score 0–30: Instant payout (<4s) directly to farmer',
        'Score 31–70: Locked in Agronomist DAO multisig escrow',
        'Score 71–100: Reverted on-chain with zero gas waste'
      ]
    },
    {
      stepNumber: '04',
      title: 'Immutable On-Chain Audit',
      subtitle: 'Transparent Proof for Regulators & Donors',
      desc: 'Every parameter, satellite NDVI metric, and settlement transaction is permanently recorded on Sepolia testnet for decentralized verification.',
      icon: FileCheck2,
      tag: 'IMMUTABLE AUDIT',
      codeSnippet: `// Step 4: Sepolia Event Emission & Audit Trail
emit RiskScoreEvaluated(
    claimId: "CLM-2026-IN-8891",
    score: 12,
    proofHash: 0x8f3c6d5a1e7b9204bc912384a140f7d5490a21bc9e1028374a58b901239cdef1
);
// Block #6294812 | Gas: 28.4 Gwei | 100% Verifiable on Etherscan`,
      highlights: [
        'Zero possibility of retroactive record tampering',
        'Publicly verifiable state by government & insurance pools',
        'Zero-Knowledge cryptographic summary proofs'
      ]
    }
  ];

  const currentStep = steps[activeStepIndex];
  const StepIcon = currentStep.icon;

  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold">
            <span>END-TO-END WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            How It Works in <span className="text-emerald-400">4 Autonomous Steps</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            From farmer smartphone geotag upload to instant on-chain Sepolia settlement in under 10 seconds.
          </p>
        </div>

        {/* 4 Step Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                id={`how-it-works-step-${step.stepNumber}`}
                className={`p-5 rounded-2xl text-left transition-all duration-300 border cursor-pointer relative ${
                  isActive
                    ? 'bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-950/50 scale-[1.02]'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-black font-display ${isActive ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {step.stepNumber}
                  </span>
                  <div className={`p-2 rounded-xl ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className={`text-base font-bold font-display mb-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {step.subtitle}
                </p>

                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-b border-r border-emerald-500/80 rotate-45 hidden lg:block" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Step Inspector Workbench */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-[#0A0F1D] border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Functional Breakdown */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  {currentStep.tag}
                </span>
                <span className="text-xs font-mono text-slate-400">Step {currentStep.stepNumber} of 04</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display">
                {currentStep.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                {currentStep.desc}
              </p>

              {/* Key Features for This Step */}
              <div className="space-y-2.5 pt-2">
                {currentStep.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-900 cursor-pointer"
                >
                  &larr; Previous Step
                </button>
                <button
                  disabled={activeStepIndex === steps.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-lg bg-emerald-950 border border-emerald-500/40 text-xs font-mono text-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-900/60 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Technical Code & Payload Console */}
            <div className="lg:col-span-7">
              <div className="rounded-xl bg-[#040711] border border-slate-800 overflow-hidden shadow-inner">
                {/* Console header */}
                <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>technical_execution_payload.ts</span>
                  </div>
                  <span className="text-[11px] text-emerald-400/80">VERIFIED &bull; TESTNET</span>
                </div>
                
                {/* Code Body */}
                <div className="p-4 sm:p-5 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed max-h-[380px]">
                  <pre className="text-emerald-300/90 font-mono">
                    <code>{currentStep.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
