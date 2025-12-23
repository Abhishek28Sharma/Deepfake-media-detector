
import React from 'react';
import { DetectionResult } from '../types';

interface ResultCardProps {
  result: DetectionResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const isDeepfake = result.label === 'DEEPFAKE';
  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className={`h-2 w-full ${isDeepfake ? 'bg-red-500' : 'bg-emerald-500'}`} />
      
      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">Detection Result</h2>
            <div className="flex items-center gap-3">
              <span className={`text-4xl font-extrabold ${isDeepfake ? 'text-red-500' : 'text-emerald-500'}`}>
                {isDeepfake ? 'Deepfake Detected' : 'Authentic Media'}
              </span>
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${isDeepfake ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {result.label}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">Confidence Score</span>
            <div className="flex items-center gap-4">
              <div className="w-48 h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${isDeepfake ? 'bg-red-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${confidencePercent}%` }}
                />
              </div>
              <span className="text-2xl font-bold text-white">{confidencePercent}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-sm font-bold uppercase text-slate-500 mb-3">AI Reasoning & Analysis</h3>
            <p className="text-slate-300 leading-relaxed italic">
              "{result.reasoning}"
            </p>
          </div>

          {isDeepfake && result.heatPoints.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase text-slate-500 mb-4">Manipulated Regions Detected</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.heatPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-sm text-slate-300">{point.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
