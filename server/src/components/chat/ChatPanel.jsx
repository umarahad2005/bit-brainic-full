import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import QuickReplies from '../ui/QuickReplies';

const ChatPanel = ({ messages, onSendMessage, isLoading, isTyping }) => {
    const [input, setInput] = useState('');
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
    const messagesEndRef = useRef(null);
    const lastBotMessageRef = useRef(null);
    const inputRef = useRef(null);
    const prevIsTypingRef = useRef(false);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const scrollToLastBotMessage = useCallback(() => {
        // Scroll to the start of the last bot message, not the end
        if (lastBotMessageRef.current) {
            lastBotMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    useEffect(() => {
        // Scroll to bottom when user sends a message (isTyping becomes true)
        if (isTyping && !prevIsTypingRef.current) {
            scrollToBottom();
        }
        // Scroll to start of bot message when bot finishes responding
        else if (!isTyping && prevIsTypingRef.current) {
            // Small delay to let the message render
            setTimeout(scrollToLastBotMessage, 100);
        }

        prevIsTypingRef.current = isTyping;
    }, [isTyping, scrollToBottom, scrollToLastBotMessage]);

    // Also scroll to bottom when shouldScrollToBottom flag is set
    useEffect(() => {
        if (shouldScrollToBottom) {
            scrollToBottom();
            setShouldScrollToBottom(false);
        }
    }, [shouldScrollToBottom, scrollToBottom]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !isTyping) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    const handleQuickReply = (text) => {
        onSendMessage(text);
    };

    const promptStarters = [
        "Explain how binary search works",
        "What is Big O notation?",
        "Help me understand recursion",
        "What are the differences between SQL and NoSQL?",
        "Explain the concept of REST APIs",
        "How does Git branching work?"
    ];

    return (
        <div className="flex-1 flex flex-col h-full bg-primary">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    // Welcome screen
                    <div className="h-full flex flex-col items-center justify-center text-center px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-20 h-20 rounded-full accent-bg-light flex items-center justify-center mx-auto mb-6">
                                <img src="/log.jpeg" alt="Bit Brainic" className="w-12 h-12" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Welcome to Bit Brainic!</h2>
                            <p className="text-secondary mb-8 max-w-md">
                                I'm your AI CS tutor. Ask me anything about programming, algorithms,
                                data structures, or any computer science topic!
                            </p>

                            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
                                {promptStarters.map((prompt, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => handleQuickReply(prompt)}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-secondary border border-theme hover:border-[var(--accent)] text-left transition-colors group"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Sparkles className="w-5 h-5 accent-color flex-shrink-0" />
                                        <span className="text-sm">{prompt}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    // Messages list
                    <>
                        <AnimatePresence>
                            {messages.map((message, index) => {
                                const isLastBotMessage = message.role === 'bot' &&
                                    index === messages.length - 1;
                                return (
                                    <div
                                        key={message._id || message.timestamp}
                                        ref={isLastBotMessage ? lastBotMessageRef : null}
                                    >
                                        <Message
                                            message={message}
                                            isUser={message.role === 'user'}
                                        />
                                    </div>
                                );
                            })}
                        </AnimatePresence>

                        {/* Show quick replies after bot messages */}
                        {messages.length > 0 &&
                            messages[messages.length - 1].role === 'bot' &&
                            !isTyping && (
                                <QuickReplies
                                    suggestions={[
                                        "Tell me more",
                                        "Show me an example",
                                        "What's next?"
                                    ]}
                                    onSelect={handleQuickReply}
                                />
                            )}
                    </>
                )}

                {/* Typing indicator */}
                {isTyping && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center">
                            <img src="/log.jpeg" alt="Bot" className="w-6 h-6" />
                        </div>
                        <div className="bg-secondary border border-theme rounded-2xl rounded-tl-none">
                            <TypingIndicator />
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-theme bg-secondary">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    <div className="relative flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything about CS..."
                            className="input pr-12"
                            disabled={isTyping}
                        />
                        <motion.button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className={`absolute right-2 p-2 rounded-lg transition-colors ${input.trim() && !isTyping
                                ? 'accent-bg text-white'
                                : 'bg-tertiary text-muted cursor-not-allowed'
                                }`}
                            whileHover={input.trim() && !isTyping ? { scale: 1.05 } : {}}
                            whileTap={input.trim() && !isTyping ? { scale: 0.95 } : {}}
                        >
                            <Send className="w-4 h-4" />
                        </motion.button>
                    </div>
                    <p className="text-xs text-muted text-center mt-2">
                        Bit Brainic can make mistakes. Please verify important information.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ChatPanel;
