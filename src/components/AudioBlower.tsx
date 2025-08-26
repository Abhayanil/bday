import React, { useEffect, useRef, useState } from 'react';

interface AudioBlowerProps {
  enabled: boolean;
  onBlow: () => void;
}

export function AudioBlower({ enabled, onBlow }: AudioBlowerProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastBlowTimeRef = useRef<number>(0);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (enabled) {
      startListening();
    } else {
      stopListening();
    }

    return () => stopListening();
  }, [enabled]);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      microphone.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      
      setIsListening(true);
      detectBlow();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopListening = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    setIsListening(false);
  };

  const detectBlow = () => {
    if (!analyserRef.current || !dataArrayRef.current || !enabled) {
      return;
    }

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Calculate average volume
    const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
    
    // Detect blow (sudden increase in low-frequency audio)
    const currentTime = Date.now();
    const blowThreshold = 120; // Adjust sensitivity as needed
    const timeSinceLastBlow = currentTime - lastBlowTimeRef.current;
    
    if (average > blowThreshold && timeSinceLastBlow > 1000) {
      lastBlowTimeRef.current = currentTime;
      onBlow();
    }

    animationRef.current = requestAnimationFrame(detectBlow);
  };

  if (!enabled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/50 z-50">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
        <span className="text-sm font-medium text-gray-700">
          {isListening ? '🎤 Listening...' : '🎤 Mic Error'}
        </span>
      </div>
    </div>
  );
}