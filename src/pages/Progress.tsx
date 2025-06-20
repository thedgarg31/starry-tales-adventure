
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Star, Trophy, Flame, BookOpen, Target, Award } from 'lucide-react';
import MascotOwl from '@/components/MascotOwl';

const Progress = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>({});
  const [badges, setBadges] = useState<any[]>([]);

  useEffect(() => {
    const savedStats = localStorage.getItem('storyscape_stats');
    if (savedStats) {
      const userStats = JSON.parse(savedStats);
      setStats(userStats);
      
      // Generate badges based on progress
      const earnedBadges = [];
      
      if (userStats.stars >= 10) {
        earnedBadges.push({ name: 'Star Collector', icon: Star, color: 'text-yellow-400' });
      }
      if (userStats.completedStories?.length >= 5) {
        earnedBadges.push({ name: 'Book Worm', icon: BookOpen, color: 'text-green-400' });
      }
      if (userStats.streak >= 7) {
        earnedBadges.push({ name: 'Week Warrior', icon: Flame, color: 'text-orange-400' });
      }
      if (userStats.completedStories?.length >= 1) {
        earnedBadges.push({ name: 'First Story', icon: Trophy, color: 'text-purple-400' });
      }
      
      setBadges(earnedBadges);
    }
  }, []);

  const challenges = [
    { name: 'Read 3 Stories', progress: Math.min(stats.completedStories?.length || 0, 3), target: 3, reward: '10 Stars' },
    { name: '7-Day Streak', progress: Math.min(stats.streak || 0, 7), target: 7, reward: 'Flame Badge' },
    { name: 'Collect 25 Stars', progress: Math.min(stats.stars || 0, 25), target: 25, reward: 'Star Master Badge' },
    { name: 'Complete All Categories', progress: 0, target: 5, reward: 'Explorer Badge' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="sm"
            className="rounded-full p-2 hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <MascotOwl size={40} />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Your Progress
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">See how amazing you're doing!</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{stats.stars || 0}</div>
              <div className="text-xs opacity-90">Total Stars</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-pink-400 to-rose-400 text-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Flame className="w-6 h-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{stats.streak || 0}</div>
              <div className="text-xs opacity-90">Day Streak</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-400 to-emerald-400 text-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{stats.completedStories?.length || 0}</div>
              <div className="text-xs opacity-90">Stories Read</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2" />
              <div className="text-xl font-bold">{badges.length}</div>
              <div className="text-xs opacity-90">Badges Earned</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Badges Section */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Your Badges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {badges.length > 0 ? (
                badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                    <badge.icon className={`w-6 h-6 ${badge.color}`} />
                    <span className="font-medium">{badge.name}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <MascotOwl size={60} animate={false} className="mx-auto mb-3 opacity-50" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Complete challenges to earn your first badge!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Challenges Section */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Active Challenges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenges.map((challenge, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{challenge.name}</h4>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {challenge.progress}/{challenge.target}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      Reward: {challenge.reward}
                    </span>
                    {challenge.progress >= challenge.target && (
                      <span className="text-xs bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
                        Complete!
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Reading Calendar */}
        <Card className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-600" />
              Reading Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 p-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const isActive = i % 7 < (stats.streak || 0) % 7;
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                    }`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Progress;
