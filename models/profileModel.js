const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
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

// ✅ Convert _id → id automatically in all JSON responses
ProfileSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('Profile', ProfileSchema);