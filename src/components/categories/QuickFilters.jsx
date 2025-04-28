import { motion } from 'framer-motion';

const filters = [
  { id: 'all', label: 'All Categories' },
  { id: 'trending', label: 'Trending Now' },
  { id: 'popular', label: 'Most Popular' },
  { id: 'new', label: 'Recently Added' },
];

const QuickFilters = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          className={`px-6 py-2 rounded-full text-sm font-medium ${
            activeFilter === filter.id
              ? 'bg-primary text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => setActiveFilter(filter.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
};

export default QuickFilters;
