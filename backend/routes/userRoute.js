const express = require("express");

// import du middleware password
const password = require("../middleware/password");
const userController = require("../controllers/user");

// fonction Router() de express
const router = express.Router();

// la route (endpoint) sign up
router.post("/signup", password, userController.signup);

// La route (endpoin) Login
router.post("/login", userController.login);

//la route login

module.exports = router;
