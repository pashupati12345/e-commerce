const { UserSession } = require("../model");
const { verifyToken } = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    const session = await UserSession.findOne({
      where: {
        token,
        isActive: true,
      },
    });

    if (!session) {
      return res.status(401).json({
        message: "Token invalid or already logged out",
      });
    }

    req.user = decoded;
    req.token = token;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = authMiddleware;