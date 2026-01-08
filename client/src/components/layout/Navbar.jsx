import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/features', label: 'Features' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary border-b border-theme">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <motion.img
                            src="/logo.png"
                            alt="Bit Brainic"
                            className="w-8 h-8"
                            whileHover={{ rotate: 10 }}
                        />
                        <span className="text-xl font-bold gradient-text">Bit Brainic</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative text-sm font-medium transition-colors ${isActive(link.path) ? 'accent-color' : 'text-secondary hover:text-primary'
                                    }`}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 accent-bg rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right section */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="btn btn-secondary">
                                    Dashboard
                                </Link>
                                <button onClick={logout} className="btn btn-ghost">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/signin" className="btn btn-ghost">
                                    Sign In
                                </Link>
                                <Link to="/signup" className="btn btn-primary">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg bg-tertiary"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-secondary border-b border-theme overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 rounded-lg text-sm font-medium ${isActive(link.path)
                                            ? 'accent-bg-light accent-color'
                                            : 'text-secondary hover:bg-tertiary'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-3 border-t border-theme space-y-2">
                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full btn btn-secondary"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setIsOpen(false); }}
                                            className="block w-full btn btn-ghost"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/signin"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full btn btn-secondary"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/signup"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full btn btn-primary"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
