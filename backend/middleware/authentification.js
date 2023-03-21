const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Exportation de la function du middleware
module.exports = (req, res, next) => {
  try {
    // console.log("==> ***********MIIDLEWARE AUTH***************************");
    // console.log(req.headers.authorization);

    // récupérer le token dans le header authorization avec bearer token
    const token = req.headers.authorization.split(" ")[1];
    // console.log("==> TOKEN");
    // console.log(token);

    // décoder le token
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);
    // console.log("==> CONTENU : decodedToken");
    // console.log(decodedToken);

    // récupérer le userId du token déchiffré
    const userIdDecodedToken = decodedToken.userId;
    // console.log("==>CONTENU : userId du decoded TOKEN");
    // console.log(userIdDecodedToken);

    // console.log("==> UserId REQ body request");
    // console.log(req.body.form_user.userId);

    userIdParamsUrl = req.originalUrl.split("=")[1];
    // console.log("==> USERIDPARAMSURL <==");
    // console.log(userIdParamsUrl);

    // Comparer les userId

    // if (req.body.form_user.userId == userIdDecodedToken) {
    //   next();
    // } else {
    //   console.log("==> ERREUR Authentification");
    //   throw "erreur identification userId";
    // }

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
