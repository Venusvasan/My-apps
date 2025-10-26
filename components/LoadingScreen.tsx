
import React from 'react';
import { LeafIcon } from './Icons';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center pt-20">
      <div className="relative">
        <LeafIcon className="w-24 h-24 text-green-500 animate-pulse" />
      </div>
      <h2 className="text-2xl font-semibold text-green-700 mt-6">Identifying Plant...</h2>
      <p className="text-gray-500 mt-2">Our AI is analyzing your image.</p>
    </div>
  );
};

export default LoadingScreen;
