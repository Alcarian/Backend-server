const express = require("express");

const formUserController = require("../controllers/formUserController");

// Import middleware authentification
const auth = require("../middleware/authentification");

// fonction Router() de express
const router = express.Router();

// Les routes
router.post("/", auth, formUserController.createFormUser);

router.get("/", auth, formUserController.readAllFormUser);

router.get("/fiche/", auth, formUserController.readOneFormUser);

router.put("/:id", formUserController.updateOneFormUser);

router.delete("/:id", formUserController.deleteOneFormUser);

// Exportation
module.exports = router;
