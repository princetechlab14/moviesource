const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["Active", "InActive"], default: "Active" },
    position: { type: String, default: "500" },
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);
