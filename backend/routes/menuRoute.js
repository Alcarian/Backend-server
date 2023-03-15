const menuControlleur = require("../controllers/menuController");

const express = require("express");

// fonction Router() de express
const router = express.Router();

router.get("/", menuControlleur.readAllMenu);

module.exports = router;
