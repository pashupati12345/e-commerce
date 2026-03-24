module.exports = (sequelize, DataTypes) => {
  const UserSession = sequelize.define(
    "UserSession",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      loginAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      logoutAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "user_sessions",
      timestamps: true,
    }
  );

  UserSession.associate = (models) => {
    UserSession.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return UserSession;
};