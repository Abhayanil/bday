import React from 'react';
import { Candle } from './Candle';

interface CakeProps {
  numCandles: number;
  blownCandles: Set<number>;
  onCandleClick: (index: number) => void;
}

export function Cake({ numCandles, blownCandles, onCandleClick }: CakeProps) {
  const candles = Array.from({ length: numCandles }, (_, i) => i);

  // Calculate candle arrangement
  const getCandlePosition = (index: number, total: number) => {
    if (total <= 6) {
      // Single row for small numbers
      const spacing = Math.min(40, 200 / total);
      return {
        x: (index - (total - 1) / 2) * spacing,
        y: 0
      };
    } else {
      // Multiple rows for larger numbers
      const candlesPerRow = Math.ceil(Math.sqrt(total));
      const row = Math.floor(index / candlesPerRow);
      const col = index % candlesPerRow;
      const rowCount = Math.ceil(total / candlesPerRow);
      
      return {
        x: (col - (candlesPerRow - 1) / 2) * 35,
        y: (row - (rowCount - 1) / 2) * 25
      };
    }
  };

  return (
    <div className="relative">
      {/* Cake Base */}
      <div className="relative">
        {/* Cake Layer 3 (top) */}
        <div className="w-56 h-20 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t-full mx-auto relative shadow-xl border-2 border-rose-200 overflow-hidden">
          <div className="absolute inset-x-6 top-3 h-3 bg-white/40 rounded-full shadow-inner"></div>
          <div className="absolute inset-x-10 top-6 h-2 bg-rose-200 rounded-full"></div>
          {/* Top layer decorations */}
          <div className="absolute top-1 left-8 w-4 h-4 bg-amber-300 rounded-full shadow-sm"></div>
          <div className="absolute top-1 right-8 w-4 h-4 bg-sky-300 rounded-full shadow-sm"></div>
        </div>
        
        {/* Cake Layer 2 (middle) */}
        <div className="w-64 h-24 bg-gradient-to-b from-amber-200 to-amber-300 mx-auto relative shadow-xl border-2 border-amber-100 -mt-3 overflow-hidden">
          <div className="absolute inset-x-6 top-4 h-3 bg-white/40 rounded-full shadow-inner"></div>
          <div className="absolute inset-x-10 top-8 h-2 bg-amber-100 rounded-full"></div>
          {/* Middle layer frosting decorations */}
          <div className="absolute -top-1 left-6 w-4 h-4 bg-rose-400 rounded-full shadow-sm"></div>
          <div className="absolute -top-1 left-16 w-4 h-4 bg-emerald-400 rounded-full shadow-sm"></div>
          <div className="absolute -top-1 right-6 w-4 h-4 bg-violet-400 rounded-full shadow-sm"></div>
          <div className="absolute -top-1 right-16 w-4 h-4 bg-sky-400 rounded-full shadow-sm"></div>
        </div>
        
        {/* Cake Layer 1 (bottom) */}
        <div className="w-72 h-28 bg-gradient-to-b from-orange-200 to-orange-300 rounded-b-3xl mx-auto relative shadow-2xl border-2 border-orange-100 -mt-3 overflow-hidden">
          <div className="absolute inset-x-8 top-5 h-3 bg-white/40 rounded-full shadow-inner"></div>
          <div className="absolute inset-x-12 top-9 h-2 bg-orange-100 rounded-full"></div>
          {/* Bottom layer decorations */}
          <div className="absolute bottom-3 left-12 w-5 h-5 bg-red-400 rounded-full shadow-sm"></div>
          <div className="absolute bottom-3 left-24 w-5 h-5 bg-emerald-400 rounded-full shadow-sm"></div>
          <div className="absolute bottom-3 right-12 w-5 h-5 bg-violet-400 rounded-full shadow-sm"></div>
          <div className="absolute bottom-3 right-24 w-5 h-5 bg-sky-400 rounded-full shadow-sm"></div>
          
          {/* Decorative border */}
          <div className="absolute bottom-1 inset-x-4 h-1 bg-orange-400 rounded-full"></div>
        </div>

        {/* Elegant Cake Plate */}
        <div className="w-80 h-8 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 rounded-full mx-auto -mt-2 shadow-xl border-2 border-slate-200 relative">
          <div className="absolute inset-x-8 top-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>

      {/* Candles with improved positioning */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          {candles.map((candleIndex) => {
            const position = getCandlePosition(candleIndex, numCandles);
            return (
              <div
                key={candleIndex}
                className="absolute"
                style={{
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  transform: 'translateX(-50%)'
                }}
              >
                <Candle
                  isLit={!blownCandles.has(candleIndex)}
                  onClick={() => onCandleClick(candleIndex)}
                  delay={candleIndex * 150}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}