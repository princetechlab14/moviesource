module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("payment", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        appProductId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        units: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: "payment",
        timestamps: true
    });

    return Payment;
};
