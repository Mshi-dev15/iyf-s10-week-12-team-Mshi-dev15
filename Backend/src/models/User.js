// backend/src/models/User.js
// B3 Task — User model with password hashing, roles, and location

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
        // ── Basic Info ────────────────────────────────────────────────────────
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters']
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,                         // no two users share an email
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false                         // never returned in queries by default
        },

        // ── Role ─────────────────────────────────────────────────────────────
        // user    = youth seeking opportunities (default)
        // organization = NGO / company / school posting opportunities
        // admin   = platform moderator with full permissions
        role: {
            type: String,
            enum: ['user', 'organization', 'admin'],
            default: 'user'
        },

        // ── Location ─────────────────────────────────────────────────────────
        // Kenya-specific: county + town so users can filter opportunities near them
        county: {
            type: String,
            trim: true,
            default: ''
        },

        town: {
            type: String,
            trim: true,
            default: ''
        },

        // ── Profile ───────────────────────────────────────────────────────────
        bio: {
            type: String,
            maxlength: [300, 'Bio cannot exceed 300 characters'],
            default: ''
        },

        // Categories the user is interested in — used for notifications later
        interests: {
            type: [String],
            enum: ['internship', 'gig', 'volunteering', 'event'],
            default: []
        },

        // ── Account Status ────────────────────────────────────────────────────
        isActive: {
            type: Boolean,
            default: true                         // admin can deactivate accounts
        }
    },
    {
        timestamps: true                          // adds createdAt and updatedAt automatically
    }
);

// ── Password Hashing (before saving) ─────────────────────────────────────────
// This runs automatically every time a user is saved or their password changes.
// We NEVER store plain text passwords — bcrypt turns "mypassword" into a hash.
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // only hash if password changed

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// ── Instance Method: Compare Password ────────────────────────────────────────
// Used during login: compares what the user typed with the stored hash
// Usage: const isMatch = await user.comparePassword('whattheytyped');
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// ── Static Method: Find By Email ──────────────────────────────────────────────
// Usage: const user = await User.findByEmail('test@example.com');
UserSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email.toLowerCase() }).select('+password');
};

// ── Virtual: Full Location ────────────────────────────────────────────────────
// Combines county + town into one readable string
// Usage: user.location → "Nairobi, Westlands"
UserSchema.virtual('location').get(function () {
    if (this.county && this.town) return `${this.town}, ${this.county}`;
    return this.county || this.town || 'Kenya';
});

module.exports = mongoose.model('User', UserSchema);