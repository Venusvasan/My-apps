
import React from 'react';
import { PlantInfo } from '../types';
import { LeafIcon, TrashIcon } from './Icons';

interface GardenScreenProps {
  garden: PlantInfo[];
  onViewPlant: (plant: PlantInfo) => void;
  onRemovePlant: (plant: PlantInfo) => void;
}

const GardenScreen: React.FC<GardenScreenProps> = ({ garden, onViewPlant, onRemovePlant }) => {
  if (garden.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full pt-20">
        <LeafIcon className="w-20 h-20 text-green-300 mb-4" />
        <h2 className="text-2xl font-bold text-green-800">Your Garden is Empty</h2>
        <p className="text-gray-500 mt-2">Start scanning plants to add them to your collection!</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">My Garden</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {garden.map((plant) => (
          <div key={plant.scientificName} className="relative group bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={plant.imageUrl}
              alt={plant.commonName}
              className="w-full h-32 object-cover cursor-pointer transition-transform group-hover:scale-110"
              onClick={() => onViewPlant(plant)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onRemovePlant(plant);
                }} 
                className="absolute top-1 right-1 bg-white/70 p-1.5 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-opacity opacity-0 group-hover:opacity-100"
                aria-label="Remove plant"
            >
                <TrashIcon className="w-4 h-4" />
            </button>
            <div className="absolute bottom-0 left-0 p-2">
              <h3 className="text-white font-semibold text-sm leading-tight">{plant.commonName}</h3>
              <p className="text-gray-300 text-xs italic">{plant.scientificName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GardenScreen;
