
module.exports = (sequelize, DataTypes) => {
    const StripeAccount = sequelize.define("stripe_account", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        accountId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        defaultCurrency: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        tableName: "stripe_account",
        timestamps: false
    });

    return StripeAccount;
};
