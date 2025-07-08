module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("profile", {
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
        displayName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        twitterId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        profileImageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: "profile",
        timestamps: true
    });

    return Profile;
};
