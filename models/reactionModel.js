module.exports = (sequelize, DataTypes) => {
    const Reaction = sequelize.define("reaction", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        movieId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: "reaction",
        timestamps: true,
    });

    return Reaction;
};
