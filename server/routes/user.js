const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();

router.post("/register", UserController.CreateUser); //route for registering a new user
router.post("/login", UserController.UserLogin); //route for loggin in a user

module.exports = router;
