const { getAllUsers } = require("../services/user.service");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    console.log("Fetched users:", users); // Debug log

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to fetch users",
    });
  }
};

module.exports = {
  getUsers,
};