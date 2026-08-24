export type ContractOutcome = 'AUTO_APPROVE' | 'HUMAN_REVIEW' | 'REJECT_FRAUD';

export interface ClaimScenario {
  id: string;
  name: string;
  farmerName: string;
  location: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  cropType: string;
  acreage: number;
  claimAmountINR: number;
  claimAmountETH: number;
  claimType: 'FLOOD_HAILSTORM' | 'DROUGHT' | 'PEST_OUTBREAK' | 'CYCLONE' | 'CUSTOM';
  claimDescription: string;
  
  // Off-Chain Signals
  weatherReported: string;
  weatherActualRecorded: string;
  rainfallDeviationPct: number; // e.g. +340% for flood, -75% for drought
  ndviVegetationDropPct: number; // e.g. 68% drop in NDVI indicates severe crop damage
  soilMoistureIndex: number; // 0 - 100
  gpsGeotagMatch: boolean;
  imageExifValid: boolean;
  historicalFraudFlags: number;
  
  // AI Risk Calculations
  aiRiskScore: number; // 0 - 100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  outcome: ContractOutcome;
  outcomeReason: string;
  aiExplanation: string;
  
  // Simulated On-Chain Receipt
  txHash: string;
  blockNumber: number;
  gasUsedGwei: number;
  oracleTimestamp: string;
  solidityEvent: string;
}

export interface SmartContractFunction {
  name: string;
  inputs: string[];
  outputs: string;
  description: string;
  payable?: boolean;
}

export interface LiveTxLog {
  id: string;
  hash: string;
  block: number;
  from: string;
  to: string;
  claimId: string;
  farmer: string;
  amountETH: number;
  amountINR: number;
  riskScore: number;
  status: 'SUCCESS' | 'REVERTED_FRAUD' | 'ESCROW_REVIEW';
  timestamp: string;
}

export interface SimulatorCustomParams {
  cropType: string;
  locationState: string;
  claimedDisaster: string;
  rainfallAnomalyMm: number; // -100 to +300
  ndviCropLoss: number; // 0 to 100%
  gpsSpoofingDetected: boolean;
  exifMetadataTampered: boolean;
  historicalClaimsCount: number;
  claimedAmountINR: number;
}
