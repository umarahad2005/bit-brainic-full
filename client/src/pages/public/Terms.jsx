import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
                    <p className="text-secondary">Last updated: January 21, 2026</p>
                </div>

                {/* Content */}
                <div className="card prose prose-invert max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                        <p className="text-secondary mb-4">
                            By accessing and using Bit Brainic ("the Service"), you accept and agree to be bound by the terms 
                            and provisions of this agreement. If you do not agree to these terms, please do not use the Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                        <p className="text-secondary mb-4">
                            Bit Brainic is an AI-powered educational platform designed to help users learn computer science concepts. 
                            The Service provides:
                        </p>
                        <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                            <li>AI-powered tutoring and conversation</li>
                            <li>Personalized learning experiences based on user interests</li>
                            <li>Educational content and resources</li>
                            <li>Progress tracking and chat history</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                        <p className="text-secondary mb-4">
                            To access certain features of the Service, you must create an account. You agree to:
                        </p>
                        <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                            <li>Provide accurate and complete information during registration</li>
                            <li>Maintain the security of your password and account</li>
                            <li>Notify us immediately of any unauthorized use of your account</li>
                            <li>Be responsible for all activities that occur under your account</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
                        <p className="text-secondary mb-4">
                            You agree not to use the Service to:
                        </p>
                        <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                            <li>Violate any applicable laws or regulations</li>
                            <li>Harass, abuse, or harm other users</li>
                            <li>Attempt to gain unauthorized access to the Service</li>
                            <li>Interfere with or disrupt the Service or its servers</li>
                            <li>Use the Service for any commercial purposes without authorization</li>
                            <li>Upload malicious code or content</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
                        <p className="text-secondary mb-4">
                            The Service and its original content, features, and functionality are owned by Bit Brainic 
                            and are protected by international copyright, trademark, patent, trade secret, and other 
                            intellectual property laws.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. AI-Generated Content</h2>
                        <p className="text-secondary mb-4">
                            The educational content provided by our AI tutor is for informational purposes only. While we 
                            strive for accuracy, AI-generated responses may occasionally contain errors. Users should verify 
                            important information from authoritative sources.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                        <p className="text-secondary mb-4">
                            Bit Brainic shall not be liable for any indirect, incidental, special, consequential, or 
                            punitive damages resulting from your use of the Service. Our total liability shall not exceed 
                            the amount you paid us in the twelve months prior to the claim.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
                        <p className="text-secondary mb-4">
                            We reserve the right to terminate or suspend your account at any time, without prior notice, 
                            for conduct that we believe violates these Terms or is harmful to other users, us, or third 
                            parties, or for any other reason at our sole discretion.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
                        <p className="text-secondary mb-4">
                            We reserve the right to modify these terms at any time. We will notify users of significant 
                            changes via email or through the Service. Continued use of the Service after changes constitutes 
                            acceptance of the new terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
                        <p className="text-secondary mb-4">
                            If you have any questions about these Terms of Service, please contact us at:
                        </p>
                        <p className="text-secondary">
                            Email: <a href="mailto:support@bitbrainic.com" className="accent-color hover:underline">support@bitbrainic.com</a>
                        </p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default Terms;
