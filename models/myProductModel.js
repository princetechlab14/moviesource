module.exports = (sequelize, DataTypes) => {
    const MyProduct = sequelize.define("my_product", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        }
    }, {
        tableName: "my_product",
        timestamps: true
    });

    return MyProduct;
};
