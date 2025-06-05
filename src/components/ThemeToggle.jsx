import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import '../assets/styles/animation.css';

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <motion.div 
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {darkMode ? (
        <FaSun className="theme-icon" />
      ) : (
        <FaMoon className="theme-icon" />
      )}
    </motion.div>
  );
};

export default ThemeToggle;