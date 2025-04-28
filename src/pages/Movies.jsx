import { motion } from 'framer-motion';
import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';

const Movies = () => {
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const movies = [
    {
      id: 1,
      title: "Avatar: The Way of Water",
      rating: "7.8",
      year: "2022",
      genre: "Sci-Fi",
      poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
      trailerId: "d9MyW72ELq0"
    },
    {
      id: 2,
      title: "Killers of the Flower Moon",
      rating: "8.4",
      year: "2023",
      genre: "Drama",
      poster: "https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
      trailerId: "EP34Yqt8q6E"
    },
    {
      id: 3,
      title: "Napoleon",
      rating: "7.5",
      year: "2023",
      genre: "History",
      poster: "https://image.tmdb.org/t/p/w500/jE5o7y9K6pZtWNNMEw3IdpHuncR.jpg",
      trailerId: "OAZWXUkx8Ww"
    },
    {
      id: 4,
      title: "Five Nights at Freddy's",
      rating: "7.5",
      year: "2023",
      genre: "Horror",
      poster: "https://image.tmdb.org/t/p/w500/A4j8S6moXtZmGx7zi4FFNrs31lZ.jpg",
      trailerId: "f-zqS2CiZqw"
    },
    {
      id: 5,
      title: "The Marvels",
      rating: "6.9",
      year: "2023",
      genre: "Action",
      poster: "https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
      trailerId: "wS_qbDztgVY"
    },
    {
      id: 6,
      title: "Blue Beetle",
      rating: "7.0",
      year: "2023",
      genre: "Action",
      poster: "https://image.tmdb.org/t/p/w500/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
      trailerId: "vS3_72Gb-bI"
    },
    {
      id: 7,
      title: "Wonka",
      rating: "7.2",
      year: "2023",
      genre: "Fantasy",
      poster: "https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
      trailerId: "otNh9bTjXWg"
    },
    {
      id: 8,
      title: "The Creator",
      rating: "7.1",
      year: "2023",
      genre: "Sci-Fi",
      poster: "https://image.tmdb.org/t/p/w500/vBZ0qvaRxqEhZwl6LWmruJqWE8Z.jpg",
      trailerId: "ex3C1-5Dhb8"
    }
  ];

  const handleWatch = (movie) => {
    setSelectedTrailer(movie.trailerId);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 space-y-12">
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onWatch={handleWatch}
            />
          ))}
        </motion.div>
      </div>
      
      <TrailerModal
        isOpen={!!selectedTrailer}
        onClose={() => setSelectedTrailer(null)}
        videoId={selectedTrailer}
      />
    </div>
  );
};

export default Movies;
