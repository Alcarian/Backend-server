// import de bcrypt pour hasher les password
const bcrypt = require("bcrypt");

// import de jsonwebtoken pour généré les token d'authentification
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
const result = dotenv.config();

//import mysqlConnection
const mysqlConnection = require("../config/db");

//import models base de données
const User = require("../models/User");

// signup pour enregistrer le nouvel utilisateur dans la bdd
exports.signup = (req, res) => {
  const { nbrCouvert, nom, email, password } = req.body;

  // Instance de la class User
  const user = new User(nbrCouvert, nom, email, password);

  // chiffrer l'email avant envoi bdd
  const emailChiffre = user.emailChiffrement();

  //hasher le mdp avant envoie dans la bdd
  user
    .hashPassword()
    .then((hash) => {
      // Les données à envoyer dans la requète sql
      const data = {
        nbrCouvert: nbrCouvert,
        nom: nom,
        email: emailChiffre,
        password: hash,
      };

      // la requète sql pour envoyer les données dans la table user
      mysqlConnection.query(
        "INSERT INTO user SET ?",
        data,
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
exports.login = (req, res) => {
  const { nbrCouvert, nom, email, password } = req.body;

  // Le contenu de la requète

  //instance de la classe User
  const user = new User(nbrCouvert, nom, email, password);

  //chiffrer l'email de la requète
  const emailChiffre = user.emailChiffrement();

  // Chercher dans la bdd si l'email utilisateur est bien présent
  mysqlConnection.query(
    "SELECT * FROM user WHERE email = ? ",
    emailChiffre,
    (error, results) => {
      if (error) {
        res.json({ error });
      } else {
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
            // Si le mdp est incorrect
            if (!controlPassword) {
              return res
                .status(401)
                .json({ error: "Le mot de passe est incorrect" });
            }

            // Si le password est correct
            // Envoi dans la response du serveur : userId et le token d'authentification JWT

            // Génération du token JWT
            const token = jwt.sign(
              //3 arguments
              { userId: results[0].id },
              `${process.env.JWT_KEY_TOKEN}`,
              { expiresIn: "12h" }
            );

            // réponse du serveur avec le userId et le token
            res.status(201).json({
              userId: results[0].id,
              message: "Utilisateur logué !",
              token,
            });
          })
          .catch((error) => res.status(500).json({ error }));
      }
    }
  );
};
