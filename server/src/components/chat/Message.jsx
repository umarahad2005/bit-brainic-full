import { motion } from 'framer-motion';
import CodeBlock from '../ui/CodeBlock';

const Message = ({ message, isUser }) => {
    // Parse message content for code blocks
    const parseContent = (content) => {
        const parts = [];
        const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(content)) !== null) {
            // Add text before code block
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: content.slice(lastIndex, match.index)
                });
            }

            // Add code block
            parts.push({
                type: 'code',
                language: match[1] || 'plaintext',
                content: match[2].trim()
            });

            lastIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (lastIndex < content.length) {
            parts.push({
                type: 'text',
                content: content.slice(lastIndex)
            });
        }

        return parts.length > 0 ? parts : [{ type: 'text', content }];
    };

    const renderContent = () => {
        const parts = parseContent(message.content);

        return parts.map((part, index) => {
            if (part.type === 'code') {
                return (
                    <CodeBlock
                        key={index}
                        code={part.content}
                        language={part.language}
                    />
                );
            }

            // Render text with basic markdown
            return (
                <div
                    key={index}
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                        __html: part.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-tertiary text-sm font-mono">$1</code>')
                    }}
                />
            );
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
        >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'accent-bg text-white' : 'bg-tertiary'
                }`}>
                {isUser ? (
                    <span className="text-sm font-semibold">U</span>
                ) : (
                    <img src="/log.jpeg" alt="Bot" className="w-6 h-6" />
                )}
            </div>

            {/* Message bubble */}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser
                    ? 'accent-bg text-white rounded-tr-none'
                    : 'bg-secondary border border-theme rounded-tl-none'
                }`}>
                {renderContent()}
                <div className={`text-xs mt-2 ${isUser ? 'text-white/70' : 'text-muted'}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </motion.div>
    );
};

export default Message;
