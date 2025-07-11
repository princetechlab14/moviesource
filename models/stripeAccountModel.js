const mongoose = require('mongoose');

const StripeAccountSchema = new mongoose.Schema({
    accountId: { type: String, default: null },
    defaultCurrency: { type: String, default: null }
}, {
    timestamps: false,
    collection: 'stripe_account'
});

// ✅ Convert _id → id automatically in all JSON responses
StripeAccountSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('StripeAccount', StripeAccountSchema);