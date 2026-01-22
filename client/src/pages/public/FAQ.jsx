import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, MessageCircle, BookOpen, Shield, Zap, Users, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [openIndex, setOpenIndex] = useState(null);

    const categories = [
        { id: 'all', label: 'All Questions', icon: HelpCircle },
        { id: 'getting-started', label: 'Getting Started', icon: BookOpen },
        { id: 'features', label: 'Features', icon: Zap },
        { id: 'account', label: 'Account', icon: Users },
        { id: 'privacy', label: 'Privacy & Security', icon: Shield }
    ];

    const faqs = [
        {
            category: 'getting-started',
            question: 'What is Bit Brainic?',
            answer: 'Bit Brainic is an AI-powered computer science tutor that helps students learn programming concepts through personalized conversations. Powered by Google Gemini AI, it adapts to your learning style and provides instant, accurate answers to your questions.'
        },
        {
            category: 'getting-started',
            question: 'How do I get started with Bit Brainic?',
            answer: 'Getting started is easy! Simply create an account by clicking "Get Started" on the home page. After signing up, you\'ll select your interests (like Python, Web Development, Data Structures, etc.) to personalize your experience. Then you can start chatting with your AI tutor right away!'
        },
        {
            category: 'getting-started',
            question: 'Is Bit Brainic free to use?',
            answer: 'Yes! Bit Brainic is completely free for students. We believe quality CS education should be accessible to everyone. Create an account and start learning without any payment required.'
        },
        {
            category: 'getting-started',
            question: 'What topics can I learn with Bit Brainic?',
            answer: 'Bit Brainic covers a wide range of computer science topics including: Programming Languages (Python, JavaScript, Java, C++), Data Structures & Algorithms, Web Development, Database Management, Object-Oriented Programming, Software Engineering, Operating Systems, Computer Networks, and much more!'
        },
        {
            category: 'features',
            question: 'How does the AI tutor work?',
            answer: 'Our AI tutor uses Google\'s Gemini AI technology to understand your questions and provide detailed, accurate explanations. It remembers your conversation context, so you can ask follow-up questions naturally. The AI adapts its responses based on your selected interests and learning persona.'
        },
        {
            category: 'features',
            question: 'Can the AI write and explain code?',
            answer: 'Absolutely! The AI can write code in multiple programming languages, explain code line by line, debug your code, suggest improvements, and help you understand complex algorithms. Code is displayed with syntax highlighting for better readability.'
        },
        {
            category: 'features',
            question: 'What are "Interests" and how do they help?',
            answer: 'Interests are topics you want to focus on learning. When you select interests like "Python" or "Machine Learning", the AI tailors its responses to be more relevant to those areas. You can update your interests anytime from your profile.'
        },
        {
            category: 'features',
            question: 'What is the "Persona" feature?',
            answer: 'The Persona feature lets you customize how the AI tutor responds. You can set preferences like "Explain things simply" or "Give detailed technical explanations". This helps the AI match your preferred learning style.'
        },
        {
            category: 'features',
            question: 'Can I save my chat history?',
            answer: 'Yes! All your conversations are automatically saved. You can create multiple chat sessions for different topics, rename them for easy reference, and access them anytime from your dashboard. You can also delete chats you no longer need.'
        },
        {
            category: 'features',
            question: 'Does Bit Brainic support dark mode?',
            answer: 'Yes! Bit Brainic supports both light and dark themes. Click the theme toggle button in the navigation bar to switch between modes. Your preference is saved automatically.'
        },
        {
            category: 'account',
            question: 'How do I create an account?',
            answer: 'Click "Sign Up" on the home page, enter your name, email address, and create a password. After signing up, you\'ll be guided to select your learning interests to personalize your experience.'
        },
        {
            category: 'account',
            question: 'I forgot my password. How do I reset it?',
            answer: 'Click "Forgot Password?" on the sign-in page and enter your email address. We\'ll send you a password reset link that\'s valid for 10 minutes. Click the link in the email to set a new password.'
        },
        {
            category: 'account',
            question: 'How do I update my profile information?',
            answer: 'Go to your Profile page by clicking on your name in the dashboard. From there, you can update your name, email, password, interests, and persona settings.'
        },
        {
            category: 'account',
            question: 'Can I delete my account?',
            answer: 'Yes, you can delete your account from the Profile page. Scroll down to the "Danger Zone" section and click "Delete Account". This will permanently delete your account and all associated data including chat history.'
        },
        {
            category: 'privacy',
            question: 'Is my data secure?',
            answer: 'Yes! We take security seriously. Your password is encrypted using bcrypt hashing. All data is transmitted over secure HTTPS connections. We never share your personal information with third parties for marketing purposes.'
        },
        {
            category: 'privacy',
            question: 'What data does Bit Brainic collect?',
            answer: 'We collect your name, email, and the conversations you have with the AI tutor. This data is used solely to provide and improve the service. You can read our full Privacy Policy for detailed information.'
        },
        {
            category: 'privacy',
            question: 'Are my conversations private?',
            answer: 'Your conversations are stored securely and are only accessible to you. We may use anonymized conversation data to improve the AI\'s responses, but your personal information is never exposed.'
        },
        {
            category: 'privacy',
            question: 'Can I download my data?',
            answer: 'We\'re working on adding a data export feature. In the meantime, if you need a copy of your data, please contact us through the Contact page and we\'ll assist you.'
        }
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen py-20">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl font-bold mb-6"
                >
                    Frequently Asked <span className="gradient-text">Questions</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-secondary max-w-2xl mx-auto mb-8"
                >
                    Find answers to common questions about Bit Brainic
                </motion.p>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-xl mx-auto relative"
                >
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input pl-12 py-4"
                    />
                </motion.div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3"
                >
                    {categories.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveCategory(id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                activeCategory === id
                                    ? 'accent-bg text-white'
                                    : 'bg-secondary border border-theme hover:border-[var(--accent)]'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </button>
                    ))}
                </motion.div>
            </section>

            {/* FAQ List */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-4">
                    {filteredFaqs.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <HelpCircle className="w-16 h-16 text-muted mx-auto mb-4" />
                            <p className="text-secondary">No questions found matching your search.</p>
                        </motion.div>
                    ) : (
                        filteredFaqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="card"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between text-left"
                                >
                                    <span className="font-medium pr-4">{faq.question}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${
                                            openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-secondary mt-4 pt-4 border-t border-theme">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>

            {/* Still have questions */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="card text-center py-12"
                >
                    <MessageCircle className="w-12 h-12 accent-color mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                    <p className="text-secondary mb-6 max-w-md mx-auto">
                        Can't find the answer you're looking for? Feel free to reach out to our team.
                    </p>
                    <Link to="/contact" className="btn btn-primary">
                        Contact Us
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default FAQ;
