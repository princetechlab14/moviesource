const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId: { type: String, default: null },
    title: { type: String, default: null },
    description: { type: String, default: null },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    imageName: { type: String, default: null }
}, {
    timestamps: true,
    collection: 'product'
});

// ✅ Convert _id → id automatically in all JSON responses
ProductSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('Product', ProductSchema);