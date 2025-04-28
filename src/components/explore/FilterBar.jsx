import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const FilterBar = ({ activeGenre, setActiveGenre, activeYear, setActiveYear, sortBy, setSortBy }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance'];
  const years = ['All', '2024', '2023', '2022', '2021', '2020'];
  const sortOptions = ['Popular', 'Latest', 'Rating', 'A-Z'];

  return (
    <motion.div 
      className="sticky top-20 z-30 bg-secondary/95 backdrop-blur-md py-4 px-4 rounded-lg shadow-lg"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mobile Filter Button */}
      <motion.button
        className="md:hidden w-full px-4 py-2 bg-gray-800 rounded-lg mb-4 flex items-center justify-between"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <span>Filters</span>
        <motion.svg
          className="w-5 h-5"
          animate={{ rotate: isFilterOpen ? 180 : 0 }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      {/* Filter Content */}
      <AnimatePresence>
        <motion.div
          className={`grid gap-6 ${isFilterOpen || 'hidden md:grid'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          {/* Genres */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400">Genre</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <motion.button
                  key={genre}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeGenre === genre.toLowerCase()
                      ? 'bg-primary text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveGenre(genre.toLowerCase())}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {genre}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Years */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400">Year</h3>
            <div className="flex flex-wrap gap-2">
              {years.map((year) => (
                <motion.button
                  key={year}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeYear === year.toLowerCase()
                      ? 'bg-primary text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveYear(year.toLowerCase())}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {year}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto px-4 py-2 bg-gray-800 rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterBar;
