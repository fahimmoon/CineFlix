import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState(() => 
    localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.section
          className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Appearance</h2>
          <div className="flex gap-4">
            {['light', 'dark'].map((themeOption) => (
              <motion.button
                key={themeOption}
                className={`px-6 py-3 rounded-lg font-medium ${
                  theme === themeOption ? 'bg-primary text-white' : 'bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(themeOption)}
              >
                {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Settings;
