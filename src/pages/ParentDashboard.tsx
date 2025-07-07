import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Award, 
  Calendar,
  BarChart3,
  Users,
  Eye,
  Settings,
  Star,
  Trophy,
  Target,
  Activity,
  BookMarked,
  Heart,
  Zap,
  Moon,
  Sun,
  ChevronRight
} from 'lucide-react';
import MascotOwl from '@/components/MascotOwl';

interface Child {
  id: string;
  name: string;
  age: number;
  avatar: string;
  readingLevel: string;
  totalStories: number;
  totalTime: number;
  currentStreak: number;
  longestStreak: number;
  stars: number;
  gems: number;
  trophies: number;
  favoriteGenre: string;
  lastActive: Date;
}

interface ReadingSession {
  id: string;
  storyTitle: string;
  duration: number;
  date: Date;
  stars: number;
  comprehension: number;
}

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState<Child[]>([
    {
      id: '1',
      name: 'Emma',
      age: 8,
      avatar: '👧',
      readingLevel: 'Advanced',
      totalStories: 45,
      totalTime: 1800, // minutes
      currentStreak: 7,
      longestStreak: 15,
      stars: 230,
      gems: 85,
      trophies: 12,
      favoriteGenre: 'Adventure',
      lastActive: new Date()
    },
    {
      id: '2',
      name: 'Liam',
      age: 6,
      avatar: '👦',
      readingLevel: 'Intermediate',
      totalStories: 28,
      totalTime: 1200,
      currentStreak: 3,
      longestStreak: 8,
      stars: 145,
      gems: 52,
      trophies: 8,
      favoriteGenre: 'Magic',
      lastActive: new Date(Date.now() - 86400000) // 1 day ago
    }
  ]);

  const [selectedChild, setSelectedChild] = useState<Child | null>(children[0]);
  const [readingSessions, setReadingSessions] = useState<ReadingSession[]>([
    {
      id: '1',
      storyTitle: 'The Wise Crow and the Pot',
      duration: 15,
      date: new Date(),
      stars: 5,
      comprehension: 90
    },
    {
      id: '2',
      storyTitle: 'Birbal\'s Clever Solution',
      duration: 12,
      date: new Date(Date.now() - 86400000),
      stars: 4,
      comprehension: 85
    },
    {
      id: '3',
      storyTitle: 'The Golden Fish',
      duration: 18,
      date: new Date(Date.now() - 172800000),
      stars: 5,
      comprehension: 95
    }
  ]);

  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getReadingProgress = () => {
    if (!selectedChild) return 0;
    const weeklyGoal = 120; // 2 hours per week
    return Math.min((selectedChild.totalTime / weeklyGoal) * 100, 100);
  };

  const getWeeklyStats = () => {
    const weekSessions = readingSessions.filter(session => 
      session.date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    
    return {
      sessions: weekSessions.length,
      totalTime: weekSessions.reduce((sum, session) => sum + session.duration, 0),
      avgComprehension: weekSessions.length > 0 
        ? Math.round(weekSessions.reduce((sum, session) => sum + session.comprehension, 0) / weekSessions.length)
        : 0
    };
  };

  const weeklyStats = getWeeklyStats();

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bedtime-gradient-soft opacity-30"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-pink-300/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
              className="rounded-full p-2 hover:bg-white/20 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <MascotOwl size={40} className="animate-float-gentle" />
              <div>
                <h1 className="text-3xl font-bold text-gradient">
                  Parent Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Track your children's reading journey</p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => navigate('/profile')}
            variant="outline"
            className="rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-purple-200 dark:border-purple-700"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Child Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Select Child</h2>
          <div className="flex gap-4">
            {children.map(child => (
              <Card 
                key={child.id}
                className={`story-card cursor-pointer transition-all duration-300 ${
                  selectedChild?.id === child.id ? 'ring-2 ring-purple-500 scale-105' : ''
                }`}
                onClick={() => setSelectedChild(child)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{child.avatar}</div>
                    <div>
                      <div className="font-bold text-gray-800 dark:text-gray-200">{child.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{child.age} years old</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {selectedChild && (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="story-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Stories</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{selectedChild.totalStories}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="story-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Reading Time</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{formatTime(selectedChild.totalTime)}</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="story-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{selectedChild.currentStreak} days</p>
                    </div>
                    <Zap className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="story-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Stars Earned</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{selectedChild.stars}</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress and Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Reading Progress */}
              <Card className="story-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Weekly Reading Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {Math.round(getReadingProgress())}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${getReadingProgress()}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{weeklyStats.sessions}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatTime(weeklyStats.totalTime)}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{weeklyStats.avgComprehension}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Comprehension</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="story-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Achievements & Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">{selectedChild.trophies} Trophies</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Earned through reading</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Star className="w-6 h-6 text-purple-600" />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">{selectedChild.gems} Gems</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Collectible rewards</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <Target className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-gray-200">Level {selectedChild.readingLevel}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Reading proficiency</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reading Sessions */}
            <Card className="story-card mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Recent Reading Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {readingSessions.map(session => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl">
                      <div className="flex items-center gap-4">
                        <BookMarked className="w-8 h-8 text-purple-500" />
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">{session.storyTitle}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {session.date.toLocaleDateString()} • {session.duration} minutes
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-yellow-500">{session.stars} ⭐</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Stars</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-500">{session.comprehension}%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Comprehension</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Insights and Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="story-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Reading Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <div className="font-medium text-gray-800 dark:text-gray-200">Reading Pattern</div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedChild.name} reads best in the evening between 7-8 PM. 
                      Consider scheduling reading time during this period.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="w-5 h-5 text-green-600" />
                      <div className="font-medium text-gray-800 dark:text-gray-200">Favorite Genre</div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedChild.name} loves {selectedChild.favoriteGenre} stories. 
                      Try introducing similar themes to maintain interest.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="story-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <div className="font-medium text-gray-800 dark:text-gray-200">Next Steps</div>
                    </div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Try longer stories to build endurance</li>
                      <li>• Explore science fiction genre</li>
                      <li>• Practice reading aloud together</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="w-5 h-5 text-yellow-600" />
                      <div className="font-medium text-gray-800 dark:text-gray-200">Weekly Goal</div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Aim for 5 reading sessions this week to maintain the streak!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard; 