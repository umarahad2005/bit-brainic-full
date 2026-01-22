import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Users, Coffee, Rocket, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
    const benefits = [
        {
            icon: Heart,
            title: 'Health & Wellness',
            description: 'Comprehensive health coverage and wellness programs'
        },
        {
            icon: Clock,
            title: 'Flexible Hours',
            description: 'Work when you\'re most productive with flexible schedules'
        },
        {
            icon: MapPin,
            title: 'Remote First',
            description: 'Work from anywhere in the world'
        },
        {
            icon: GraduationCap,
            title: 'Learning Budget',
            description: 'Annual budget for courses, books, and conferences'
        },
        {
            icon: Coffee,
            title: 'Team Events',
            description: 'Regular virtual and in-person team gatherings'
        },
        {
            icon: Rocket,
            title: 'Growth Path',
            description: 'Clear career progression and mentorship'
        }
    ];

    const values = [
        {
            title: 'Innovation',
            description: 'We embrace new technologies and creative solutions to improve education.'
        },
        {
            title: 'Impact',
            description: 'Every feature we build helps students learn and grow in their CS journey.'
        },
        {
            title: 'Collaboration',
            description: 'We believe the best work comes from diverse teams working together.'
        },
        {
            title: 'Transparency',
            description: 'Open communication and honest feedback are core to how we work.'
        }
    ];

    const openPositions = [
        {
            title: 'Senior Full Stack Developer',
            department: 'Engineering',
            location: 'Remote',
            type: 'Full-time',
            description: 'Help build and scale our AI-powered learning platform using React, Node.js, and MongoDB.'
        },
        {
            title: 'AI/ML Engineer',
            department: 'AI Team',
            location: 'Remote',
            type: 'Full-time',
            description: 'Work on improving our AI tutor\'s responses and implementing new learning features.'
        },
        {
            title: 'UX/UI Designer',
            department: 'Design',
            location: 'Remote',
            type: 'Full-time',
            description: 'Design intuitive and engaging user experiences for students learning computer science.'
        },
        {
            title: 'Content Writer (CS Education)',
            department: 'Content',
            location: 'Remote',
            type: 'Part-time',
            description: 'Create educational content, tutorials, and documentation for our platform.'
        },
        {
            title: 'Community Manager',
            department: 'Growth',
            location: 'Remote',
            type: 'Full-time',
            description: 'Build and nurture our community of CS students and educators.'
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
                    Join the <span className="gradient-text">Bit Brainic</span> Team
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-secondary max-w-2xl mx-auto mb-8"
                >
                    Help us make computer science education accessible to everyone.
                    We're building the future of learning, and we'd love for you to be part of it.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <a href="#positions" className="btn btn-primary">
                        View Open Positions
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                </motion.div>
            </section>

            {/* Our Values */}
            <section className="bg-secondary py-20 mb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-center mb-4"
                    >
                        Our Values
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-secondary text-center mb-12 max-w-2xl mx-auto"
                    >
                        What drives us every day
                    </motion.p>

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
                                <h3 className="text-xl font-semibold mb-2 gradient-text">{value.title}</h3>
                                <p className="text-secondary text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center mb-4"
                >
                    Why Work With Us?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-secondary text-center mb-12 max-w-2xl mx-auto"
                >
                    We offer competitive benefits to support your growth and well-being
                </motion.p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="card flex items-start gap-4"
                        >
                            <div className="w-12 h-12 rounded-lg accent-bg-light flex items-center justify-center flex-shrink-0">
                                <benefit.icon className="w-6 h-6 accent-color" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                                <p className="text-secondary text-sm">{benefit.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Open Positions */}
            <section id="positions" className="bg-secondary py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-center mb-4"
                    >
                        Open Positions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-secondary text-center mb-12 max-w-2xl mx-auto"
                    >
                        Join our growing team and make an impact
                    </motion.p>

                    <div className="space-y-4 max-w-4xl mx-auto">
                        {openPositions.map((position, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card hover:border-[var(--accent)] transition-colors"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">{position.title}</h3>
                                        <div className="flex flex-wrap gap-3 mb-3">
                                            <span className="inline-flex items-center gap-1 text-sm text-secondary">
                                                <Briefcase className="w-4 h-4" />
                                                {position.department}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-sm text-secondary">
                                                <MapPin className="w-4 h-4" />
                                                {position.location}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-sm text-secondary">
                                                <Clock className="w-4 h-4" />
                                                {position.type}
                                            </span>
                                        </div>
                                        <p className="text-secondary text-sm">{position.description}</p>
                                    </div>
                                    <Link
                                        to="/contact"
                                        className="btn btn-primary whitespace-nowrap flex-shrink-0"
                                    >
                                        Apply Now
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="card text-center py-12 bg-gradient-to-r from-[var(--accent)]/10 to-purple-600/10"
                >
                    <Users className="w-12 h-12 accent-color mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Don't see the right role?</h2>
                    <p className="text-secondary mb-6 max-w-md mx-auto">
                        We're always looking for talented people. Send us your resume and tell us how you'd like to contribute.
                    </p>
                    <Link to="/contact" className="btn btn-primary">
                        Get in Touch
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default Careers;
