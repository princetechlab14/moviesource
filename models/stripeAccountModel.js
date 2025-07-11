const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const StripeAccountSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    accountId: { type: String, default: null },
    defaultCurrency: { type: String, default: null }
}, {
    timestamps: false,
    collection: 'stripe_account'
});

module.exports = mongoose.model('StripeAccount', StripeAccountSchema);