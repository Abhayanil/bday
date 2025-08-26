import React, { useState, useEffect } from 'react';
import { Cake } from './components/Cake';
import { AudioBlower } from './components/AudioBlower';
import { Celebration } from './components/Celebration';
import { FlowerBouquet } from './components/FlowerBouquet';
import { Settings2, RotateCcw, Mic, MicOff } from 'lucide-react';

function App() {
  const [numCandles, setNumCandles] = useState(1);
  const [personalMessage, setPersonalMessage] = useState('Happy Birthday!');
  const [blownCandles, setBlownCandles] = useState<Set<number>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const allCandlesBlown = blownCandles.size === numCandles && numCandles > 0;

  useEffect(() => {
    if (allCandlesBlown && !showCelebration && !hasCelebrated) {
      setShowCelebration(true);
      setHasCelebrated(true);
      // Play birthday song
      playBirthdaySong();
    }
  }, [allCandlesBlown, showCelebration]);

  const playBirthdaySong = () => {
    // Create a simple birthday tune using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [
      { freq: 261.63, duration: 0.5 }, // C4 - Hap-
      { freq: 261.63, duration: 0.5 }, // C4 - py
      { freq: 293.66, duration: 1 },   // D4 - Birth-
      { freq: 261.63, duration: 1 },   // C4 - day
      { freq: 349.23, duration: 1 },   // F4 - to
      { freq: 329.63, duration: 2 },   // E4 - you
    ];

    let startTime = audioContext.currentTime;
    notes.forEach((note, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = note.freq;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + note.duration);
      
      startTime += note.duration;
    });
  };

  const blowOutCandle = (candleIndex: number) => {
    setBlownCandles(prev => new Set([...prev, candleIndex]));
  };

  const resetCandles = () => {
    setBlownCandles(new Set());
    setShowCelebration(false);
    setHasCelebrated(false);
  };

  const handleMicBlow = () => {
    // Blow out a random unblown candle
    const unblownCandles = Array.from({ length: numCandles }, (_, i) => i)
      .filter(i => !blownCandles.has(i));
    
    if (unblownCandles.length > 0) {
      const randomCandle = unblownCandles[Math.floor(Math.random() * unblownCandles.length)];
      blowOutCandle(randomCandle);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #f472b6 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #fbbf24 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main cake section */}
      <section className="relative z-10 min-h-screen flex flex-col">
        <div className="container mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-sky-500 mb-6 leading-tight">
              Happy Birthday!
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
              {allCandlesBlown ? personalMessage : 'Make a wish and blow out the candles! 🕯️'}
            </p>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="max-w-lg mx-auto mb-12 bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <Settings2 className="w-6 h-6 text-rose-500" />
                  Customize Your Cake
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-3">
                    Number of Candles: {numCandles}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={numCandles}
                    onChange={(e) => {
                      setNumCandles(Number(e.target.value));
                      resetCandles();
                    }}
                    className="w-full h-3 bg-gradient-to-r from-rose-200 to-amber-200 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>1</span>
                    <span>20</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-3">
                    Birthday Message
                  </label>
                  <input
                    type="text"
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all text-base"
                    placeholder="Enter your heartfelt message..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {!showSettings && (
              <button
                onClick={() => setShowSettings(true)}
                className="px-8 py-4 bg-gradient-to-r from-violet-500 to-rose-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 text-base"
              >
                <Settings2 className="w-5 h-5" />
                Customize
              </button>
            )}
            
            <button
              onClick={resetCandles}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 text-base"
            >
              <RotateCcw className="w-5 h-5" />
              Relight
            </button>
            
            <button
              onClick={() => setMicEnabled(!micEnabled)}
              className={`px-8 py-4 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 text-base ${
                micEnabled 
                  ? 'bg-gradient-to-r from-red-500 to-rose-500' 
                  : 'bg-gradient-to-r from-gray-500 to-slate-600'
              }`}
            >
              {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              {micEnabled ? 'Mic On' : 'Mic Off'}
            </button>
          </div>

          {/* Instructions */}
          <div className="text-center mb-12">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl px-8 py-4 inline-block shadow-lg border border-white/30">
              <p className="text-lg text-gray-700 font-medium">
                💨 <strong>Click a candle</strong> or <strong>blow into your mic</strong> to make a wish! 💨
              </p>
            </div>
          </div>

          {/* Cake Container */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/30">
              <Cake
                numCandles={numCandles}
                blownCandles={blownCandles}
                onCandleClick={blowOutCandle}
              />
            </div>
          </div>

          {/* Progress */}
          <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30">
            <div className="text-center mb-4">
              <span className="text-lg font-semibold text-gray-700">
                {blownCandles.size} of {numCandles} wishes made ✨
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-rose-400 via-amber-400 to-sky-400 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${(blownCandles.size / numCandles) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Flower Bouquet Section */}
      <FlowerBouquet />

      {/* Audio Blower */}
      {micEnabled && (
        <AudioBlower
          enabled={micEnabled && !allCandlesBlown}
          onBlow={handleMicBlow}
        />
      )}

      {/* Celebration */}
      {showCelebration && (
        <Celebration
          message={personalMessage}
          onComplete={() => setShowCelebration(false)}
        />
      )}
    </div>
  );
}

export default App;