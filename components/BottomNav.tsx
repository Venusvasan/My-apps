
import React from 'react';
import { View } from '../types';
import { HomeIcon, GardenIcon } from './Icons';

interface BottomNavProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  const homeViews = [View.HOME, View.IDENTIFYING, View.RESULTS];
  
  const isHomeActive = homeViews.includes(currentView);
  const isGardenActive = currentView === View.GARDEN;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-upper">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        <NavItem
          label="Scanner"
          icon={<HomeIcon />}
          isActive={isHomeActive}
          onClick={() => setCurrentView(View.HOME)}
        />
        <NavItem
          label="My Garden"
          icon={<GardenIcon />}
          isActive={isGardenActive}
          onClick={() => setCurrentView(View.GARDEN)}
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon, isActive, onClick }) => {
  const activeClass = 'text-green-600';
  const inactiveClass = 'text-gray-500 hover:text-green-500';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`}
    >
      <div className="w-7 h-7">{icon}</div>
      <span className="text-xs font-medium mt-1">{label}</span>
    </button>
  );
};

export default BottomNav;
