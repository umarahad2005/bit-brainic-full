// Test script for LangChain Gemini integration
import 'dotenv/config';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';

console.log('Testing LangChain Gemini integration...');
console.log('API Key present:', !!process.env.GEMINI_API_KEY);
console.log('API Key starts with:', process.env.GEMINI_API_KEY?.substring(0, 10) + '...');

try {
    const model = new ChatGoogleGenerativeAI({
        model: 'gemini-1.5-flash',
        apiKey: process.env.GEMINI_API_KEY,
        maxOutputTokens: 2048,
        temperature: 0.7,
    });
    console.log('Model created successfully');

    const messages = [
        new SystemMessage('You are a helpful assistant.'),
        new HumanMessage('Say hello in one sentence.')
    ];
    console.log('Messages created, invoking model...');

    const response = await model.invoke(messages);
    console.log('Response:', response.content);
    console.log('SUCCESS!');
} catch (error) {
    console.error('ERROR:', error.message);
    console.error('Full error:', error);
}
