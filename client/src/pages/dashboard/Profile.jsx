import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    User, Mail, Lock, Save, Trash2, ArrowLeft,
    Sparkles, Check, AlertTriangle, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api';
import ThemeToggle from '../../components/layout/ThemeToggle';

const INTEREST_OPTIONS = [
    'Python', 'JavaScript', 'Java', 'C++', 'TypeScript', 'Go', 'Rust',
    'React', 'Node.js', 'HTML/CSS', 'APIs', 'Frontend', 'Backend',
    'Data Structures', 'Algorithms', 'Big O', 'SQL', 'MongoDB',
    'Operating Systems', 'Networking', 'Linux', 'Security',
    'Machine Learning', 'Deep Learning', 'AI',
    'Interview Prep', 'Competitive Programming'
];

const Profile = () => {
    const { user, updateUser, logout } = useAuth();

    // Profile form state
    const [profileData, setProfileData] = useState({ name: '', email: '' });
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState('');
    const [profileError, setProfileError] = useState('');

    // Password form state
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Interests state
    const [interests, setInterests] = useState([]);
    const [interestsLoading, setInterestsLoading] = useState(false);
    const [interestsSuccess, setInterestsSuccess] = useState('');

    // Persona state
    const [persona, setPersona] = useState('');
    const [personaLoading, setPersonaLoading] = useState(false);
    const [personaSuccess, setPersonaSuccess] = useState('');

    // Delete modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileData({ name: user.name || '', email: user.email || '' });
            setInterests(user.interests || []);
            setPersona(user.persona || '');
        }
    }, [user]);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileError('');
        setProfileSuccess('');

        try {
            const response = await authApi.updateProfile(profileData);
            updateUser(response.data);
            setProfileSuccess('Profile updated successfully!');
            setTimeout(() => setProfileSuccess(''), 3000);
        } catch (err) {
            setProfileError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordLoading(true);
        setPasswordError('');
        setPasswordSuccess('');

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New passwords do not match');
            setPasswordLoading(false);
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordError('New password must be at least 6 characters');
            setPasswordLoading(false);
            return;
        }

        try {
            await authApi.updatePassword(passwordData.currentPassword, passwordData.newPassword);
            setPasswordSuccess('Password updated successfully!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setPasswordSuccess(''), 3000);
        } catch (err) {
            setPasswordError(err.response?.data?.message || 'Failed to update password');
        } finally {
            setPasswordLoading(false);
        }
    };

    const toggleInterest = (interest) => {
        if (interests.includes(interest)) {
            setInterests(interests.filter(i => i !== interest));
        } else if (interests.length < 20) {
            setInterests([...interests, interest]);
        }
    };

    const handleInterestsSave = async () => {
        setInterestsLoading(true);
        setInterestsSuccess('');

        try {
            const response = await authApi.updateInterests(interests);
            updateUser(response.data);
            setInterestsSuccess('Interests saved!');
            setTimeout(() => setInterestsSuccess(''), 3000);
        } catch (err) {
            console.error('Failed to save interests:', err);
        } finally {
            setInterestsLoading(false);
        }
    };

    const handlePersonaSave = async () => {
        setPersonaLoading(true);
        setPersonaSuccess('');

        try {
            const response = await authApi.updatePersona(persona);
            updateUser(response.data);
            setPersonaSuccess('Persona saved!');
            setTimeout(() => setPersonaSuccess(''), 3000);
        } catch (err) {
            console.error('Failed to save persona:', err);
        } finally {
            setPersonaLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        setDeleteLoading(true);

        try {
            await authApi.deleteAccount();
            logout();
        } catch (err) {
            console.error('Failed to delete account:', err);
            setDeleteLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary">
            {/* Header */}
            <header className="bg-secondary border-b border-theme">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/dashboard" className="p-2 rounded-lg hover:bg-tertiary">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="font-bold">Profile Settings</h1>
                            <p className="text-xs text-muted">Manage your account</p>
                        </div>
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card"
                >
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 accent-color" />
                        Profile Information
                    </h2>

                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                        {profileError && (
                            <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">{profileError}</div>
                        )}
                        {profileSuccess && (
                            <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm flex items-center gap-2">
                                <Check className="w-4 h-4" /> {profileSuccess}
                            </div>
                        )}

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                                    <input
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        className="input pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className="input pl-10"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" disabled={profileLoading} className="btn btn-primary">
                            <Save className="w-4 h-4 mr-2" />
                            {profileLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </motion.div>

                {/* Password Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card"
                >
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5 accent-color" />
                        Change Password
                    </h2>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        {passwordError && (
                            <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">{passwordError}</div>
                        )}
                        {passwordSuccess && (
                            <div className="p-3 rounded-lg bg-green-100 text-green-700 text-sm flex items-center gap-2">
                                <Check className="w-4 h-4" /> {passwordSuccess}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2">Current Password</label>
                            <input
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                className="input"
                                required
                            />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="input"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={passwordLoading} className="btn btn-secondary">
                            <Lock className="w-4 h-4 mr-2" />
                            {passwordLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </motion.div>

                {/* Interests Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Sparkles className="w-5 h-5 accent-color" />
                            Your Interests
                        </h2>
                        {interestsSuccess && (
                            <span className="text-sm text-green-600 flex items-center gap-1">
                                <Check className="w-4 h-4" /> {interestsSuccess}
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-secondary mb-4">
                        Select topics you're interested in ({interests.length}/20)
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {INTEREST_OPTIONS.map((interest) => {
                            const isSelected = interests.includes(interest);
                            return (
                                <button
                                    key={interest}
                                    onClick={() => toggleInterest(interest)}
                                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${isSelected
                                            ? 'accent-bg text-white'
                                            : 'bg-tertiary hover:bg-secondary border border-theme'
                                        }`}
                                >
                                    {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                                    {interest}
                                </button>
                            );
                        })}
                    </div>

                    <button onClick={handleInterestsSave} disabled={interestsLoading} className="btn btn-secondary">
                        <Save className="w-4 h-4 mr-2" />
                        {interestsLoading ? 'Saving...' : 'Save Interests'}
                    </button>
                </motion.div>

                {/* Persona Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Sparkles className="w-5 h-5 accent-color" />
                            Custom Persona
                        </h2>
                        {personaSuccess && (
                            <span className="text-sm text-green-600 flex items-center gap-1">
                                <Check className="w-4 h-4" /> {personaSuccess}
                            </span>
                        )}
                    </div>

                    <p className="text-sm text-secondary mb-4">
                        Add custom instructions to personalize how BitBraniac responds to you.
                        (Max 500 characters)
                    </p>

                    <textarea
                        value={persona}
                        onChange={(e) => setPersona(e.target.value.slice(0, 500))}
                        placeholder="Example: I'm a beginner in programming. Please explain concepts in simple terms with lots of examples. I prefer Python code snippets."
                        className="input min-h-[120px] mb-2"
                    />
                    <p className="text-xs text-muted mb-4">{persona.length}/500 characters</p>

                    <button onClick={handlePersonaSave} disabled={personaLoading} className="btn btn-secondary">
                        <Save className="w-4 h-4 mr-2" />
                        {personaLoading ? 'Saving...' : 'Save Persona'}
                    </button>
                </motion.div>

                {/* Danger Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card border-red-200"
                >
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        Danger Zone
                    </h2>

                    <p className="text-sm text-secondary mb-4">
                        Once you delete your account, there is no going back. This will permanently delete
                        your account and all associated data including chats and messages.
                    </p>

                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="btn bg-red-600 text-white hover:bg-red-700"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                    </button>
                </motion.div>
            </main>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-primary border border-theme rounded-xl p-6 max-w-md w-full"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-red-600">Delete Account</h3>
                            <button onClick={() => setShowDeleteModal(false)} className="p-1 hover:bg-tertiary rounded">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-secondary mb-6">
                            Are you absolutely sure you want to delete your account? This action cannot be undone
                            and all your data will be permanently removed.
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setShowDeleteModal(false)} className="btn btn-ghost">
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deleteLoading}
                                className="btn bg-red-600 text-white hover:bg-red-700"
                            >
                                {deleteLoading ? 'Deleting...' : 'Yes, Delete My Account'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Profile;
