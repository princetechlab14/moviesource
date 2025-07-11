const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ProfileSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    creatorId: { type: String, default: null },
    displayName: { type: String, default: null },
    bio: { type: String, default: null },
    twitterId: { type: String, default: null },
    website: { type: String, default: null },
    profileImageUrl: { type: String, default: null }
}, {
    timestamps: true,
    collection: 'profile'
});

module.exports = mongoose.model('Profile', ProfileSchema);