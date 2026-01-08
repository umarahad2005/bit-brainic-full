import api from './axios';

// Auth APIs
export const authApi = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data),
    getMe: () => api.get('/auth/me')
};

// Chat APIs
export const chatApi = {
    getChats: () => api.get('/chat'),
    createChat: (title) => api.post('/chat', { title }),
    getChat: (id) => api.get(`/chat/${id}`),
    sendMessage: (chatId, content) => api.post(`/chat/${chatId}/message`, { content }),
    updateChat: (id, title) => api.put(`/chat/${id}`, { title }),
    deleteChat: (id) => api.delete(`/chat/${id}`)
};

// Admin APIs
export const adminApi = {
    verify: (password) => api.post('/admin/verify', { password }),
    getStats: (password) => api.get('/admin/stats', {
        headers: { 'x-admin-password': password }
    })
};
