const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || "localhost",
        dialect: 'mysql',
        pool: {
            max: 20,
            min: 2,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        },
        logging: false
    }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.AdminModel = require('./adminModel')(sequelize, Sequelize, DataTypes);
db.UserModel = require('./userModel')(sequelize, Sequelize, DataTypes);
db.CostModel = require('./costModel')(sequelize, Sequelize, DataTypes);
db.EmojiModel = require('./EmojiModel')(sequelize, Sequelize, DataTypes);
db.MovieModel = require('./movieModel')(sequelize, Sequelize, DataTypes);
db.MyProductModel = require('./myProductModel')(sequelize, Sequelize, DataTypes);
db.NewsModel = require('./newsModel')(sequelize, Sequelize, DataTypes);
db.PaymentModel = require('./paymentModel')(sequelize, Sequelize, DataTypes);
db.ProductModel = require('./productModel')(sequelize, Sequelize, DataTypes);
db.ProfileModel = require('./profileModel')(sequelize, Sequelize, DataTypes);
db.ReactionModel = require('./reactionModel')(sequelize, Sequelize, DataTypes);
db.ReportedContentModel = require('./reportedContentModel')(sequelize, Sequelize, DataTypes);
db.RevenueModel = require('./revenueModel')(sequelize, Sequelize, DataTypes);
db.stripeAccountModel = require('./stripeAccountModel')(sequelize, Sequelize, DataTypes);

module.exports = db;