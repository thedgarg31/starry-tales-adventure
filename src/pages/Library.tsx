
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Search, Clock, Star } from 'lucide-react';
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
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400",
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
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400",
    description: "Children solve the puzzle of a parrot's secret message.",
    difficulty: "Medium"
  },
  {
    id: 10,
    title: "The Little Train That Could",
    category: "Perseverance",
    readingTime: "8 min",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400",
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
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
    description: "How teamwork helped ants save their home from flood.",
    difficulty: "Easy"
  },
  {
    id: 14,
    title: "The Rainbow Bridge",
    category: "Magic",
    readingTime: "9 min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
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
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400",
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
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    description: "A lighthouse keeper helps ships navigate through storms.",
    difficulty: "Medium"
  },
  {
    id: 20,
    title: "The Magic Paintbrush",
    category: "Magic",
    readingTime: "7 min",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
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
                Story Library
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Choose your next adventure!</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full border-2 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white'
                    : 'bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700/80'
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
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => handleStorySelect(story.id)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                    {story.category}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {story.readingTime}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {story.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
          <div className="text-center py-12">
            <MascotOwl size={80} animate={false} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No stories found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search or filter options
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
