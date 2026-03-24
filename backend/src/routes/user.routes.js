const express = require("express");
const { getUsers } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", authMiddleware, authorizeRoles("admin"), getUsers);

module.exports = router;