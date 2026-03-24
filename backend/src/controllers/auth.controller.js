const { signupUser, loginUser, logoutUser } = require("../services/auth.service");

const userSignup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await signupUser({ name, email, password, role: "user" });

    return res.status(201).json({
      message: "Registration successful",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Signup failed",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser({ email, password });

    return res.status(200).json({
      message: "Login successful",
      token: data.token,
      user: data.user,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Login failed",
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser({ email, password });

    if (data.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can login here",
      });
    }

    return res.status(200).json({
      message: "Admin login successful",
      token: data.token,
      user: data.user,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Admin login failed",
    });
  }
};

const userLogout = async (req, res) => {
  try {
    await logoutUser(req.token);

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Logout failed",
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
  adminLogin,
  userLogout,
};