import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Parallax and blur effects
  const y = useTransform(scrollY, [0, 300], [0, 150]);
  const blur = useTransform(scrollY, [0, 200], [0, 8]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Responsive handling
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ 
        y,
        background: 'linear-gradient(145deg, #0a0a0a 0%, #141414 50%, #1a1a1a 100%)',
      }}
    >
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E50914' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content Container */}
      <div className="relative container mx-auto px-4 h-screen flex items-center">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          style={{ opacity }}
        >
          {/* Main Title Animation */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {"Welcome to".split("").map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
            <br />
            <motion.span className="text-primary">
              {"CINEFLIX".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Stream Anywhere, Anytime
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="relative px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-25"
              animate={{
                scale: [1, 1.5],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
            Start Watching
            
            {/* Ripple Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ scale: 0, opacity: 0.5 }}
              whileHover={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
              }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Bottom Gradient */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-48"
        style={{
          background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)',
          backdropFilter: `blur(${blur}px)`,
        }}
      />
    </motion.div>
  );
};

export default Hero;
