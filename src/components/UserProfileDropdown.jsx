import { motion } from "framer-motion";
import { useState } from "react";

const UserProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10"
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent" />
      </motion.button>
      {isOpen && (
        <motion.div
          className="absolute right-0 mt-2 w-48 py-2 bg-gray-900 rounded-lg shadow-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {["Profile", "Watchlist", "Settings", "Logout"].map((item) => (
            <motion.button
              key={item}
              className="w-full px-4 py-2 text-left hover:bg-gray-800"
              whileHover={{ x: 5 }}
              onClick={() => {
                if (item === "Logout") onLogout();
                setIsOpen(false);
              }}
            >
              {item}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
