import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, LogOut, Moon, Sun, Trophy, User, Users, Zap, Star } from 'lucide-react';
import MascotOwl from '@/components/MascotOwl';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <MascotOwl size={60} className="animate-bounce-gentle" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  StoryScape
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Magical Reading Adventures</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsDarkMode(!isDarkMode)}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Welcome Card */}
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-2xl mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20"></div>
            <CardContent className="relative p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    Welcome back, {user?.username}! 🌟
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Ready for your next magical adventure?
                  </p>
                </div>
                <MascotOwl size={80} className="animate-float" />
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 text-white text-center">
                  <Star className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.stars}</div>
                  <div className="text-sm opacity-90">Stars Earned</div>
                </div>
                
                <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl p-4 text-white text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.streak}</div>
                  <div className="text-sm opacity-90">Day Streak</div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-4 text-white text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stats.completedStories.length}</div>
                  <div className="text-sm opacity-90">Stories Read</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  onClick={() => navigate('/library')}
                  className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white rounded-2xl py-6 text-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  <BookOpen className="w-6 h-6 mr-2" />
                  Start Reading
                </Button>
                
                <Button
                  onClick={() => navigate('/progress')}
                  variant="outline"
                  className="rounded-2xl py-6 text-lg font-semibold bg-white/60 dark:bg-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-600/80 shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  <Trophy className="w-6 h-6 mr-2" />
                  Progress
                </Button>
                
                <Button
                  onClick={() => navigate('/profile')}
                  variant="outline"
                  className="rounded-2xl py-6 text-lg font-semibold bg-white/60 dark:bg-gray-700/60 hover:bg-white/80 dark:hover:bg-gray-600/80 shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  <User className="w-6 h-6 mr-2" />
                  Profile
                </Button>

                <Button
                  onClick={() => navigate('/discussion')}
                  variant="outline"
                  className="rounded-2xl py-6 text-lg font-semibold bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-500 hover:to-purple-500 shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  <Users className="w-6 h-6 mr-2" />
                  Discussion
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Daily Challenge */}
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    📚 Daily Reading Challenge
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Read one story today to maintain your streak!
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    🎯
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Keep it up!</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
