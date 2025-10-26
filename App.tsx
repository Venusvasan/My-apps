
import React, { useState, useCallback } from 'react';
import { View, PlantInfo } from './types';
import { identifyPlant } from './services/geminiService';
import HomeScreen from './components/HomeScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import GardenScreen from './components/GardenScreen';
import BottomNav from './components/BottomNav';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [plantData, setPlantData] = useState<PlantInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [myGarden, setMyGarden] = useLocalStorage<PlantInfo[]>('myGarden', []);

  const handleIdentify = useCallback(async (imageFile: File) => {
    setCurrentView(View.IDENTIFYING);
    setError(null);
    setPlantData(null);

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
      const base64Image = (reader.result as string).split(',')[1];
      setCapturedImage(reader.result as string);
      try {
        const result = await identifyPlant(base64Image);
        setPlantData(result);
        setCurrentView(View.RESULTS);
      } catch (err) {
        setError('Could not identify the plant. Please try another image.');
        setCurrentView(View.HOME);
      }
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
      setCurrentView(View.HOME);
    };
  }, []);

  const handleSaveToGarden = useCallback(() => {
    if (plantData) {
      // Avoid duplicates
      if (!myGarden.some(p => p.scientificName === plantData.scientificName)) {
        setMyGarden([...myGarden, plantData]);
      }
      setCurrentView(View.GARDEN);
    }
  }, [plantData, myGarden, setMyGarden]);

  const handleRemoveFromGarden = useCallback((plantToRemove: PlantInfo) => {
    setMyGarden(myGarden.filter(p => p.scientificName !== plantToRemove.scientificName));
  }, [myGarden, setMyGarden]);
  
  const handleViewPlantDetails = useCallback((plant: PlantInfo) => {
    setPlantData(plant);
    setCapturedImage(plant.imageUrl || null);
    setCurrentView(View.RESULTS);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case View.IDENTIFYING:
        return <LoadingScreen />;
      case View.RESULTS:
        return plantData && capturedImage && (
          <ResultsScreen
            plantInfo={plantData}
            imageUrl={capturedImage}
            onSave={handleSaveToGarden}
            onScanAnother={() => setCurrentView(View.HOME)}
            isInGarden={myGarden.some(p => p.scientificName === plantData.scientificName)}
          />
        );
      case View.GARDEN:
        return <GardenScreen 
          garden={myGarden} 
          onViewPlant={handleViewPlantDetails}
          onRemovePlant={handleRemoveFromGarden}
        />;
      case View.HOME:
      default:
        return <HomeScreen onIdentify={handleIdentify} error={error} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow container mx-auto p-4 max-w-lg">
        {renderView()}
      </main>
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;
