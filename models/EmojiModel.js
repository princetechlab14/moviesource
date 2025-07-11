const mongoose = require('mongoose');

const EmojiSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    userId: { type: String, default: null },
    name: { type: String, required: true },
}, {
    collection: 'emoji',
    timestamps: false
});

// ✅ Convert _id → id automatically in all JSON responses
EmojiSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('Emoji', EmojiSchema);