const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const NewsSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    creatorId: { type: String, default: null },
    title: { type: String, default: null },
    description: { type: String, default: null },
    body: { type: String, default: null },
    category: {
        type: String,
        enum: ["Movie", "Highlight", "Thank you", "News"],
        default: "News"
    },
    keywords: { type: Array, default: [] },
    image: { type: Object, default: null },
    video: { type: Object, default: null }
}, {
    collection: "news",
    timestamps: true
});

module.exports = mongoose.model('News', NewsSchema);