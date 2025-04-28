import { motion } from 'framer-motion';
import { useRef } from 'react';

const mockProgress = [
  {
    id: 1,
    title: "Breaking Bad",
    episode: "S04E07",
    progress: 65,
    thumbnail: "https://source.unsplash.com/300x200/?breaking-bad"
  },
  // Add more shows...
];

const ContinueWatching = () => {
  const containerRef = useRef(null);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Continue Watching</h2>
      <div 
        ref={containerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-4"
      >
        {mockProgress.map((item) => (
          <motion.div
            key={item.id}
            className="flex-none w-72 bg-gray-800 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative h-40">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.episode}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="h-1 bg-gray-700 rounded">
                <motion.div
                  className="h-full bg-primary rounded"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;
