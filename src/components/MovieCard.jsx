import { motion } from 'framer-motion';

const MovieCard = ({ movie, onWatch }) => {
  return (
    <motion.div
      className="relative w-full aspect-[2/3] rounded-lg overflow-hidden cursor-pointer bg-gray-800 group"
      whileHover={{ scale: 1.05, zIndex: 1 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute bottom-0 w-full p-4">
          <h3 className="text-base md:text-lg font-bold mb-1">{movie.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              {movie.rating}
            </span>
            <span>•</span>
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.genre}</span>
          </div>
          <motion.button
            className="w-full mt-3 py-2 bg-primary rounded-lg text-sm font-semibold opacity-80 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onWatch(movie)}
          >
            Watch Trailer
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
