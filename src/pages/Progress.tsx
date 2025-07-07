
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Star, Gem, Calendar, Flame, BookOpen, Target, Award, ShoppingCart, Sparkles, X } from 'lucide-react';

// Enhanced data structure with real integration
interface ReadingSession {
  date: string;
  duration: number;
  stories: string[];
  gemsEarned: number;
  starsEarned: number;
}

interface Trophy {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedDate?: string;
  requirement: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface GemItem {
  id: number;
  name: string;
  description: string;
  cost: number;
  icon: React.ReactNode;
  category: 'avatar' | 'background' | 'effect' | 'story';
}

const today = new Date();
const getDay = (offset: number) => {
  const d = new Date();
  d.setDate(today.getDate() - offset);
  return d;
};

// Real reading data (simulated from localStorage or API)
const getReadingData = (): ReadingSession[] => {
  const stored = localStorage.getItem('readingSessions');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Generate realistic reading data for the last 30 days
  const sessions: ReadingSession[] = [];
  const stories = ['The Little Prince', 'Alice in Wonderland', 'Peter Pan', 'Winnie the Pooh', 'The Jungle Book'];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // 70% chance of reading each day
    if (Math.random() > 0.3) {
      sessions.push({
        date: date.toISOString().split('T')[0],
        duration: Math.floor(Math.random() * 45) + 15, // 15-60 minutes
        stories: [stories[Math.floor(Math.random() * stories.length)]],
        gemsEarned: Math.floor(Math.random() * 3) + 1,
        starsEarned: Math.floor(Math.random() * 5) + 2
      });
    }
  }
  
  localStorage.setItem('readingSessions', JSON.stringify(sessions));
  return sessions;
};

// Enhanced trophies with animations and rarity
const getTrophies = (): Trophy[] => [
  {
    id: 1,
    name: '7-Day Streak',
    description: 'Read for 7 consecutive days',
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    unlocked: false,
    requirement: '7 consecutive days',
    rarity: 'common'
  },
  {
    id: 2,
    name: 'First Book',
    description: 'Complete your first story',
    icon: <BookOpen className="w-8 h-8 text-blue-500" />,
    unlocked: false,
    requirement: '1 story completed',
    rarity: 'common'
  },
  {
    id: 3,
    name: 'Gem Collector',
    description: 'Collect 50 gems',
    icon: <Gem className="w-8 h-8 text-pink-400" />,
    unlocked: false,
    requirement: '50 gems',
    rarity: 'rare'
  },
  {
    id: 4,
    name: 'Reading Master',
    description: 'Read for 30 days total',
    icon: <Award className="w-8 h-8 text-purple-500" />,
    unlocked: false,
    requirement: '30 total days',
    rarity: 'epic'
  },
  {
    id: 5,
    name: 'Speed Reader',
    description: 'Read 5 stories in one day',
    icon: <Target className="w-8 h-8 text-green-500" />,
    unlocked: false,
    requirement: '5 stories in 1 day',
    rarity: 'legendary'
  }
];

// Gem shop items
const gemShopItems: GemItem[] = [
  {
    id: 1,
    name: 'Rainbow Avatar',
    description: 'Colorful avatar frame',
    cost: 20,
    icon: <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-purple-400 rounded-full" />,
    category: 'avatar'
  },
  {
    id: 2,
    name: 'Space Background',
    description: 'Starry night background',
    cost: 35,
    icon: <div className="w-8 h-8 bg-gradient-to-b from-blue-900 to-purple-900 rounded-lg flex items-center justify-center">⭐</div>,
    category: 'background'
  },
  {
    id: 3,
    name: 'Sparkle Effect',
    description: 'Add sparkles to your profile',
    cost: 25,
    icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
    category: 'effect'
  },
  {
    id: 4,
    name: 'Premium Story',
    description: 'Unlock exclusive story',
    cost: 50,
    icon: <BookOpen className="w-8 h-8 text-purple-500" />,
    category: 'story'
  }
];

const Progress = () => {
  const [readingSessions, setReadingSessions] = useState<ReadingSession[]>([]);
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [gems, setGems] = useState(42);
  const [stars, setStars] = useState(120);
  const [showGemShop, setShowGemShop] = useState(false);
  const [showTrophyUnlock, setShowTrophyUnlock] = useState<Trophy | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<number[]>([]);

  useEffect(() => {
    const sessions = getReadingData();
    setReadingSessions(sessions);
    
    // Calculate stats and check for trophy unlocks
    const totalGems = sessions.reduce((sum, session) => sum + session.gemsEarned, 0);
    const totalStars = sessions.reduce((sum, session) => sum + session.starsEarned, 0);
    const totalDays = sessions.length;
    const consecutiveDays = calculateConsecutiveDays(sessions);
    
    setGems(totalGems);
    setStars(totalStars);
    
    // Check trophy unlocks
    const updatedTrophies = getTrophies().map(trophy => {
      let unlocked = false;
      let unlockedDate: string | undefined;
      
      switch (trophy.id) {
        case 1: // 7-Day Streak
          unlocked = consecutiveDays >= 7;
          break;
        case 2: // First Book
          unlocked = totalDays >= 1;
          break;
        case 3: // Gem Collector
          unlocked = totalGems >= 50;
          break;
        case 4: // Reading Master
          unlocked = totalDays >= 30;
          break;
        case 5: // Speed Reader
          const maxStoriesInDay = Math.max(...sessions.map(s => s.stories.length));
          unlocked = maxStoriesInDay >= 5;
          break;
      }
      
      if (unlocked && !trophy.unlocked) {
        unlockedDate = today.toISOString().split('T')[0];
        // Show trophy unlock animation
        setTimeout(() => setShowTrophyUnlock(trophy), 1000);
      }
      
      return { ...trophy, unlocked, unlockedDate };
    });
    
    setTrophies(updatedTrophies);
  }, []);

  const calculateConsecutiveDays = (sessions: ReadingSession[]): number => {
    let maxStreak = 0;
    let currentStreak = 0;
    const sortedSessions = sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    for (let i = 0; i < sortedSessions.length - 1; i++) {
      const currentDate = new Date(sortedSessions[i].date);
      const nextDate = new Date(sortedSessions[i + 1].date);
      const diffDays = Math.floor((currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    
    return maxStreak;
  };

  const purchaseItem = (item: GemItem) => {
    if (gems >= item.cost && !purchasedItems.includes(item.id)) {
      setGems(gems - item.cost);
      setPurchasedItems([...purchasedItems, item.id]);
      // Show purchase animation
      setTimeout(() => setShowGemShop(false), 1500);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600';
      case 'rare': return 'text-blue-600';
      case 'epic': return 'text-purple-600';
      case 'legendary': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  // Calendar grid for last 30 days
  const days = Array.from({ length: 30 }, (_, i) => getDay(29 - i));
  const readingDates = readingSessions.map(s => s.date);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <h1 className="text-3xl font-bold text-gradient mb-6">Your Reading Progress</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 w-full max-w-3xl">
        <Card className="story-card text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-lg">{calculateConsecutiveDays(readingSessions)}</span>
            </div>
            <div className="text-sm text-gray-600">Current Streak</div>
          </CardContent>
        </Card>
        
        <Card className="story-card text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-lg">{stars}</span>
            </div>
            <div className="text-sm text-gray-600">Total Stars</div>
          </CardContent>
        </Card>
        
        <Card className="story-card text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gem className="w-5 h-5 text-pink-500" />
              <span className="font-bold text-lg">{gems}</span>
            </div>
            <div className="text-sm text-gray-600">Total Gems</div>
          </CardContent>
        </Card>
        
        <Card className="story-card text-center cursor-pointer hover-lift" onClick={() => setShowGemShop(true)}>
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShoppingCart className="w-5 h-5 text-green-500" />
              <span className="font-bold text-lg">Shop</span>
            </div>
            <div className="text-sm text-gray-600">Buy Items</div>
          </CardContent>
        </Card>
      </div>

      <Card className="story-card w-full max-w-3xl mb-8">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-500" /> Reading Calendar
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {days.map((date, i) => {
                const dayNum = 29 - i;
                const dateStr = date.toISOString().split('T')[0];
                const isRead = readingDates.includes(dateStr);
                const isToday = i === days.length - 1;
                const session = readingSessions.find(s => s.date === dateStr);
                
                return (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border-2 transition-all duration-200 relative
                      ${isRead ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white border-pink-400' : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'}
                      ${isToday ? 'ring-2 ring-yellow-400 scale-110' : ''}
                      ${session ? 'hover:scale-110 cursor-pointer' : ''}`}
                    title={session ? `${session.stories.join(', ')} - ${session.duration}min` : ''}
                  >
                    {date.getDate()}
                    {session && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full text-xs flex items-center justify-center">
                        {session.gemsEarned}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" /> Trophies & Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trophies.map(trophy => (
                <div 
                  key={trophy.id} 
                  className={`flex flex-col items-center p-4 rounded-2xl shadow transition-all duration-300 ${
                    trophy.unlocked 
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300' 
                      : 'bg-gray-100 dark:bg-gray-800 opacity-60'
                  }`}
                >
                  <div className={`${trophy.unlocked ? 'animate-bounce' : 'grayscale'}`}>
                    {trophy.icon}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-center">{trophy.name}</div>
                  <div className={`text-xs text-center ${getRarityColor(trophy.rarity)}`}>
                    {trophy.rarity.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-500 text-center mt-1">
                    {trophy.requirement}
                  </div>
                  {trophy.unlockedDate && (
                    <div className="text-xs text-green-600 mt-1">
                      Unlocked: {new Date(trophy.unlockedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-500" /> Reading Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                <h3 className="font-bold text-gray-800 mb-2">This Week</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Read {readingSessions.filter(s => {
                    const sessionDate = new Date(s.date);
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return sessionDate >= weekAgo;
                  }).length} days</li>
                  <li>• Earned {readingSessions.filter(s => {
                    const sessionDate = new Date(s.date);
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return sessionDate >= weekAgo;
                  }).reduce((sum, s) => sum + s.gemsEarned, 0)} gems</li>
                  <li>• Total reading time: {readingSessions.filter(s => {
                    const sessionDate = new Date(s.date);
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return sessionDate >= weekAgo;
                  }).reduce((sum, s) => sum + s.duration, 0)} minutes</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl">
                <h3 className="font-bold text-gray-800 mb-2">All Time</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Total reading days: {readingSessions.length}</li>
                  <li>• Longest streak: {calculateConsecutiveDays(readingSessions)} days</li>
                  <li>• Total gems earned: {gems}</li>
                  <li>• Total stars earned: {stars}</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gem Shop Modal */}
      {showGemShop && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-2xl story-card max-h-[80vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gradient">Gem Shop</h2>
                <button onClick={() => setShowGemShop(false)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-4 flex items-center justify-center gap-2 text-lg">
                <Gem className="w-6 h-6 text-pink-500" />
                <span className="font-bold">Your Gems: {gems}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gemShopItems.map(item => (
                  <div 
                    key={item.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      purchasedItems.includes(item.id)
                        ? 'bg-green-50 border-green-300 opacity-60'
                        : gems >= item.cost
                        ? 'bg-white hover:shadow-lg border-gray-200'
                        : 'bg-gray-50 border-gray-200 opacity-50'
                    }`}
                    onClick={() => !purchasedItems.includes(item.id) && purchaseItem(item)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Gem className="w-4 h-4 text-pink-500" />
                          <span className="text-sm font-semibold">{item.cost}</span>
                          {purchasedItems.includes(item.id) && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Owned</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Trophy Unlock Animation */}
      {showTrophyUnlock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gradient mb-2">Trophy Unlocked!</h3>
            <div className="flex justify-center mb-4">
              {showTrophyUnlock.icon}
            </div>
            <p className="text-lg font-semibold text-gray-800">{showTrophyUnlock.name}</p>
            <p className="text-gray-600">{showTrophyUnlock.description}</p>
            <button 
              onClick={() => setShowTrophyUnlock(null)}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Awesome!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
