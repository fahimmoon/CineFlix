import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const MovieHero = ({ movies }) => {
  const [currentMovie, setCurrentMovie] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [movies.length]);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movies[currentMovie].backdrop})` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <motion.div 
              className="max-w-2xl"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                {movies[currentMovie].title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  {movies[currentMovie].rating}
                </span>
                <span>{movies[currentMovie].year}</span>
                <span className="px-3 py-1 bg-gray-800 rounded-full">
                  {movies[currentMovie].genre}
                </span>
              </div>
              <div className="flex gap-4">
                <motion.button
                  className="px-8 py-3 bg-primary rounded-lg font-semibold flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>▶</span> Watch Now
                </motion.button>
                <motion.button
                  className="px-8 py-3 bg-gray-800 rounded-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  + Watchlist
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Movie Indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {movies.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentMovie ? 'bg-primary' : 'bg-gray-600'
            }`}
            onClick={() => setCurrentMovie(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieHero;
