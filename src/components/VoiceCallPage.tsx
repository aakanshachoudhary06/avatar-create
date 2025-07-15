import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  PhoneOff,
  Settings,
  Volume2,
  VolumeX,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceCallPageProps {
  onBack: () => void;
}

const VoiceCallPage: React.FC<VoiceCallPageProps> = ({ onBack }) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [avatarState, setAvatarState] = useState<'idle' | 'listening' | 'speaking'>('idle');
  
  const avatarRef = useRef<HTMLDivElement>(null);
  const glowRingRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);

  // Avatar animations
  useEffect(() => {
    if (!avatarRef.current) return;

    // Idle breathing animation
    const breathingTl = gsap.timeline({ repeat: -1, yoyo: true });
    breathingTl.to(avatarRef.current, {
      scale: 1.02,
      duration: 2,
      ease: "power2.inOut"
    });

    // Eye blink animation
    const blinkTl = gsap.timeline({ repeat: -1, delay: 3 });
    blinkTl.to(eyesRef.current, {
      scaleY: 0.1,
      duration: 0.1,
      ease: "power2.inOut"
    }).to(eyesRef.current, {
      scaleY: 1,
      duration: 0.1,
      ease: "power2.inOut"
    });

    return () => {
      breathingTl.kill();
      blinkTl.kill();
    };
  }, []);

  // Glow ring animation based on state
  useEffect(() => {
    if (!glowRingRef.current) return;

    let animation: gsap.core.Timeline;

    switch (avatarState) {
      case 'listening':
        animation = gsap.timeline({ repeat: -1 });
        animation.to(glowRingRef.current, {
          scale: 1.1,
          opacity: 0.8,
          duration: 1,
          ease: "power2.inOut"
        }).to(glowRingRef.current, {
          scale: 1,
          opacity: 0.4,
          duration: 1,
          ease: "power2.inOut"
        });
        break;
      case 'speaking':
        animation = gsap.timeline({ repeat: -1 });
        animation.to(glowRingRef.current, {
          scale: 1.2,
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut"
        }).to(glowRingRef.current, {
          scale: 1,
          opacity: 0.6,
          duration: 0.3,
          ease: "power2.inOut"
        });
        break;
      default:
        gsap.to(glowRingRef.current, {
          scale: 1,
          opacity: 0.3,
          duration: 0.5,
          ease: "power2.inOut"
        });
    }

    return () => {
      if (animation) animation.kill();
    };
  }, [avatarState]);

  // Waveform animation
  useEffect(() => {
    if (!waveformRef.current || avatarState !== 'speaking') return;

    const bars = waveformRef.current.children;
    const tl = gsap.timeline({ repeat: -1 });

    Array.from(bars).forEach((bar, index) => {
      tl.to(bar, {
        scaleY: Math.random() * 2 + 0.5,
        duration: 0.1,
        ease: "power2.inOut"
      }, index * 0.05);
    });

    return () => tl.kill();
  }, [avatarState]);

  const handleMicToggle = () => {
    setIsMicOn(!isMicOn);
    setAvatarState(!isMicOn ? 'listening' : 'idle');
  };

  const handleCallToggle = () => {
    setIsCallActive(!isCallActive);
    if (!isCallActive) {
      setAvatarState('speaking');
      setTimeout(() => setAvatarState('idle'), 3000);
    } else {
      setAvatarState('idle');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 relative overflow-hidden">
      {/* Neural network background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm border border-gray-600/30"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-white">AI Voice Assistant</h1>
          <button className="p-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm border border-gray-600/30">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full">
          {/* Avatar container */}
          <div className="relative flex items-center justify-center mb-8">
            {/* Holographic frame */}
            <div className="relative">
              {/* Outer glow ring */}
              <div
                ref={glowRingRef}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-blue-500/30 blur-xl scale-110"
                style={{ width: '400px', height: '400px', left: '-50px', top: '-50px' }}
              ></div>
              
              {/* Main avatar container */}
              <div
                ref={avatarRef}
                className="relative w-80 h-80 rounded-full bg-gradient-to-br from-gray-800/80 via-purple-900/40 to-blue-900/40 backdrop-blur-xl border-2 border-purple-500/50 shadow-2xl overflow-hidden"
              >
                {/* Neural grid overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-br from-transparent via-purple-500/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(147,51,234,0.1)_50%,transparent_100%)]"></div>
                </div>

                {/* Avatar face */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Face outline */}
                    <div className="w-32 h-40 bg-gradient-to-b from-purple-400/30 to-blue-400/30 rounded-full relative">
                      {/* Eyes */}
                      <div
                        ref={eyesRef}
                        className="absolute top-12 left-1/2 transform -translate-x-1/2 flex gap-4"
                      >
                        <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
                        <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
                      </div>
                      
                      {/* Mouth */}
                      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                        <div className={`w-6 h-2 rounded-full transition-all duration-300 ${
                          avatarState === 'speaking' 
                            ? 'bg-purple-400 shadow-lg shadow-purple-400/50' 
                            : 'bg-gray-500/50'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Waveform visualizer */}
                <AnimatePresence>
                  {avatarState === 'speaking' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    >
                      <div
                        ref={waveformRef}
                        className="flex items-end gap-1 h-8"
                      >
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full"
                            style={{ height: '8px' }}
                          ></div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-600/30">
              <div className={`w-2 h-2 rounded-full ${
                isCallActive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
              }`}></div>
              <span className="text-gray-300 text-sm">
                {isCallActive ? 'Connected' : 'Ready to connect'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            {/* Mic control */}
            <button
              onClick={handleMicToggle}
              className={`p-4 rounded-full transition-all duration-300 ${
                isMicOn
                  ? 'bg-green-500/20 text-green-400 border-2 border-green-500/50 shadow-lg shadow-green-500/25'
                  : 'bg-gray-800/50 text-gray-400 border-2 border-gray-600/30 hover:bg-gray-700/50'
              }`}
            >
              {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>

            {/* Call control */}
            <button
              onClick={handleCallToggle}
              className={`p-6 rounded-full transition-all duration-300 ${
                isCallActive
                  ? 'bg-red-500/20 text-red-400 border-2 border-red-500/50 shadow-lg shadow-red-500/25 hover:bg-red-500/30'
                  : 'bg-green-500/20 text-green-400 border-2 border-green-500/50 shadow-lg shadow-green-500/25 hover:bg-green-500/30'
              }`}
            >
              {isCallActive ? <PhoneOff className="w-8 h-8" /> : <Phone className="w-8 h-8" />}
            </button>

            {/* Camera control */}
            <button
              onClick={() => setIsCameraOn(!isCameraOn)}
              className={`p-4 rounded-full transition-all duration-300 ${
                isCameraOn
                  ? 'bg-blue-500/20 text-blue-400 border-2 border-blue-500/50 shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800/50 text-gray-400 border-2 border-gray-600/30 hover:bg-gray-700/50'
              }`}
            >
              {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>

            {/* Speaker control */}
            <button
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              className={`p-4 rounded-full transition-all duration-300 ${
                isSpeakerOn
                  ? 'bg-purple-500/20 text-purple-400 border-2 border-purple-500/50 shadow-lg shadow-purple-500/25'
                  : 'bg-gray-800/50 text-gray-400 border-2 border-gray-600/30 hover:bg-gray-700/50'
              }`}
            >
              {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>
          </div>

          {/* User video preview */}
          <AnimatePresence>
            {isCameraOn && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed bottom-6 right-6 w-48 h-36 bg-gray-800 rounded-lg border border-purple-500/30 overflow-hidden shadow-xl"
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Your Camera</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VoiceCallPage;