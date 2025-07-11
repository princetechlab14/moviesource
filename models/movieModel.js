const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
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

// ✅ Convert _id → id automatically in all JSON responses
MovieSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('Movie', MovieSchema);
