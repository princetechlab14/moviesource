const { Sequelize, DataTypes } = require('sequelize');
const mongoose = require('mongoose');

const CONNECTION_URL = process.env.MONGO_URL;

mongoose.connect(CONNECTION_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(async () => {
        console.log("MongoDB connected")
        // try {
        //     const indexes = await mongoose.connection.db.collection("users").indexes();
        //     const hasWrongIndex = indexes.some(idx => idx.name === "id_1");
        //     if (hasWrongIndex) {
        //         await mongoose.connection.db.collection("users").dropIndex("id_1");
        //         console.log("🗑️ Dropped bad index: id_1");
        //     }
        // } catch (err) {
        //     console.error("⚠️ Failed to check/drop index:", err.message);
        // }
    })
    .catch((err) => console.error("MongoDB connection error:", err));

const db = {};
db.mongoose = mongoose;
db.AdminModel = require('./adminModel');
db.UserModel = require('./userModel');
db.CostModel = require('./costModel');
db.EmojiModel = require('./EmojiModel');
db.MovieModel = require('./movieModel');
db.MyProductModel = require('./myProductModel');
db.NewsModel = require('./newsModel');
db.PaymentModel = require('./paymentModel');
db.ProductModel = require('./productModel');
db.ProfileModel = require('./profileModel');
db.ReactionModel = require('./reactionModel');
db.ReportedContentModel = require('./reportedContentModel');
db.RevenueModel = require('./revenueModel');
db.StripeAccountModel = require('./stripeAccountModel');
db.PostModel = require('./PostModel');

module.exports = db;