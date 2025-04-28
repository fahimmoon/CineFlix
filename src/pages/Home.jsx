import { motion } from 'framer-motion';
import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';

const Home = () => {
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const sections = {
    trending: [
      {
        id: 1,
        title: "Inception",
        rating: "8.8",
        year: "2010",
        genre: "Sci-Fi",
        poster: "https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
        trailerId: "8hP9D6kZseM" // Official Warner Bros Inception trailer
      },
      {
        id: 2,
        title: "The Dark Knight",
        rating: "9.0",
        year: "2008",
        genre: "Action",
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        trailerId: "LDG9bisJEaI" // Official Batman The Dark Knight trailer
      },
      {
        id: 3,
        title: "Interstellar",
        rating: "8.6",
        year: "2014",
        genre: "Sci-Fi",
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        trailerId: "zSWdZVtXT7E" // Official Paramount Interstellar trailer
      },
      {
        id: 4,
        title: "Pulp Fiction",
        rating: "8.9",
        year: "1994",
        genre: "Crime",
        poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        trailerId: "tGpTpVyI_OQ" // Official Pulp Fiction trailer
      },
      {
        id: 5,
        title: "The Matrix",
        rating: "8.7",
        year: "1999",
        genre: "Sci-Fi",
        poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        trailerId: "9ix7TUGVYIo" // Official Matrix 4K trailer
      },
      {
        id: 6,
        title: "Fight Club",
        rating: "8.8",
        year: "1999",
        genre: "Drama",
        poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        trailerId: "qtRKdVHc-cE" // Official Fight Club trailer
      },
      {
        id: 7,
        title: "The Shawshank Redemption",
        rating: "9.3",
        year: "1994",
        genre: "Drama",
        poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        trailerId: "NmzuHjWmXOc" // Official Shawshank trailer
      },
      {
        id: 8,
        title: "Goodfellas",
        rating: "8.7",
        year: "1990",
        genre: "Crime",
        poster: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
        trailerId: "2ilzidi_J8Q" // Official Goodfellas 4K trailer
      }
    ],
    tvShows: [
      {
        id: 101,
        title: "Breaking Bad",
        rating: "9.5",
        year: "2008",
        genre: "Drama",
        poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
        trailerId: "HhesaQXLuRY" // Official Breaking Bad Final Season trailer
      },
      {
        id: 102,
        title: "Stranger Things",
        rating: "8.7",
        year: "2016",
        genre: "Sci-Fi",
        poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        trailerId: "b9EkMc79ZSU" // Official Stranger Things 4 trailer
      },
      {
        id: 103,
        title: "Game of Thrones",
        rating: "9.3",
        year: "2011",
        genre: "Fantasy",
        poster: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
        trailerId: "KPLWWIOCOOQ" // Official Game of Thrones trailer
      },
      {
        id: 104,
        title: "The Mandalorian",
        rating: "8.8",
        year: "2019",
        genre: "Sci-Fi",
        poster: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
        trailerId: "aOC8E8z_ifw" // Official Mandalorian Season 3 trailer
      },
      {
        id: 105,
        title: "The Last of Us",
        rating: "8.8",
        year: "2023",
        genre: "Drama",
        poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
        trailerId: "uLtkt8BonwM" // Official Last of Us trailer
      },
      {
        id: 106,
        title: "Better Call Saul",
        rating: "8.9",
        year: "2015",
        genre: "Crime",
        poster: "https://image.tmdb.org/t/p/w500/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
        trailerId: "Qz3u06eXf0E" // Official Better Call Saul Final Season trailer
      },
      {
        id: 107,
        title: "The Witcher",
        rating: "8.2",
        year: "2019",
        genre: "Fantasy",
        poster: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
        trailerId: "ndl1W4ltcmg" // Official Witcher Season 2 trailer
      },
      {
        id: 108,
        title: "Peaky Blinders",
        rating: "8.8",
        year: "2013",
        genre: "Crime",
        poster: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
        trailerId: "2nsR9JvF0PY" // Official Peaky Blinders Final Season trailer
      }
    ],
    newReleases: [
      {
        id: 201,
        title: "Dune",
        rating: "8.0",
        year: "2021",
        genre: "Sci-Fi",
        poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        trailerId: "n9xhJrPXop4" // Official Dune trailer
      },
      {
        id: 202,
        title: "The Batman",
        rating: "8.0",
        year: "2022",
        genre: "Action",
        poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        trailerId: "mqqft2x_Aa4" // Official The Batman trailer
      },
      {
        id: 203,
        title: "Oppenheimer",
        rating: "8.5",
        year: "2023",
        genre: "Drama",
        poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        trailerId: "uYPbbksJxIg" // Official Oppenheimer trailer
      },
      {
        id: 204,
        title: "Barbie",
        rating: "7.5",
        year: "2023",
        genre: "Comedy",
        poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        trailerId: "pBk4NYhWNMM" // Official Barbie trailer
      },
      {
        id: 205,
        title: "Guardians of the Galaxy Vol. 3",
        rating: "8.1",
        year: "2023",
        genre: "Action",
        poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
        trailerId: "u3V5KDHRQvk" // Official Guardians 3 trailer
      },
      {
        id: 206,
        title: "Mission: Impossible - Dead Reckoning",
        rating: "7.9",
        year: "2023",
        genre: "Action",
        poster: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
        trailerId: "avz06PDqDbM" // Official MI:7 trailer
      }
    ]
  };

  const handleWatch = (movie) => {
    setSelectedTrailer(movie.trailerId);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 space-y-12">
        {Object.entries(sections).map(([sectionName, movies]) => (
          <div key={sectionName} className="space-y-4">
            <h2 className="text-2xl font-bold capitalize">
              {sectionName.split(/(?=[A-Z])/).join(' ')}
            </h2>
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
        ))}
      </div>
      
      <TrailerModal
        isOpen={!!selectedTrailer}
        onClose={() => setSelectedTrailer(null)}
        videoId={selectedTrailer}
      />
    </div>
  );
};

export default Home;
