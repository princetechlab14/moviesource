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

// ✅ Convert _id → id automatically in all JSON responses
AdminSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});
module.exports = mongoose.model('Admin', AdminSchema);
