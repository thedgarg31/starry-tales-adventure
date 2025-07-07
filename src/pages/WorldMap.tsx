import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X, MapPin, BookOpen, Globe, Star } from 'lucide-react';

const authors = [
  {
    id: 'mark_twain',
    name: 'Mark Twain',
    country: 'USA',
    x: 90, y: 80,
    photo: '/author-mark-twain.jpg',
    learnings: ['Humor and wit can teach important lessons.'],
    bio: 'Mark Twain was an American writer, humorist, and lecturer.',
    famousBooks: ['The Adventures of Tom Sawyer', 'Adventures of Huckleberry Finn']
  },
  {
    id: 'gabriel_marquez',
    name: 'Gabriel Garcia Marquez',
    country: 'Colombia',
    x: 60, y: 160,
    photo: '/author-gabriel-garcia-marquez.jpg',
    learnings: ['Magical realism brings stories to life.'],
    bio: 'Gabriel Garcia Marquez was a Colombian novelist and Nobel laureate.',
    famousBooks: ['One Hundred Years of Solitude', 'Love in the Time of Cholera']
  },
  {
    id: 'miguel_cervantes',
    name: 'Miguel de Cervantes',
    country: 'Spain',
    x: 130, y: 120,
    photo: '/author-miguel-de-cervantes.jpg',
    learnings: ['Imagination can change the world.'],
    bio: 'Miguel de Cervantes was a Spanish writer, best known for Don Quixote.',
    famousBooks: ['Don Quixote']
  },
  {
    id: 'victor_hugo',
    name: 'Victor Hugo',
    country: 'France',
    x: 160, y: 90,
    photo: '/author-victor-hugo.jpg',
    learnings: ['Compassion and justice are powerful themes.'],
    bio: 'Victor Hugo was a French poet, novelist, and dramatist.',
    famousBooks: ['Les Misérables', 'The Hunchback of Notre-Dame']
  },
  {
    id: 'fyodor_dostoevsky',
    name: 'Fyodor Dostoevsky',
    country: 'Russia',
    x: 250, y: 60,
    photo: '/author-fyodor-dostoevsky.jpg',
    learnings: ['Explore the depths of the human soul.'],
    bio: 'Fyodor Dostoevsky was a Russian novelist, philosopher, and journalist.',
    famousBooks: ['Crime and Punishment', 'The Brothers Karamazov']
  },
  {
    id: 'salman_rushdie',
    name: 'Salman Rushdie',
    country: 'India/UK',
    x: 270, y: 120,
    photo: '/author-salman-rushdie.jpg',
    learnings: ['Stories can challenge and inspire.'],
    bio: 'Salman Rushdie is a British-Indian novelist and essayist.',
    famousBooks: ['Midnight’s Children', 'The Satanic Verses']
  },
  {
    id: 'haruki_murakami',
    name: 'Haruki Murakami',
    country: 'Japan',
    x: 340, y: 140,
    photo: '/author-haruki-murakami.jpeg',
    learnings: ['Surrealism and reality can blend in stories.'],
    bio: 'Haruki Murakami is a Japanese writer known for his surreal fiction.',
    famousBooks: ['Norwegian Wood', 'Kafka on the Shore']
  },
  {
    id: 'ruskin_bond',
    name: 'Ruskin Bond',
    country: 'India',
    x: 220, y: 140,
    photo: '/author-ruskin-bond.jpeg',
    learnings: ['Nature is full of stories.', 'Simple joys make life beautiful.'],
    bio: 'Ruskin Bond is an Indian author known for his stories set in the hills of India.',
    famousBooks: ['The Room on the Roof', 'The Blue Umbrella']
  },
  {
    id: 'jk_rowling',
    name: 'J.K. Rowling',
    country: 'UK',
    x: 180, y: 110,
    photo: '/author-jk-rowling.jpeg',
    learnings: ['Courage and friendship can overcome anything.', 'Magic is believing in yourself.'],
    bio: 'J.K. Rowling is a British author best known for the Harry Potter series.',
    famousBooks: ['Harry Potter Series']
  }
];

const countries = [
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    animal: '🦅', // Bald Eagle
    fact: 'Dr. Seuss was from the USA! The Bald Eagle is the national bird.',
    description: 'The USA is known for its diverse culture and many famous children\'s books.',
    population: '331 million',
    capital: 'Washington, D.C.',
    authors: ['Dr. Seuss', 'Maurice Sendak', 'E.B. White'],
    x: 80, y: 70 // Spread out for new map
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    animal: '🦊', // Red Fox
    fact: 'Roald Dahl and Enid Blyton were both from the UK! The red fox is common in the UK.',
    description: 'The UK has a rich history of children\'s literature.',
    population: '67 million',
    capital: 'London',
    authors: ['Roald Dahl', 'Enid Blyton', 'J.K. Rowling'],
    x: 150, y: 90 // Spread out for new map
  },
  {
    id: 'india',
    name: 'India',
    flag: '🇮🇳',
    animal: '🐘', // Elephant
    fact: 'Ruskin Bond is a beloved children\'s author from India. The elephant is India\'s national animal.',
    description: 'India is known for its colorful festivals and stories set in nature.',
    population: '1.4 billion',
    capital: 'New Delhi',
    authors: ['Ruskin Bond', 'Rabindranath Tagore', 'R.K. Narayan'],
    x: 270, y: 120 // Spread out for new map
  },
  {
    id: 'sweden',
    name: 'Sweden',
    flag: '🇸🇪',
    animal: '🦌', // Moose
    fact: 'Astrid Lindgren, creator of Pippi Longstocking, was from Sweden. The moose is a symbol of Swedish wildlife.',
    description: 'Sweden is famous for its forests and fairy tales.',
    population: '10 million',
    capital: 'Stockholm',
    authors: ['Astrid Lindgren'],
    x: 170, y: 60 // Spread out for new map
  },
  {
    id: 'finland',
    name: 'Finland',
    flag: '🇫🇮',
    animal: '🐻', // Brown Bear
    fact: 'Tove Jansson, creator of the Moomins, was from Finland. The brown bear is Finland\'s national animal.',
    description: 'Finland is known for its lakes, forests, and magical stories.',
    population: '5.5 million',
    capital: 'Helsinki',
    authors: ['Tove Jansson'],
    x: 200, y: 50 // Spread out for new map
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    animal: '🦡', // Badger
    fact: 'Cornelia Funke is a famous German author. The badger is a common animal in German forests.',
    description: 'Germany is known for fairy tales and forests.',
    population: '83 million',
    capital: 'Berlin',
    authors: ['Cornelia Funke'],
    x: 180, y: 100 // Spread out for new map
  },
  {
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    animal: '🦊', // Fox (Kitsune)
    fact: 'Mitsumasa Anno was a Japanese illustrator. The fox (kitsune) is a magical creature in Japanese folklore.',
    description: 'Japan is known for its cherry blossoms and magical stories.',
    population: '126 million',
    capital: 'Tokyo',
    authors: ['Mitsumasa Anno'],
    x: 340, y: 140 // Spread out for new map
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    animal: '🦘', // Kangaroo
    fact: 'Mem Fox is a beloved Australian author. The kangaroo is Australia\'s most famous animal.',
    description: 'Australia is known for its unique wildlife and stories.',
    population: '25 million',
    capital: 'Canberra',
    authors: ['Mem Fox'],
    x: 320, y: 180 // Spread out for new map
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
    flag: '🇳🇬',
    animal: '🦁', // Lion
    fact: 'Nnedi Okorafor is a Nigerian-American author. The lion is a symbol of strength in Africa.',
    description: 'Nigeria is known for its vibrant culture and folktales.',
    population: '206 million',
    capital: 'Abuja',
    authors: ['Nnedi Okorafor'],
    x: 140, y: 160 // Spread out for new map
  },
  {
    id: 'chile',
    name: 'Chile',
    flag: '🇨🇱',
    animal: '🦙', // Llama
    fact: 'Gabriela Mistral was a Chilean poet. The llama is a native animal of South America.',
    description: 'Chile is known for its mountains and poetry.',
    population: '19 million',
    capital: 'Santiago',
    authors: ['Gabriela Mistral'],
    x: 60, y: 180 // Spread out for new map
  }
];

const mapWidth = 800; // px
const mapHeight = 450; // px

// Convert author x/y from SVG coordinates to percent for background image
const getPercent = (x, y) => ({
  left: `${(x / mapWidth) * 100}%`,
  top: `${(y / mapHeight) * 100}%`
});

// Set the new background image for the world map
const MAP_IMAGE = '/map-background.png';

const WorldMap = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [viewMode, setViewMode] = useState('authors');
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <h1 className="text-3xl font-bold text-gradient mb-6">World of Stories & Knowledge</h1>
      
      {/* View Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setViewMode('authors')}
          className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
            viewMode === 'authors'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Famous Authors
        </button>
        <button
          onClick={() => setViewMode('countries')}
          className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
            viewMode === 'countries'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Globe className="w-4 h-4" />
          World Countries
        </button>
      </div>

      {/* Illustrated World Map Background */}
      {/* Replace 'world-map.jpg' in /public with your own illustrated map for best results */}
      <div
        className="relative w-[350px] h-[200px] md:w-[800px] md:h-[450px] rounded-3xl shadow-2xl overflow-hidden border-4 border-blue-300 bg-blue-100"
        style={{
          backgroundImage: `url(${MAP_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Author Markers */}
        {viewMode === 'authors' && authors.map(author => (
          <div key={author.id}>
            <div
              className="absolute cursor-pointer group"
              style={{
                left: `${author.x / 400 * 100}%`,
                top: `${author.y / 200 * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedAuthor(author)}
              onMouseEnter={() => setHoveredItem(author.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img
                src={author.photo}
                alt={author.name}
                className="w-14 h-14 rounded-full border-4 border-yellow-400 shadow-lg group-hover:scale-110 transition-transform bg-white object-cover"
              />
              <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-white rounded px-2 py-1 text-xs shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                {author.name}
              </div>
            </div>
          </div>
        ))}
        {/* Country Markers (optional, can be styled similarly) */}
        {viewMode === 'countries' && countries.map(country => (
          <div key={country.id}>
            <div
              className="absolute w-16 h-16 flex flex-col items-center justify-center bg-gradient-to-r from-green-200 to-blue-200 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-110"
              style={{
                left: `${country.x / 400 * 100}%`,
                top: `${country.y / 200 * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setSelectedCountry(country)}
              onMouseEnter={() => setHoveredItem(country.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="text-3xl mb-1">{country.animal}</span>
              <span className="text-lg">{country.flag}</span>
            </div>
            {hoveredItem === country.id && (
              <div
                className="absolute bg-white rounded-lg px-3 py-2 text-xs font-semibold text-gray-800 shadow-lg whitespace-nowrap z-10"
                style={{
                  left: `${country.x / 400 * 100}%`,
                  top: `calc(${country.y / 200 * 100}% - 30px)`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div className="font-bold mb-1">{country.name}</div>
                <div>{country.fact}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm items-center justify-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐘</span>
          <span>Elephant: India</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦅</span>
          <span>Bald Eagle: USA</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦊</span>
          <span>Red Fox: UK/Japan</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦘</span>
          <span>Kangaroo: Australia</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦁</span>
          <span>Lion: Nigeria</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦌</span>
          <span>Moose: Sweden</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐻</span>
          <span>Brown Bear: Finland</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦡</span>
          <span>Badger: Germany</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦙</span>
          <span>Llama: Chile</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">🇺🇸 🇬🇧 🇮🇳 🇸🇪 🇫🇮 🇩🇪 🇯🇵 🇦🇺 🇳🇬 🇨🇱</span>
          <span>Country Flags</span>
        </div>
      </div>

      {/* Author Modal */}
      {selectedAuthor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl story-card max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gradient">{selectedAuthor.name}</h2>
                  <p className="text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedAuthor.country}
                  </p>
                </div>
                <button onClick={() => setSelectedAuthor(null)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <img src={selectedAuthor.photo} alt={selectedAuthor.name} className="w-32 h-32 object-cover rounded-full border-4 border-pink-200" />
                
                <div className="flex-1">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedAuthor.bio}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold text-purple-600 mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Famous Books
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {selectedAuthor.famousBooks.map((book, i) => (
                          <li key={i}>• {book}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-purple-600 mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Life Lessons
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {selectedAuthor.learnings.map((learning, i) => (
                          <li key={i}>• {learning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Country Modal */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl story-card max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedCountry.flag}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gradient">{selectedCountry.name}</h2>
                    <p className="text-gray-600">Capital: {selectedCountry.capital}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedCountry(null)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedCountry.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-purple-600 mb-2">Quick Facts</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Population: {selectedCountry.population}</li>
                    <li>• Fun Fact: {selectedCountry.fact}</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-purple-600 mb-2">Famous Authors</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedCountry.authors.map((author, i) => (
                      <li key={i}>• {author}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WorldMap;

