
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
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
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
    title: "Tenali Rama and the Cat",
    category: "Humor",
    readingTime: "6 min",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400",
    description: "Tenali Rama outsmarts the king with his wit.",
    difficulty: "Medium"
  },
  {
    id: 5,
    title: "The Magical Banyan Tree",
    category: "Adventure",
    readingTime: "10 min",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
    description: "Children discover a tree that can transport them anywhere.",
    difficulty: "Medium"
  }
];

const Library = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Wisdom', 'Magic', 'Humor', 'Adventure', 'Friendship'];

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
