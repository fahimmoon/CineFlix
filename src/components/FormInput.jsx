import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

const FormInput = ({ 
  label,
  error,
  ...props
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input {...props} className={`form-control ${error ? 'is-invalid' : ''}`} />
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="invalid-feedback"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInput;
