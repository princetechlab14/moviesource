const mongoose = require('mongoose');

const CostSchema = new mongoose.Schema({
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

// ✅ Convert _id → id automatically in all JSON responses
CostSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('Cost', CostSchema);
