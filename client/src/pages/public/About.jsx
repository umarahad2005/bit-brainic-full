import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Users, Sparkles } from 'lucide-react';
import { adminApi } from '../../api';

const About = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalMessages: 0,
        avgRating: '4.9'
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await adminApi.getPublicStats();
                setStats(response.data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };
        fetchStats();
    }, []);
    const values = [
        {
            icon: Heart,
            title: 'Passion for Education',
            description: 'We believe everyone deserves access to quality CS education, regardless of their background.'
        },
        {
            icon: Target,
            title: 'Student-Focused',
            description: 'Every feature is designed with students in mind, making learning intuitive and enjoyable.'
        },
        {
            icon: Users,
            title: 'Community Driven',
            description: 'We listen to our users and continuously improve based on their feedback.'
        },
        {
            icon: Sparkles,
            title: 'Innovation First',
            description: 'We leverage cutting-edge AI technology to provide the best learning experience.'
        }
    ];

    return (
        <div className="min-h-screen py-20">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl font-bold mb-6"
                >
                    About <span className="gradient-text">Bit Brainic</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-secondary max-w-2xl mx-auto"
                >
                    We're on a mission to make computer science education accessible,
                    engaging, and effective for everyone.
                </motion.p>
            </section>

            {/* Story */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                        <div className="space-y-4 text-secondary">
                            <p>
                                Bit Brainic was born from a simple observation: learning computer science
                                shouldn't be intimidating. Too many students struggle with complex concepts
                                because they lack personalized guidance.
                            </p>
                            <p>
                                We created an AI-powered tutor that adapts to each student's learning style,
                                provides instant feedback, and makes the journey of mastering CS concepts
                                enjoyable and rewarding.
                            </p>
                            <p>
                                Powered by Google's Gemini AI, Bit Brainic combines cutting-edge technology
                                with educational expertise to deliver a tutoring experience that feels
                                natural and effective.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-600 p-1">
                            <div className="w-full h-full rounded-xl bg-secondary flex items-center justify-center">
                                <img src="/log.jpeg" alt="Bit Brainic" className="w-32 h-32" />
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 accent-bg rounded-xl flex items-center justify-center text-white">
                            <div className="text-center">
                                <div className="text-2xl font-bold">AI</div>
                                <div className="text-xs opacity-80">Powered</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-secondary py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-center mb-12"
                    >
                        Our Values
                    </motion.h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card text-center"
                            >
                                <div className="w-14 h-14 rounded-full accent-bg-light flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="w-7 h-7 accent-color" />
                                </div>
                                <h3 className="font-semibold mb-2">{value.title}</h3>
                                <p className="text-secondary text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-3 gap-8 text-center">
                        {[
                            { value: stats.totalUsers.toLocaleString(), label: 'Students Learning' },
                            { value: stats.totalMessages.toLocaleString(), label: 'Questions Answered' },
                            { value: stats.avgRating, label: 'Average Rating' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                                <div className="text-secondary">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Developers */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-center mb-4"
                    >
                        Meet the <span className="gradient-text">Developers</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-secondary text-center mb-12 max-w-2xl mx-auto"
                    >
                        The passionate minds behind Bit Brainic
                    </motion.p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Developer 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="card text-center"
                        >
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-600 p-1 mx-auto mb-4 overflow-hidden">
                                <img
                                    src="/umar.jpeg"
                                    alt="Umar Ahad Uddin Ahmed Usmani"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Umar Ahad Uddin Ahmed Usmani</h3>
                            <p className="text-[var(--accent)] font-medium mb-3">Lead Developer</p>
                            <p className="text-secondary text-sm">
                                Full-stack developer passionate about creating innovative AI-powered educational tools.
                            </p>
                        </motion.div>

                        {/* Developer 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="card text-center"
                        >
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-600 p-1 mx-auto mb-4 overflow-hidden">
                                <img
                                    src="/syed.jpeg"
                                    alt="Syed Hassan Raza"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-1">Syed Hassan Raza</h3>
                            <p className="text-[var(--accent)] font-medium mb-3">Co-Developer</p>
                            <p className="text-secondary text-sm">
                                Passionate developer focused on building user-friendly and engaging applications.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
