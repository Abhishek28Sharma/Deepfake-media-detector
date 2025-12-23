
import React, { useState, useCallback } from 'react';
import FileUpload from '../components/FileUpload';
import ResultCard from '../components/ResultCard';
import HeatmapOverlay from '../components/HeatmapOverlay';
import { AppState, DetectionResult } from '../types';
import { analyzeImage } from '../services/geminiService';

const DetectPage: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    // Reset states
    setState(AppState.ANALYZING);
    setError(null);
    setResult(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Perform analysis
    try {
      const base64Data = await fileToBase64(file);
      const analysis = await analyzeImage(base64Data, file.type);
      setResult(analysis);
      setState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setState(AppState.ERROR);
    }
  }, []);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) resolve(base64String);
        else reject(new Error("Failed to convert image to base64"));
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleReset = () => {
    setState(AppState.IDLE);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold text-white mb-4">Forensic Image Analysis</h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Upload any image to start our deepfake detection engine. Your data is processed in real-time and never stored permanently.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {state === AppState.IDLE && (
          <FileUpload onFileSelect={handleFileSelect} />
        )}

        {(state === AppState.ANALYZING || state === AppState.RESULT || state === AppState.ERROR) && previewUrl && (
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            {/* Image Preview Container */}
            <div className="relative w-full lg:w-1/2 max-w-2xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 self-center">
              <img 
                src={previewUrl} 
                alt="Analysis target" 
                className="w-full h-auto block"
              />
              
              {state === AppState.ANALYZING && (
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-500/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Analyzing Media...</h3>
                  <p className="text-slate-400 text-sm">Our AI is scanning for digital inconsistencies and generative artifacts.</p>
                </div>
              )}

              {state === AppState.RESULT && result && result.label === 'DEEPFAKE' && (
                <HeatmapOverlay points={result.heatPoints} />
              )}
            </div>

            {/* Analysis Result */}
            {state === AppState.RESULT && result && (
              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <ResultCard result={result} />
                <button 
                  onClick={handleReset}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-700 self-center"
                >
                  Analyze Another Image
                </button>
              </div>
            )}

            {state === AppState.ERROR && (
              <div className="w-full lg:w-1/2 flex flex-col gap-6 items-center">
                <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                  <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-2">Analysis Failed</h3>
                  <p className="text-red-400 mb-6">{error}</p>
                  <button 
                    onClick={handleReset}
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-all"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Trust & Safety Banner */}
      <div className="mt-20 p-8 rounded-2xl bg-blue-600/5 border border-blue-500/10 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21a8.966 8.966 0 01-5.917-2.24L4 21l.5-4.5A8.966 8.966 0 013 12c0-2.43.97-4.63 2.54-6.24L4 2.1l4.5.5A8.966 8.966 0 0112 3c2.43 0 4.63.97 6.24 2.54L21.9 4l-.5 4.5a8.966 8.966 0 011.26 4.5c0 2.43-.97 4.63-2.54 6.24L20.5 21l-4.5-.5A8.966 8.966 0 0112 21z" />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">Secure & Ethical Analysis</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              We take your privacy seriously. Images are processed exclusively for forensic detection and are not used for training data or long-term storage. Our algorithms are designed to assist researchers and journalists in combating misinformation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectPage;
