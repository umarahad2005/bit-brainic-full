import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ChatSidebar from '../../components/chat/ChatSidebar';
import ChatPanel from '../../components/chat/ChatPanel';
import ThemeToggle from '../../components/layout/ThemeToggle';
import { chatApi } from '../../api';

const Dashboard = () => {
    const [currentChatId, setCurrentChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const queryClient = useQueryClient();

    // Fetch all chats
    const { data: chats = [], isLoading: chatsLoading } = useQuery({
        queryKey: ['chats'],
        queryFn: async () => {
            const response = await chatApi.getChats();
            return response.data;
        }
    });

    // Fetch current chat messages
    const { data: chatData, isLoading: messagesLoading } = useQuery({
        queryKey: ['chat', currentChatId],
        queryFn: async () => {
            if (!currentChatId) return null;
            const response = await chatApi.getChat(currentChatId);
            return response.data;
        },
        enabled: !!currentChatId
    });

    // Update messages when chat data changes (React Query v5 compatible)
    useEffect(() => {
        if (chatData?.messages) {
            setMessages(chatData.messages);
        }
    }, [chatData]);

    // Create new chat mutation
    const createChatMutation = useMutation({
        mutationFn: () => chatApi.createChat('New Chat'),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            setCurrentChatId(response.data._id);
            setMessages([]);
        }
    });

    // Delete chat mutation
    const deleteChatMutation = useMutation({
        mutationFn: (chatId) => chatApi.deleteChat(chatId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            if (currentChatId) {
                setCurrentChatId(null);
                setMessages([]);
            }
        }
    });

    // Send message mutation
    const sendMessageMutation = useMutation({
        mutationFn: async ({ chatId, content }) => {
            const response = await chatApi.sendMessage(chatId, content);
            return response.data;
        },
        onSuccess: (data) => {
            setMessages((prev) => [...prev, data.userMessage, data.botMessage]);
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            setIsTyping(false);
        },
        onError: (error) => {
            console.error('Send message error:', error);
            setIsTyping(false);
            // Remove the optimistic user message on error
            setMessages((prev) => prev.slice(0, -1));
            alert(error.response?.data?.message || 'Failed to send message. Please try again.');
        }
    });

    const handleNewChat = () => {
        createChatMutation.mutate();
    };

    const handleSelectChat = (chatId) => {
        setCurrentChatId(chatId);
    };

    const handleDeleteChat = (chatId) => {
        if (confirm('Are you sure you want to delete this chat?')) {
            deleteChatMutation.mutate(chatId);
        }
    };

    const handleSendMessage = async (content) => {
        let chatId = currentChatId;

        // Create a new chat if none exists
        if (!chatId) {
            try {
                const response = await chatApi.createChat('New Chat');
                chatId = response.data._id;
                setCurrentChatId(chatId);
                queryClient.invalidateQueries({ queryKey: ['chats'] });
            } catch (error) {
                console.error('Failed to create chat:', error);
                alert('Failed to create chat. Please try again.');
                return;
            }
        }

        // Add user message optimistically
        setMessages((prev) => [
            ...prev,
            {
                _id: Date.now().toString(),
                role: 'user',
                content,
                timestamp: new Date().toISOString()
            }
        ]);

        setIsTyping(true);
        sendMessageMutation.mutate({ chatId, content });
    };

    return (
        <div className="h-screen flex overflow-hidden">
            {/* Mobile sidebar toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-secondary border border-theme"
            >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Theme toggle for dashboard */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            {/* Sidebar */}
            <motion.div
                className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-40 h-full transition-transform duration-300`}
            >
                <ChatSidebar
                    chats={chats}
                    currentChatId={currentChatId}
                    onSelectChat={handleSelectChat}
                    onNewChat={handleNewChat}
                    onDeleteChat={handleDeleteChat}
                    isLoading={chatsLoading}
                />
            </motion.div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main chat area */}
            <ChatPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={messagesLoading}
                isTyping={isTyping}
            />
        </div>
    );
};

export default Dashboard;
