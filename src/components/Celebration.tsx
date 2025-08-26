import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface CelebrationProps {
  message: string;
  onComplete: () => void;
}

export function Celebration({ message, onComplete }: CelebrationProps) {
  const [show, setShow] = useState(true);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, color: string, delay: number}>>([]);

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
    <div className="fixed inset-0 z-50 cursor-pointer" onClick={handleBackgroundClick}>
      {/* Confetti Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 animate-bounce pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: '2s'
          }}
        ></div>
      ))}

      {/* Celebration Message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-yellow-300 text-center max-w-md mx-4 animate-bounce relative cursor-pointer"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-6xl mb-4 animate-pulse">🎉</div>
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 mb-4">
            {message}
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            All candles have been blown out!
          </p>
          <div className="flex justify-center gap-2 text-4xl animate-pulse mb-4">
            🎂 🎈 🎁 🎊 🥳
          </div>
          <button
            onClick={handleClose}
            className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-200"
          >
            Continue to Bouquet 🌸
          </button>
        </div>
      </div>

      {/* Fireworks Effect */}
      <div className="absolute top-10 left-10 text-4xl animate-ping pointer-events-none">✨</div>
      <div className="absolute top-20 right-20 text-4xl animate-ping pointer-events-none" style={{ animationDelay: '0.5s' }}>🎆</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-ping pointer-events-none" style={{ animationDelay: '1s' }}>🎇</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-ping pointer-events-none" style={{ animationDelay: '1.5s' }}>✨</div>
    </div>
  );
}