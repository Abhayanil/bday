import React, { useMemo, useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface Flower {
  id: number;
  type: 'Rose' | 'Sunflower' | 'Tulip' | 'Daisy' | 'Lily' | 'Cherry Blossom';
  message: string;
  color: string; // main color for the flower head
  position: { x: number; y: number };
}

const flowers: Flower[] = [
  { id: 1, type: 'Rose', message: 'Dearest Nithya, may your heart always be filled with the love you so generously give to others. ❤️', color: '#e11d48', position: { x: 0, y: -60 } },
  { id: 2, type: 'Sunflower', message: 'Your smile brightens every room. Never stop shining, my dear. ☀️', color: '#f59e0b', position: { x: -70, y: -40 } },
  { id: 3, type: 'Tulip', message: 'May you always find the strength to bloom, even on the toughest days. 🌷', color: '#f43f5e', position: { x: 70, y: -40 } },
  { id: 4, type: 'Daisy', message: "Here's to new adventures, endless laughter, and beautiful memories ahead. 🌟", color: '#f8fafc', position: { x: -45, y: -10 } },
  { id: 5, type: 'Lily', message: 'May peace, serenity, and happiness be your constant companions. 🕊️', color: '#fde68a', position: { x: 45, y: -10 } },
  { id: 6, type: 'Cherry Blossom', message: "You are a beautiful soul, inside and out. Celebrate every moment. 🦋", color: '#fb7185', position: { x: 0, y: 10 } },
];

function FlowerHead({ type, color }: { type: Flower['type']; color: string }) {
  switch (type) {
    case 'Rose':
      return (
        <g>
          <circle r="14" fill={color} />
          <path d="M-8 2 C -2 -4, 2 -4, 8 2" fill="none" stroke="#9f1239" strokeWidth="2" />
          <path d="M-6 -2 C 0 -8, 6 -8, 10 -2" fill="none" stroke="#be123c" strokeWidth="1.5" />
        </g>
      );
    case 'Sunflower':
      return (
        <g>
          {[...Array(16)].map((_, i) => (
            <ellipse key={i} rx="4" ry="10" fill={color} transform={`rotate(${(360 / 16) * i}) translate(0 -14)`} />
          ))}
          <circle r="8" fill="#78350f" />
        </g>
      );
    case 'Tulip':
      return (
        <g>
          <path d="M-10 0 C -10 -16, 10 -16, 10 0 C 10 12, -10 12, -10 0 Z" fill={color} />
          <path d="M-10 -2 L -4 -10 L 0 -2 L 4 -10 L 10 -2" fill={color} />
        </g>
      );
    case 'Daisy':
      return (
        <g>
          {[...Array(12)].map((_, i) => (
            <ellipse key={i} rx="4" ry="10" fill="#ffffff" transform={`rotate(${(360 / 12) * i}) translate(0 -12)`} />
          ))}
          <circle r="6" fill={color === '#f8fafc' ? '#fde047' : color} />
        </g>
      );
    case 'Lily':
      return (
        <g>
          {[...Array(6)].map((_, i) => (
            <path key={i} d="M0 0 C -4 -14, -2 -20, 0 -24 C 2 -20, 4 -14, 0 0 Z" fill={color} transform={`rotate(${(360 / 6) * i})`} />
          ))}
          <circle r="3" fill="#a16207" />
        </g>
      );
    case 'Cherry Blossom':
      return (
        <g>
          {[...Array(5)].map((_, i) => (
            <path key={i} d="M0 0 C -6 -10, -4 -18, 0 -20 C 4 -18, 6 -10, 0 0 Z" fill={color} transform={`rotate(${(360 / 5) * i})`} />
          ))}
          <circle r="3" fill="#fda4af" />
        </g>
      );
    default:
      return <circle r="10" fill={color} />;
  }
}

export function FlowerBouquet() {
  const [visibleFlowers, setVisibleFlowers] = useState<number>(0);
  const [activeMessage, setActiveMessage] = useState<Flower | null>(null);

  const addFlower = () => {
    if (visibleFlowers < flowers.length) {
      const newIndex = visibleFlowers;
      setVisibleFlowers((prev) => prev + 1);
      setActiveMessage(flowers[newIndex]);
    }
  };

  const resetBouquet = () => {
    setVisibleFlowers(0);
    setActiveMessage(null);
  };

  const { stemBaseX, stemBaseY, viewBox } = useMemo(
    () => ({ stemBaseX: 160, stemBaseY: 210, viewBox: '0 0 320 240' }),
    []
  );

  return (
    <section className="relative py-20 min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl -z-10 animate-blob"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 mb-6 leading-tight tracking-tight">
            A Garden of Wishes
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light">
            Tap the vase to bloom a memory and reveal a heartfelt wish.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center max-w-7xl mx-auto">

          {/* Bouquet Interaction Area */}
          <div className="lg:col-span-7 flex flex-col items-center relative">
            <div
              className={`relative cursor-pointer transition-all duration-500 ${visibleFlowers < flowers.length ? 'hover:scale-[1.02]' : ''}`}
              onClick={addFlower}
            >
              <div className="relative w-full max-w-[400px] mx-auto filter drop-shadow-2xl">

                {/* SVG Container */}
                <svg
                  viewBox={viewBox}
                  className="overflow-visible w-full h-auto relative z-30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Stems with organic draw animation */}
                  {flowers.slice(0, visibleFlowers).map((f, i) => {
                    const endX = stemBaseX + f.position.x;
                    const endY = stemBaseY + f.position.y;
                    const ctrlX = stemBaseX + f.position.x * 0.4;
                    const ctrlY = stemBaseY - 60;
                    return (
                      <path
                        key={`stem-${f.id}`}
                        d={`M ${stemBaseX} ${stemBaseY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`}
                        stroke="#059669"
                        strokeWidth={4}
                        fill="none"
                        className="animate-draw drop-shadow-sm"
                        strokeLinecap="round"
                      />
                    );
                  })}

                  {/* Leaves */}
                  {flowers.slice(0, visibleFlowers).map((f, i) => {
                    const midX = stemBaseX + f.position.x * 0.5;
                    const midY = stemBaseY - 30;
                    return (
                      <g key={`leaves-${f.id}`} className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <path
                          d={`M ${midX} ${midY} q -14 -8 -4 -18 q 14 6 8 18 Z`}
                          fill="#10b981"
                        />
                        <path
                          d={`M ${midX + 10} ${midY + 10} q 14 -8 4 -18 q -14 6 -8 18 Z`}
                          fill="#059669"
                        />
                      </g>
                    );
                  })}

                  {/* Blooming Flower Heads */}
                  {flowers.slice(0, visibleFlowers).map((f, i) => {
                    const endX = stemBaseX + f.position.x;
                    const endY = stemBaseY + f.position.y;
                    return (
                      <g key={`head-${f.id}`} transform={`translate(${endX} ${endY})`}>
                        <g className="animate-bloom" style={{ animationDelay: '0.8s' }}>
                          <FlowerHead type={f.type} color={f.color} />
                        </g>
                      </g>
                    );
                  })}
                </svg>

                {/* Premium Vase */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-64 z-20 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-b from-slate-50/80 via-slate-100/50 to-slate-300/80 backdrop-blur-sm rounded-b-[3rem] rounded-t-lg border-x border-b border-white/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-4 bg-white/40 skew-y-3"></div>
                    <div className="absolute inset-x-8 bottom-8 h-32 bg-gradient-to-t from-emerald-50/30 to-transparent rounded-full blur-xl"></div>
                  </div>
                </div>
              </div>

              {/* Call to Action Pulse */}
              {visibleFlowers < flowers.length && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                  <div className="w-20 h-20 bg-white/30 rounded-full animate-ping"></div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-8 w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-700 ease-out"
                style={{ width: `${(visibleFlowers / flowers.length) * 100}%` }}
              />
            </div>
            {visibleFlowers > 0 && (
              <button
                onClick={resetBouquet}
                className="mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                Restart Experience
              </button>
            )}
          </div>

          {/* Wish Card Display */}
          <div className="lg:col-span-5 h-[300px] lg:h-[400px] flex items-center justify-center">
            {activeMessage ? (
              <div key={activeMessage.id} className="w-full animate-fade-in-up">
                <div className="glass-card rounded-[2rem] p-8 md:p-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-100 to-transparent opacity-50 rounded-bl-[100%] transition-transform group-hover:scale-110"></div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-rose-50 rounded-xl">
                      <Sparkles className="w-6 h-6 text-rose-400" />
                    </div>
                    <span className="text-sm font-bold tracking-widest text-rose-400 uppercase">
                      {activeMessage.type}
                    </span>
                  </div>

                  <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-6 font-serif">
                    "{activeMessage.message}"
                  </p>

                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Heart className="w-4 h-4 fill-current text-rose-300" />
                    <span>Sent with love</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-300 animate-pulse">
                <div className="w-16 h-16 border-2 border-slate-200 border-dashed rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <p className="text-lg">Tap the vase to grow a wish</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}