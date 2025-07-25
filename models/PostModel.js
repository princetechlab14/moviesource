const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: { type: String, default: null },
    title: { type: String, default: null },
    description: { type: String, default: null },

    // ✅ Only one image and one video per post
    image: [String],
    video: [String],

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
    collection: 'post'
});

PostSchema.virtual('likeCount').get(function () {
    return this.likes.length;
});

PostSchema.virtual('shareCount').get(function () {
    return this.shares.length;
});

PostSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('Post', PostSchema);