import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import MovieCard from '../MovieCard';
import useMediaQuery from '../../hooks/useMediaQuery';

const CategoryCarousel = ({ title }) => {
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleNextClick = () => {
    if (carouselRef.current) {
      const scrollAmount = isMobile ? 300 : 600;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const scrollAmount = isMobile ? -300 : -600;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="flex gap-2">
          <motion.button
            className="p-2 bg-gray-800/50 rounded-full hover:bg-primary/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevClick}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            className="p-2 bg-gray-800/50 rounded-full hover:bg-primary/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNextClick}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {/* Add your MovieCard components here */}
      </div>
    </div>
  );
};

export default CategoryCarousel;
