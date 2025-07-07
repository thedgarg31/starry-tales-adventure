import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Search, Clock, Star, Sparkles, Moon } from 'lucide-react';
import MascotOwl from '@/components/MascotOwl';

const stories = [
  {
    id: 1,
    title: "The Wise Crow and the Pot",
    category: "Wisdom",
    readingTime: "5 min",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400",
    description: "A clever crow uses stones to drink water from a pot.",
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "Birbal's Clever Solution",
    category: "Wisdom",
    readingTime: "7 min",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    description: "How Birbal solved the mystery of the missing ring.",
    difficulty: "Medium"
  },
  {
    id: 3,
    title: "The Golden Fish",
    category: "Magic",
    readingTime: "8 min",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400",
    description: "A fisherman finds a magical golden fish that grants wishes.",
    difficulty: "Easy"
  },
  {
    id: 4,
    title: "The Magical Banyan Tree",
    category: "Adventure",
    readingTime: "10 min",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
    description: "Children discover a tree that can transport them anywhere.",
    difficulty: "Medium"
  },
  {
    id: 5,
    title: "The Brave Little Sparrow",
    category: "Courage",
    readingTime: "6 min",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400",
    description: "A small sparrow overcomes fear to save a kitten.",
    difficulty: "Easy"
  },
  {
    id: 6,
    title: "The Monkey and the Crocodile",
    category: "Friendship",
    readingTime: "8 min",
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400",
    description: "A friendship tale between a clever monkey and a crocodile.",
    difficulty: "Medium"
  },
  {
    id: 7,
    title: "The Dancing Peacock",
    category: "Nature",
    readingTime: "5 min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    description: "A proud peacock learns about true beauty.",
    difficulty: "Easy"
  },
  {
    id: 8,
    title: "The Generous Elephant",
    category: "Kindness",
    readingTime: "7 min",
    image: "https://images.unsplash.com/photo-1439886183900-e79ec0057170?w=400",
    description: "An elephant helps all forest animals during drought.",
    difficulty: "Easy"
  },
  {
    id: 9,
    title: "The Mystery of the Talking Parrot",
    category: "Mystery",
    readingTime: "9 min",
    image: "https://images.unsplash.com/photo-1615835974426-2c0da2bf9afe?w=400",
    description: "Children solve the puzzle of a parrot's secret message.",
    difficulty: "Medium"
  },
  {
    id: 10,
    title: "The Little Train That Could",
    category: "Perseverance",
    readingTime: "8 min",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400",
    description: "A small train overcomes challenges with determination.",
    difficulty: "Easy"
  },
  {
    id: 11,
    title: "The Lion and the Mouse",
    category: "Friendship",
    readingTime: "6 min",
    image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=400",
    description: "A tiny mouse saves a mighty lion in this classic tale.",
    difficulty: "Easy"
  },
  {
    id: 12,
    title: "The Magic Carpet Adventure",
    category: "Adventure",
    readingTime: "12 min",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    description: "Two children discover a flying carpet in their attic.",
    difficulty: "Medium"
  },
  {
    id: 13,
    title: "The Helpful Ant Colony",
    category: "Teamwork",
    readingTime: "7 min",
    image: "https://images.unsplash.com/photo-1542736036-cdf4f0cbb2dd?w=400",
    description: "How teamwork helped ants save their home from flood.",
    difficulty: "Easy"
  },
  {
    id: 14,
    title: "The Rainbow Bridge",
    category: "Magic",
    readingTime: "9 min",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    description: "A magical bridge appears after every storm.",
    difficulty: "Medium"
  },
  {
    id: 15,
    title: "The Singing Nightingale",
    category: "Music",
    readingTime: "6 min",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400",
    description: "A nightingale's song brings peace to a troubled kingdom.",
    difficulty: "Easy"
  },
  {
    id: 16,
    title: "The Secret Garden",
    category: "Nature",
    readingTime: "11 min",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    description: "Children discover a hidden garden with magical plants.",
    difficulty: "Medium"
  },
  {
    id: 17,
    title: "The Wise Old Turtle",
    category: "Wisdom",
    readingTime: "8 min",
    image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400",
    description: "An ancient turtle shares wisdom with young animals.",
    difficulty: "Easy"
  },
  {
    id: 18,
    title: "The Flying Horse",
    category: "Fantasy",
    readingTime: "10 min",
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=400",
    description: "A young girl befriends a magical winged horse.",
    difficulty: "Medium"
  },
  {
    id: 19,
    title: "The Lighthouse Keeper's Tale",
    category: "Adventure",
    readingTime: "9 min",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    description: "A lighthouse keeper helps ships navigate through storms.",
    difficulty: "Medium"
  },
  {
    id: 20,
    title: "The Magic Paintbrush",
    category: "Magic",
    readingTime: "7 min",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
    description: "Everything painted with this brush comes to life!",
    difficulty: "Easy"
  }
];

const Library = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Wisdom', 'Magic', 'Adventure', 'Courage', 'Humor', 'Nature', 'Kindness', 'Mystery', 'Perseverance'];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStorySelect = (storyId: number) => {
    navigate(`/reader/${storyId}`);
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bedtime-gradient-soft opacity-30"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-pink-300/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="sm"
            className="rounded-full p-2 hover:bg-white/20 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <MascotOwl size={40} className="animate-float-gentle" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">
                Story Library
              </h1>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Choose your bedtime adventure!</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for bedtime stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 rounded-2xl border-2 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-purple-200 dark:border-purple-700 focus:border-purple-400 dark:focus:border-purple-500"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-2xl whitespace-nowrap font-medium ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700/80 border-purple-200 dark:border-purple-700'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map(story => (
            <Card 
              key={story.id}
              className="story-card hover-lift cursor-pointer group"
              onClick={() => handleStorySelect(story.id)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={`/story-${story.id}-cover.jpg`}
                    alt={story.title}
                    className="w-full h-48 object-cover rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    {story.category}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-sm">
                    <Clock className="w-3 h-3" />
                    {story.readingTime}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-3xl"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {story.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      story.difficulty === 'Easy' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {story.difficulty}
                    </span>
                    
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-16">
            <div className="relative inline-block mb-6">
              <MascotOwl size={80} animate={false} className="opacity-50" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center animate-twinkle">
                <Moon className="w-3 h-3 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-3">
              No bedtime stories found
            </h3>
            <p className="text-gray-500 dark:text-gray-500 font-medium">
              Try adjusting your search or filter options
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
