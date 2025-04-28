import { motion, AnimatePresence } from 'framer-motion';

const CategoryHero = ({ selectedCategory }) => {
  return (
    <div className="relative h-[50vh] overflow-hidden">
      <AnimatePresence mode="wait">
        {selectedCategory ? (
          <motion.div
            key={selectedCategory.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedCategory.image})` }}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </motion.div>
        ) : (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </AnimatePresence>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <motion.div
          layout
          className="max-w-2xl"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            layout
          >
            {selectedCategory ? selectedCategory.name : 'Browse Categories'}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            layout
          >
            {selectedCategory 
              ? `Explore ${selectedCategory.count} titles in ${selectedCategory.name}`
              : 'Discover new stories across different genres'}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryHero;
