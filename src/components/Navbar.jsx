import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import Logo from './Logo';
import useOnClickOutside from '../hooks/useOnClickOutside';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useOnClickOutside(searchRef, () => setSearchOpen(false));

  return (
    <motion.nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex-shrink-0 scale-90 md:scale-100">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/tv-shows">TV Shows</NavLink>
            <NavLink to="/categories">Categories</NavLink>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <motion.div
              ref={searchRef}
              className="relative"
              initial={false}
              animate={{ 
                width: searchOpen 
                  ? window.innerWidth < 640 
                    ? "calc(100vw - 160px)" 
                    : "240px" 
                  : "40px" 
              }}
            >
              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    type="text"
                    placeholder="Find movies, TV shows and more..."
                    className="w-full bg-[#1a1a1a] rounded-full py-2 pl-4 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    autoFocus
                  />
                )}
              </AnimatePresence>

              <motion.button
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
            </motion.div>

            <div className="hidden md:block">
              <Link to="/settings">
                <motion.button
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.608-.996.07-2.296-1.065-2.572-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </motion.button>
              </Link>
            </div>

            <motion.button
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[999]"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-black/95 border-b border-gray-800/50 backdrop-blur-lg">
              <Logo />
              <motion.button
                className="p-2 text-white hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-80px)] py-4 mt-[72px] bg-black/95">
              <motion.div
                className="flex flex-col gap-2 px-6"
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
              >
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Movies', path: '/movies' },
                  { name: 'TV Shows', path: '/tv-shows' },
                  { name: 'Categories', path: '/categories' },
                  { name: 'New & Popular', path: '/new' },
                  { name: 'My List', path: '/my-list' },
                  { name: 'Watch Later', path: '/watch-later' },
                  { name: 'Settings', path: '/settings' }
                ].map((item) => (
                  <motion.div
                    key={item.name}
                    variants={{
                      open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
                      closed: { x: -50, opacity: 0 }
                    }}
                  >
                    <NavLink 
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full py-4 text-lg font-medium text-white hover:text-primary transition-colors border-b border-gray-800/50"
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-gray-300 hover:text-white transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;
