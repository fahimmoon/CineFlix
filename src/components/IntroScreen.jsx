import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const IntroScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true);
  const letters = "CINEFLIX".split("");
  
  // Add sound effect
  useEffect(() => {
    const audio = new Audio('/whoosh.mp3'); // You'll need to add this sound file
    audio.play().catch(() => {}); // Silent catch for browsers that block autoplay
    setTimeout(() => {
      setShow(false);
      onComplete();
    }, 6000); // Extended duration for new animations
  }, [onComplete]);

  if (!show) return null;

  const colors = [
    "#E50914", // Netflix Red
    "#00FF00", // Neon Green
    "#0099FF", // Bright Blue
    "#FF00FF", // Magenta
    "#FFD700", // Gold
    "#00FFFF", // Cyan
  ];

  return (
    <motion.div
      className="fixed inset-0 flex flex-col justify-center items-center bg-black z-[9999] overflow-hidden perspective-1000"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 5 }}
    >
      {/* Animated Lines - Responsive sizing */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors[i % colors.length]}, transparent)`,
            width: `${Math.min(Math.random() * 200 + 100, window.innerWidth * 0.8)}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            rotate: Math.random() * 360
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5],
            x: ['-100%', '100%'],
            rotate: [Math.random() * 360, Math.random() * 720]
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.1,
            repeat: 2,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}

      {/* 3D Rotating Ring - Responsive sizing */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] md:w-96 md:h-96 border-2 border-primary rounded-full"
        initial={{ scale: 0, rotateX: 0, rotateY: 0 }}
        animate={{
          scale: [0, 1.5, 1],
          rotateX: [0, 180, 360],
          rotateY: [0, 180, 360],
          opacity: [0, 0.5, 0]
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      />

      {/* Main Logo Container with Enhanced 3D */}
      <motion.div
        className="relative transform-style-3d px-4"
        initial={{ rotateX: -90, z: -1000 }}
        animate={{ rotateX: 0, z: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        {/* Letters with Responsive Text Size */}
        <div className="flex text-4xl sm:text-6xl md:text-8xl font-netflix font-bold tracking-wider">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="mx-1 text-primary relative inline-block"
              initial={{ 
                opacity: 0,
                y: -100,
                rotateX: -180,
                filter: "blur(20px)"
              }}
              animate={{ 
                opacity: [0, 1, 1],
                y: [-100, 0, 0],
                rotateX: [-180, 0, 0],
                filter: ["blur(20px)", "blur(0px)", "blur(0px)"],
                textShadow: [
                  "0 0 0 #E50914",
                  "0 0 30px #E50914",
                  "0 0 0 #E50914"
                ]
              }}
              transition={{ 
                duration: 1,
                delay: 1.5 + (index * 0.15),
                times: [0, 0.8, 1],
                ease: "easeOut"
              }}
              whileHover={{
                scale: 1.2,
                rotateY: 180,
                transition: { duration: 0.3 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Enhanced Light Burst Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 3, 6],
            opacity: [1, 0.5, 0],
            background: [
              "radial-gradient(circle, rgba(229,9,20,0.8) 0%, transparent 50%)",
              "radial-gradient(circle, rgba(229,9,20,0.4) 0%, transparent 80%)",
              "radial-gradient(circle, rgba(229,9,20,0) 0%, transparent 100%)"
            ]
          }}
          transition={{ duration: 2, delay: 4 }}
        />

        {/* Final Flash with Color Transition */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            background: [
              "transparent",
              "rgba(229,9,20,0.8)",
              "transparent"
            ]
          }}
          transition={{ 
            duration: 1,
            delay: 5,
            times: [0, 0.5, 1]
          }}
        />

        {/* New Plasma Effect */}
        <motion.div
          className="absolute inset-0 mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            background: [
              "radial-gradient(circle at 30% 40%, #E50914, transparent 50%)",
              "radial-gradient(circle at 70% 60%, #E50914, transparent 50%)",
              "radial-gradient(circle at 50% 50%, #E50914, transparent 50%)"
            ]
          }}
          transition={{ duration: 3, delay: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Enhanced Light Effects */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.3, 0],
          background: colors.map(color => `linear-gradient(45deg, transparent, ${color}, transparent)`),
        }}
        transition={{
          duration: 3,
          delay: 2,
          repeat: 2,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

export default IntroScreen;
