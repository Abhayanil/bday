import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface CelebrationProps {
  message: string;
  onComplete: () => void;
}

export function Celebration({ message, onComplete }: CelebrationProps) {
  const [show, setShow] = useState(true);
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, color: string, delay: number }>>([]);

  useEffect(() => {
    // Generate confetti particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['#F472B6', '#FCD34D', '#3B82F6', '#10B981', '#8B5CF6'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 2
    }));
    setParticles(newParticles);

  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(false);
    setTimeout(onComplete, 300);
  };

  const handleBackgroundClick = () => {
    setShow(false);
    setTimeout(onComplete, 0);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-500"
        onClick={handleBackgroundClick}
      ></div>

      {/* Confetti Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed w-2 h-2 animate-bounce pointer-events-none z-40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: '3s'
          }}
        ></div>
      ))}

      {/* Celebration Message */}
      <div
        className="glass-panel w-full max-w-lg rounded-[2rem] p-8 md:p-12 shadow-2xl border-4 border-amber-200 text-center animate-gentle-pulse relative z-50 transform hover:scale-[1.01] transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors duration-200 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-7xl mb-6 animate-bounce">🎉</div>

        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-amber-500 to-sky-500 mb-6 leading-tight">
          {message}
        </h2>

        <div className="bg-white/50 rounded-2xl p-6 mb-8 border border-white/60">
          <p className="text-xl md:text-2xl text-slate-700 font-medium italic">
            "May your year be as beautiful as your smile."
          </p>
        </div>

        <div className="flex justify-center gap-4 text-5xl animate-pulse mb-8">
          <span>🎂</span>
          <span>🎈</span>
          <span>🎁</span>
        </div>

        <button
          onClick={handleClose}
          className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300"
        >
          Continue to Bouquet 🌸
        </button>
      </div>

      {/* Fireworks Effect */}
      <div className="fixed top-10 left-10 text-6xl animate-ping pointer-events-none opacity-50">✨</div>
      <div className="fixed top-20 right-20 text-5xl animate-ping pointer-events-none opacity-50" style={{ animationDelay: '0.5s' }}>🎆</div>
      <div className="fixed bottom-20 left-20 text-5xl animate-ping pointer-events-none opacity-50" style={{ animationDelay: '1s' }}>🎇</div>
      <div className="fixed bottom-10 right-10 text-6xl animate-ping pointer-events-none opacity-50" style={{ animationDelay: '1.5s' }}>✨</div>
    </div>
  );
}