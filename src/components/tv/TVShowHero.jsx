import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TVShowHero = () => {
  const [currentShow, setCurrentShow] = useState(0);
  const shows = [
    {
      title: "Stranger Things",
      description: "When a young boy vanishes, a small town uncovers a mystery.",
      image: "https://source.unsplash.com/1600x900/?sci-fi"
    },
    // Add more shows...
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentShow((prev) => (prev + 1) % shows.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        initial={{ scale: 1.2 }}
        animate={{ 
          scale: 1,
          backgroundImage: `url(${shows[currentShow].image})`
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative h-full container mx-auto px-4 flex items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-2xl">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            layoutId={`show-title-${currentShow}`}
          >
            {shows[currentShow].title}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            layoutId={`show-desc-${currentShow}`}
          >
            {shows[currentShow].description}
          </motion.p>
          <motion.div className="flex gap-4">
            <motion.button
              className="px-8 py-3 bg-primary rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ▶ Watch Now
            </motion.button>
            <motion.button
              className="px-8 py-3 bg-gray-800 rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + My List
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TVShowHero;
