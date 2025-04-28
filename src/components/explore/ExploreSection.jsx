import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MovieGrid from './MovieGrid';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const ExploreSection = () => {
  const sectionRef = useRef(null);
  const { isIntersecting } = useIntersectionObserver(sectionRef);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <motion.section
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden"
      style={{ opacity, y }}
    >
      {/* Cinematic Background Effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntersecting ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{
          background: 'radial-gradient(circle at center, #E50914 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.1
        }}
      />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Unlimited Entertainment
          </h2>
          <p className="text-gray-400 text-lg">
            Discover your next favorite story
          </p>
        </motion.div>

        {/* Movie Grid */}
        <MovieGrid />
      </div>
    </motion.section>
  );
};

export default ExploreSection;
