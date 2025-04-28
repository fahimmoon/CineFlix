import { motion } from 'framer-motion';

const FeaturedBanner = ({ movie }) => {
  if (!movie) return null;

  return (
    <motion.div 
      className="relative h-[70vh] mb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${movie.poster})`,
        }}
      >
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.7)),
                        linear-gradient(to top, rgba(0,0,0,1), transparent)`
          }}
        />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <span className="text-primary font-semibold">Featured</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                {movie.title}
              </h1>
              <div className="flex items-center gap-4 text-sm md:text-base flex-wrap">
                <span className="flex items-center gap-1 bg-primary/20 px-3 py-1 rounded-full">
                  <span className="text-primary">★</span> {movie.rating}
                </span>
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <span className="text-primary">{movie.genre}</span>
              </div>
              <motion.button
                className="w-fit px-8 py-3 bg-primary rounded-lg font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>▶</span> Watch Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedBanner;
