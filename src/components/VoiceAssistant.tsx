import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Sparkles, Heart, Star, Trophy, BookOpen, Map, Globe, Palette, Puzzle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VoiceAssistantProps {
  isActive: boolean;
  onToggle: () => void;
  currentPage?: string;
  currentStory?: string;
  userProgress?: any;
  onNavigate?: (path: string) => void;
}

const motivationalMessages = [
  "You're doing amazing! Keep reading and discover new worlds! 🌟",
  "Wow! You're becoming such a great reader! 📚✨",
  "Reading is like having a superpower - you can go anywhere! 🦸‍♂️",
  "You're so smart! Every word you read makes you stronger! 💪",
  "I'm so proud of you! You're learning something new every day! 🎉",
  "You're like a little explorer discovering treasure in books! 🗺️",
  "Your imagination is growing bigger with every story! 🧠✨",
  "You're building a magical library in your mind! 📖🏰"
];

const readingTips = [
  "Try reading out loud - it helps you remember the story better!",
  "Look at the pictures to understand what's happening!",
  "Take your time and enjoy every word!",
  "Ask questions about what you're reading!",
  "Imagine yourself in the story!",
  "Try to guess what will happen next!",
  "Read with expression - make the characters come alive!",
  "Take breaks if you need to - reading should be fun!"
];

const appGuidance = [
  { icon: <BookOpen className="w-5 h-5" />, text: "Visit the Library to find more amazing stories!", path: "/library" },
  { icon: <Trophy className="w-5 h-5" />, text: "Check your Progress to see your achievements!", path: "/progress" },
  { icon: <Map className="w-5 h-5" />, text: "Explore the World Map to meet famous authors!", path: "/world-map" },
  { icon: <Globe className="w-5 h-5" />, text: "Learn about different countries in the Encyclopedia!", path: "/encyclopedia" },
  { icon: <Palette className="w-5 h-5" />, text: "Create your own art in the Drawing section!", path: "/drawing" },
  { icon: <Puzzle className="w-5 h-5" />, text: "Solve fun puzzles to train your brain!", path: "/puzzle" }
];

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  isActive,
  onToggle,
  currentPage,
  currentStory,
  userProgress,
  onNavigate
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showGuidance, setShowGuidance] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechRef.current = new SpeechSynthesisUtterance();
      speechRef.current.rate = 0.8;
      speechRef.current.pitch = 1.2;
      speechRef.current.volume = 0.8;
      
      // Try to set a child-friendly voice
      const voices = speechSynthesis.getVoices();
      const childVoice = voices.find(voice => 
        voice.name.includes('female') || 
        voice.name.includes('girl') || 
        voice.name.includes('child')
      );
      if (childVoice) {
        speechRef.current.voice = childVoice;
      }
    }
  }, []);

  const speak = (text: string) => {
    if (!isMuted && speechRef.current && 'speechSynthesis' in window) {
      speechRef.current.text = text;
      setIsSpeaking(true);
      speechSynthesis.speak(speechRef.current);
      
      speechRef.current.onend = () => {
        setIsSpeaking(false);
      };
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getMotivationalMessage = () => {
    const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setCurrentMessage(message);
    speak(message);
    return message;
  };

  const getReadingTip = () => {
    const tip = readingTips[Math.floor(Math.random() * readingTips.length)];
    setCurrentMessage(tip);
    speak(tip);
    return tip;
  };

  const handleVoiceCommand = () => {
    if (!isListening) {
      setIsListening(true);
      speak("Hello! I'm your reading buddy! What would you like to do?");
      
      // Simulate voice recognition (in a real app, you'd use Web Speech API)
      setTimeout(() => {
        setIsListening(false);
        const commands = [
          "motivation",
          "reading tip", 
          "app help",
          "progress",
          "library"
        ];
        const command = commands[Math.floor(Math.random() * commands.length)];
        
        switch (command) {
          case "motivation":
            getMotivationalMessage();
            break;
          case "reading tip":
            getReadingTip();
            break;
          case "app help":
            setShowGuidance(true);
            speak("I can help you navigate the app! Here are some cool features you can explore.");
            break;
          case "progress":
            onNavigate?.('/progress');
            speak("Let's check your amazing progress!");
            break;
          case "library":
            onNavigate?.('/library');
            speak("Great idea! Let's find more stories to read!");
            break;
        }
      }, 2000);
    } else {
      setIsListening(false);
      stopSpeaking();
    }
  };

  const handleGuidanceClick = (path: string) => {
    onNavigate?.(path);
    speak("Great choice! Let's explore together!");
    setShowGuidance(false);
  };

  // Auto-motivation when reading
  useEffect(() => {
    if (isActive && currentPage && Math.random() > 0.7) {
      setTimeout(() => {
        getMotivationalMessage();
      }, 5000);
    }
  }, [currentPage, isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Main Assistant Card */}
      <Card className="story-card w-80 shadow-2xl border-2 border-purple-200">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Reading Buddy</h3>
                <p className="text-xs text-gray-600">Your magical friend</p>
              </div>
            </div>
            <Button
              onClick={onToggle}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-700"
            >
              ×
            </Button>
          </div>

          {/* Current Message */}
          {currentMessage && (
            <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">{currentMessage}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-2 mb-3">
            <Button
              onClick={handleVoiceCommand}
              className={`flex-1 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'} text-white`}
              size="sm"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isListening ? 'Listening...' : 'Talk to me!'}
            </Button>
            
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="outline"
              size="sm"
              className="border-purple-200"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Button
              onClick={getMotivationalMessage}
              variant="outline"
              size="sm"
              className="text-xs border-yellow-200 hover:bg-yellow-50"
            >
              <Star className="w-3 h-3 mr-1" />
              Motivate me!
            </Button>
            
            <Button
              onClick={getReadingTip}
              variant="outline"
              size="sm"
              className="text-xs border-blue-200 hover:bg-blue-50"
            >
              <BookOpen className="w-3 h-3 mr-1" />
              Reading tip
            </Button>
          </div>

          {/* App Guidance */}
          <div className="mb-3">
            <Button
              onClick={() => setShowGuidance(!showGuidance)}
              variant="outline"
              size="sm"
              className="w-full border-green-200 hover:bg-green-50 text-xs"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              {showGuidance ? 'Hide' : 'Show'} App Guide
            </Button>
          </div>

          {/* Guidance Panel */}
          {showGuidance && (
            <div className="space-y-2 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-sm text-gray-800 mb-2">Explore these cool features:</h4>
              {appGuidance.map((guide, index) => (
                <Button
                  key={index}
                  onClick={() => handleGuidanceClick(guide.path)}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs text-gray-700 hover:bg-white/50"
                >
                  {guide.icon}
                  <span className="ml-2">{guide.text}</span>
                </Button>
              ))}
            </div>
          )}

          {/* Progress Summary */}
          {userProgress && (
            <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-semibold text-gray-800">Your Progress</span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>📚 Stories read: {userProgress.completedStories?.length || 0}</div>
                <div>⭐ Stars earned: {userProgress.stars || 0}</div>
                <div>🔥 Current streak: {userProgress.streak || 0} days</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <Button
        onClick={handleVoiceCommand}
        className={`fixed bottom-4 right-4 w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
        }`}
      >
        {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </Button>
    </div>
  );
};

export default VoiceAssistant; 