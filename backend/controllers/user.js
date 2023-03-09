// import de bcrypt pour hasher les password
const bcrypt = require("bcrypt");

// import crypto-js pour chiffrer les mails
const cryptojs = require("crypto-js");

// import de jsonwebtoken pour généré les token d'authentification
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
const result = dotenv.config();

//import mysqlConnection
const mysqlConnection = require("../config/db");

const User = require("../models/User");

// signup pour enregistrer le nouvel utilisateur dans la bdd
exports.signup = (req, res) => {
  // console.log("CONTENUE req.body - controllers/user.js");
  // console.log(req.body);

  // chiffrer l'email avant envoi bdd
  const emailCryptojs = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CLE_DE_CHIFFREMENT_EMAIL}`)
    .toString();

  //hasher le mdp avant envoie dans la bdd
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      // ce qui va etre enregistrer dans mysql
      // console.log(emailCryptojs, hash);

      //les données à envoyer
      const user = {
        nbrCouvert: req.body.nbrCouvert,
        nom: req.body.nom,
        email: emailCryptojs,
        password: hash,
      };

      // console.log(user);

      // la requète sql pour envoyer les données dans la table user
      mysqlConnection.query(
        "INSERT INTO user SET ?",
        user,
        (error, results) => {
          if (error) {
            console.log(error);
            res.json({ error });
          } else {
            console.log("==>results");
            console.log(results);
            res.json({ message: "Utilisateur enregistré" });
          }
        }
      );
    })

    .catch((error) => res.status(500).json({ error }.json(console.log(error))));
};

// Login pour s'authentifier
exports.login = (req, res, next) => {
  // Le contenu de la requète

  //chiffrer l'email de la requète
  const emailCryptojs = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CLE_DE_CHIFFREMENT_EMAIL}`)
    .toString();
  // console.log(emailCryptojs);

  const email = emailCryptojs;

  // Chercher dans la bdd si l'email utilisateur est bien présent
  mysqlConnection.query(
    "SELECT * FROM user WHERE email = ? ",
    email,
    (error, results) => {
      if (error) {
        console.log(error);
        res.json({ error });
      } else {
        console.log("===> results");
        console.log(results);

        // Si l'email utilisateur n'est pas présent dans la bdd
        if (results == 0) {
          return res
            .status(404)
            .json({ error: "Utilisateur pas présent dans la base de donnée" });
        }

        // Controler la validité du password envoyé par le front
        bcrypt
          .compare(req.body.password, results[0].password)
          .then((controlPassword) => {
            console.log("==> controlPassword");
            console.log(controlPassword);

            // Si le mdp est incorrect
            if (!controlPassword) {
              return res
                .status(401)
                .json({ error: "Le mot de passe est incorrect" });
            }

            // Si le password est correct
            // Envoi dans la response du serveur : userId et le token d'authentification JWT
            console.log("==> password");
            console.log(results[0].password);

            // Génération du token JWT
            const token = jwt.sign(
              //3 arguments
              { unserId: results[0].id },
              `${process.env.JWT_KEY_TOKEN}`,
              { expiresIn: "12" }
            );
            console.log(token);

            // réponse du serveur avec le userId et le token
            res.status(201).json({
              userId: results[0].id,
              token,
            });
          })
          .catch((error) => res.status(500).json({ error }));
      }
    }
  );
};
