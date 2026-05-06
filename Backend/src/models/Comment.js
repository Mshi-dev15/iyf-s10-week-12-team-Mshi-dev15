// backend/src/models/Comment.js
// B3 Task — Comment model referencing both User and Opportunity

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        // ── Content ───────────────────────────────────────────────────────────
        content: {
            type: String,
            required: [true, 'Comment content is required'],
            trim: true,
            minlength: [1, 'Comment cannot be empty'],
            maxlength: [500, 'Comment cannot exceed 500 characters']
        },

        // ── Relationships ─────────────────────────────────────────────────────
        // Which user wrote this comment
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        // Which opportunity this comment belongs to
        opportunity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Opportunity',
            required: true
        },

        // ── Moderation ────────────────────────────────────────────────────────
        isHidden: {
            type: Boolean,
            default: false                        // admin can hide toxic comments
        }
    },
    {
        timestamps: true                          // createdAt, updatedAt
    }
);

module.exports = mongoose.model('Comment', CommentSchema);