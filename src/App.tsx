import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX, ChevronDown, Mic, MicOff } from 'lucide-react';

import { Cake } from './components/Cake';
import { FlowerBouquet } from './components/FlowerBouquet';
import { Celebration } from './components/Celebration';
import { AudioBlower } from './components/AudioBlower';

// 100% Reliable Synthetic Audio Engine
class BirthdayMelodyPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: any = null;

  // Happy Birthday notes (frequency in Hz) and durations (in seconds)
  private melody = [
    { freq: 261.63, dur: 0.4 }, { freq: 261.63, dur: 0.2 }, { freq: 293.66, dur: 0.6 }, { freq: 261.63, dur: 0.6 }, { freq: 349.23, dur: 0.6 }, { freq: 329.63, dur: 1.2 }, // Happy birthday to you
    { freq: 261.63, dur: 0.4 }, { freq: 261.63, dur: 0.2 }, { freq: 293.66, dur: 0.6 }, { freq: 261.63, dur: 0.6 }, { freq: 392.00, dur: 0.6 }, { freq: 349.23, dur: 1.2 }, // Happy birthday to you
    { freq: 261.63, dur: 0.4 }, { freq: 261.63, dur: 0.2 }, { freq: 523.25, dur: 0.6 }, { freq: 440.00, dur: 0.6 }, { freq: 349.23, dur: 0.6 }, { freq: 329.63, dur: 0.6 }, { freq: 293.66, dur: 0.6 },
    { freq: 466.16, dur: 0.4 }, { freq: 466.16, dur: 0.2 }, { freq: 440.00, dur: 0.6 }, { freq: 349.23, dur: 0.6 }, { freq: 392.00, dur: 0.6 }, { freq: 349.23, dur: 1.2 }
  ];

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.playMelody(0);
  }

  private playMelody(index: number) {
    if (!this.isPlaying || !this.ctx) return;
    if (index >= this.melody.length) index = 0; // Loop

    const note = this.melody[index];
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note.freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + note.dur - 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + note.dur);

    this.timer = setTimeout(() => this.playMelody(index + 1), note.dur * 1000);
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }

  getPlaying() {
    return this.isPlaying;
  }
}

function App() {
  const [candlesBlown, setCandlesBlown] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const melodyPlayerRef = useRef<BirthdayMelodyPlayer | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalCandles = 5; // Representing distinct wishes

  const handleCandleClick = () => {
    if (candlesBlown >= totalCandles || showCelebration) return;
    setCandlesBlown((prev) => {
      const newState = prev + 1;
      if (newState >= totalCandles) {
        setTimeout(() => setShowCelebration(true), 500);
        return totalCandles;
      }
      return newState;
    });
  };

  const handleMicBlow = () => {
    if (candlesBlown >= totalCandles || showCelebration) return;
    // Single blow extinguishes all candles as requested
    setCandlesBlown(totalCandles);
    setTimeout(() => setShowCelebration(true), 500);
  };

  // Initialize Synthetic Audio
  useEffect(() => {
    melodyPlayerRef.current = new BirthdayMelodyPlayer();
    return () => {
      melodyPlayerRef.current?.stop();
    };
  }, []);

  const toggleMusic = () => {
    if (!melodyPlayerRef.current) return;
    if (isPlaying) {
      melodyPlayerRef.current.stop();
      setIsPlaying(false);
    } else {
      melodyPlayerRef.current.start();
      setIsPlaying(true);
    }
  };

  const scrollToBouquet = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900 font-sans">
      {/* Global Background Effects */}
      <div className="bg-noise"></div>
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Audio Element */}


      {/* Navigation / Music Control */}
      <nav className="fixed top-0 left-0 right-0 p-6 z-40 flex justify-between items-center pointer-events-none">
        <div className="glass-button pointer-events-auto p-3 rounded-full opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', opacity: 1 }}>
          <Sparkles className="w-5 h-5 text-amber-500" />
        </div>
        <button
          onClick={toggleMusic}
          className="glass-button pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:text-slate-900 animate-fade-in-up"
          style={{ animationDelay: '1.2s', opacity: 1, animationFillMode: 'forwards' }}
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          <span className="hidden md:inline">{isPlaying ? 'Pause Music' : 'Play Music'}</span>
        </button>
      </nav>

      {/* Hero Section */}
      <main className="min-h-[100dvh] flex flex-col items-center justify-center relative px-4 py-20">
        <div className="text-center w-full max-w-4xl mx-auto space-y-8 md:space-y-12 z-10">

          {/* Header Group */}
          <div className="space-y-4">
            <div className="inline-block animate-float">
              <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 text-sm font-bold tracking-widest uppercase mb-4 border border-rose-200 shadow-sm">
                Special Day
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-sky-500 leading-tight md:leading-snug drop-shadow-sm tracking-tight">
              Happy Birthday<br />
              <span className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-slate-700 block mt-2">
                Dearest Nithya
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
              Make a wish and blow out the candles to begin the magic.
            </p>
          </div>

          {/* Mic Control */}
          <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={() => setMicEnabled(!micEnabled)}
              className={`px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm ${micEnabled
                ? 'bg-rose-500 text-white'
                : 'glass-button text-slate-700'
                }`}
            >
              {micEnabled ? <Mic className="w-4 h-4 animate-pulse" /> : <MicOff className="w-4 h-4" />}
              {micEnabled ? 'Blow into Mic' : 'Enable Mic'}
            </button>
          </div>

          {/* Interactive Layer */}
          <div className="relative py-8 md:py-12 flex justify-center">
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-200/30 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 transform hover:scale-[1.02] transition-transform duration-500">
              <Cake
                numCandles={totalCandles}
                blownCandles={candlesBlown}
                onCandleClick={handleCandleClick}
              />
            </div>
          </div>

          {/* Scroll Indicator */}
          {candlesBlown === totalCandles && (
            <div className="animate-fade-in-up">
              <p className="text-slate-400 text-sm mb-4 animate-pulse uppercase tracking-widest">
                Scroll to Reveal
              </p>
              <button
                onClick={scrollToBouquet}
                className="cursor-pointer p-4 glass-button rounded-full inline-flex animate-bounce text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Scroll to bouquet"
              >
                <ChevronDown className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Second Section: Flower Bouquet */}
      <div ref={scrollRef}>
        <FlowerBouquet />
      </div>

      {/* Audio Blower Logic */}
      {micEnabled && (
        <AudioBlower
          enabled={micEnabled && candlesBlown < totalCandles}
          onBlow={handleMicBlow}
        />
      )}

      {/* Celebration Modal */}
      {showCelebration && (
        <Celebration
          message="Wishes do come true!"
          onComplete={() => {
            setShowCelebration(false);
            scrollToBouquet();
          }}
        />
      )}
    </div>
  );
}

export default App;