import { ClaimScenario, LiveTxLog } from '../types';

export const CONTRACT_ADDRESS_SEPOLIA = '0x71C941829D61aB2aB74431e7bE6B309A8e90B84F';
export const ORACLE_ADDRESS_CHAINLINK = '0x3A81878d6b0521d9609a06EAc80E9f2766fC9E21';
export const ESCROW_VAULT_ADDRESS = '0xE91B60a80e6Eb82D2bCe1B381A5D2b704A9724bA';

export const SOLIDITY_CONTRACT_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@chainlink/contracts/src/v0.8/interfaces/FunctionsClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title SmartFlexAgrinsurance
 * @notice Adaptive micro-insurance settlement combining off-chain AI risk scoring 
 * with autonomous on-chain payouts for Indian farmers.
 */
contract SmartFlexAgrinsurance is FunctionsClient, Ownable, ReentrancyGuard {
    
    enum ClaimStatus { SUBMITTED, AI_VERIFIED_APPROVED, ESCROW_DAO_REVIEW, REJECTED_FRAUD }

    struct Claim {
        bytes32 claimId;
        address payable farmerWallet;
        uint256 claimAmountWei;
        string kisanAadhaarHash;
        uint16 riskScore; // 0 to 100 scaled by AI oracle
        bytes32 telemetryProofHash;
        ClaimStatus status;
        uint256 createdAt;
        string fraudReason;
    }

    mapping(bytes32 => Claim) public claims;
    bytes32[] public claimHistory;

    // Thresholds
    uint16 public constant AUTO_APPROVE_MAX_RISK = 30; // Risk <= 30 => Instant Payout
    uint16 public constant HUMAN_REVIEW_MAX_RISK = 70; // 31 - 70 => Escrow Review

    event ClaimSubmitted(bytes32 indexed claimId, address indexed farmer, uint256 amount);
    event RiskScoreEvaluated(bytes32 indexed claimId, uint16 score, bytes32 proofHash);
    event PayoutDisbursed(bytes32 indexed claimId, address indexed farmer, uint256 amountDisbursed);
    event ClaimEscrowedForReview(bytes32 indexed claimId, uint16 riskScore);
    event ClaimRejected(bytes32 indexed claimId, string reason);

    constructor(address router) FunctionsClient(router) Ownable(msg.sender) {}

    /**
     * @notice Callback from Chainlink Functions Oracle delivering the verified AI Risk Score
     */
    function fulfillAiRiskAssessment(
        bytes32 claimId, 
        uint16 riskScore, 
        bytes32 proofHash,
        string calldata rejectionCode
    ) external onlyOwner nonReentrant {
        Claim storage c = claims[claimId];
        require(c.status == ClaimStatus.SUBMITTED, "Claim not in pending state");
        c.riskScore = riskScore;
        c.telemetryProofHash = proofHash;

        emit RiskScoreEvaluated(claimId, riskScore, proofHash);

        if (riskScore <= AUTO_APPROVE_MAX_RISK) {
            c.status = ClaimStatus.AI_VERIFIED_APPROVED;
            require(address(this).balance >= c.claimAmountWei, "Insufficient liquidity pool");
            c.farmerWallet.transfer(c.claimAmountWei);
            emit PayoutDisbursed(claimId, c.farmerWallet, c.claimAmountWei);
        } else if (riskScore <= HUMAN_REVIEW_MAX_RISK) {
            c.status = ClaimStatus.ESCROW_DAO_REVIEW;
            emit ClaimEscrowedForReview(claimId, riskScore);
        } else {
            c.status = ClaimStatus.REJECTED_FRAUD;
            c.fraudReason = rejectionCode;
            emit ClaimRejected(claimId, rejectionCode);
        }
    }

    receive() external payable {}
}`;

export const PRESET_SCENARIOS: ClaimScenario[] = [
  {
    id: 'CLM-2026-IN-8891',
    name: 'Genuine Unseasonal Hailstorm & Flood',
    farmerName: 'Rameshwar Patel',
    location: 'Niphad, Nashik District',
    state: 'Maharashtra',
    coordinates: { lat: 20.0768, lng: 74.1086 },
    cropType: 'Onions & Table Grapes',
    acreage: 3.5,
    claimAmountINR: 48500,
    claimAmountETH: 0.38,
    claimType: 'FLOOD_HAILSTORM',
    claimDescription: 'Severe unseasonal hailstorm and 142mm torrential flash flood submerged grape vineyard 3 weeks prior to harvest.',
    
    weatherReported: 'Torrential Hail & 142mm Flash Rain',
    weatherActualRecorded: 'IMD Doppler Radar: 148.6mm recorded at Niphad Station, Hail flag: Positive (28mm stones)',
    rainfallDeviationPct: 340,
    ndviVegetationDropPct: 71.4,
    soilMoistureIndex: 94,
    gpsGeotagMatch: true,
    imageExifValid: true,
    historicalFraudFlags: 0,
    
    aiRiskScore: 12,
    riskLevel: 'LOW',
    outcome: 'AUTO_APPROVE',
    outcomeReason: 'High-confidence correlation across ERA5 Doppler satellite radar, 71.4% NDVI spectral vegetation collapse, and authentic cadastral GPS boundary match.',
    aiExplanation: 'The off-chain XGBoost model verified a severe localized precipitation anomaly matching the claim timestamp. Geotag and sensor telemetry confirmed zero anomaly.',
    
    txHash: '0x8f3c6d5a1e7b9204bc912384a140f7d5490a21bc9e1028374a58b901239cdef1',
    blockNumber: 6294812,
    gasUsedGwei: 28.4,
    oracleTimestamp: '2026-08-24 07:14:02 UTC',
    solidityEvent: 'PayoutDisbursed(CLM-2026-IN-8891, 0x98D...33A, 0.38 ETH)'
  },
  {
    id: 'CLM-2026-IN-9042',
    name: 'Fraudulent Drought Claim (Precipitation Surplus)',
    farmerName: 'Anonymous Claimant (Flagged)',
    location: 'Anand Rural',
    state: 'Gujarat',
    coordinates: { lat: 22.5645, lng: 72.9289 },
    cropType: 'Cotton & Groundnut',
    acreage: 5.0,
    claimAmountINR: 92000,
    claimAmountETH: 0.72,
    claimType: 'DROUGHT',
    claimDescription: 'Total crop failure claimed due to severe 30-day rain deficit and acute heat stress in Anand taluka.',
    
    weatherReported: '0mm rainfall, Acute Drought',
    weatherActualRecorded: 'ERA5 & IMD Satellite Feed: +114.2mm precipitation recorded in last 14 days (+88% above seasonal normal)',
    rainfallDeviationPct: -88, // In reality surplus rain
    ndviVegetationDropPct: 6.2, // Vigorous healthy canopy
    soilMoistureIndex: 78,
    gpsGeotagMatch: false, // Spoofed 42km away
    imageExifValid: false, // Stock image found on reverse search
    historicalFraudFlags: 2,
    
    aiRiskScore: 89,
    riskLevel: 'HIGH',
    outcome: 'REJECT_FRAUD',
    outcomeReason: 'Direct contradiction: High precipitation surplus (+114.2mm) recorded during claimed drought. GPS telemetry mismatch (>42km offset) and recycled photo hash detected.',
    aiExplanation: 'Machine learning model flagged multi-factor anomalies. The claimed drought is physically impossible based on optical NDVI health (0.68) and Doppler radar data.',
    
    txHash: '0x3a9921ef48c10972b9a76251b54a01c892ee71920ba875c7429188cd7612f00a',
    blockNumber: 6294830,
    gasUsedGwei: 21.2,
    oracleTimestamp: '2026-08-24 07:22:15 UTC',
    solidityEvent: 'ClaimRejected(CLM-2026-IN-9042, "ERR_PRECIPITATION_SURPLUS_AND_GEO_MISMATCH")'
  },
  {
    id: 'CLM-2026-IN-7319',
    name: 'Borderline Pest Infestation (DAO Escrow)',
    farmerName: 'Sunita Devi',
    location: 'Yavatmal District, Vidarbha',
    state: 'Maharashtra',
    coordinates: { lat: 20.3888, lng: 78.1204 },
    cropType: 'Bt Cotton',
    acreage: 2.0,
    claimAmountINR: 32000,
    claimAmountETH: 0.25,
    claimType: 'PEST_OUTBREAK',
    claimDescription: 'Pink bollworm infestation caused moderate boll rot across standing cotton crop.',
    
    weatherReported: 'Normal Weather, Pest Infestation',
    weatherActualRecorded: 'Sentinel-2 Multispectral: Localized chlorophyll dip detected (-38.2%). Weather signals within normal band.',
    rainfallDeviationPct: 12,
    ndviVegetationDropPct: 38.2,
    soilMoistureIndex: 52,
    gpsGeotagMatch: true,
    imageExifValid: true,
    historicalFraudFlags: 0,
    
    aiRiskScore: 46,
    riskLevel: 'MEDIUM',
    outcome: 'HUMAN_REVIEW',
    outcomeReason: 'Moderate anomaly (38.2% NDVI reduction). Risk score falls in Escrow review zone (31-70). Fast-tracked to regional Agronomist DAO multisig for 12hr photo inspection.',
    aiExplanation: 'Satellite NDVI signals confirm localized foliage distress consistent with biological pest damage, but below automatic full-payout parameter. Funds locked in safe escrow.',
    
    txHash: '0x55d140e90c88b712a64c8712390aef128459bcae71029471ab8471920cb9e281',
    blockNumber: 6294851,
    gasUsedGwei: 31.8,
    oracleTimestamp: '2026-08-24 07:26:40 UTC',
    solidityEvent: 'ClaimEscrowedForReview(CLM-2026-IN-7319, riskScore: 46)'
  },
  {
    id: 'CLM-2026-IN-9150',
    name: 'Cyclone Coastal Surge & Soil Salinity',
    farmerName: 'Praveen Kumar Jena',
    location: 'Puri Coastal Belt',
    state: 'Odisha',
    coordinates: { lat: 19.8135, lng: 85.8312 },
    cropType: 'Paddy Rice',
    acreage: 4.0,
    claimAmountINR: 55000,
    claimAmountETH: 0.43,
    claimType: 'CYCLONE',
    claimDescription: 'Coastal sea water inundation after high tidal surge ruined standing paddy crop root systems.',
    
    weatherReported: 'Tidal Inundation & Gale Wind (95 km/h)',
    weatherActualRecorded: 'INCOIS Coastal Buoy + Sentinel-1 SAR: Tidal surge inundation confirmed, Wind gust 104 km/h.',
    rainfallDeviationPct: 220,
    ndviVegetationDropPct: 66.8,
    soilMoistureIndex: 98,
    gpsGeotagMatch: true,
    imageExifValid: true,
    historicalFraudFlags: 0,
    
    aiRiskScore: 16,
    riskLevel: 'LOW',
    outcome: 'AUTO_APPROVE',
    outcomeReason: 'INCOIS ocean buoy telemetry and Sentinel-1 Synthetic Aperture Radar (SAR) coastal flood mask correlate 100% with registered plot GPS coordinates.',
    aiExplanation: 'Synthetic Aperture Radar verified water standing depth exceeding 0.4m on the paddy field polygon. Auto-approval triggered.',
    
    txHash: '0x99281a8b0c812d482910ba749102cbe81920acde8174910283ba8712903cbe02',
    blockNumber: 6294874,
    gasUsedGwei: 27.1,
    oracleTimestamp: '2026-08-24 07:29:11 UTC',
    solidityEvent: 'PayoutDisbursed(CLM-2026-IN-9150, 0x48A...99F, 0.43 ETH)'
  }
];

export const MOCK_LIVE_TRANSACTIONS: LiveTxLog[] = [
  {
    id: 'tx-1',
    hash: '0x8f3c6d5a1e7b9204bc912384a140f7d5490a21bc9e1028374a58b901239cdef1',
    block: 6294812,
    from: CONTRACT_ADDRESS_SEPOLIA,
    to: '0x98Db4c87123A09Ef...89',
    claimId: 'CLM-2026-IN-8891',
    farmer: 'Rameshwar Patel (Nashik)',
    amountETH: 0.38,
    amountINR: 48500,
    riskScore: 12,
    status: 'SUCCESS',
    timestamp: '2 mins ago'
  },
  {
    id: 'tx-2',
    hash: '0x3a9921ef48c10972b9a76251b54a01c892ee71920ba875c7429188cd7612f00a',
    block: 6294830,
    from: '0x4981Ea...18',
    to: CONTRACT_ADDRESS_SEPOLIA,
    claimId: 'CLM-2026-IN-9042',
    farmer: 'Flagged Claimant (Anand)',
    amountETH: 0.72,
    amountINR: 92000,
    riskScore: 89,
    status: 'REVERTED_FRAUD',
    timestamp: '7 mins ago'
  },
  {
    id: 'tx-3',
    hash: '0x55d140e90c88b712a64c8712390aef128459bcae71029471ab8471920cb9e281',
    block: 6294851,
    from: CONTRACT_ADDRESS_SEPOLIA,
    to: ESCROW_VAULT_ADDRESS,
    claimId: 'CLM-2026-IN-7319',
    farmer: 'Sunita Devi (Vidarbha)',
    amountETH: 0.25,
    amountINR: 32000,
    riskScore: 46,
    status: 'ESCROW_REVIEW',
    timestamp: '14 mins ago'
  },
  {
    id: 'tx-4',
    hash: '0x99281a8b0c812d482910ba749102cbe81920acde8174910283ba8712903cbe02',
    block: 6294874,
    from: CONTRACT_ADDRESS_SEPOLIA,
    to: '0x48AB91C083...21',
    claimId: 'CLM-2026-IN-9150',
    farmer: 'Praveen K. (Odisha)',
    amountETH: 0.43,
    amountINR: 55000,
    riskScore: 16,
    status: 'SUCCESS',
    timestamp: '22 mins ago'
  }
];

export const TECH_STACK = [
  { name: 'Solidity 0.8.24', role: 'Autonomous Smart Contracts', badge: 'Smart Contract', icon: 'FileCode2' },
  { name: 'Chainlink Functions', role: 'Decentralized AI Oracle Bridge', badge: 'Oracle', icon: 'Network' },
  { name: 'Python / Scikit-Learn', role: 'XGBoost Risk & Anomaly Scoring', badge: 'AI Engine', icon: 'Cpu' },
  { name: 'Sepolia Testnet', role: 'EVM Transparent Settlement Layer', badge: 'Ethereum', icon: 'Layers' },
  { name: 'Copernicus Sentinel-2', role: 'Optical & SAR NDVI Crop Telemetry', badge: 'Satellite', icon: 'Satellite' },
  { name: 'India AgriStack / GPS', role: 'PMFBY Plot Geo-Verification', badge: 'GovTech', icon: 'MapPin' },
];

export const IMPACT_METRICS = [
  { value: '< 10 Seconds', label: 'Average Claim Settlement', sub: 'vs 45–90 days under legacy PMFBY', highlight: true },
  { value: '0% Leakage', label: 'Zero Middlemen Bribery', sub: 'Non-custodial direct-to-wallet transfer' },
  { value: '98.4%', label: 'Fraud Detection Precision', sub: 'Cross-validated via ERA5 & Sentinel-2' },
  { value: '120M+', label: 'Indian Farmers Addressable', sub: 'Multilingual voice + micro-escrow pools' }
];

export const FAQ_ITEMS = [
  {
    q: 'How does SmartFlexAI prevent fake crop loss claims?',
    a: 'SmartFlexAI runs a multi-modal AI risk model that cross-examines 4 independent telemetry layers: (1) Copernicus Sentinel-2 NDVI spectral drop, (2) ERA5 Doppler radar and IMD weather precipitation records, (3) Land cadastral polygon GPS matching, and (4) Camera sensor EXIF integrity. If a farmer claims drought during a 110mm rain event, the risk score spikes above 70 and the smart contract immediately blocks the claim on-chain.'
  },
  {
    q: 'What are the 3 automated routing thresholds on the smart contract?',
    a: 'Score 0 to 30 (Low Risk): Autonomous approval with zero human intervention. Sepolia ETH/funds disbursed within seconds. Score 31 to 70 (Medium Risk): Escalated to the decentralized Agronomist DAO multisig escrow with 12-hour SLA. Score 71 to 100 (High Risk): Reverted and permanently logged with cryptographic proof of anomaly reason.'
  },
  {
    q: 'How do non-tech-savvy Indian farmers interact with the blockchain?',
    a: 'Farmers can submit claims via WhatsApp bot, PM-KISAN kiosk integration, or Bhashini multilingual voice IVR in Hindi, Marathi, Gujarati, Telugu, and Tamil. The wallet layer can use Account Abstraction (ERC-4337) and instant off-ramping directly into the farmer’s UPI/Aadhaar-linked bank account.'
  },
  {
    q: 'Can the insurance company or surveyor manipulate the payout decision?',
    a: 'No. The execution logic is encoded in immutable Solidity smart contracts deployed on Ethereum Sepolia. Once the Chainlink Oracle reports the cryptographically signed score, the contract autonomously routes or disburses the escrowed capital without human veto power.'
  }
];
