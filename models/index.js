const { Sequelize, DataTypes } = require('sequelize');
const mongoose = require('mongoose');

const CONNECTION_URL = process.env.MONGO_URL;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

const db = {};
db.mongoose = mongoose;
db.AdminModel = require('./adminModel');
db.UserModel = require('./userModel');
// db.AdminModel = require('./adminModel')(sequelize, Sequelize, DataTypes);
// db.UserModel = require('./userModel')(sequelize, Sequelize, DataTypes);
// db.CostModel = require('./costModel')(sequelize, Sequelize, DataTypes);
// db.EmojiModel = require('./EmojiModel')(sequelize, Sequelize, DataTypes);
// db.MovieModel = require('./movieModel')(sequelize, Sequelize, DataTypes);
// db.MyProductModel = require('./myProductModel')(sequelize, Sequelize, DataTypes);
// db.NewsModel = require('./newsModel')(sequelize, Sequelize, DataTypes);
// db.PaymentModel = require('./paymentModel')(sequelize, Sequelize, DataTypes);
// db.ProductModel = require('./productModel')(sequelize, Sequelize, DataTypes);
// db.ProfileModel = require('./profileModel')(sequelize, Sequelize, DataTypes);
// db.ReactionModel = require('./reactionModel')(sequelize, Sequelize, DataTypes);
// db.ReportedContentModel = require('./reportedContentModel')(sequelize, Sequelize, DataTypes);
// db.RevenueModel = require('./revenueModel')(sequelize, Sequelize, DataTypes);
// db.stripeAccountModel = require('./stripeAccountModel')(sequelize, Sequelize, DataTypes);

module.exports = db;