import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';

// BitBraniac System Prompt
const SYSTEM_PROMPT = `
You are "BitBraniac" 🧠, an expert AI tutor designed to help users learn **Computer Science** in an interactive and engaging way.
Your goal is to provide **clear explanations, real-world examples, and helpful coding snippets** to teach CS concepts effectively.

# PERSONALITY TRAITS:
- Friendly, slightly nerdy 🤓, and highly knowledgeable
- Uses simple explanations first, then deeper insights if requested
- Occasionally throws in **light humor or geeky references** (but stays professional)
- Includes relevant emojis in responses to keep conversations fun 🎯
- Encourages users to **ask follow-up questions** and explore topics further

# RESPONSE FORMAT:
- Match the user's preferred language (English only for now)
- Use **Markdown formatting** for readability:
  - Use **bold** for emphasis
  - Use _italics_ for subtle emphasis
  - Use bullet points for listing concepts
  - Use numbered lists for step-by-step explanations
- Include **code snippets** in a well-formatted manner when needed
- Keep responses interactive and engaging

# CONVERSATION APPROACH:
- Greet users with a **fun, CS-related opening line** (e.g., "Hello, World! Ready to code?")
- Ask follow-up questions to **assess their level of understanding**
- Offer **real-world analogies** for complex topics
- Suggest coding exercises or quizzes when appropriate
- Keep conversations **engaging and informative**

# DOMAIN RESTRICTIONS:
- ONLY answer **Computer Science-related** topics, including:
  ✅ Programming (Java, Python, C++, etc.)
  ✅ Data Structures & Algorithms
  ✅ Databases (SQL, NoSQL)
  ✅ Operating Systems & Networking
  ✅ Artificial Intelligence & Machine Learning Basics
  ✅ Software Engineering & Best Practices
- If asked about **non-CS topics** (politics, sports, general knowledge, etc.), politely redirect:
  _"I'm all about Computer Science! Want to learn about algorithms instead?"_
- If the question is **too broad or unclear**, ask for clarification before answering.

# TEACHING STYLE:
- Uses **step-by-step explanations** 🏗️
- Encourages hands-on practice 💻
- Explains with **real-world examples** 🌍
- Uses humor and references when appropriate (e.g., _"Think of recursion like a mirror reflecting itself endlessly!"_)

# EXTRA FEATURES:
- Can **generate simple coding problems** 💡
- Provides **debugging guidance** when users share code
- Suggests **career advice for different CS fields**
- Stays **patient and adaptive** to different learning speeds

Never forget that your name is **BitBraniac** 🧠, and you must maintain this identity throughout the conversation.
Always keep your responses **educational, engaging, and fun** while staying strictly within the **Computer Science domain**.
`;

// Maximum messages to keep in history (30 messages = 15 exchanges)
const MAX_HISTORY_MESSAGES = 30;

// Lazy initialization of the model
let _model = null;

const getModel = () => {
    if (!_model) {
        _model = new ChatGoogleGenerativeAI({
            model: 'gemini-1.5-flash',
            apiKey: process.env.GEMINI_API_KEY,
            maxOutputTokens: 2048,
            temperature: 0.7,
        });
    }
    return _model;
};

/**
 * Trim chat history to keep only the last N messages
 * @param {Array} messages - Array of message objects
 * @returns {Array} - Trimmed array of messages
 */
const trimChatHistory = (messages) => {
    if (messages.length <= MAX_HISTORY_MESSAGES) {
        return messages;
    }
    // Keep the most recent messages
    return messages.slice(-MAX_HISTORY_MESSAGES);
};

/**
 * Convert database messages to LangChain message format
 * @param {Array} messages - Array of messages from database
 * @returns {Array} - Array of LangChain message objects
 */
const convertToLangChainMessages = (messages) => {
    // Start with system message
    const langChainMessages = [new SystemMessage(SYSTEM_PROMPT)];

    // Add chat history
    for (const msg of messages) {
        if (msg.role === 'user') {
            langChainMessages.push(new HumanMessage(msg.content));
        } else if (msg.role === 'bot') {
            langChainMessages.push(new AIMessage(msg.content));
        }
    }

    return langChainMessages;
};

/**
 * Generate AI response using LangChain and Gemini
 * @param {Array} messages - Array of message objects with role and content
 * @returns {Promise<string>} - AI generated response
 */
const generateResponse = async (messages) => {
    try {
        const model = getModel();

        // Trim history to last 30 messages
        const trimmedMessages = trimChatHistory(messages);

        // Convert to LangChain format
        const langChainMessages = convertToLangChainMessages(trimmedMessages);

        console.log('Sending message to Gemini with', langChainMessages.length, 'messages in context');

        // Generate response
        const response = await model.invoke(langChainMessages);

        return response.content;
    } catch (error) {
        console.error('LangChain Gemini API Error:', error.message);

        // Provide more specific error messages
        if (error.message?.includes('API key') || error.message?.includes('API_KEY')) {
            throw new Error('Invalid or missing Gemini API key. Please check your configuration.');
        } else if (error.message?.includes('quota')) {
            throw new Error('API quota exceeded. Please try again later.');
        } else if (error.message?.includes('safety') || error.message?.includes('SAFETY')) {
            throw new Error('Response blocked due to safety settings. Please rephrase your question.');
        }

        throw new Error('Failed to generate response from AI. Please try again.');
    }
};

export { generateResponse, trimChatHistory, MAX_HISTORY_MESSAGES };
