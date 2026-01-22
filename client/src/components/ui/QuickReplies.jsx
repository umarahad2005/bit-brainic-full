import { motion } from 'framer-motion';

const QuickReplies = ({ suggestions, onSelect }) => {
    if (!suggestions || suggestions.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mt-3"
        >
            {suggestions.map((suggestion, index) => (
                <motion.button
                    key={index}
                    onClick={() => onSelect(suggestion)}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-tertiary hover:accent-bg hover:text-white transition-colors border border-theme"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {suggestion}
                </motion.button>
            ))}
        </motion.div>
    );
};

export default QuickReplies;
