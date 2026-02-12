import React from 'react';
import { Candle } from './Candle';

interface CakeProps {
  numCandles: number;
  blownCandles: number;
  onCandleClick: () => void;
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
    <div className="relative animate-float hover:scale-105 transition-transform duration-700">
      {/* Cake Base */}
      <div className="relative filter drop-shadow-2xl">
        {/* Cake Layer 3 (top) */}
        <div className="w-48 md:w-56 h-16 md:h-20 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t-full mx-auto relative shadow-xl border-2 border-rose-200 overflow-hidden z-20">
          <div className="absolute inset-x-6 top-3 h-3 bg-white/40 rounded-full shadow-inner blur-[1px]"></div>
          <div className="absolute inset-x-10 top-6 h-2 bg-rose-200/50 rounded-full blur-[2px]"></div>
          {/* Top layer decorations */}
          <div className="absolute top-2 left-8 w-3 h-3 md:w-4 md:h-4 bg-amber-300 rounded-full shadow-inner ring-1 ring-amber-400/50"></div>
          <div className="absolute top-2 right-8 w-3 h-3 md:w-4 md:h-4 bg-sky-300 rounded-full shadow-inner ring-1 ring-sky-400/50"></div>
        </div>

        {/* Cake Layer 2 (middle) */}
        <div className="w-56 md:w-64 h-20 md:h-24 bg-gradient-to-b from-amber-200 to-amber-300 mx-auto relative shadow-xl border-2 border-amber-100 -mt-8 pt-8 overflow-hidden z-10 rounded-xl">
          <div className="absolute inset-x-6 top-10 h-3 bg-white/40 rounded-full shadow-inner blur-[1px]"></div>

          {/* Middle layer frosting decorations */}
          <div className="absolute top-0 left-6 w-4 h-4 bg-rose-400 rounded-full shadow-lg"></div>
          <div className="absolute top-0 left-16 w-4 h-4 bg-emerald-400 rounded-full shadow-lg"></div>
          <div className="absolute top-0 right-6 w-4 h-4 bg-violet-400 rounded-full shadow-lg"></div>
          <div className="absolute top-0 right-16 w-4 h-4 bg-sky-400 rounded-full shadow-lg"></div>
        </div>

        {/* Cake Layer 1 (bottom) */}
        <div className="w-64 md:w-72 h-24 md:h-28 bg-gradient-to-b from-orange-200 to-orange-300 rounded-b-[2rem] mx-auto relative shadow-2xl border-2 border-orange-100 -mt-8 pt-8 overflow-hidden z-0">
          <div className="absolute inset-x-8 top-10 h-3 bg-white/40 rounded-full shadow-inner blur-[1px]"></div>

          {/* Bottom layer decorations */}
          <div className="absolute bottom-5 left-12 w-4 h-4 md:w-5 md:h-5 bg-red-400 rounded-full shadow-sm ring-2 ring-red-300"></div>
          <div className="absolute bottom-5 left-24 w-4 h-4 md:w-5 md:h-5 bg-emerald-400 rounded-full shadow-sm ring-2 ring-emerald-300"></div>
          <div className="absolute bottom-5 right-12 w-4 h-4 md:w-5 md:h-5 bg-violet-400 rounded-full shadow-sm ring-2 ring-violet-300"></div>
          <div className="absolute bottom-5 right-24 w-4 h-4 md:w-5 md:h-5 bg-sky-400 rounded-full shadow-sm ring-2 ring-sky-300"></div>

          {/* Decorative border */}
          <div className="absolute bottom-2 inset-x-6 h-1 bg-orange-400/50 rounded-full blur-[1px]"></div>
        </div>

        {/* Elegant Cake Plate */}
        <div className="w-72 md:w-80 h-4 md:h-8 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 rounded-[100%] mx-auto -mt-2 shadow-xl border-t border-white relative z-[-1]">
          <div className="absolute inset-x-8 top-1 h-2 bg-white/50 rounded-full blur-[1px]"></div>
        </div>
      </div>

      {/* Candles with improved positioning */}
      <div className="absolute -top-12 md:-top-16 left-1/2 transform -translate-x-1/2 z-30">
        <div className="relative">
          {candles.map((candleIndex) => {
            const position = getCandlePosition(candleIndex, numCandles);
            // In the new logic, we just check if the index is less than the number of blown candles
            // We only allow clicking the *next* unblown candle, or any unblown candle if simpler.
            // But App.tsx logic is "click any to increment count". 
            // So we'll visually show the first N as blown.
            const isBlown = candleIndex < blownCandles;

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
                  isLit={!isBlown}
                  onClick={() => {
                    if (!isBlown) {
                      onCandleClick();
                    }
                  }}
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