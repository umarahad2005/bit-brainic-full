import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
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
                    <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-secondary">Last updated: January 21, 2026</p>
                </div>

                {/* Content */}
                <div className="card prose prose-invert max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p className="text-secondary mb-4">
                            At Bit Brainic, we take your privacy seriously. This Privacy Policy explains how we collect, 
                            use, disclose, and safeguard your information when you use our AI-powered educational platform.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                        
                        <h3 className="text-xl font-medium mb-3 mt-6">Personal Information</h3>
                        <p className="text-secondary mb-4">
                            When you create an account, we collect:
                        </p>
                        <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                            <li>Name and email address</li>
                            <li>Password (stored in encrypted form)</li>
                            <li>Learning interests and preferences</li>
                            <li>Custom persona settings</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-3 mt-6">Usage Information</h3>
                        <p className="text-secondary mb-4">
                            We automatically collect:
                        </p>
                        <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                            <li>Chat conversations with our AI tutor</li>
                            <li>Learning progress and interaction patterns</li>
                            <li>Device information and browser type</li>
                            <li>IP address and approximate location</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                        <p className="text-secondary mb-4">
                            We use the collected information to:
                        </p>
                        <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                            <li>Provide and maintain our Service</li>
                            <li>Personalize your learning experience</li>
                            <li>Improve our AI tutor's responses and accuracy</li>
                            <li>Send important updates and notifications</li>
                            <li>Respond to your inquiries and support requests</li>
                            <li>Analyze usage patterns to enhance the platform</li>
                            <li>Protect against unauthorized access and abuse</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
                        <p className="text-secondary mb-4">
                            We implement industry-standard security measures to protect your data:
                        </p>
                        <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                            <li>Passwords are hashed using bcrypt encryption</li>
                            <li>Data is transmitted over secure HTTPS connections</li>
                            <li>Access to personal data is restricted to authorized personnel</li>
                            <li>Regular security audits and updates are performed</li>
                        </ul>
                        <p className="text-secondary mt-4">
                            Your data is stored on secure servers hosted by trusted cloud providers. While we strive to 
                            protect your information, no method of transmission over the Internet is 100% secure.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">5. AI and Data Processing</h2>
                        <p className="text-secondary mb-4">
                            Our Service uses AI technology (Google Gemini) to provide educational assistance. When you 
                            interact with our AI tutor:
                        </p>
                        <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                            <li>Your messages are processed by AI to generate responses</li>
                            <li>Conversations are stored to maintain chat history</li>
                            <li>Your interests and persona settings help personalize responses</li>
                            <li>We do not sell your conversation data to third parties</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">6. Data Sharing</h2>
                        <p className="text-secondary mb-4">
                            We do not sell your personal information. We may share data with:
                        </p>
                        <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                            <li><strong>Service Providers:</strong> Third-party services that help us operate the platform (hosting, AI processing)</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                            <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
                        <p className="text-secondary mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Correction:</strong> Update or correct your information</li>
                            <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                            <li><strong>Export:</strong> Download your data in a portable format</li>
                            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                        </ul>
                        <p className="text-secondary mt-4">
                            To exercise these rights, visit your Profile settings or contact us directly.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking</h2>
                        <p className="text-secondary mb-4">
                            We use essential cookies to:
                        </p>
                        <ul className="list-disc list-inside text-secondary space-y-2 ml-4">
                            <li>Keep you signed in to your account</li>
                            <li>Remember your preferences (theme, settings)</li>
                            <li>Ensure security and prevent fraud</li>
                        </ul>
                        <p className="text-secondary mt-4">
                            We do not use third-party advertising cookies or tracking pixels.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
                        <p className="text-secondary mb-4">
                            Our Service is not intended for children under 13 years of age. We do not knowingly collect 
                            personal information from children under 13. If you believe we have collected information from 
                            a child under 13, please contact us immediately.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
                        <p className="text-secondary mb-4">
                            We may update this Privacy Policy from time to time. We will notify you of any significant 
                            changes by email or through a notice on our Service. Your continued use of the Service after 
                            changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                        <p className="text-secondary mb-4">
                            If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
                        </p>
                        <div className="text-secondary space-y-2">
                            <p>Email: <a href="mailto:privacy@bitbrainic.com" className="accent-color hover:underline">privacy@bitbrainic.com</a></p>
                            <p>Or visit our <Link to="/contact" className="accent-color hover:underline">Contact Page</Link></p>
                        </div>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default Privacy;
