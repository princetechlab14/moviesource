const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const PaymentSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
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

module.exports = mongoose.model('Payment', PaymentSchema);