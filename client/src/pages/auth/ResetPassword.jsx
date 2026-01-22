import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { authApi } from '../../api';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await authApi.resetPassword(token, formData.password);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full text-center"
                >
                    <div className="card">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold mb-4">Password Reset Successful!</h1>
                        <p className="text-secondary mb-6">
                            Your password has been reset successfully. You can now sign in with your new password.
                        </p>
                        <Link
                            to="/signin"
                            className="btn btn-primary w-full inline-flex items-center justify-center"
                        >
                            Sign In Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <img src="/log.jpeg" alt="Bit Brainic" className="w-10 h-10" />
                        <span className="text-2xl font-bold gradient-text">Bit Brainic</span>
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                    <p className="text-secondary">Enter your new password below</p>
                </div>

                {/* Form */}
                <div className="card">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-lg bg-red-100 text-red-700 text-sm flex items-center gap-2">
                                <XCircle className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <Lock className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="input pl-11 pr-11"
                                    placeholder="••••••••"
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="input-icon-right"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <p className="text-xs text-muted mt-1">Minimum 6 characters</p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <Lock className="input-icon" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="input pl-11 pr-11"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="input-icon-right"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                            {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-secondary">
                        Remember your password?{' '}
                        <Link to="/signin" className="accent-color font-medium hover:underline">
                            Sign In
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
