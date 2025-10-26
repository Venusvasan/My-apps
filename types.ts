
export enum View {
  HOME = 'HOME',
  IDENTIFYING = 'IDENTIFYING',
  RESULTS = 'RESULTS',
  GARDEN = 'GARDEN'
}

export interface CareInstructions {
  watering: string;
  sunlight: string;
  soil: string;
  temperature: string;
}

export interface ToxicityInfo {
  isToxic: boolean;
  details: string;
}

export interface PlantInfo {
  commonName: string;
  scientificName: string;
  description: string;
  care: CareInstructions;
  toxicity: ToxicityInfo;
  funFacts: string[];
  imageUrl?: string; // To store image data when saving
}
