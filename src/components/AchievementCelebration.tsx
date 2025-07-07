import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Trophy, Sparkles, Music, Volume2, VolumeX, BookOpen } from 'lucide-react';

interface AchievementCelebrationProps {
  isVisible: boolean;
  onClose: () => void;
  achievement: {
    title: string;
    description: string;
    type: 'story_complete' | 'streak' | 'trophy' | 'milestone';
    stars?: number;
    gems?: number;
  };
}

const AchievementCelebration: React.FC<AchievementCelebrationProps> = ({
  isVisible,
  onClose,
  achievement
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Achievement sounds (base64 encoded short audio clips)
  const achievementSounds = {
    story_complete: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
    streak: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
    trophy: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
  };

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      playCelebrationSound();
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const playCelebrationSound = () => {
    if (!isMuted && audioRef.current) {
      audioRef.current.src = achievementSounds[achievement.type] || achievementSounds.story_complete;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback to browser's built-in audio context
        playFallbackSound();
      });
    }
  };

  const playFallbackSound = () => {
    // Create a simple beep sound using Web Audio API
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };

  const getAchievementIcon = () => {
    switch (achievement.type) {
      case 'story_complete':
        return <BookOpen className="w-12 h-12 text-green-500" />;
      case 'streak':
        return <Star className="w-12 h-12 text-yellow-500" />;
      case 'trophy':
        return <Trophy className="w-12 h-12 text-purple-500" />;
      case 'milestone':
        return <Sparkles className="w-12 h-12 text-pink-500" />;
      default:
        return <Star className="w-12 h-12 text-blue-500" />;
    }
  };

  const getAchievementColor = () => {
    switch (achievement.type) {
      case 'story_complete':
        return 'from-green-400 to-blue-500';
      case 'streak':
        return 'from-yellow-400 to-orange-500';
      case 'trophy':
        return 'from-purple-400 to-pink-500';
      case 'milestone':
        return 'from-pink-400 to-purple-500';
      default:
        return 'from-blue-400 to-purple-500';
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} preload="auto" />
      
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            >
              {['🎉', '🎊', '⭐', '🌟', '✨', '🎈', '🎁', '🏆'][Math.floor(Math.random() * 8)]}
            </div>
          ))}
        </div>
      )}

      {/* Main celebration modal */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="story-card max-w-md w-full animate-bounce">
          <CardContent className="p-8 text-center relative">
            {/* Close button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              ×
            </Button>

            {/* Sound control */}
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="outline"
              size="sm"
              className="absolute top-4 left-4 border-purple-200"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>

            {/* Achievement icon */}
            <div className="mb-6 flex justify-center">
              <div className={`w-20 h-20 bg-gradient-to-r ${getAchievementColor()} rounded-full flex items-center justify-center shadow-lg animate-pulse`}>
                {getAchievementIcon()}
              </div>
            </div>

            {/* Achievement title */}
            <h2 className="text-2xl font-bold text-gradient mb-3">
              🎉 Achievement Unlocked! 🎉
            </h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {achievement.title}
            </h3>

            <p className="text-gray-600 mb-6">
              {achievement.description}
            </p>

            {/* Rewards */}
            {(achievement.stars || achievement.gems) && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl mb-6 border border-yellow-200">
                <h4 className="font-semibold text-gray-800 mb-2">Rewards Earned:</h4>
                <div className="flex justify-center gap-4">
                  {achievement.stars && (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="font-bold text-yellow-600">+{achievement.stars} Stars</span>
                    </div>
                  )}
                  {achievement.gems && (
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-pink-500" />
                      <span className="font-bold text-pink-600">+{achievement.gems} Gems</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Awesome! 🎉
              </Button>
              
              <Button
                onClick={() => {
                  playCelebrationSound();
                  setShowConfetti(true);
                }}
                variant="outline"
                className="border-purple-200 hover:bg-purple-50"
              >
                <Music className="w-4 h-4 mr-2" />
                Play Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AchievementCelebration; 