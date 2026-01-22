import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api';

const INTEREST_CATEGORIES = [
    {
        name: 'Programming Languages',
        items: ['Python', 'JavaScript', 'Java', 'C++', 'TypeScript', 'Go', 'Rust', 'C#']
    },
    {
        name: 'Web Development',
        items: ['React', 'Node.js', 'HTML/CSS', 'APIs', 'Frontend', 'Backend', 'Full Stack']
    },
    {
        name: 'Data & Algorithms',
        items: ['Data Structures', 'Algorithms', 'Big O', 'Sorting', 'Searching', 'Trees', 'Graphs']
    },
    {
        name: 'Databases',
        items: ['SQL', 'MongoDB', 'PostgreSQL', 'NoSQL', 'Redis']
    },
    {
        name: 'Systems',
        items: ['Operating Systems', 'Networking', 'Linux', 'Security', 'Cloud']
    },
    {
        name: 'AI & Machine Learning',
        items: ['Machine Learning', 'Deep Learning', 'AI', 'Neural Networks', 'NLP']
    },
    {
        name: 'Career & Practice',
        items: ['Interview Prep', 'Competitive Programming', 'Project Ideas', 'Code Review']
    }
];

const InterestSelection = () => {
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(i => i !== interest));
        } else if (selectedInterests.length < 20) {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleSubmit = async () => {
        if (selectedInterests.length < 1) {
            setError('Please select at least 1 interest');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await authApi.updateInterests(selectedInterests);
            updateUser(response.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save interests');
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-full accent-bg-light flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 accent-color" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome, <span className="gradient-text">{user?.name?.split(' ')[0] || 'there'}!</span>
                    </h1>
                    <p className="text-secondary max-w-lg mx-auto">
                        Select your CS interests to personalize your learning experience.
                        BitBraniac will tailor responses based on your preferences.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-700 text-center">
                        {error}
                    </div>
                )}

                {/* Selection counter */}
                <div className="text-center mb-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-theme">
                        <Check className="w-4 h-4 accent-color" />
                        <span>{selectedInterests.length} selected</span>
                        <span className="text-muted">(max 20)</span>
                    </span>
                </div>

                {/* Interest Categories */}
                <div className="space-y-8 mb-10">
                    {INTEREST_CATEGORIES.map((category, catIndex) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: catIndex * 0.1 }}
                        >
                            <h3 className="font-semibold mb-3 text-secondary">{category.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((interest) => {
                                    const isSelected = selectedInterests.includes(interest);
                                    return (
                                        <motion.button
                                            key={interest}
                                            onClick={() => toggleInterest(interest)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isSelected
                                                    ? 'accent-bg text-white'
                                                    : 'bg-secondary border border-theme hover:border-[var(--accent)]'
                                                }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                                            {interest}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleSkip}
                        className="btn btn-ghost order-2 sm:order-1"
                    >
                        Skip for now
                    </button>
                    <motion.button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn btn-primary order-1 sm:order-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? 'Saving...' : 'Continue to Dashboard'}
                        {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default InterestSelection;
