const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ReactionSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    movieId: { type: String, default: null },
    userId: { type: String, default: null },
    name: { type: String, default: null }
}, {
    timestamps: true,
    collection: 'reaction'
});

module.exports = mongoose.model('Reaction', ReactionSchema);