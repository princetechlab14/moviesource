const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MovieSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    creatorId: { type: String, default: null },
    title: { type: String, default: null },
    description: { type: String, default: null },
    genre: { type: String, default: null },
    category: {
        type: String,
        enum: ["Movie", "Highlight", "Thank you"],
        default: null
    },
    keywords: { type: [String], default: [] }, // equivalent to JSON array
    originalUrl: { type: String, default: null },
    hlsUrl: { type: String, default: null },
    isThankYou: { type: Boolean, default: false },
    isHighlight: { type: Boolean, default: false },
}, {
    collection: "movie",
    timestamps: true // createdAt & updatedAt
});

module.exports = mongoose.model('Movie', MovieSchema);
