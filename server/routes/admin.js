import express from 'express';
import User from '../models/User.js';
import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import { adminAuth, adminProtect } from '../middleware/admin.js';

const router = express.Router();

// @route   POST /api/admin/verify
// @desc    Verify admin password
// @access  Public (but requires password)
router.post('/verify', adminAuth, (req, res) => {
    res.json({ success: true, message: 'Admin verified' });
});

// @route   GET /api/admin/stats
// @desc    Get admin statistics
// @access  Admin
router.get('/stats', adminProtect, async (req, res) => {
    try {
        // Total users
        const totalUsers = await User.countDocuments();

        // New users this week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newUsersThisWeek = await User.countDocuments({
            createdAt: { $gte: oneWeekAgo }
        });

        // Total chats
        const totalChats = await Chat.countDocuments();

        // Total messages
        const totalMessages = await Message.countDocuments();

        // Average messages per chat
        const avgMessagesPerChat = totalChats > 0
            ? Math.round(totalMessages / totalChats)
            : 0;

        // User activity over the last 7 days
        const userActivityByDay = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: oneWeekAgo }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Chat activity over the last 7 days
        const chatActivityByDay = await Chat.aggregate([
            {
                $match: {
                    createdAt: { $gte: oneWeekAgo }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Top active users
        const topUsers = await Chat.aggregate([
            {
                $group: {
                    _id: '$userId',
                    chatCount: { $sum: 1 }
                }
            },
            { $sort: { chatCount: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $project: {
                    _id: 1,
                    chatCount: 1,
                    name: { $arrayElemAt: ['$user.name', 0] },
                    email: { $arrayElemAt: ['$user.email', 0] }
                }
            }
        ]);

        res.json({
            overview: {
                totalUsers,
                newUsersThisWeek,
                totalChats,
                totalMessages,
                avgMessagesPerChat
            },
            charts: {
                userActivityByDay,
                chatActivityByDay
            },
            topUsers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
