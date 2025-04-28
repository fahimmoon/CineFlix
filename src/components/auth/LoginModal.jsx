import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import FormInput from './FormInput';
import AuthBackground from './AuthBackground';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        await login(formData);
        onClose();
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AuthBackground />
      
      {/* Modal */}
      <motion.div
        className="bg-gray-900/95 backdrop-blur-xl rounded-2xl w-full max-w-md p-8 relative overflow-hidden border border-gray-800"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Close Button */}
        <motion.button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Header */}
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <FormInput
              type="text"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              name="name"
            />
          )}

          <FormInput
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            name="email"
          />

          <FormInput
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            name="password"
          />

          {errors.submit && (
            <motion.p
              className="text-red-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errors.submit}
            </motion.p>
          )}

          <motion.button
            className="w-full bg-primary py-3 rounded-lg font-semibold disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : isLogin ? 'Sign In' : 'Sign Up'}
          </motion.button>
        </form>

        {/* Toggle Form Type */}
        <motion.p className="mt-6 text-center text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <motion.button
            className="text-primary font-semibold hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
              setFormData({ email: '', password: '', name: '' });
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </motion.button>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
