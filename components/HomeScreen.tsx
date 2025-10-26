
import React, { useRef } from 'react';
import { CameraIcon, UploadIcon, LeafIcon } from './Icons';

interface HomeScreenProps {
  onIdentify: (file: File) => void;
  error: string | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onIdentify, error }) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onIdentify(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center h-full pt-10">
      <div className="p-4 bg-white/50 rounded-full mb-4 shadow-lg">
          <LeafIcon className="w-16 h-16 text-green-600" />
      </div>
      <h1 className="text-4xl font-bold text-green-800">LeafLens</h1>
      <p className="text-gray-600 mt-2 mb-8">Identify any plant with your camera.</p>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 w-full" role="alert">
        <strong className="font-bold">Oh no! </strong>
        <span className="block sm:inline">{error}</span>
      </div>}

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 space-y-4">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={cameraInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => cameraInputRef.current?.click()}
          className="w-full flex items-center justify-center bg-green-600 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          <CameraIcon className="w-6 h-6 mr-3" />
          Scan a Leaf
        </button>

        <input
          type="file"
          accept="image/*"
          ref={galleryInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => galleryInputRef.current?.click()}
          className="w-full flex items-center justify-center bg-white text-green-600 font-bold py-4 px-6 rounded-full shadow-lg border border-green-200 hover:bg-green-50 transition-transform transform hover:scale-105"
        >
          <UploadIcon className="w-6 h-6 mr-3" />
          Upload an Image
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
