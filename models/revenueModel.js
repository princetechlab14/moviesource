const mongoose = require('mongoose');

const RevenueSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    userId: { type: Number, required: true },
    revenueStream: {
        type: String,
        enum: ['digitalGoods', 'subscription', 'rent', 'buy'],
        required: true
    },
    amount: { type: Number, required: true, default: 0 },
    date: { type: Date, default: null },
    isRecurring: { type: Boolean, required: true, default: false }
}, {
    timestamps: false,
    collection: 'revenue'
});

module.exports = mongoose.model('Revenue', RevenueSchema);