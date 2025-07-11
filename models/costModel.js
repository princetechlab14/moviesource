const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const CostSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true, default: '' },
    from: { type: Number, required: true, default: 0 },
    to: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: true, default: 0 },
    videoId: { type: Number, required: true, default: 0 },
    costType: {
        type: String,
        enum: ['view', 'emoji', 'rent', 'buy'],
        required: true,
        default: 'view'
    },
    date: { type: Date, default: null }
}, {
    collection: 'cost',
    timestamps: false
});

module.exports = mongoose.model('Cost', CostSchema);
