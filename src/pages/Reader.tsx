
import React, { useState, useEffect, useRef } from 'react';
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
        images: [
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600"
        ],
        narration: "Once upon a time, in a hot summer day, a thirsty crow was flying around looking for water."
      },
      {
        text: "Finally, the crow spotted a pot under a tree. He flew down quickly, hoping to find water. But when he looked inside, there was only a little bit of water at the bottom - too low for his beak to reach!",
        images: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600"
        ],
        narration: "Finally, the crow spotted a pot under a tree. He flew down quickly, hoping to find water."
      },
      {
        text: "The clever crow didn't give up. He noticed small stones scattered around the pot. 'I have an idea!' he thought. One by one, he picked up stones with his beak and dropped them into the pot.",
        images: [
          "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600",
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600",
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600"
        ],
        narration: "The clever crow didn't give up. He noticed small stones scattered around the pot."
      },
      {
        text: "As more stones fell into the pot, the water level began to rise higher and higher. Soon, the water reached the top where the crow could easily drink it. The wise crow had solved his problem with patience and cleverness!",
        images: [
          "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600",
          "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600",
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600"
        ],
        narration: "As more stones fell into the pot, the water level began to rise higher and higher."
      }
    ]
  },
  '2': {
    title: "Birbal's Clever Solution",
    pages: [
      {
        text: "Emperor Akbar had lost his precious ring in the royal garden. He was very upset and called for his wisest advisor, Birbal, to help find it.",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
          "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
        ],
        narration: "Emperor Akbar had lost his precious ring in the royal garden."
      },
      {
        text: "Birbal looked around the garden and noticed all the gardeners working. He had a clever idea to find the real thief without accusing anyone directly.",
        images: [
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600",
          "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600"
        ],
        narration: "Birbal looked around the garden and noticed all the gardeners working."
      },
      {
        text: "Birbal gathered all the gardeners and gave each one a stick of the same length. 'The thief's stick will grow by two inches overnight,' he announced. 'Bring them back tomorrow morning.'",
        images: [
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600",
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600"
        ],
        narration: "Birbal gathered all the gardeners and gave each one a stick of the same length."
      },
      {
        text: "The next morning, one gardener came with a stick that was two inches shorter! He had cut it thinking it would grow. Birbal smiled - he had found the thief through his cleverness, and the ring was recovered.",
        images: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
          "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600"
        ],
        narration: "The next morning, one gardener came with a stick that was two inches shorter!"
      }
    ]
  },
  '3': {
    title: "The Golden Fish",
    pages: [
      {
        text: "A poor fisherman went to the river every day to catch fish for his family. One day, his net felt unusually heavy. When he pulled it up, he found a beautiful golden fish!",
        images: [
          "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600"
        ],
        narration: "A poor fisherman went to the river every day to catch fish for his family."
      },
      {
        text: "The golden fish spoke in a magical voice: 'Please let me go, kind fisherman. In return, I will grant you three wishes!' The fisherman was amazed but agreed to set the fish free.",
        images: [
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600"
        ],
        narration: "The golden fish spoke in a magical voice: Please let me go, kind fisherman."
      },
      {
        text: "For his first wish, the fisherman asked for food for his hungry family. Instantly, his small hut was filled with delicious meals. His family was overjoyed!",
        images: [
          "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
          "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600"
        ],
        narration: "For his first wish, the fisherman asked for food for his hungry family."
      },
      {
        text: "The wise fisherman used his remaining wishes to help others in his village. He wished for a well of fresh water and a school for children. The golden fish granted all wishes, and the village prospered forever.",
        images: [
          "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600",
          "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600",
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600"
        ],
        narration: "The wise fisherman used his remaining wishes to help others in his village."
      }
    ]
  },
  '4': {
    title: "The Magical Banyan Tree",
    pages: [
      {
        text: "In a small village, there stood an ancient banyan tree that was said to be magical. Children often played under its shade, but they never knew its secret power.",
        images: [
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
        ],
        narration: "In a small village, there stood an ancient banyan tree that was said to be magical."
      },
      {
        text: "One day, Maya and Arjun discovered a glowing door in the tree trunk. When they touched it, the door opened to reveal a swirling portal of colors!",
        images: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600"
        ],
        narration: "One day, Maya and Arjun discovered a glowing door in the tree trunk."
      },
      {
        text: "They stepped through the portal and found themselves in a land of floating islands and rainbow bridges. Friendly cloud creatures welcomed them to this magical realm.",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600"
        ],
        narration: "They stepped through the portal and found themselves in a land of floating islands."
      },
      {
        text: "After amazing adventures, the children returned home with hearts full of wonder. They learned that magic exists everywhere - you just need to believe and look for it!",
        images: [
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
        ],
        narration: "After amazing adventures, the children returned home with hearts full of wonder."
      }
    ]
  },
  '5': {
    title: "The Brave Little Sparrow",
    pages: [
      {
        text: "In a bustling city, a little sparrow named Cheeku lived on a tall building. Unlike other sparrows, Cheeku was afraid of flying high and always stayed close to the ground.",
        images: [
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
          "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600"
        ],
        narration: "In a bustling city, a little sparrow named Cheeku lived on a tall building."
      },
      {
        text: "One day, Cheeku saw a kitten stuck on a tree branch, crying for help. All the other animals were too big or too small to help, but Cheeku realized he might be just the right size.",
        images: [
          "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600"
        ],
        narration: "One day, Cheeku saw a kitten stuck on a tree branch, crying for help."
      },
      {
        text: "Despite his fear, Cheeku took a deep breath and flew higher than he ever had before. He reached the frightened kitten and guided her safely down to the ground.",
        images: [
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600",
          "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600"
        ],
        narration: "Despite his fear, Cheeku took a deep breath and flew higher than he ever had before."
      },
      {
        text: "From that day on, Cheeku was no longer afraid of heights. He learned that being brave doesn't mean you're not scared - it means you do the right thing even when you are scared.",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600",
          "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600"
        ],
        narration: "From that day on, Cheeku was no longer afraid of heights."
      }
    ]
  },
  '6': {
    title: "The Monkey and the Crocodile",
    pages: [
      {
        text: "On a riverbank lived a clever monkey who loved eating sweet mangoes. Every day, he would swing from branch to branch, enjoying the juicy fruits high up in the trees.",
        images: [
          "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
          "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600"
        ],
        narration: "On a riverbank lived a clever monkey who loved eating sweet mangoes."
      },
      {
        text: "One day, a crocodile swam near the bank and struck up a friendship with the monkey. The kind monkey would drop mangoes into the water for his new friend to enjoy.",
        images: [
          "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600",
          "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=600",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600"
        ],
        narration: "One day, a crocodile swam near the bank and struck up a friendship with the monkey."
      },
      {
        text: "The crocodile's wife became jealous and demanded that her husband bring the monkey's heart for dinner. Reluctantly, the crocodile invited the monkey for a ride across the river.",
        images: [
          "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
          "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=600"
        ],
        narration: "The crocodile's wife became jealous and demanded that her husband bring the monkey's heart."
      },
      {
        text: "Midway across the river, the crocodile revealed his true intention. The clever monkey quickly said, 'Oh! I left my heart back in the mango tree. Let's go back and get it!' The foolish crocodile turned around, and the monkey escaped safely.",
        images: [
          "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
          "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600"
        ],
        narration: "The clever monkey quickly said, Oh! I left my heart back in the mango tree."
      }
    ]
  },
  '11': {
    title: "The Lion and the Mouse",
    pages: [
      {
        text: "In the heart of a vast jungle, a mighty lion was sleeping peacefully under the shade of a large tree. The king of the jungle was having pleasant dreams.",
        images: [
          "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
        ],
        narration: "In the heart of a vast jungle, a mighty lion was sleeping peacefully under the shade of a large tree."
      },
      {
        text: "A tiny mouse was playing nearby and accidentally ran across the lion's nose. The lion woke up with a roar and caught the little mouse in his powerful paw.",
        images: [
          "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=600",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
        ],
        narration: "A tiny mouse was playing nearby and accidentally ran across the lion's nose."
      },
      {
        text: "'Please don't eat me!' squeaked the frightened mouse. 'I'm too small to be your meal, but if you let me go, I promise to help you someday.' The lion laughed but decided to let the mouse go.",
        images: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
          "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=600",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600"
        ],
        narration: "Please don't eat me! squeaked the frightened mouse."
      },
      {
        text: "Days later, the lion was caught in a hunter's net. He roared and struggled but couldn't break free. The little mouse heard his cries and quickly gnawed through the ropes with his sharp teeth, setting the lion free.",
        images: [
          "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=600",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600"
        ],
        narration: "The little mouse heard his cries and quickly gnawed through the ropes with his sharp teeth."
      }
    ]
  },
  '12': {
    title: "The Magic Carpet Adventure",
    pages: [
      {
        text: "Aisha and Omar were exploring their grandmother's dusty attic when they found an old, beautiful carpet rolled up in the corner. Its patterns seemed to shimmer in the dim light.",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600"
        ],
        narration: "Aisha and Omar were exploring their grandmother's dusty attic when they found an old, beautiful carpet."
      },
      {
        text: "As soon as they unrolled the carpet and sat on it, it began to glow and slowly rose into the air! 'Hold on tight!' shouted Aisha as they soared out of the attic window.",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600"
        ],
        narration: "As soon as they sat on it, the carpet began to glow and slowly rose into the air!"
      },
      {
        text: "They flew over mountains capped with snow, across vast deserts with golden sand dunes, and above green forests filled with singing birds. The world looked magical from up high.",
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
        ],
        narration: "They flew over mountains, across deserts, and above green forests filled with singing birds."
      },
      {
        text: "As the sun began to set, the magic carpet gently carried them back home. They carefully rolled it up, knowing they would return for more adventures tomorrow.",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600"
        ],
        narration: "As the sun began to set, the magic carpet gently carried them back home."
      }
    ]
  },
  '20': {
    title: "The Magic Paintbrush",
    pages: [
      {
        text: "Young Priya loved to paint but her family was too poor to buy proper art supplies. She painted with mud and water on rocks, dreaming of having real paints and brushes.",
        images: [
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600"
        ],
        narration: "Young Priya loved to paint but her family was too poor to buy proper art supplies."
      },
      {
        text: "One day, an old artist saw Priya's talent and gave her a special paintbrush. 'This is magical,' he said with a wink. 'Paint with your heart, and amazing things will happen.'",
        images: [
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600"
        ],
        narration: "One day, an old artist saw Priya's talent and gave her a special paintbrush."
      },
      {
        text: "When Priya painted a bird, it fluttered off the canvas and began to sing! When she painted flowers, their sweet fragrance filled the air. Everything she painted came to life!",
        images: [
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600"
        ],
        narration: "When Priya painted a bird, it fluttered off the canvas and began to sing!"
      },
      {
        text: "Priya used her magic paintbrush to help her village. She painted wells for fresh water, fruit trees for food, and beautiful gardens for everyone to enjoy. Her kind heart made the magic even stronger.",
        images: [
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
          "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600",
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600"
        ],
        narration: "Priya used her magic paintbrush to help her village with wells, fruit trees, and beautiful gardens."
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
  },
  'precious': {
    meaning: 'Very valuable and important',
    pronunciation: 'PRESH-us',
    usage: 'The precious ring belonged to the queen.'
  },
  'cleverness': {
    meaning: 'Being smart and quick to understand',
    pronunciation: 'KLEV-er-ness',
    usage: 'His cleverness helped him solve the puzzle.'
  },
  'magical': {
    meaning: 'Having special powers like magic',
    pronunciation: 'MAJ-i-kal',
    usage: 'The magical wand could make things disappear.'
  },
  'ancient': {
    meaning: 'Very old, from long ago',
    pronunciation: 'AYN-shent',
    usage: 'The ancient tree was hundreds of years old.'
  },
  'bustling': {
    meaning: 'Very busy with lots of activity',
    pronunciation: 'BUS-ling',
    usage: 'The bustling market was full of people shopping.'
  }
};

const Reader = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const speechSynthesis = window.speechSynthesis;

  const story = storyContent[storyId as string];

  useEffect(() => {
    if (!story) {
      navigate('/library');
    }
  }, [story, navigate]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentPage]);

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
      setShowCelebration(true);
      
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
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      toast({
        title: "Audio Paused",
        description: "Story narration has been paused"
      });
    } else {
      const utterance = new SpeechSynthesisUtterance(currentPageData.narration);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes('Google') || voice.name.includes('Microsoft')) || speechSynthesis.getVoices()[0];
      
      utterance.onend = () => {
        setIsPlaying(false);
      };

      speechSynthesis.speak(utterance);
      setIsPlaying(true);
      
      toast({
        title: "Playing Audio",
        description: "Listen to the story narration"
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentPageData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev === 0 ? currentPageData.images.length - 1 : prev - 1);
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
              {/* Story Images */}
              <div className="order-2 md:order-1">
                <div className="relative">
                  <img
                    src={currentPageData.images[currentImageIndex]}
                    alt={`Page ${currentPage + 1} - Image ${currentImageIndex + 1}`}
                    className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                  />
                  
                  {currentPageData.images.length > 1 && (
                    <>
                      <Button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                        size="sm"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                        size="sm"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                        {currentPageData.images.map((_: any, index: number) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
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
