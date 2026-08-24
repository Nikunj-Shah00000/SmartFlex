import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  FileCode2, 
  Layers, 
  ShieldCheck, 
  Terminal,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { 
  CONTRACT_ADDRESS_SEPOLIA, 
  ORACLE_ADDRESS_CHAINLINK, 
  SOLIDITY_CONTRACT_CODE,
  MOCK_LIVE_TRANSACTIONS
} from '../data/mockData';

interface ContractInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContractInspectorModal: React.FC<ContractInspectorModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'solidity' | 'txs' | 'abi'>('solidity');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, isAddress = false) => {
    navigator.clipboard.writeText(text);
    if (isAddress) {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#090E1A] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-display">SmartFlexAgrinsurance.sol</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  VERIFIED &bull; SEPOLIA
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Contract: {CONTRACT_ADDRESS_SEPOLIA}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(CONTRACT_ADDRESS_SEPOLIA, true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAddress ? 'Address Copied' : 'Copy Address'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              id="close-contract-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Sub-Tabs */}
        <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('solidity')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'solidity'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Solidity Source (0.8.24)
            </button>
            <button
              onClick={() => setActiveTab('txs')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'txs'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3 h-3 text-emerald-400" />
              Live Sepolia Transactions ({MOCK_LIVE_TRANSACTIONS.length})
            </button>
            <button
              onClick={() => setActiveTab('abi')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'abi'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Contract ABI
            </button>
          </div>

          {activeTab === 'solidity' && (
            <button
              onClick={() => copyToClipboard(SOLIDITY_CONTRACT_CODE)}
              className="text-xs font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
            </button>
          )}
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-slate-300 bg-[#060911]">
          
          {/* Tab 1: Solidity Code */}
          {activeTab === 'solidity' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Audited for ReentrancyGuard & Chainlink Functions Oracle integration.</span>
                </div>
                <span className="font-semibold">Compiler: v0.8.24+commit.e11b9ed9</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto">
                <pre className="text-emerald-300/90 leading-relaxed font-mono">
                  <code>{SOLIDITY_CONTRACT_CODE}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tab 2: Live Sepolia Transactions */}
          {activeTab === 'txs' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Recent on-chain settlements executed on Sepolia testnet for Indian crop insurance pools:
              </p>

              <div className="space-y-2">
                {MOCK_LIVE_TRANSACTIONS.map((tx) => (
                  <div key={tx.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {tx.status === 'SUCCESS' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {tx.status === 'REVERTED_FRAUD' && <XCircle className="w-4 h-4 text-rose-400" />}
                        {tx.status === 'ESCROW_REVIEW' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                        
                        <span className="font-bold text-white">{tx.claimId}</span>
                        <span className="text-slate-400">&bull; {tx.farmer}</span>
                      </div>
                      
                      <div className="text-[11px] text-slate-400 flex items-center gap-3">
                        <span>Block #{tx.block}</span>
                        <span>Tx: {tx.hash.slice(0, 14)}...{tx.hash.slice(-8)}</span>
                        <span>{tx.timestamp}</span>
                      </div>
                    </div>

                    <div className="text-right sm:text-right">
                      <div className="font-bold text-white">
                        {tx.status === 'REVERTED_FRAUD' ? '0.00 ETH (Blocked)' : `${tx.amountETH} ETH (₹${tx.amountINR.toLocaleString('en-IN')})`}
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        tx.status === 'SUCCESS' ? 'bg-emerald-950 text-emerald-400' : tx.status === 'REVERTED_FRAUD' ? 'bg-rose-950 text-rose-400' : 'bg-amber-950 text-amber-400'
                      }`}>
                        Risk Score: {tx.riskScore}/100 &bull; {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Contract ABI */}
          {activeTab === 'abi' && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto text-cyan-300">
              <pre>
                <code>{`[
  {
    "type": "function",
    "name": "fulfillAiRiskAssessment",
    "inputs": [
      { "name": "claimId", "type": "bytes32" },
      { "name": "riskScore", "type": "uint16" },
      { "name": "proofHash", "type": "bytes32" },
      { "name": "rejectionCode", "type": "string" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "PayoutDisbursed",
    "inputs": [
      { "name": "claimId", "type": "bytes32", "indexed": true },
      { "name": "farmer", "type": "address", "indexed": true },
      { "name": "amountDisbursed", "type": "uint256", "indexed": false }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ClaimRejected",
    "inputs": [
      { "name": "claimId", "type": "bytes32", "indexed": true },
      { "name": "reason", "type": "string", "indexed": false }
    ],
    "anonymous": false
  }
]`}</code>
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">Network: Sepolia Testnet &bull; Chain ID 11155111</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
