import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import MovieCard from '../MovieCard';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const { isIntersecting: inView, ref: loadMoreRef } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false
  });

  const loadMovies = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - Replace with actual API call
      const newMovies = Array.from({ length: 12 }, (_, i) => ({
        id: (page - 1) * 12 + i + 1,
        title: `Movie ${(page - 1) * 12 + i + 1}`,
        rating: (Math.random() * 2 + 8).toFixed(1),
        year: Math.floor(Math.random() * 5 + 2020).toString(),
        genre: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'][Math.floor(Math.random() * 5)],
        poster: `https://source.unsplash.com/300x450/?movie&sig=${(page - 1) * 12 + i}`
      }));

      setMovies(prev => [...prev, ...newMovies]);
      setPage(prev => prev + 1);
      setHasMore(page < 5); // Limit to 5 pages for demo
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (movies.length === 0) {
      loadMovies();
    }
  }, []);

  // Load more when scrolled to bottom
  useEffect(() => {
    if (inView) {
      loadMovies();
    }
  }, [inView]);

  return (
    <div className="space-y-8">
      {/* Grid Layout */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        layout
      >
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index % 12 * 0.05 }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <motion.div
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* Load More Trigger */}
      <div ref={loadMoreRef} className="h-20" />
    </div>
  );
};

export default MovieGrid;
