
import { GoogleGenAI, Type } from "@google/genai";
import { DeviceType, TechNeed, Recommendation } from "./types";

export const getAIRecommendations = async (device: DeviceType, need: TechNeed): Promise<Recommendation[]> => {
  // Initialize AI within the function to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `You are a world-class tech advisor. Recommend exactly 3 high-quality, real-world apps or tools for a user on a ${device} platform who needs help with ${need}.
  
  Rules:
  1. Only recommend well-known, safe, and reputable software.
  2. Descriptions must be non-technical and benefit-oriented.
  3. The "link" should be the official homepage of the tool.
  4. Use a single relevant Emoji for the icon.
  5. Category should be a short 1-2 word tag.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  platform: { type: Type.STRING },
                  link: { type: Type.STRING },
                  category: { type: Type.STRING },
                  icon: { type: Type.STRING }
                },
                required: ["id", "name", "description", "platform", "link", "category", "icon"]
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const data = JSON.parse(text);
    return data.recommendations || [];
  } catch (error) {
    console.error("Gemini AI Recommendation Error:", error);
    return [];
  }
};
