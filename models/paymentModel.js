const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    appProductId: { type: String, default: null },
    name: { type: String, default: null },
    units: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
    userId: { type: String, default: null }
}, {
    collection: "payment",
    timestamps: true
});

// ✅ Convert _id → id automatically in all JSON responses
PaymentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('Payment', PaymentSchema);