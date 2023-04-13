const hoursControlleur = require("../controllers/hoursController");

const express = require("express");

// fonction Router() de express
const router = express.Router();

router.get("/", hoursControlleur.readAllHours);

module.exports = router;
