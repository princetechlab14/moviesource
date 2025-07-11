const mongoose = require('mongoose');

const MyProductSchema = new mongoose.Schema({
    userId: { type: String, default: null },
    productId: { type: String, default: null },
    quantity: { type: Number, default: 1 }
}, {
    collection: "my_product",
    timestamps: true
});

// ✅ Convert _id → id automatically in all JSON responses
MyProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('MyProduct', MyProductSchema);
