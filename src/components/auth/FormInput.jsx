import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const FormInput = ({ type, label, value, onChange, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div className="relative">
      <motion.label
        className="absolute left-4 text-gray-400 pointer-events-none"
        animate={{
          top: isFocused || value ? '0px' : '50%',
          fontSize: isFocused || value ? '12px' : '14px',
          y: isFocused || value ? '-14px' : '-50%',
        }}
      >
        {label}
      </motion.label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-gray-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-sm mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FormInput;
