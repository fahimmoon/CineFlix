import { motion } from 'framer-motion';

const AuthBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0 bg-black"
        animate={{
          background: [
            'linear-gradient(45deg, #0a0a0a 0%, #1a1a1a 100%)',
            'linear-gradient(45deg, #1a0f0f 0%, #0a0a0a 100%)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Fog Effect */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          filter: ['blur(50px)', 'blur(60px)', 'blur(50px)'],
          background: [
            'radial-gradient(circle at 30% 40%, rgba(229,9,20,0.1), transparent 70%)',
            'radial-gradient(circle at 70% 60%, rgba(229,9,20,0.1), transparent 70%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
      />
    </div>
  );
};

export default AuthBackground;
