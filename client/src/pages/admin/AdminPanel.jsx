import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Lock, Users, MessageSquare, Activity, TrendingUp,
    BarChart3, LogOut, Home, Edit, Trash2, X, Search, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../api';
import ThemeToggle from '../../components/layout/ThemeToggle';

const AdminPanel = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [storedPassword, setStoredPassword] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const queryClient = useQueryClient();

    // Fetch stats when authenticated
    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const response = await adminApi.getStats(storedPassword);
            return response.data;
        },
        enabled: isAuthenticated && activeTab === 'overview'
    });

    // Fetch users when on users tab
    const { data: usersData, isLoading: usersLoading } = useQuery({
        queryKey: ['adminUsers', currentPage, searchQuery],
        queryFn: async () => {
            const response = await adminApi.getUsers(storedPassword, {
                page: currentPage,
                limit: 10,
                search: searchQuery
            });
            return response.data;
        },
        enabled: isAuthenticated && activeTab === 'users'
    });

    // Update user mutation
    const updateUserMutation = useMutation({
        mutationFn: async (data) => {
            return adminApi.updateUser(storedPassword, data.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
            setShowEditModal(false);
            setEditingUser(null);
        }
    });

    // Delete user mutation
    const deleteUserMutation = useMutation({
        mutationFn: async (userId) => {
            return adminApi.deleteUser(storedPassword, userId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
            queryClient.invalidateQueries({ queryKey: ['adminStats'] });
            setShowDeleteModal(false);
            setUserToDelete(null);
        }
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

    const handleEditUser = (user) => {
        setEditingUser({ ...user });
        setShowEditModal(true);
    };

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleSaveUser = () => {
        updateUserMutation.mutate({
            id: editingUser._id,
            name: editingUser.name,
            email: editingUser.email,
            interests: editingUser.interests,
            persona: editingUser.persona
        });
    };

    const handleConfirmDelete = () => {
        deleteUserMutation.mutate(userToDelete._id);
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

            {/* Tabs */}
            <div className="bg-secondary border-b border-theme">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-3 px-4 border-b-2 transition-colors ${activeTab === 'overview'
                                    ? 'border-[var(--accent)] accent-color font-medium'
                                    : 'border-transparent text-secondary hover:text-primary'
                                }`}
                        >
                            <BarChart3 className="w-4 h-4 inline mr-2" />
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`py-3 px-4 border-b-2 transition-colors ${activeTab === 'users'
                                    ? 'border-[var(--accent)] accent-color font-medium'
                                    : 'border-transparent text-secondary hover:text-primary'
                                }`}
                        >
                            <Users className="w-4 h-4 inline mr-2" />
                            Users
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {activeTab === 'overview' && (
                    statsLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <>
                            {/* Stats Cards */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
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

                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
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

                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
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

                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
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
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
                                    <h3 className="font-semibold mb-4">User Registrations (Last 7 Days)</h3>
                                    <div className="h-48 flex items-end gap-2">
                                        {stats?.charts?.userActivityByDay?.map((day, index) => (
                                            <div key={index} className="flex-1 flex flex-col items-center gap-1">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${Math.max((day.count / Math.max(...stats.charts.userActivityByDay.map(d => d.count), 1)) * 100, 5)}%` }}
                                                    transition={{ delay: 0.5 + index * 0.05 }}
                                                    className="w-full accent-bg rounded-t min-h-[8px]"
                                                />
                                                <span className="text-xs text-muted">
                                                    {new Date(day._id).toLocaleDateString('en', { weekday: 'short' })}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card">
                                    <h3 className="font-semibold mb-4">Chat Activity (Last 7 Days)</h3>
                                    <div className="h-48 flex items-end gap-2">
                                        {stats?.charts?.chatActivityByDay?.map((day, index) => (
                                            <div key={index} className="flex-1 flex flex-col items-center gap-1">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${Math.max((day.count / Math.max(...stats.charts.chatActivityByDay.map(d => d.count), 1)) * 100, 5)}%` }}
                                                    transition={{ delay: 0.6 + index * 0.05 }}
                                                    className="w-full bg-purple-500 rounded-t min-h-[8px]"
                                                />
                                                <span className="text-xs text-muted">
                                                    {new Date(day._id).toLocaleDateString('en', { weekday: 'short' })}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Top Users */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="card">
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
                    )
                )}

                {activeTab === 'users' && (
                    <div className="space-y-6">
                        {/* Search */}
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="input pl-11"
                                />
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="card">
                            {usersLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-theme">
                                                    <th className="text-left py-3 text-sm font-medium text-muted">User</th>
                                                    <th className="text-left py-3 text-sm font-medium text-muted">Email</th>
                                                    <th className="text-center py-3 text-sm font-medium text-muted">Chats</th>
                                                    <th className="text-left py-3 text-sm font-medium text-muted">Joined</th>
                                                    <th className="text-right py-3 text-sm font-medium text-muted">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {usersData?.users?.map((user) => (
                                                    <tr key={user._id} className="border-b border-theme last:border-0">
                                                        <td className="py-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full accent-bg flex items-center justify-center text-white text-sm font-medium">
                                                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium">{user.name}</div>
                                                                    <div className="text-xs text-muted">{user.interests?.length || 0} interests</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 text-secondary">{user.email}</td>
                                                        <td className="py-3 text-center">{user.chatCount || 0}</td>
                                                        <td className="py-3 text-secondary text-sm">
                                                            {new Date(user.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="py-3 text-right">
                                                            <div className="flex gap-2 justify-end">
                                                                <button
                                                                    onClick={() => handleEditUser(user)}
                                                                    className="p-2 rounded-lg hover:bg-tertiary text-muted hover:accent-color"
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteUser(user)}
                                                                    className="p-2 rounded-lg hover:bg-red-100 text-muted hover:text-red-600"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {usersData?.pagination && (
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-theme">
                                            <p className="text-sm text-muted">
                                                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, usersData.pagination.total)} of {usersData.pagination.total} users
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                    disabled={currentPage === 1}
                                                    className="btn btn-ghost p-2"
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                </button>
                                                <span className="px-3 py-2 text-sm">
                                                    Page {currentPage} of {usersData.pagination.pages}
                                                </span>
                                                <button
                                                    onClick={() => setCurrentPage(p => Math.min(usersData.pagination.pages, p + 1))}
                                                    disabled={currentPage >= usersData.pagination.pages}
                                                    className="btn btn-ghost p-2"
                                                >
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Edit User Modal */}
            {showEditModal && editingUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-primary border border-theme rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Edit User</h3>
                            <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-tertiary rounded">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    value={editingUser.name}
                                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Persona</label>
                                <textarea
                                    value={editingUser.persona || ''}
                                    onChange={(e) => setEditingUser({ ...editingUser, persona: e.target.value })}
                                    className="input min-h-[80px]"
                                    placeholder="Custom AI persona prompt..."
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end mt-6">
                            <button onClick={() => setShowEditModal(false)} className="btn btn-ghost">
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveUser}
                                disabled={updateUserMutation.isPending}
                                className="btn btn-primary"
                            >
                                {updateUserMutation.isPending ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Delete User Modal */}
            {showDeleteModal && userToDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-primary border border-theme rounded-xl p-6 max-w-md w-full"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-red-600">Delete User</h3>
                            <button onClick={() => setShowDeleteModal(false)} className="p-1 hover:bg-tertiary rounded">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-secondary mb-6">
                            Are you sure you want to delete <strong>{userToDelete.name}</strong>?
                            This will permanently remove their account and all associated data.
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setShowDeleteModal(false)} className="btn btn-ghost">
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={deleteUserMutation.isPending}
                                className="btn bg-red-600 text-white hover:bg-red-700"
                            >
                                {deleteUserMutation.isPending ? 'Deleting...' : 'Delete User'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
