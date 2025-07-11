const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const EmojiSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    productId: { type: String, required: true },
    userId: { type: String, default: null },
    name: { type: String, required: true },
}, {
    collection: 'emoji',
    timestamps: false
});

module.exports = mongoose.model('Emoji', EmojiSchema);