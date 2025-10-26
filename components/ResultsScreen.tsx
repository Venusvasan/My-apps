
import React, { useState } from 'react';
import type { PlantInfo } from '../types';
import { SunIcon, WaterDropIcon, SoilIcon, ThermometerIcon, AlertIcon, LeafIcon, SparklesIcon, CheckCircleIcon } from './Icons';

interface ResultsScreenProps {
  plantInfo: PlantInfo;
  imageUrl: string;
  onSave: () => void;
  onScanAnother: () => void;
  isInGarden: boolean;
}

type Tab = 'details' | 'care' | 'toxicity';

const ResultsScreen: React.FC<ResultsScreenProps> = ({ plantInfo, imageUrl, onSave, onScanAnother, isInGarden }) => {
  const [activeTab, setActiveTab] = useState<Tab>('details');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'care':
        return (
          <div className="space-y-4">
            <InfoCard icon={<WaterDropIcon />} title="Watering" content={plantInfo.care.watering} />
            <InfoCard icon={<SunIcon />} title="Sunlight" content={plantInfo.care.sunlight} />
            <InfoCard icon={<SoilIcon />} title="Soil" content={plantInfo.care.soil} />
            <InfoCard icon={<ThermometerIcon />} title="Temperature" content={plantInfo.care.temperature} />
          </div>
        );
      case 'toxicity':
        return (
            <div className={`p-4 rounded-lg flex items-start ${plantInfo.toxicity.isToxic ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                <AlertIcon className={`w-6 h-6 mr-3 flex-shrink-0 ${plantInfo.toxicity.isToxic ? 'text-red-500' : 'text-green-500'}`} />
                <div>
                    <h3 className="font-bold">{plantInfo.toxicity.isToxic ? 'Toxic' : 'Non-Toxic'}</h3>
                    <p className="text-sm">{plantInfo.toxicity.details}</p>
                </div>
            </div>
        );
      case 'details':
      default:
        return (
          <div>
            <p className="text-gray-600 mb-6">{plantInfo.description}</p>
            <h3 className="font-bold text-lg text-green-800 mb-3 flex items-center"><SparklesIcon className="w-5 h-5 mr-2" />Fun Facts</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {plantInfo.funFacts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="pb-24 animate-fade-in">
      <div className="relative -mx-4 -mt-4">
        <img src={imageUrl} alt={plantInfo.commonName} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h1 className="text-3xl font-bold text-white">{plantInfo.commonName}</h1>
          <p className="text-lg text-gray-200 italic">{plantInfo.scientificName}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <TabButton name="Details" tab="details" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton name="Care Guide" tab="care" activeTab={activeTab} setActiveTab={setActiveTab} />
            <TabButton name="Toxicity" tab="toxicity" activeTab={activeTab} setActiveTab={setActiveTab} />
          </nav>
        </div>
        <div className="mt-6">{renderTabContent()}</div>
      </div>
      
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 flex gap-4">
        <button
            onClick={onScanAnother}
            className="w-1/2 bg-white text-green-600 font-bold py-3 px-4 rounded-full shadow-lg border border-green-200 hover:bg-green-50 transition"
          >
            Scan Another
        </button>
        <button
          onClick={onSave}
          disabled={isInGarden}
          className="w-1/2 flex items-center justify-center bg-green-600 text-white font-bold py-3 px-4 rounded-full shadow-lg hover:bg-green-700 transition disabled:bg-green-300 disabled:cursor-not-allowed"
        >
          {isInGarden ? <CheckCircleIcon className="w-5 h-5 mr-2"/> : <LeafIcon className="w-5 h-5 mr-2" />}
          {isInGarden ? 'Saved' : 'Save to Garden'}
        </button>
      </div>
    </div>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}
const InfoCard: React.FC<InfoCardProps> = ({ icon, title, content }) => (
  <div className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <div className="text-green-500 mr-4 mt-1">{icon}</div>
    <div>
      <h4 className="font-bold text-gray-700">{title}</h4>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

interface TabButtonProps {
    name: string;
    tab: Tab;
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}
const TabButton: React.FC<TabButtonProps> = ({name, tab, activeTab, setActiveTab}) => (
    <button
        onClick={() => setActiveTab(tab)}
        className={`${
            activeTab === tab
            ? 'border-green-500 text-green-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
    >
        {name}
    </button>
);


export default ResultsScreen;
