const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jwtToken: { type: String, default: null },
    status: { type: String, enum: ["Active", "InActive"], default: "Active" },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);