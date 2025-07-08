module.exports = (sequelize, DataTypes) => {
    const Revenue = sequelize.define("revenue", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        revenueStream: {
            type: DataTypes.ENUM('digitalGoods', 'subscription', 'rent', 'buy'),
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        isRecurring: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        tableName: 'revenue',
        timestamps: false
    });

    return Revenue;
};
