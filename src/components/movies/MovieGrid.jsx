import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard';

const MovieGrid = ({ movies, selectedGenre, sortBy, viewType }) => {
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    let result = [...movies];
    
    // Apply genre filter
    if (selectedGenre !== 'all') {
      result = result.filter(movie => 
        movie.genre.toLowerCase() === selectedGenre
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        case 'newest':
          return parseInt(b.year) - parseInt(a.year);
        default:
          return 0;
      }
    });

    setFilteredMovies(result);
  }, [movies, selectedGenre, sortBy]);

  return (
    <motion.div 
      className={`grid ${
        viewType === 'grid' 
          ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
          : 'grid-cols-1'
      } gap-6`}
      layout
    >
      {filteredMovies.map((movie) => (
        <motion.div
          key={movie.id}
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <MovieCard
            movie={movie}
            variant={viewType === 'grid' ? 'grid' : 'list'}
          />
        </motion.div>
      ))}

      {filteredMovies.length === 0 && (
        <motion.div
          className="col-span-full text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-2xl font-semibold text-gray-400">
            No movies found
          </h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your filters
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MovieGrid;
