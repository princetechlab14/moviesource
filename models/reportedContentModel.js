const mongoose = require('mongoose');

const ReportedContentSchema = new mongoose.Schema({
    movieId: { type: String, default: null },
    username: { type: String, default: null },
    comment: { type: String, default: null }
}, {
    timestamps: true,
    collection: 'reported_content'
});

// ✅ Convert _id → id automatically in all JSON responses
ReportedContentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('ReportedContent', ReportedContentSchema);
