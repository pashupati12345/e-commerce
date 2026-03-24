const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { User, UserSession } = require("../model");
const { generateToken } = require("../utils/jwt");

const signupUser = async ({ name, email, password, role = "user" }) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  console.log(isPasswordMatch,"aaaaaaaaaaaaaaaaaaaaaa")

  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  console.log(token,"token") // ✅ Debug: check generated token (safe)

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await UserSession.create({
    userId: user.id,
    token,
    loginAt: new Date(),
    logoutAt: null,
    isActive: true,
    expiresAt,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const logoutUser = async (token) => {
  const session = await UserSession.findOne({
    where: {
      token,
      isActive: true,
    },
  });

  if (!session) {
    throw new Error("Session not found or already logged out");
  }

  session.isActive = false;
  session.logoutAt = new Date();
  await session.save();

  return true;
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
};