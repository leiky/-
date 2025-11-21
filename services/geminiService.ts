import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const analyzeSituation = async (
  situation: string, 
  contextType: string
): Promise<AIAnalysisResult> => {
  const ai = getAIClient();
  
  const prompt = `
    You are a compassionate but strictly logical Cognitive Behavioral Therapy (CBT) assistant and Life Strategist.
    Analyze the following user input which falls under the category of: ${contextType}.
    
    The user may exhibit signs of cognitive distortions, magical thinking, Dunning-Kruger effect (overconfidence without skill), or sunk cost fallacy.
    
    Your goal is to:
    1. Objectively rate the rationality of the thought/plan (0-100).
    2. Assess the emotional intensity vs logic (0-100).
    3. Determine the real-world risk level.
    4. Identify specific cognitive biases (e.g., "Magical Thinking", "Confirmation Bias", "Splitting").
    5. Provide a "Reality Check" - a hard fact that contradicts the delusion, but stated kindly.
    6. Provide "Constructive Advice" - small, grounded steps.

    User Input: "${situation}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rationalityScore: { type: Type.NUMBER, description: "0 to 100 score of how logical this is" },
            emotionalScore: { type: Type.NUMBER, description: "0 to 100 score of how emotional/impulsive this is" },
            riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
            identifiedBiases: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of cognitive biases detected"
            },
            realityCheck: { type: Type.STRING, description: "A factual, grounding counter-statement" },
            constructiveAdvice: { type: Type.STRING, description: "Actionable, small steps to improve" }
          },
          required: ["rationalityScore", "emotionalScore", "riskLevel", "identifiedBiases", "realityCheck", "constructiveAdvice"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIAnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback for demo purposes if API fails
    return {
      rationalityScore: 10,
      emotionalScore: 90,
      riskLevel: "High",
      identifiedBiases: ["API Connection Error", "Please check API Key"],
      realityCheck: "Unable to connect to the Logic Engine.",
      constructiveAdvice: "Please ensure you have a valid API Key to perform this analysis."
    };
  }
};

export const getDunningKrugerExplanation = async (confidenceLevel: number): Promise<string> => {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Explain the Dunning-Kruger effect to someone who has a self-assessed confidence level of ${confidenceLevel}/100 but lacks objective results. Be kind but scientific. Keep it under 50 words.`
    });
    return response.text || "Analysis unavailable.";
};
