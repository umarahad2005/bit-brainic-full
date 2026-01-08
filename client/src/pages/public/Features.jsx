import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Bot, Code, MessageSquare, BookOpen, History, Shield,
    Sparkles, Palette, Lightbulb, Target, ArrowRight
} from 'lucide-react';

const Features = () => {
    const mainFeatures = [
        {
            icon: Bot,
            title: 'Intelligent AI Tutor',
            description: 'Powered by Google Gemini, our AI understands context and provides accurate, helpful explanations tailored to your learning level.',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            icon: Code,
            title: 'Syntax-Highlighted Code',
            description: 'All code examples are beautifully formatted with proper syntax highlighting. Copy code snippets with a single click.',
            color: 'from-green-500 to-emerald-600'
        },
        {
            icon: MessageSquare,
            title: 'Natural Conversations',
            description: 'Chat naturally as if talking to a real tutor. Ask follow-up questions, request clarifications, and dive deeper into topics.',
            color: 'from-purple-500 to-pink-600'
        },
        {
            icon: BookOpen,
            title: 'Comprehensive Coverage',
            description: 'From data structures and algorithms to web development, databases, and system design – we cover all CS topics.',
            color: 'from-orange-500 to-red-600'
        }
    ];

    const additionalFeatures = [
        {
            icon: History,
            title: 'Chat History',
            description: 'Access your previous conversations anytime.'
        },
        {
            icon: Shield,
            title: 'Secure & Private',
            description: 'Your data is encrypted and protected.'
        },
        {
            icon: Sparkles,
            title: 'Quick Replies',
            description: 'Suggested prompts to guide your learning.'
        },
        {
            icon: Palette,
            title: 'Dark & Light Modes',
            description: 'Choose the theme that suits your eyes.'
        },
        {
            icon: Lightbulb,
            title: 'Smart Explanations',
            description: 'Complex concepts broken down simply.'
        },
        {
            icon: Target,
            title: 'Practice Problems',
            description: 'Get exercises to reinforce learning.'
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
        <div className="min-h-screen py-20">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl font-bold mb-6"
                >
                    Powerful Features for
                    <span className="gradient-text"> Smarter Learning</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-secondary max-w-2xl mx-auto"
                >
                    Discover everything Bit Brainic offers to accelerate your
                    computer science journey.
                </motion.p>
            </section>

            {/* Main Features */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {mainFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="card relative overflow-hidden group"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                                <feature.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-secondary">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Additional Features */}
            <section className="bg-secondary py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-center mb-12"
                    >
                        And so much more...
                    </motion.h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {additionalFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex items-start gap-4 p-4 rounded-xl hover:bg-tertiary transition-colors"
                            >
                                <div className="w-10 h-10 rounded-lg accent-bg-light flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-5 h-5 accent-color" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                                    <p className="text-secondary text-sm">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Ready to experience it yourself?</h2>
                        <p className="text-secondary mb-8">
                            Start learning with Bit Brainic today – completely free!
                        </p>
                        <Link to="/signup" className="btn btn-primary text-base px-8 py-3">
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Features;
