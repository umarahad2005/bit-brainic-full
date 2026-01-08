import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
    Lock, Users, MessageSquare, Activity, TrendingUp,
    BarChart3, LogOut, Home
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../api';
import ThemeToggle from '../../components/layout/ThemeToggle';

const AdminPanel = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [storedPassword, setStoredPassword] = useState('');

    // Fetch stats when authenticated
    const { data: stats, isLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const response = await adminApi.getStats(storedPassword);
            return response.data;
        },
        enabled: isAuthenticated
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await adminApi.verify(password);
            setStoredPassword(password);
            setIsAuthenticated(true);
        } catch (err) {
            setError('Invalid admin password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setStoredPassword('');
        setPassword('');
    };

    // Login screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-full accent-bg-light flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 accent-color" />
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
                        <p className="text-secondary">Enter the admin password to continue</p>
                    </div>

                    <div className="card">
                        <form onSubmit={handleLogin} className="space-y-4">
                            {error && (
                                <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input"
                                    placeholder="Enter admin password"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-full">
                                Access Dashboard
                            </button>
                        </form>
                    </div>

                    <div className="text-center mt-4">
                        <Link to="/" className="text-sm text-secondary hover:accent-color">
                            ← Back to Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen bg-primary">
            {/* Header */}
            <header className="bg-secondary border-b border-theme">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg accent-bg flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold">Admin Dashboard</h1>
                            <p className="text-xs text-muted">Bit Brainic Analytics</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link to="/" className="btn btn-ghost">
                            <Home className="w-4 h-4 mr-2" />
                            Home
                        </Link>
                        <button onClick={handleLogout} className="btn btn-secondary">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Stats Cards */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="card"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stats?.overview?.totalUsers || 0}</p>
                                        <p className="text-sm text-secondary">Total Users</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="card"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stats?.overview?.newUsersThisWeek || 0}</p>
                                        <p className="text-sm text-secondary">New This Week</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="card"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stats?.overview?.totalChats || 0}</p>
                                        <p className="text-sm text-secondary">Total Chats</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="card"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                        <Activity className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stats?.overview?.totalMessages || 0}</p>
                                        <p className="text-sm text-secondary">Total Messages</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Charts Section */}
                        <div className="grid lg:grid-cols-2 gap-6 mb-8">
                            {/* User Activity Chart */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="card"
                            >
                                <h3 className="font-semibold mb-4">User Registrations (Last 7 Days)</h3>
                                <div className="h-48 flex items-end gap-2">
                                    {stats?.charts?.userActivityByDay?.map((day, index) => (
                                        <div key={index} className="flex-1 flex flex-col items-center gap-1">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${Math.max((day.count / Math.max(...stats.charts.userActivityByDay.map(d => d.count), 1)) * 100, 10)}%` }}
                                                transition={{ delay: 0.5 + index * 0.05 }}
                                                className="w-full accent-bg rounded-t"
                                            />
                                            <span className="text-xs text-muted">
                                                {new Date(day._id).toLocaleDateString('en', { weekday: 'short' })}
                                            </span>
                                        </div>
                                    )) || (
                                            <div className="flex-1 flex items-center justify-center text-muted">
                                                No data available
                                            </div>
                                        )}
                                </div>
                            </motion.div>

                            {/* Chat Activity Chart */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="card"
                            >
                                <h3 className="font-semibold mb-4">Chat Activity (Last 7 Days)</h3>
                                <div className="h-48 flex items-end gap-2">
                                    {stats?.charts?.chatActivityByDay?.map((day, index) => (
                                        <div key={index} className="flex-1 flex flex-col items-center gap-1">
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${Math.max((day.count / Math.max(...stats.charts.chatActivityByDay.map(d => d.count), 1)) * 100, 10)}%` }}
                                                transition={{ delay: 0.6 + index * 0.05 }}
                                                className="w-full bg-purple-500 rounded-t"
                                            />
                                            <span className="text-xs text-muted">
                                                {new Date(day._id).toLocaleDateString('en', { weekday: 'short' })}
                                            </span>
                                        </div>
                                    )) || (
                                            <div className="flex-1 flex items-center justify-center text-muted">
                                                No data available
                                            </div>
                                        )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Top Users */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="card"
                        >
                            <h3 className="font-semibold mb-4">Top Active Users</h3>
                            {stats?.topUsers?.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-theme">
                                                <th className="text-left py-3 text-sm font-medium text-muted">Name</th>
                                                <th className="text-left py-3 text-sm font-medium text-muted">Email</th>
                                                <th className="text-right py-3 text-sm font-medium text-muted">Chats</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stats.topUsers.map((user, index) => (
                                                <tr key={index} className="border-b border-theme last:border-0">
                                                    <td className="py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full accent-bg flex items-center justify-center text-white text-sm font-medium">
                                                                {user.name?.charAt(0).toUpperCase() || 'U'}
                                                            </div>
                                                            {user.name || 'Unknown'}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 text-secondary">{user.email || 'N/A'}</td>
                                                    <td className="py-3 text-right font-medium">{user.chatCount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-muted text-center py-8">No user activity yet</p>
                            )}
                        </motion.div>
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;
