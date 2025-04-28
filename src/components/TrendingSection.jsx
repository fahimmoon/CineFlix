import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import MovieCard from './MovieCard';
import FeaturedBanner from './FeaturedBanner';
import FilterBar from './FilterBar';
import useMediaQuery from '../hooks/useMediaQuery';

// Mock data moved to the top
const mockTrendingMovies = [
  {
    id: 1,
    title: "Inception",
    rating: "8.8",
    year: "2010",
    duration: "2h 28min",
    genre: "Sci-Fi",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500",
  },
  {
    id: 2,
    title: "The Dark Knight",
    rating: "9.0",
    year: "2008",
    duration: "2h 32min",
    genre: "Action",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500",
  },
  {
    id: 3,
    title: "Interstellar",
    rating: "8.6",
    year: "2014",
    duration: "2h 49min",
    genre: "Adventure",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    rating: "8.9",
    year: "1994",
    duration: "2h 34min",
    genre: "Crime",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500",
  },
  {
    id: 5,
    title: "The Matrix",
    rating: "8.7",
    year: "1999",
    duration: "2h 16min",
    genre: "Sci-Fi",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500",
  },
  {
    id: 6,
    title: "Fight Club",
    rating: "8.8",
    year: "1999",
    duration: "2h 19min",
    genre: "Drama",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500",
  },
];

const TrendingSection = () => {
  // State and refs
  const [selectedMovie, setSelectedMovie] = useState(null);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);

  // Initial states
  const [activeTab, setActiveTab] = useState('movies');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const categories = {
    movies: { title: "Movies", data: mockTrendingMovies },
    tvShows: { title: "TV Shows", data: mockTrendingMovies }, // Replace with TV shows data
    series: { title: "Series", data: mockTrendingMovies }, // Replace with series data
  };

  const genres = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Horror"];
  const sortOptions = ["Popularity", "Latest", "Rating"];

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScrollEnabled) return;
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
      }
    }, 50);
    return () => clearInterval(interval);
  }, [autoScrollEnabled]);

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSortOption, setActiveSortOption] = useState('trending');

  // Filtered and sorted movies
  const filteredMovies = useMemo(() => {
    return mockTrendingMovies
      .filter(movie => activeFilter === 'all' || movie.genre.toLowerCase() === activeFilter)
      .sort((a, b) => {
        switch (activeSortOption) {
          case 'rating':
            return parseFloat(b.rating) - parseFloat(a.rating);
          case 'newest':
            return new Date(b.year) - new Date(a.year);
          default:
            return 0;
        }
      });
  }, [activeFilter, activeSortOption]);

  return (
    <section className="relative min-h-screen pb-20">
      {/* Featured Banner */}
      <FeaturedBanner movie={selectedMovie} />

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Filter Bar */}
        <FilterBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeSortOption={activeSortOption}
          setActiveSortOption={setActiveSortOption}
        />

        {/* New Layout Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Section - 8 columns on desktop */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Featured Movie */}
            <div className="aspect-[16/9] relative rounded-xl overflow-hidden group">
              {filteredMovies[0] && (
                <motion.div
                  className="relative w-full h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={filteredMovies[0].poster}
                    alt={filteredMovies[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="absolute bottom-0 p-6 w-full">
                      <h2 className="text-3xl font-bold mb-2">{filteredMovies[0].title}</h2>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span className="text-yellow-500">★ {filteredMovies[0].rating}</span>
                        <span>{filteredMovies[0].year}</span>
                        <span>{filteredMovies[0].genre}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Secondary Featured Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredMovies.slice(1, 5).map(movie => (
                <motion.div
                  key={movie.id}
                  className="aspect-[3/4] relative rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.05, zIndex: 1 }}
                >
                  <MovieCard movie={movie} variant="compact" onSelect={setSelectedMovie} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trending Now Section - 4 columns on desktop */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Trending Now</h3>
            <div className="space-y-4">
              {filteredMovies.slice(5).map(movie => (
                <motion.div
                  key={movie.id}
                  className="relative rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex gap-4 bg-gray-800/50 p-3 rounded-lg">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div className="flex flex-col justify-center">
                      <h4 className="font-semibold">{movie.title}</h4>
                      <div className="text-sm text-gray-400 space-y-1">
                        <p>{movie.year}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-500">★</span>
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden mt-8">
          <h3 className="text-xl font-semibold mb-4">Continue Watching</h3>
          <div className="relative">
            <div 
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar"
            >
              {filteredMovies.map(movie => (
                <div key={movie.id} className="snap-start shrink-0">
                  <MovieCard movie={movie} variant="compact" onSelect={setSelectedMovie} />
                </div>
              ))}
            </div>
            
            {/* Gradient Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-secondary to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-secondary to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Load More Button */}
        <motion.button
          className="w-full mt-12 py-4 bg-white/5 rounded-lg font-semibold group hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className="group-hover:text-primary transition-colors">Load More</span>
        </motion.button>
      </div>

      {/* Enhanced Movie Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-lg max-w-4xl w-full p-6 relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex gap-6 flex-col md:flex-row">
                <img src={selectedMovie.poster} alt={selectedMovie.title} className="w-full md:w-80 h-[400px] object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4">{selectedMovie.title}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-yellow-500 flex items-center gap-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {selectedMovie.rating}
                    </span>
                    <span className="text-gray-400">{selectedMovie.year}</span>
                    <span className="text-gray-400">{selectedMovie.duration}</span>
                    <span className="text-primary">{selectedMovie.genre}</span>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <motion.button
                    className="bg-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/80 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Watch Now
                  </motion.button>
                </div>
              </div>
              <motion.button
                className="absolute top-4 right-4 text-white p-2 hover:text-primary transition-colors"
                onClick={() => setSelectedMovie(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TrendingSection;
