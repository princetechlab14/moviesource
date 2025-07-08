module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        imageName: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: "product",
        timestamps: true
    });

    return Product;
};
