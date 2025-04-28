import { motion } from 'framer-motion';
import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';

const TVShows = () => {
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const shows = [
    {
      id: 1,
      title: "House of the Dragon",
      rating: "8.5",
      year: "2022",
      genre: "Fantasy",
      poster: "https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
      trailerId: "DotnJ7tTA34"
    },
    {
      id: 2,
      title: "Wednesday",
      rating: "8.1",
      year: "2022",
      genre: "Fantasy",
      poster: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
      trailerId: "Di310WS8zLk"
    },
    {
      id: 3,
      title: "The Bear",
      rating: "8.7",
      year: "2023",
      genre: "Drama",
      poster: "https://image.tmdb.org/t/p/w500/6jNoFzFeOPZJG0SDGOIk9WqBdDu.jpg",
      trailerId: "x3_dh3_89Jg"
    },
    {
      id: 4,
      title: "Loki Season 2",
      rating: "8.3",
      year: "2023",
      genre: "Sci-Fi",
      poster: "https://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG702u.jpg",
      trailerId: "dug95zn-VRw"
    },
    {
      id: 5,
      title: "Gen V",
      rating: "7.9",
      year: "2023",
      genre: "Action",
      poster: "https://image.tmdb.org/t/p/w500/uuot1N5AgZ7xRCKgM71dWejRXyP.jpg",
      trailerId: "C5vZp0C5Gf0"
    },
    {
      id: 6,
      title: "Ahsoka",
      rating: "7.8",
      year: "2023",
      genre: "Sci-Fi",
      poster: "https://image.tmdb.org/t/p/w500/laCJxobHoPVaLQTKxc14Y2zV64J.jpg",
      trailerId: "J_1EXWNETiI"
    },
    {
      id: 7,
      title: "Foundation",
      rating: "8.4",
      year: "2023",
      genre: "Sci-Fi",
      poster: "https://image.tmdb.org/t/p/w500/c8uhxTKjxsZPNG5B0iTRHRf7rIY.jpg",
      trailerId: "zig0yE_kYiQ"
    },
    {
      id: 8,
      title: "One Piece",
      rating: "8.1",
      year: "2023",
      genre: "Adventure",
      poster: "https://image.tmdb.org/t/p/w500/rVX05xRKS5JhEYQFObCi4lAnZT4.jpg",
      trailerId: "Ades3pQbeh8"
    }
  ];

  const handleWatch = (show) => {
    setSelectedTrailer(show.trailerId);
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
          {shows.map((show) => (
            <MovieCard 
              key={show.id} 
              movie={show} 
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

export default TVShows;
