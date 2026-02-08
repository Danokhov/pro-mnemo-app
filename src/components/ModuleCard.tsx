
import React from 'react';

interface ModuleCardProps {
  title: string;
  icon: string;
  onClick: () => void;
  colorClass: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, icon, onClick, colorClass, isCompleted, isLocked }) => {
  return (
    <button 
      onClick={onClick}
      disabled={isLocked}
      className={`flex flex-col items-center p-4 bg-white rounded-[1.4rem] shadow-md border border-gray-100 transition-all text-center min-h-[110px] justify-center relative overflow-hidden group ${
        isLocked 
          ? 'opacity-60 cursor-not-allowed' 
          : 'hover:shadow-lg active:scale-95'
      }`}
    >
      {isCompleted && !isLocked && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-sm animate-in zoom-in">
          <i className="fas fa-check"></i>
        </div>
      )}
      {isLocked && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-gray-400 text-white rounded-full flex items-center justify-center text-[10px] shadow-sm">
          <i className="fas fa-lock"></i>
        </div>
      )}
      <div className={`w-10 h-10 ${colorClass} text-white rounded-full flex items-center justify-center mb-2.5 text-lg shadow-lg shadow-current/20 transition-transform relative ${
        isLocked ? '' : 'group-hover:scale-110'
      }`}>
        <i className={`fas ${icon}`}></i>
        {isLocked && (
          <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
            <i className="fas fa-lock text-white text-xs"></i>
          </div>
        )}
      </div>
      <h3 className={`text-sm font-black leading-tight ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>{title}</h3>
    </button>
  );
};

export default ModuleCard;
