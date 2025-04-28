import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import MovieCard from '../MovieCard';

const mockTVShows = [
  {
    id: 1,
    title: "Stranger Things",
    rating: "9.2",
    year: "2016",
    genre: "Sci-Fi",
    poster: "https://source.unsplash.com/300x450/?tv",
    seasons: 4
  },
  // Add more shows as needed...
];

const TVShowGrid = ({ activeFilter, activeSortOption }) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const filteredShows = mockTVShows
      .filter(show => activeFilter === 'all' || show.genre.toLowerCase() === activeFilter)
      .sort((a, b) => {
        if (activeSortOption === 'rating') return b.rating - a.rating;
        if (activeSortOption === 'newest') return parseInt(b.year) - parseInt(a.year);
        return 0;
      });
    setShows(filteredShows);
  }, [activeFilter, activeSortOption]);

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      layout
    >
      {shows.map((show) => (
        <motion.div
          key={show.id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MovieCard movie={show} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TVShowGrid;
