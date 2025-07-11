const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
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

// ✅ Convert _id → id automatically in all JSON responses
NewsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('News', NewsSchema);