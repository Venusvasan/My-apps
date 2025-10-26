
import { GoogleGenAI, Type } from "@google/genai";
import type { PlantInfo } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const plantSchema = {
  type: Type.OBJECT,
  properties: {
    commonName: { type: Type.STRING, description: "The common name of the plant." },
    scientificName: { type: Type.STRING, description: "The scientific (botanical) name of the plant." },
    description: { type: Type.STRING, description: "A detailed paragraph about the plant's characteristics, origin, and history." },
    care: {
      type: Type.OBJECT,
      properties: {
        watering: { type: Type.STRING, description: "Watering needs and schedule." },
        sunlight: { type: Type.STRING, description: "Sunlight requirements (e.g., full sun, partial shade)." },
        soil: { type: Type.STRING, description: "Ideal soil type (e.g., well-draining, moist)." },
        temperature: { type: Type.STRING, description: "Optimal temperature range." },
      },
      required: ["watering", "sunlight", "soil", "temperature"]
    },
    toxicity: {
      type: Type.OBJECT,
      properties: {
        isToxic: { type: Type.BOOLEAN, description: "Is the plant toxic to humans or pets?" },
        details: { type: Type.STRING, description: "Details about its toxicity, if applicable." }
      },
      required: ["isToxic", "details"]
    },
    funFacts: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 2-3 interesting and fun facts about the plant."
    }
  },
  required: ["commonName", "scientificName", "description", "care", "toxicity", "funFacts"]
};


export const identifyPlant = async (base64Image: string): Promise<PlantInfo> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            text: "Identify the plant in this image. Provide its common and scientific names, a detailed description, care instructions, toxicity information, and a few fun facts. If you cannot identify the plant, respond with an error structure."
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: plantSchema,
      },
    });

    const jsonText = response.text.trim();
    const plantData: PlantInfo = JSON.parse(jsonText);
    plantData.imageUrl = `data:image/jpeg;base64,${base64Image}`;
    return plantData;

  } catch (error) {
    console.error("Error identifying plant:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};
