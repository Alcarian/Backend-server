const adminController = require("../controllers/adminController");

const express = require("express");

// fonction Router() de express
const router = express.Router();

router.put("/updateMenu", adminController.updateMenu);

module.exports = router;
