const express = require("express");

// import du middleware password
const password = require("../middleware/password");

// Import middleware authentification
const auth = require("../middleware/authentification");

const userController = require("../controllers/user");

// fonction Router() de express
const router = express.Router();

// la route (endpoint) sign up
router.post("/signup", password, userController.signup);

// La route (endpoin) Login
router.post("/login", userController.login);

// La route (endpoint) users
router.get("/infos", auth, userController.readInfos);

// La route (endpoint) usersUpdate
router.put("/userUpdate", userController.userUpdate);

// La route (endpoint) deleteUser
router.delete("/deleteUser", auth, userController.deleteUser);

//la route login
module.exports = router;
