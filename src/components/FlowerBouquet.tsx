import React, { useMemo, useState } from 'react';

interface Flower {
  id: number;
  type: 'Rose' | 'Sunflower' | 'Tulip' | 'Daisy' | 'Lily' | 'Cherry Blossom';
  message: string;
  color: string; // main color for the flower head
  position: { x: number; y: number };
}

// Nicely spaced targets for flower heads relative to bouquet center
const flowers: Flower[] = [
  { id: 1, type: 'Rose', message: 'Even miles apart, my prayers travel with you.', color: '#e11d48', position: { x: 0, y: -60 } },
  { id: 2, type: 'Sunflower', message: 'May your days be filled with sunshine ☀️', color: '#f59e0b', position: { x: -70, y: -40 } },
  { id: 3, type: 'Tulip', message: 'You are braver that you feel right now.', color: '#f43f5e', position: { x: 70, y: -40 } },
  { id: 4, type: 'Daisy', message: 'Innocence and new beginnings await 🌟', color: '#f8fafc', position: { x: -45, y: -10 } },
  { id: 5, type: 'Lily', message: 'Rest, heal and get back stronger.', color: '#fde68a', position: { x: 45, y: -10 } },
  { id: 6, type: 'Cherry Blossom', message: "Beauty in life's fleeting moments 🦋", color: '#fb7185', position: { x: 0, y: 10 } },
];

// SVG flower heads for crisp, high-quality visuals
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
  const [messages, setMessages] = useState<Array<{ id: number; text: string; flower: string }>>([]);

  const addFlower = () => {
    if (visibleFlowers < flowers.length) {
      const newFlower = flowers[visibleFlowers];
      setVisibleFlowers((prev) => prev + 1);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), text: newFlower.message, flower: newFlower.type },
      ]);
    }
  };

  const resetBouquet = () => {
    setVisibleFlowers(0);
    setMessages([]);
  };

  // Precompute stems (curved) and positions for smoother layout
  const { stemBaseX, stemBaseY, viewBox } = useMemo(
    () => ({ stemBaseX: 160, stemBaseY: 210, viewBox: '0 0 320 240' }),
    []
  );

  return (
    <section className="relative bg-gradient-to-b from-emerald-50 via-rose-50 to-violet-50 py-24 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-rose-500 to-violet-500 mb-6 leading-tight">
            A Bouquet of Wishes
          </h2>
          <p className="text-xl text-gray-600 bg-white/80 backdrop-blur-md rounded-2xl px-8 py-4 inline-block shadow-lg border border-white/30 max-w-2xl">
            Click the bouquet to add beautiful flowers with heartfelt messages 🌸
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Bouquet Side */}
          <div className="flex flex-col items-center">
            {/* Clickable Bouquet */}
            <div
              className="relative cursor-pointer transform hover:scale-105 transition-all duration-300 mb-8"
              onClick={addFlower}
            >
              {/* Elegant Vase */}
              <div className="relative mx-auto">
                <div className="w-48 h-64 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400 mx-auto shadow-2xl relative overflow-hidden rounded-t-lg">
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-500"
                    style={{ clipPath: 'polygon(25% 0%, 75% 0%, 80% 100%, 20% 100%)' }}
                  ></div>
                  {/* Vase decorations */}
                  <div className="absolute inset-x-6 top-8 h-4 bg-white/40 rounded-full shadow-inner"></div>
                  <div className="absolute inset-x-8 top-16 h-3 bg-slate-100 rounded-full"></div>
                  <div className="absolute inset-x-10 top-24 h-2 bg-white/60 rounded-full"></div>
                  {/* Heart decoration */}
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-slate-600 text-2xl">💖</div>
                </div>
                {/* Vase base */}
                <div className="w-52 h-4 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full mx-auto -mt-2 shadow-lg"></div>
              </div>

              {/* Stems and Flowers (SVG ensures alignment) */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <svg
                  width="320"
                  height="240"
                  viewBox={viewBox}
                  className="overflow-visible"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Stems */}
                  {flowers.slice(0, visibleFlowers).map((f, i) => {
                    const endX = stemBaseX + f.position.x;
                    const endY = stemBaseY + f.position.y;
                    const ctrlX = stemBaseX + f.position.x * 0.4;
                    const ctrlY = stemBaseY - 60; // arch upwards
                    const isNew = i === visibleFlowers - 1;
                    return (
                      <path
                        key={`stem-${f.id}`}
                        d={`M ${stemBaseX} ${stemBaseY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`}
                        stroke="#059669"
                        strokeWidth={4}
                        fill="none"
                        className="drop-shadow-sm"
                        style={isNew ? { opacity: 0, animation: 'fadeIn 500ms ease-out forwards' } : undefined}
                        strokeLinecap="round"
                      />
                    );
                  })}

                  {/* Leaves */}
                  {flowers.slice(0, visibleFlowers).map((f, i) => {
                    const midX = stemBaseX + f.position.x * 0.5;
                    const midY = stemBaseY - 30;
                    const isNew = i === visibleFlowers - 1;
                    return (
                      <g key={`leaves-${f.id}`}>
                        <path
                          d={`M ${midX} ${midY} q -14 -8 -4 -18 q 14 6 8 18 Z`}
                          fill="#10b981"
                          style={isNew ? { opacity: 0, animation: 'fadeIn 500ms ease-out forwards', animationDelay: '120ms' } : undefined}
                        />
                        <path
                          d={`M ${midX + 10} ${midY + 10} q 14 -8 4 -18 q -14 6 -8 18 Z`}
                          fill="#059669"
                          style={isNew ? { opacity: 0, animation: 'fadeIn 500ms ease-out forwards', animationDelay: '200ms' } : undefined}
                        />
                      </g>
                    );
                  })}

                  {/* Flower heads */}
                  {flowers.slice(0, visibleFlowers).map((f, i) => {
                    const endX = stemBaseX + f.position.x;
                    const endY = stemBaseY + f.position.y;
                    const isNew = i === visibleFlowers - 1;
                    return (
                      <g key={`head-${f.id}`} transform={`translate(${endX} ${endY})`}>
                        <g
                          style={
                            isNew
                              ? {
                                  transformOrigin: 'center',
                                  transformBox: 'fill-box',
                                  opacity: 0,
                                  animation: 'popIn 500ms ease-out forwards',
                                }
                              : undefined
                          }
                        >
                          <FlowerHead type={f.type} color={f.color} />
                        </g>
                      </g>
                    );
                  })}

                  {/* Simple animations */}
                  <style>
                    {`
                      @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
                      @keyframes popIn {
                        0% { opacity: 0; transform: scale(0.6) }
                        70% { opacity: 1; transform: scale(1.08) }
                        100% { transform: scale(1) }
                      }
                    `}
                  </style>
                </svg>
              </div>

              {/* Click indicator */}
              {visibleFlowers < flowers.length && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-6 py-2 rounded-full text-sm font-semibold animate-pulse shadow-lg">
                  Click to add flower! 🌸
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-4 mb-8">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/30 text-center">
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  Progress: {visibleFlowers} / {flowers.length}
                </div>
                <div className="w-48 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 via-rose-400 to-violet-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(visibleFlowers / flowers.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {visibleFlowers > 0 && (
              <button
                onClick={resetBouquet}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-slate-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Reset Bouquet
              </button>
            )}
          </div>

          {/* Messages Side */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Messages 💌</h3>

            {messages.length === 0 ? (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg border border-white/30">
                <div className="text-6xl mb-4 opacity-50">🌸</div>
                <p className="text-gray-600 text-lg">Click the bouquet to start collecting beautiful messages!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 transform transition-all duration-500 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-sm font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-700">
                        {message.flower}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completion Message */}
            {visibleFlowers === flowers.length && (
              <div className="bg-gradient-to-r from-emerald-100 via-rose-100 to-violet-100 rounded-3xl p-8 shadow-2xl border-2 border-rose-300 animate-pulse mt-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎊</div>
                  <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-rose-500 to-violet-500 mb-4">
                    Bouquet Complete!
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    You've collected all the beautiful flowers and their heartfelt messages. May these wishes bring endless joy to your special day! 🌸✨
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}