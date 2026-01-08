import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const CodeBlock = ({ code, language = 'javascript' }) => {
    const [copied, setCopied] = useState(false);
    const { isDark } = useTheme();

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-lg overflow-hidden my-3">
            <div className="flex items-center justify-between px-4 py-2 bg-tertiary border-b border-theme">
                <span className="text-xs font-medium text-muted uppercase">{language}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs text-muted hover:text-primary transition-colors"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4 text-green-500" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            Copy
                        </>
                    )}
                </button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={isDark ? oneDark : oneLight}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    borderRadius: 0
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
