import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, LogOut, Moon, Sun, Trophy, User, Users, Zap, Star, Sparkles, Heart, Map, Globe, Palette, Puzzle, BookOpenCheck, Mic } from 'lucide-react';
import MascotOwl from '@/components/MascotOwl';
import VoiceAssistant from '@/components/VoiceAssistant';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [stats, setStats] = useState({
    stars: 0,
    streak: 0,
    completedStories: []
  });
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('storyscape_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/auth');
    }

    const storedStats = localStorage.getItem('storyscape_stats');
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      }
  }, [navigate]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem('storyscape_user');
    localStorage.removeItem('storyscape_stats');
    navigate('/auth');
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen p-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bedtime-gradient-soft opacity-30"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-pink-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <MascotOwl size={60} className="animate-float-gentle" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gradient">
                  Starry Tales
                </h1>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Bedtime Adventures Await</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowVoiceAssistant(!showVoiceAssistant)}
                variant="outline"
                size="sm"
                className="rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-700/80"
              >
                <Mic className="w-4 h-4 mr-2" />
                Reading Buddy
              </Button>
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                variant="outline"
                size="sm"
                className="rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-700/80"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-700/80"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Welcome Card */}
          <Card className="story-card mb-8 overflow-hidden">
            <div className="absolute inset-0 bedtime-gradient opacity-10"></div>
            <CardContent className="relative p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Good evening, {user?.username}! ✨
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Ready for a magical bedtime story?
                  </p>
                </div>
                <div className="relative">
                  <MascotOwl size={80} className="animate-float-gentle" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center animate-twinkle">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Star className="w-10 h-10 mx-auto mb-3" />
                  <div className="text-3xl font-bold">{stats.stars}</div>
                  <div className="text-sm opacity-90 font-medium">Stars Earned</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Zap className="w-10 h-10 mx-auto mb-3" />
                  <div className="text-3xl font-bold">{stats.streak}</div>
                  <div className="text-sm opacity-90 font-medium">Day Streak</div>
                </div>
                
                <div className="bg-gradient-to-br from-pink-400 to-purple-400 rounded-3xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <BookOpen className="w-10 h-10 mx-auto mb-3" />
                  <div className="text-3xl font-bold">{stats.completedStories.length}</div>
                  <div className="text-sm opacity-90 font-medium">Stories Read</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Button
                  onClick={() => navigate('/library')}
                  className="btn-bedtime bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="w-6 h-6 mr-2" />
                  Start Reading
                </Button>
                
                <Button
                  onClick={() => navigate('/progress')}
                  variant="outline"
                  className="btn-bedtime py-6 text-lg font-semibold bg-white/60 dark:bg-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-600/80 shadow-lg transform transition-all duration-300 hover:scale-105 border-purple-200 dark:border-purple-700"
                >
                  <Trophy className="w-6 h-6 mr-2" />
                  Progress
                </Button>
                
                <Button
                  onClick={() => navigate('/profile')}
                  variant="outline"
                  className="btn-bedtime py-6 text-lg font-semibold bg-white/60 dark:bg-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-600/80 shadow-lg transform transition-all duration-300 hover:scale-105 border-pink-200 dark:border-pink-700"
                >
                  <User className="w-6 h-6 mr-2" />
                  Profile
                </Button>

                <Button
                  onClick={() => navigate('/discussion')}
                  variant="outline"
                  className="btn-bedtime py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <Users className="w-6 h-6 mr-2" />
                  Discussion
                </Button>
              </div>

              {/* New Feature Navigation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <Button
                  onClick={() => navigate('/parent-dashboard')}
                  className="btn-bedtime bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold text-lg shadow-lg flex flex-col items-center justify-center w-[200px] h-[80px] mx-auto"
                >
                  <span className="mb-1 flex items-center justify-center">
                    <BookOpenCheck className="w-8 h-8" />
                  </span>
                  <span>Parent Dashboard</span>
                </Button>
                <Button
                  onClick={() => navigate('/world-map')}
                  className="btn-bedtime bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg shadow-lg flex flex-col items-center justify-center w-[200px] h-[80px] mx-auto"
                >
                  <span className="mb-1 flex items-center justify-center">
                    <Map className="w-8 h-8" />
                  </span>
                  <span>World Map</span>
                </Button>
                <Button
                  onClick={() => navigate('/encyclopedia')}
                  className="btn-bedtime bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-bold text-lg shadow-lg flex flex-col items-center justify-center w-[200px] h-[80px] mx-auto"
                >
                  <span className="mb-1 flex items-center justify-center">
                    <Globe className="w-8 h-8" />
                  </span>
                  <span>Encyclopedia</span>
                </Button>
                <Button
                  onClick={() => navigate('/drawing')}
                  className="btn-bedtime bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-lg shadow-lg flex flex-col items-center justify-center w-[200px] h-[80px] mx-auto"
                >
                  <span className="mb-1 flex items-center justify-center">
                    <Palette className="w-8 h-8" />
                  </span>
                  <span>Drawing</span>
                </Button>
                <Button
                  onClick={() => navigate('/puzzle')}
                  className="btn-bedtime bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg shadow-lg flex flex-col items-center justify-center w-[200px] h-[80px] mx-auto"
                >
                  <span className="mb-1 flex items-center justify-center">
                    <Puzzle className="w-8 h-8" />
                  </span>
                  <span>Puzzle</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Daily Challenge */}
          <Card className="story-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    🌙 Tonight's Reading Challenge
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Read one story before bedtime to maintain your streak!
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 animate-twinkle">
                    🌟
                  </div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">Sweet dreams!</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Voice Assistant */}
      <VoiceAssistant
        isActive={showVoiceAssistant}
        onToggle={() => setShowVoiceAssistant(!showVoiceAssistant)}
        userProgress={stats}
        onNavigate={navigate}
      />
    </div>
  );
};

export default Index;
