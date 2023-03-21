const bookingController = require("../controllers/bookingController");

const express = require("express");

// fonction Router() de express
const router = express.Router();

router.post("/", bookingController.postBooking);

module.exports = router;
