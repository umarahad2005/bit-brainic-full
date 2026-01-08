import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Sending...' });

        // Simulate form submission
        setTimeout(() => {
            setStatus({ type: 'success', message: 'Thank you! We\'ll get back to you soon.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1000);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'hello@bitbrainic.com',
            link: 'mailto:hello@bitbrainic.com'
        },
        {
            icon: Phone,
            title: 'Phone',
            value: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: MapPin,
            title: 'Address',
            value: 'San Francisco, CA',
            link: '#'
        }
    ];

    return (
        <div className="min-h-screen py-20">
            {/* Header */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl font-bold mb-6"
                >
                    Get in <span className="gradient-text">Touch</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-secondary max-w-2xl mx-auto"
                >
                    Have questions, feedback, or suggestions? We'd love to hear from you!
                </motion.p>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                className="flex items-start gap-4 p-4 rounded-xl bg-secondary hover:bg-tertiary transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-xl accent-bg-light flex items-center justify-center group-hover:accent-bg transition-colors">
                                    <info.icon className="w-5 h-5 accent-color group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <div className="font-medium">{info.title}</div>
                                    <div className="text-secondary text-sm">{info.value}</div>
                                </div>
                            </a>
                        ))}

                        <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-600 text-white">
                            <MessageSquare className="w-8 h-8 mb-4" />
                            <h3 className="font-semibold text-lg mb-2">Live Chat Support</h3>
                            <p className="text-sm opacity-90 mb-4">
                                Need quick help? Chat with our support team!
                            </p>
                            <button className="px-4 py-2 bg-white text-[var(--accent)] rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                                Start Chat
                            </button>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <div className="card">
                            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="input"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="input"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="input"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="input resize-none"
                                        placeholder="Your message..."
                                    />
                                </div>

                                {status.message && (
                                    <div className={`p-4 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-700' :
                                            status.type === 'error' ? 'bg-red-100 text-red-700' :
                                                'bg-blue-100 text-blue-700'
                                        }`}>
                                        {status.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status.type === 'loading'}
                                    className="btn btn-primary w-full sm:w-auto"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
