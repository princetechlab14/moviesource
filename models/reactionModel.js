const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
    movieId: { type: String, default: null },
    userId: { type: String, default: null },
    name: { type: String, default: null }
}, {
    timestamps: true,
    collection: 'reaction'
});

// ✅ Convert _id → id automatically in all JSON responses
ReactionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('Reaction', ReactionSchema);