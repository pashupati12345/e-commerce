const express = require("express");
const {
  userSignup,
  userLogin,
  adminLogin,
  userLogout,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/admin/login", adminLogin);
router.post("/logout", authMiddleware, userLogout);

module.exports = router;