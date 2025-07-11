const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ReportedContentSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    movieId: { type: String, default: null },
    username: { type: String, default: null },
    comment: { type: String, default: null }
}, {
    timestamps: true,
    collection: 'reported_content'
});

module.exports = mongoose.model('ReportedContent', ReportedContentSchema);
