const express = require("express");

const formUserController = require("../controllers/formUserController");

// Import middleware authentification
const auth = require("../middleware/authentification");

// fonction Router() de express
const router = express.Router();

// Les routes
router.post("/", auth, formUserController.createFormUser);

router.get("/", auth, formUserController.readAllFormUser);

router.get("/:id", auth, formUserController.readOneFormUser);

router.put("/:id", auth, formUserController.updateOneFormUser);

// Exportation
module.exports = router;
