module.exports = (sequelize, DataTypes) => {
    const Cost = sequelize.define("cost", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
        },
        from: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        to: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        videoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        costType: {
            type: DataTypes.ENUM('view', 'emoji', 'rent', 'buy'),
            allowNull: false,
            defaultValue: 'view',
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName: 'cost',
        timestamps: false
    });

    return Cost;
};
