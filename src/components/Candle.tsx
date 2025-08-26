import React from 'react';

interface CandleProps {
  isLit: boolean;
  onClick: () => void;
  delay?: number;
}

export function Candle({ isLit, onClick, delay = 0 }: CandleProps) {
  return (
    <div 
      className="relative cursor-pointer transform hover:scale-110 transition-all duration-300 hover:drop-shadow-lg"
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Candle Body */}
      <div className="w-4 h-20 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 rounded-sm shadow-lg border border-amber-300 relative overflow-hidden">
        {/* Candle texture stripes */}
        <div className="absolute inset-x-0 top-3 h-0.5 bg-amber-400 opacity-60"></div>
        <div className="absolute inset-x-0 top-6 h-0.5 bg-amber-400 opacity-60"></div>
        <div className="absolute inset-x-0 top-9 h-0.5 bg-amber-400 opacity-60"></div>
        <div className="absolute inset-x-0 top-12 h-0.5 bg-amber-400 opacity-60"></div>
        
        {/* Candle highlight */}
        <div className="absolute left-0.5 top-1 w-1 h-16 bg-gradient-to-b from-white/60 to-transparent rounded-full"></div>
      </div>
      
      {/* Wick */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-gray-800 rounded-full shadow-sm"></div>
      
      {/* Flame */}
      {isLit && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Flame glow */}
            <div className="absolute inset-0 w-6 h-8 bg-orange-300 rounded-full blur-sm opacity-40 animate-pulse"></div>
            
            {/* Outer flame */}
            <div className="relative w-5 h-7 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-pulse opacity-95 shadow-lg"></div>
            
            {/* Inner flame */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-5 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            
            {/* Flame core */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-gradient-to-t from-blue-400 to-white rounded-full opacity-80"></div>
            
            {/* Flame flicker animation */}
            <div className="absolute inset-0 animate-bounce" style={{ animationDuration: '1.2s', animationDelay: `${delay * 0.001}s` }}>
              <div className="w-5 h-7 bg-gradient-to-t from-orange-400/30 via-yellow-300/30 to-yellow-100/30 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Smoke effect when blown out */}
      {!isLit && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="animate-pulse opacity-70">
            <div className="w-1 h-4 bg-gray-400 rounded-full animate-bounce" style={{ animationDuration: '2s' }}></div>
            <div className="w-1 h-3 bg-gray-300 rounded-full ml-1 -mt-2 animate-bounce" style={{ animationDuration: '1.8s', animationDelay: '0.2s' }}></div>
            <div className="w-0.5 h-2 bg-gray-200 rounded-full ml-0.5 -mt-1 animate-bounce" style={{ animationDuration: '1.5s', animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}
      
      {/* Wax drips */}
      <div className="absolute top-6 -left-0.5 w-1 h-8 bg-gradient-to-b from-white/90 to-amber-200/70 rounded-full opacity-80 shadow-sm"></div>
      <div className="absolute top-10 -right-0.5 w-1 h-6 bg-gradient-to-b from-white/70 to-amber-200/50 rounded-full opacity-60 shadow-sm"></div>
      <div className="absolute top-14 left-0 w-0.5 h-4 bg-gradient-to-b from-white/50 to-amber-200/30 rounded-full opacity-40"></div>
    </div>
  );
}