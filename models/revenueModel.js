const mongoose = require('mongoose');

const RevenueSchema = new mongoose.Schema({
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

RevenueSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

module.exports = mongoose.model('Revenue', RevenueSchema);