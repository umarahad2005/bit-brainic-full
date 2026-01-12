import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { label: 'Features', path: '/features' },
            { label: 'Pricing', path: '/pricing' },
            { label: 'FAQ', path: '/faq' }
        ],
        company: [
            { label: 'About', path: '/about' },
            { label: 'Contact', path: '/contact' },
            { label: 'Careers', path: '/careers' }
        ],
        legal: [
            { label: 'Privacy', path: '/privacy' },
            { label: 'Terms', path: '/terms' }
        ]
    };

    const socialLinks = [
        { icon: Github, href: 'https://github.com', label: 'GitHub' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:hello@bitbrainic.com', label: 'Email' }
    ];

    return (
        <footer className="bg-secondary border-t border-theme">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img src="/log.jpeg" alt="Bit Brainic" className="w-8 h-8" />
                            <span className="text-xl font-bold gradient-text">Bit Brainic</span>
                        </Link>
                        <p className="text-secondary text-sm mb-4 max-w-xs">
                            Your AI-powered computer science tutor. Learn programming concepts with personalized guidance.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-tertiary hover:accent-bg hover:text-white transition-colors"
                                    aria-label={label}
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold text-sm mb-3">Product</h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-secondary text-sm hover:accent-color transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-sm mb-3">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-secondary text-sm hover:accent-color transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-semibold text-sm mb-3">Legal</h3>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-secondary text-sm hover:accent-color transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-muted text-sm">
                        © {currentYear} Bit Brainic. All rights reserved.
                    </p>
                    <p className="text-muted text-sm">
                        Made with ❤️ for CS students
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
