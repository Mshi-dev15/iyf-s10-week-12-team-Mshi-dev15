// backend/src/models/Opportunity.js
// B3 Task — Main post model (opportunities: internships, gigs, volunteering, events)
// This is the heart of CommunityHub Kenya

const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema(
    {
        // ── Core Content ──────────────────────────────────────────────────────
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [5, 'Title must be at least 5 characters'],
            maxlength: [100, 'Title cannot exceed 100 characters']
        },

        description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: [20, 'Description must be at least 20 characters'],
            maxlength: [2000, 'Description cannot exceed 2000 characters']
        },

        // ── Category ──────────────────────────────────────────────────────────
        // What type of opportunity is this?
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: {
                values: ['internship', 'gig', 'volunteering', 'event'],
                message: 'Category must be internship, gig, volunteering, or event'
            }
        },

        // Sub-category for events specifically
        // e.g. a hackathon vs a seminar vs a networking event
        eventType: {
            type: String,
            enum: ['hackathon', 'seminar', 'workshop', 'networking', 'other'],
            default: null                         // only relevant when category = 'event'
        },

        // ── Location ─────────────────────────────────────────────────────────
        // Kenya-first: county + town for local filtering
        county: {
            type: String,
            required: [true, 'County is required'],
            trim: true
        },

        town: {
            type: String,
            trim: true,
            default: ''
        },

        isRemote: {
            type: Boolean,
            default: false                        // remote opportunities show across all counties
        },

        // ── Author / Ownership ────────────────────────────────────────────────
        // References the User who posted this opportunity
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        // Organization name — can be filled by organization accounts
        organizationName: {
            type: String,
            trim: true,
            default: ''
        },

        // ── Dates ─────────────────────────────────────────────────────────────
        deadline: {
            type: Date,
            default: null                         // null means no deadline
        },

        eventDate: {
            type: Date,
            default: null                         // only for events
        },

        // ── Votes (Reddit-style upvotes/downvotes) ────────────────────────────
        // Instead of simple likes, we track who upvoted and who downvoted
        // This lets us calculate a score and moderate low-quality posts
        upvotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        downvotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        // ── Moderation ────────────────────────────────────────────────────────
        // Status changes automatically when downvotes get too high
        // admin can also manually change this
        status: {
            type: String,
            enum: ['active', 'hidden', 'moderated', 'closed'],
            default: 'active'
        },

        // Tags for better searchability e.g. ["react", "paid", "nairobi"]
        tags: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true,                         // createdAt, updatedAt
        toJSON: { virtuals: true },               // include virtuals when converting to JSON
        toObject: { virtuals: true }
    }
);

// ── Text Index for Search ─────────────────────────────────────────────────────
// This allows fast full-text search on title, description, and tags
// Usage: Opportunity.find({ $text: { $search: 'software intern nairobi' } })
OpportunitySchema.index({
    title: 'text',
    description: 'text',
    tags: 'text',
    county: 'text',
    town: 'text'
});

// ── Virtual: Vote Score ───────────────────────────────────────────────────────
// Score = upvotes - downvotes (like Reddit)
// Usage: opportunity.voteScore → 42
OpportunitySchema.virtual('voteScore').get(function () {
    return this.upvotes.length - this.downvotes.length;
});

// ── Virtual: Comment List ─────────────────────────────────────────────────────
// Populate comments from the Comment model
// Usage: await opportunity.populate('commentList')
OpportunitySchema.virtual('commentList', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'opportunity'
});

// ── Virtual: Is Expired ───────────────────────────────────────────────────────
// True if the deadline has passed
OpportunitySchema.virtual('isExpired').get(function () {
    if (!this.deadline) return false;
    return new Date() > this.deadline;
});

// ── Static Method: Find By Author ─────────────────────────────────────────────
// Usage: const posts = await Opportunity.findByAuthor(userId);
OpportunitySchema.statics.findByAuthor = function (userId) {
    return this.find({ author: userId }).sort({ createdAt: -1 });
};

// ── Auto-moderate on save ─────────────────────────────────────────────────────
// If downvotes exceed 10 AND downvotes are more than 2x upvotes → hide the post
OpportunitySchema.pre('save', function (next) {
    const downvoteCount = this.downvotes.length;
    const upvoteCount = this.upvotes.length;

    if (downvoteCount >= 10 && downvoteCount > upvoteCount * 2) {
        this.status = 'hidden';
    }

    next();
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);