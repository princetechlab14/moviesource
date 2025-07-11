const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MyProductSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    userId: { type: String, default: null },
    productId: { type: String, default: null },
    quantity: { type: Number, default: 1 }
}, {
    collection: "my_product",
    timestamps: true
});

module.exports = mongoose.model('MyProduct', MyProductSchema);
