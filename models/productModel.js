const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ProductSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
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

module.exports = mongoose.model('Product', ProductSchema);