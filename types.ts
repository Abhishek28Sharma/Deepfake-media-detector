
export interface HeatPoint {
  x: number; // 0 to 100
  y: number; // 0 to 100
  intensity: number; // 0.0 to 1.0
  reason: string;
}

export interface DetectionResult {
  label: 'REAL' | 'DEEPFAKE';
  confidence: number;
  reasoning: string;
  heatPoints: HeatPoint[];
}

export enum AppState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
