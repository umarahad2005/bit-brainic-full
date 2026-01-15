import api from './axios';

// Auth APIs
export const authApi = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data),
    getMe: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data),
    updatePassword: (currentPassword, newPassword) => api.put('/auth/password', { currentPassword, newPassword }),
    updateInterests: (interests) => api.put('/auth/interests', { interests }),
    updatePersona: (persona) => api.put('/auth/persona', { persona }),
    deleteAccount: () => api.delete('/auth/account')
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
    }),
    getPublicStats: () => api.get('/admin/public-stats'),
    getUsers: (password, params = {}) => api.get('/admin/users', {
        headers: { 'x-admin-password': password },
        params
    }),
    getUser: (password, id) => api.get(`/admin/users/${id}`, {
        headers: { 'x-admin-password': password }
    }),
    updateUser: (password, id, data) => api.put(`/admin/users/${id}`, data, {
        headers: { 'x-admin-password': password }
    }),
    deleteUser: (password, id) => api.delete(`/admin/users/${id}`, {
        headers: { 'x-admin-password': password }
    })
};
