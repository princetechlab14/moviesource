module.exports = (sequelize, DataTypes) => {
    const ReportedContent = sequelize.define("reported_content", {
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
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        tableName: "reported_content",
        timestamps: true
    });

    return ReportedContent;
};
