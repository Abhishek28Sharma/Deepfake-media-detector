
import React from 'react';
import { HeatPoint } from '../types';

interface HeatmapOverlayProps {
  points: HeatPoint[];
}

const HeatmapOverlay: React.FC<HeatmapOverlayProps> = ({ points }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {points.map((point, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Pulsating Heat Center */}
          <div 
            className="w-8 h-8 rounded-full animate-ping absolute inset-0 opacity-75"
            style={{ backgroundColor: `rgba(239, 68, 68, ${point.intensity * 0.8})` }}
          />
          <div 
            className="w-4 h-4 rounded-full border-2 border-white/50 shadow-lg relative z-10"
            style={{ 
              backgroundColor: `rgba(239, 68, 68, ${point.intensity})`,
              boxShadow: `0 0 15px 5px rgba(239, 68, 68, ${point.intensity * 0.5})`
            }}
          />
          
          {/* Tooltip-like reason (visible if relevant/needed) */}
          <div className="absolute top-6 left-0 bg-slate-900/90 border border-slate-700 px-2 py-1 rounded text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {point.reason}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeatmapOverlay;
