import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div 
      className="flex items-center"
      whileHover={{ scale: 1.05 }}
    >
      <motion.h1 
        className="text-3xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-primary">Cine</span>
        <span className="text-white">Flix</span>
      </motion.h1>
    </motion.div>
  );
};

export default Logo;
