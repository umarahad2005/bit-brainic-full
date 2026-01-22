import { motion } from 'framer-motion';
import { Plus, MessageSquare, Trash2, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ChatSidebar = ({ chats, currentChatId, onSelectChat, onNewChat, onDeleteChat, isLoading }) => {
    const { logout, user } = useAuth();

    return (
        <div className="w-72 h-full bg-secondary border-r border-theme flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-theme">
                <div className="flex items-center gap-2 mb-4">
                    <img src="/log.jpeg" alt="Bit Brainic" className="w-8 h-8" />
                    <span className="font-bold gradient-text">Bit Brainic</span>
                </div>
                <motion.button
                    onClick={onNewChat}
                    className="btn btn-primary w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Chat
                </motion.button>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto p-2">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : chats.length === 0 ? (
                    <div className="text-center py-8 text-muted text-sm">
                        No conversations yet.
                        <br />Start a new chat!
                    </div>
                ) : (
                    <div className="space-y-1">
                        {chats.map((chat) => (
                            <motion.div
                                key={chat._id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`group flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${currentChatId === chat._id
                                    ? 'accent-bg-light border border-[var(--accent)]'
                                    : 'hover:bg-tertiary'
                                    }`}
                                onClick={() => onSelectChat(chat._id)}
                            >
                                <MessageSquare className={`w-4 h-4 flex-shrink-0 ${currentChatId === chat._id ? 'accent-color' : 'text-muted'
                                    }`} />
                                <span className="flex-1 truncate text-sm">
                                    {chat.title}
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteChat(chat._id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 text-red-500 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* User section */}
            <div className="p-4 border-t border-theme">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full accent-bg flex items-center justify-center text-white font-semibold">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{user?.name}</div>
                        <div className="text-xs text-muted truncate">{user?.email}</div>
                    </div>
                    <Link
                        to="/profile"
                        className="p-2 rounded-lg hover:bg-tertiary text-muted hover:text-primary transition-colors"
                        title="Settings"
                    >
                        <Settings className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={logout}
                        className="p-2 rounded-lg hover:bg-tertiary text-muted hover:text-primary transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSidebar;
