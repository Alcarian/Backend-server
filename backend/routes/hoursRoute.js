const hoursControlleur = require("../controllers/hoursController");

const express = require("express");

// fonction Router() de express
const router = express.Router();

router.get("/", hoursControlleur.readAllHours);

router.update("/updateHours", hoursControlleur.updateHours);

module.exports = router;
