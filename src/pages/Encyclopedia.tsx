import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

const countries = [
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    fact: 'Dr. Seuss, a famous children’s author, was from the USA!',
    description: 'The USA is known for its diverse culture and many famous children’s books.'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    fact: 'Roald Dahl and Enid Blyton were both from the UK!',
    description: 'The UK has a rich history of children’s literature.'
  },
  {
    id: 'india',
    name: 'India',
    flag: '🇮🇳',
    fact: 'Ruskin Bond is a beloved children’s author from India.',
    description: 'India is known for its colorful festivals and stories set in nature.'
  },
  {
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    fact: 'Japan is famous for its picture books and manga for kids.',
    description: 'Japanese children’s stories often feature animals and magical adventures.'
  },
  // New countries below
  {
    id: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    fact: 'Brazil is home to the Amazon rainforest, the largest in the world!',
    description: 'Brazil is famous for its carnivals, football, and vibrant culture.'
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    fact: 'Australia is known for kangaroos and the Great Barrier Reef.',
    description: 'Australia is a land of unique wildlife and beautiful beaches.'
  },
  {
    id: 'egypt',
    name: 'Egypt',
    flag: '🇪🇬',
    fact: 'Egypt is famous for its ancient pyramids and the Sphinx.',
    description: 'Egypt has a rich history with pharaohs, pyramids, and the Nile River.'
  },
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    fact: 'France is known for the Eiffel Tower and delicious pastries.',
    description: 'France is famous for its art, fashion, and literature.'
  },
  {
    id: 'south_africa',
    name: 'South Africa',
    flag: '🇿🇦',
    fact: 'South Africa is called the "Rainbow Nation" for its diversity.',
    description: 'South Africa is known for its wildlife, safaris, and beautiful landscapes.'
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    fact: 'Canada has the longest coastline in the world!',
    description: 'Canada is famous for its maple syrup, mountains, and friendly people.'
  },
  {
    id: 'china',
    name: 'China',
    flag: '🇨🇳',
    fact: 'China is home to the Great Wall, the longest wall in the world.',
    description: 'China has a long history, pandas, and delicious food.'
  },
  {
    id: 'mexico',
    name: 'Mexico',
    flag: '🇲🇽',
    fact: 'Mexico is known for its ancient Mayan and Aztec ruins.',
    description: 'Mexico is famous for its food, music, and colorful festivals.'
  }
];

const Encyclopedia = () => {
  const [selectedCountry, setSelectedCountry] = useState(null as typeof countries[0] | null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-yellow-50">
      <h1 className="text-3xl font-bold text-gradient mb-4">Kids’ World Encyclopedia</h1>
      {/* Featured Educational Image */}
      <div className="mb-8 w-full flex justify-center">
        <img
          src="/encyclopedia-header.png"
          alt="Encyclopedia Header"
          className="rounded-3xl shadow-xl border-4 border-yellow-200 max-w-2xl w-full object-contain"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {countries.map(country => (
          <Card key={country.id} className="story-card cursor-pointer hover-lift bg-white/90 hover:bg-yellow-100 transition">
            <CardContent className="p-6 flex flex-col items-center">
              <span className="text-5xl mb-2">{country.flag}</span>
              <div className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-1">{country.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 text-center">{country.fact}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedCountry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md story-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gradient">{selectedCountry.name}</h2>
                <button onClick={() => setSelectedCountry(null)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-6xl mb-4 text-center">{selectedCountry.flag}</div>
              <p className="text-gray-700 dark:text-gray-300 mb-3 text-center">{selectedCountry.description}</p>
              <div className="mb-2">
                <h3 className="font-bold text-purple-600 mb-1">Fun Fact:</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedCountry.fact}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Encyclopedia; 