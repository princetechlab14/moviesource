const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    jwtToken: { type: String, default: null },
    status: { type: String, enum: ["Active", "InActive"], default: "Active" },
}, {
    timestamps: true
});

// ✅ Convert _id → id automatically in all JSON responses
UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('User', UserSchema);