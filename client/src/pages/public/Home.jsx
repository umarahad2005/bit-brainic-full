import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Code, Zap, BookOpen, MessageSquare, Trophy } from 'lucide-react';

const Home = () => {
    const features = [
        {
            icon: Bot,
            title: 'AI-Powered Tutoring',
            description: 'Get instant answers to your CS questions with our intelligent AI tutor.'
        },
        {
            icon: Code,
            title: 'Code Examples',
            description: 'Learn with syntax-highlighted code snippets and real-world examples.'
        },
        {
            icon: Zap,
            title: 'Instant Feedback',
            description: 'Receive immediate responses and explanations tailored to your level.'
        },
        {
            icon: BookOpen,
            title: 'Comprehensive Topics',
            description: 'From algorithms to web development, we cover all CS fundamentals.'
        },
        {
            icon: MessageSquare,
            title: 'Natural Conversations',
            description: 'Chat naturally and ask follow-up questions for deeper understanding.'
        },
        {
            icon: Trophy,
            title: 'Track Progress',
            description: 'Keep a history of your learning sessions and revisit them anytime.'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 lg:py-32">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-light)] via-transparent to-purple-500/10 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary text-sm font-medium">
                                <span className="w-2 h-2 rounded-full accent-bg animate-pulse" />
                                Your AI CS Tutor is ready
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                        >
                            Master Computer Science
                            <br />
                            <span className="gradient-text">with AI Guidance</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto mb-8"
                        >
                            Bit Brainic is your personal AI tutor that helps you understand programming concepts,
                            debug code, and master algorithms through natural conversations.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link to="/signup" className="btn btn-primary text-base px-8 py-3 glow">
                                Start Learning Free
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link to="/features" className="btn btn-secondary text-base px-8 py-3">
                                Explore Features
                            </Link>
                        </motion.div>
                    </div>

                    {/* Hero Image/Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mt-16 relative"
                    >
                        <div className="aspect-video max-w-4xl mx-auto rounded-2xl bg-secondary border border-theme overflow-hidden shadow-2xl">
                            <div className="flex items-center gap-2 px-4 py-3 bg-tertiary border-b border-theme">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="p-6">
                                <div className="flex gap-4 mb-4">
                                    <img src="/log.jpeg" alt="Bot" className="w-10 h-10 rounded-full" />
                                    <div className="flex-1 bg-tertiary rounded-2xl rounded-tl-none p-4">
                                        <p className="text-sm">
                                            Hello! I'm Bit Brainic, your CS tutor. How can I help you today?
                                            I can explain algorithms, help debug code, or teach you new concepts! 🚀
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 flex-row-reverse">
                                    <div className="w-10 h-10 rounded-full accent-bg flex items-center justify-center text-white font-semibold">
                                        U
                                    </div>
                                    <div className="flex-1 accent-bg rounded-2xl rounded-tr-none p-4 text-white">
                                        <p className="text-sm">Can you explain how binary search works?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Everything you need to
                            <span className="gradient-text"> excel in CS</span>
                        </h2>
                        <p className="text-secondary max-w-2xl mx-auto">
                            Our AI tutor is designed to make learning computer science intuitive,
                            interactive, and effective.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="card group hover:border-[var(--accent)] cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-xl accent-bg-light flex items-center justify-center mb-4 group-hover:accent-bg transition-colors">
                                    <feature.icon className="w-6 h-6 accent-color group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-secondary text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-purple-600" />
                        <div className="relative px-8 py-16 sm:px-16 text-center text-white">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Ready to level up your CS skills?
                            </h2>
                            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                                Join thousands of students who are already learning with Bit Brainic.
                                Start your journey today – it's free!
                            </p>
                            <Link
                                to="/signup"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[var(--accent)] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                Get Started Now
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
