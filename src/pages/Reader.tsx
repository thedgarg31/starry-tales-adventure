
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Play, Pause, Volume2, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import MascotOwl from '@/components/MascotOwl';

const storyContent: { [key: string]: any } = {
  '1': {
    title: "The Wise Crow and the Pot",
    pages: [
      {
        text: "Once upon a time, in a hot summer day, a thirsty crow was flying around looking for water. The sun was blazing hot, and the poor crow's throat was very dry.",
        image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600",
        audioUrl: "/audio/crow-page1.mp3"
      },
      {
        text: "Finally, the crow spotted a pot under a tree. He flew down quickly, hoping to find water. But when he looked inside, there was only a little bit of water at the bottom - too low for his beak to reach!",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
        audioUrl: "/audio/crow-page2.mp3"
      },
      {
        text: "The clever crow didn't give up. He noticed small stones scattered around the pot. 'I have an idea!' he thought. One by one, he picked up stones with his beak and dropped them into the pot.",
        image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600",
        audioUrl: "/audio/crow-page3.mp3"
      },
      {
        text: "As more stones fell into the pot, the water level began to rise higher and higher. Soon, the water reached the top where the crow could easily drink it. The wise crow had solved his problem with patience and cleverness!",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600",
        audioUrl: "/audio/crow-page4.mp3"
      }
    ]
  }
};

const difficultWords: { [key: string]: any } = {
  'blazing': {
    meaning: 'Very hot and bright',
    pronunciation: 'BLAY-zing',
    usage: 'The blazing sun made everyone feel very hot.'
  },
  'scattered': {
    meaning: 'Spread out in different places',
    pronunciation: 'SKAT-erd',
    usage: 'The toys were scattered all over the room.'
  },
  'patience': {
    meaning: 'Being calm and waiting without getting upset',
    pronunciation: 'PAY-shence',
    usage: 'She showed patience while waiting for her turn.'
  }
};

const Reader = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const story = storyContent[storyId as string];

  useEffect(() => {
    if (!story) {
      navigate('/library');
    }
  }, [story, navigate]);

  if (!story) return null;

  const currentPageData = story.pages[currentPage];
  const isLastPage = currentPage === story.pages.length - 1;

  const handleWordClick = (word: string) => {
    const cleanWord = word.toLowerCase().replace(/[.,!?]/g, '');
    if (difficultWords[cleanWord]) {
      setSelectedWord(cleanWord);
    }
  };

  const handleNextPage = () => {
    if (isLastPage) {
      // Story completed
      setShowCelebration(true);
      
      // Update user stats
      const stats = JSON.parse(localStorage.getItem('storyscape_stats') || '{}');
      stats.stars = (stats.stars || 0) + 5;
      stats.completedStories = stats.completedStories || [];
      
      if (!stats.completedStories.includes(storyId)) {
        stats.completedStories.push(storyId);
      }
      
      localStorage.setItem('storyscape_stats', JSON.stringify(stats));
      
      toast({
        title: "Story Complete! 🎉",
        description: "You earned 5 stars! Well done, young reader!"
      });
      
      setTimeout(() => {
        navigate('/library');
      }, 3000);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control audio playback
    toast({
      title: isPlaying ? "Audio Paused" : "Playing Audio",
      description: isPlaying ? "Audio has been paused" : "Listen to the story narration"
    });
  };

  const renderTextWithClickableWords = (text: string) => {
    return text.split(' ').map((word, index) => {
      const cleanWord = word.toLowerCase().replace(/[.,!?]/g, '');
      const isDifficult = difficultWords[cleanWord];
      
      return (
        <span
          key={index}
          className={`${isDifficult ? 'text-purple-600 dark:text-purple-400 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 px-1 py-0.5 rounded transition-colors duration-200 font-medium' : ''}`}
          onClick={() => isDifficult && handleWordClick(cleanWord)}
        >
          {word}{' '}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/library')}
              variant="ghost"
              size="sm"
              className="rounded-full p-2 hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {story.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage + 1} of {story.pages.length}
              </p>
            </div>
          </div>
          
          <MascotOwl size={40} animate={showCelebration} />
        </div>

        {/* Story Content */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl mb-6">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Story Image */}
              <div className="order-2 md:order-1">
                <img
                  src={currentPageData.image}
                  alt={`Page ${currentPage + 1}`}
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
              
              {/* Story Text */}
              <div className="order-1 md:order-2 flex flex-col justify-center">
                <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                  {renderTextWithClickableWords(currentPageData.text)}
                </div>
                
                {/* Audio Controls */}
                <div className="flex items-center gap-4 mb-6">
                  <Button
                    onClick={toggleAudio}
                    className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-6"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'} Audio
                  </Button>
                  <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            variant="outline"
            className="rounded-full px-6 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {story.pages.map((_: any, index: number) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'bg-purple-500 scale-125'
                    : index < currentPage
                    ? 'bg-green-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <Button
            onClick={handleNextPage}
            className="rounded-full px-6 py-3 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white"
          >
            {isLastPage ? (
              <>
                Complete <Star className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Word Definition Popup */}
        {selectedWord && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md bg-white dark:bg-gray-800 border-0 shadow-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">
                  {selectedWord}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Pronunciation:</strong> {difficultWords[selectedWord].pronunciation}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Meaning:</strong> {difficultWords[selectedWord].meaning}
                </p>
                <p className="text-gray-600 dark:text-gray-400 italic mb-4">
                  <strong>Example:</strong> {difficultWords[selectedWord].usage}
                </p>
                <Button
                  onClick={() => setSelectedWord(null)}
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white rounded-full"
                >
                  Got it!
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="fixed inset-0 bg-gradient-to-br from-yellow-400/90 to-pink-400/90 flex items-center justify-center z-50">
            <div className="text-center text-white">
              <MascotOwl size={120} className="mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">🎉 Amazing Work! 🎉</h2>
              <p className="text-xl mb-2">You completed the story!</p>
              <p className="text-lg">You earned 5 stars! ⭐⭐⭐⭐⭐</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reader;
