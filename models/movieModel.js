module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define("movie", {
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
        genre: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {
            type: DataTypes.ENUM("Movie", "Highlight", "Thank you"),
            allowNull: true
        },
        keywords: {
            type: DataTypes.JSON,
            allowNull: true
        },
        originalUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hlsUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isThankYou: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isHighlight: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: "movie",
        timestamps: true
    });

    return Movie;
};
