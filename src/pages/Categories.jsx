import { motion } from 'framer-motion';
import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';

const Categories = () => {
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'action', name: 'Action' },
    { id: 'drama', name: 'Drama' },
    { id: 'sci-fi', name: 'Sci-Fi' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'horror', name: 'Horror' },
    { id: 'thriller', name: 'Thriller' },
    { id: 'crime', name: 'Crime' }
  ];

  const categoryContent = {
    action: [
      {
        id: 'action-1',
        title: "Mission: Impossible - Dead Reckoning",
        rating: "7.9",
        year: "2023",
        genre: "Action",
        poster: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
        trailerId: "avz06PDqDbM"
      },
      {
        id: 'action-2',
        title: "The Marvels",
        rating: "6.9",
        year: "2023",
        genre: "Action",
        poster: "https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
        trailerId: "wS_qbDztgVY"
      },
      {
        id: 'action-3',
        title: "Blue Beetle",
        rating: "7.0",
        year: "2023",
        genre: "Action",
        poster: "https://image.tmdb.org/t/p/w500/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
        trailerId: "vS3_72Gb-bI"
      }
    ],
    sciFi: [
      {
        id: 'scifi-1',
        title: "Dune",
        rating: "8.0",
        year: "2021",
        genre: "Sci-Fi",
        poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        trailerId: "8g18jFHCLXk"
      },
      {
        id: 'scifi-2',
        title: "The Creator",
        rating: "7.1",
        year: "2023",
        genre: "Sci-Fi",
        poster: "https://image.tmdb.org/t/p/w500/vBZ0qvaRxqEhZwl6LWmruJqWE8Z.jpg",
        trailerId: "ex3C1-5Dhb8"
      },
      {
        id: 'scifi-3',
        title: "Loki Season 2",
        rating: "8.3",
        year: "2023",
        genre: "Sci-Fi",
        poster: "https://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG702u.jpg",
        trailerId: "dug95zn-VRw"
      }
    ],
    drama: [
      {
        id: 'drama-1',
        title: "Killers of the Flower Moon",
        rating: "8.4",
        year: "2023",
        genre: "Drama",
        poster: "https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
        trailerId: "EP34Yqt8q6E"
      },
      {
        id: 'drama-2',
        title: "Oppenheimer",
        rating: "8.5",
        year: "2023",
        genre: "Drama",
        poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        trailerId: "uYPbbksJxIg"
      }
    ],
    horror: [
      {
        id: 'horror-1',
        title: "Five Nights at Freddy's",
        rating: "7.5",
        year: "2023",
        genre: "Horror",
        poster: "https://image.tmdb.org/t/p/w500/A4j8S6moXtZmGx7zi4FFNrs31lZ.jpg",
        trailerId: "f-zqS2CiZqw"
      },
      {
        id: 'horror-2',
        title: "Saw X",
        rating: "7.4",
        year: "2023",
        genre: "Horror",
        poster: "https://image.tmdb.org/t/p/w500/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
        trailerId: "r7qovpFAGrw"
      }
    ],
    fantasy: [
      {
        id: 'fantasy-1',
        title: "Wonka",
        rating: "7.2",
        year: "2023",
        genre: "Fantasy",
        poster: "https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
        trailerId: "otNh9bTjXWg"
      },
      {
        id: 'fantasy-2',
        title: "The House of the Dragon",
        rating: "8.5",
        year: "2022",
        genre: "Fantasy",
        poster: "https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
        trailerId: "DotnJ7tTA34"
      }
    ],
    crime: [
      {
        id: 'crime-1',
        title: "Better Call Saul",
        rating: "8.9",
        year: "2015",
        genre: "Crime",
        poster: "https://image.tmdb.org/t/p/w500/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
        trailerId: "Qz3u06eXf0E"
      },
      {
        id: 'crime-2',
        title: "Peaky Blinders",
        rating: "8.8",
        year: "2013",
        genre: "Crime",
        poster: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
        trailerId: "2nsR9JvF0PY"
      }
    ]
  };

  const handleWatch = (content) => {
    setSelectedTrailer(content.trailerId);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 space-y-8">
        <h1 className="text-4xl font-bold mb-8">Browse Categories</h1>
        
        {/* Category Pills */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          <motion.button
            key="all"
            className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap
              ${selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'}`}
            onClick={() => setSelectedCategory('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Categories
          </motion.button>
          {categories.map(category => (
            <motion.button
              key={category.id}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap
                ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-800 text-gray-400'}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Content Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {Object.entries(categoryContent).map(([category, content]) => {
            if (selectedCategory === 'all' || selectedCategory === category) {
              return content.map((item) => (
                <MovieCard 
                  key={item.id} 
                  movie={item} 
                  onWatch={handleWatch}
                />
              ));
            }
            return null;
          })}
        </motion.div>
      </div>

      <TrailerModal
        isOpen={!!selectedTrailer}
        onClose={() => setSelectedTrailer(null)}
        videoId={selectedTrailer}
      />
    </div>
  );
};

export default Categories;
