const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Exportation de la function du middleware
module.exports = (req, res, next) => {
  try {
    // console.log("==> ***********MIIDLEWARE AUTH***************************");
    // console.log(req.headers.authorization);

    // récupérer le token dans le header authorization avec bearer token
    const token = req.headers.authorization.split(" ")[1];

    // décoder le token
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);

    // récupérer le userId du token déchiffré
    const userIdDecodedToken = decodedToken.userId;

    // console.log("==> UserId REQ body request");
    // console.log(req.body.form_user.userId);

    userIdParamsUrl = req.originalUrl.split("=")[1];

    // Comparer les userId
    if (userIdParamsUrl == userIdDecodedToken) {
      console.log("AUTHENTIFICATION OK => MIDDLEWARE SUIVANT");
      next();
    } else {
      throw "Erreur identification : userId incorrect";
    }

    // s'il y a des erreurs dans le try on les récupère ici
  } catch (error) {
    res.status(401).json({
      message: "Echec Authentification",
      error: error,
    });
  }
};
