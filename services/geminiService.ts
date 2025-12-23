
import { GoogleGenAI, Type } from "@google/genai";
import { DetectionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeImage = async (base64Image: string, mimeType: string): Promise<DetectionResult> => {
  const model = 'gemini-3-flash-preview';

  const prompt = `
    Act as an expert forensic AI specializing in deepfake detection. 
    Analyze this image for signs of AI manipulation including:
    1. Facial artifacts (asymmetry, unnatural skin textures).
    2. Background inconsistencies.
    3. Lighting and shadow mismatches.
    4. Edge blending issues around hair and ears.
    5. GAN-specific noise patterns.

    Return a JSON response following the specified schema.
    If the image is authentic, mark as REAL. 
    If you find suspicious elements, mark as DEEPFAKE and provide coordinates for the 'heatPoints' where manipulations are most visible.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: mimeType } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING, enum: ['REAL', 'DEEPFAKE'] },
            confidence: { type: Type.NUMBER, description: 'Score between 0 and 1' },
            reasoning: { type: Type.STRING },
            heatPoints: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  x: { type: Type.NUMBER, description: 'X coordinate percentage (0-100)' },
                  y: { type: Type.NUMBER, description: 'Y coordinate percentage (0-100)' },
                  intensity: { type: Type.NUMBER, description: 'Suspicion level (0-1)' },
                  reason: { type: Type.STRING }
                },
                required: ['x', 'y', 'intensity', 'reason']
              }
            }
          },
          required: ['label', 'confidence', 'reasoning', 'heatPoints']
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as DetectionResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};
