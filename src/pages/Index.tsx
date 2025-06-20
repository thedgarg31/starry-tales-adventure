
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, BookOpen, Flame, Moon, Sun, Headphones } from 'lucide-react';
import MascotOwl from '@/components/MascotOwl';

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [stars, setStars] = useState(0);
  const [streak, setStreak] = useState(0);
  const [vrMode, setVrMode] = useState(false);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('storyscape_user');
    const savedStats = localStorage.getItem('storyscape_stats');
    const savedTheme = localStorage.getItem('storyscape_theme');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      setStars(stats.stars || 0);
      setStreak(stats.streak || 0);
    }
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('storyscape_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('storyscape_theme', 'light');
    }
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleStartReading = () => {
    navigate('/library');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <MascotOwl size={80} className="mx-auto mb-4" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-2">
                StoryScape
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Your magical reading adventure awaits!</p>
            </div>
            
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey
            </Button>
            
            <button
              onClick={toggleTheme}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <MascotOwl size={50} />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                StoryScape
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome back, {user.username}!</p>
            </div>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
          >
            {isDarkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-purple-600" />}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stars}</div>
              <div className="text-sm opacity-90">Stars Earned</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-pink-400 to-rose-400 text-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Flame className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{streak}</div>
              <div className="text-sm opacity-90">Day Streak</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">25</div>
              <div className="text-sm opacity-90">Stories Available</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          <Button 
            onClick={handleStartReading}
            className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <BookOpen className="w-6 h-6 mr-2" />
            Start Reading Adventure
          </Button>
          
          <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Headphones className="w-6 h-6 text-purple-600" />
              <span className="font-medium">VR Reading Mode</span>
            </div>
            <button
              onClick={() => setVrMode(!vrMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                vrMode ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  vrMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button 
            onClick={() => navigate('/progress')}
            variant="outline" 
            className="py-6 rounded-2xl border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-900/20"
          >
            <Star className="w-5 h-5 mr-2" />
            View Progress
          </Button>
          
          <Button 
            onClick={() => navigate('/profile')}
            variant="outline"
            className="py-6 rounded-2xl border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50 dark:border-pink-800 dark:hover:bg-pink-900/20"
          >
            Customize Avatar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
