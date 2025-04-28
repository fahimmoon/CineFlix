import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useInView } from 'react-intersection-observer';

const categories = [
  { id: "featured", label: "Featured Collections" },
  { id: "trending", label: "Most Watched" },
  { id: "hidden", label: "Hidden Gems" },
  { id: "genre", label: "Genre Picks" },
];

const mockData = [
  {
    id: 1,
    title: "The Matrix Resurrections",
    category: "featured",
    image: "https://source.unsplash.com/featured/300x450?movie",
    rating: 4.5,
    genre: "Sci-Fi",
  },
  // Add more mock items...
];

const ExclusivePicks = () => {
  const [activeCategory, setActiveCategory] = useState("featured");
  const [ref, inView] = useInView({ threshold: 0.1 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={containerRef}
      className="relative py-20 overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated Background Effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, #E50914 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, #E50914 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        style={{ opacity: 0.1 }}
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Exclusive Picks
          </h2>
          <p className="text-gray-400 text-lg">
            Hand-picked favorites just for you
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors relative ${
                activeCategory === category.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === category.id && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  layoutId="activeCategory"
                  transition={{ type: "spring", bounce: 0.3 }}
                />
              )}
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Content Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {mockData
              .filter((item) => item.category === activeCategory)
              .map((item) => (
                <motion.div
                  key={item.id}
                  className="group relative aspect-[2/3] rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  layout
                >
                  {/* Card Content */}
                  <div className="absolute inset-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 p-4 w-full">
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">{item.genre}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm">{item.rating}</span>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-4">
                          <motion.button
                            className="flex-1 bg-primary py-2 rounded-lg text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Watch Now
                          </motion.button>
                          <motion.button
                            className="p-2 bg-gray-800/80 rounded-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v14M5 12h14"
                              />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ExclusivePicks;
