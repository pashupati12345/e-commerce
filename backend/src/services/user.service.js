const { User, UserSession } = require("../model");

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: UserSession,
        as: "sessions",
        attributes: ["id", "loginAt", "logoutAt", "isActive", "expiresAt"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return users;
};

module.exports = {
  getAllUsers,
};