module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define("news", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        creatorId: {
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
        body: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        category: {
            type: DataTypes.ENUM("Movie", "Highlight", "Thank you", "News"),
            allowNull: false,
            defaultValue: "News"
        },
        keywords: {
            type: DataTypes.JSON,
            allowNull: true
        },
        image: {
            type: DataTypes.JSON,
            allowNull: true
        },
        video: {
            type: DataTypes.JSON,
            allowNull: true
        }
    }, {
        tableName: "news",
        timestamps: true
    });

    return News;
};
