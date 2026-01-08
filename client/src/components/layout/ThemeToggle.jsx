import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-tertiary hover:bg-[var(--border-color)] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                    <Moon className="w-5 h-5 text-[var(--text-secondary)]" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
