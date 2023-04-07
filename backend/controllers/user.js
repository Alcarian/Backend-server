// import de bcrypt pour hasher les password
const bcrypt = require("bcrypt");

// import de jsonwebtoken pour généré les token d'authentification
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
const result = dotenv.config();

//import mysqlConnection
const mysqlConnection = require("../config/db");

//import models base de données
const User = require("../models/userModel");

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
  // console.log("*****REQ.BODY*********");
  // console.log(req.body);

  //instance de la classe User
  const user = new User(nbrCouvert, nom, email, password);
  // console.log("*******user********");
  // console.log(user);

  //chiffrer l'email de la requète
  const emailChiffre = user.emailChiffrement();
  console.log("*********emailChiffre*********");
  console.log(emailChiffre);

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
          return res.status(404).json({
            error: "Utilisateur pas présent dans la base de donnée",
          });
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

// Lire les infos user
exports.readInfos = async (req, res) => {
  try {
    const id = req.originalUrl.split("=")[1];
    console.log("==> CONST ID");
    console.log(id);
    const querySql = "SELECT * FROM `user` WHERE `id` = ?";

    mysqlConnection.query(querySql, [id], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        res.status(200).json({ results });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.userUpdate = (req, res) => {
  try {
    const id = req.body.id;
    const querySql = "SELECT * FROM user WHERE id = ?";
    console.log(
      "==> CONTENU : REQ.PARAMS***********************************************"
    );
    console.log(req.body);

    mysqlConnection.promise().query(querySql, [id], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        console.log("==> RESULTS");
        console.log(results);

        // Controle autaurisation de la modification par l'userId
        userIdParamsUrl = req.originalUrl.split("=")[1];
        console.log("==> USERIDPARAMS <==");
        console.log(userIdParamsUrl);

        if (userIdParamsUrl == results[0].id) {
          console.log("Authorization pour modif objet");

          // L'objet qui va ètre mis à jour dans la base de donnée
          // console.log("==> CONTENU : REQ.BODY");
          // console.log(req.body);

          // console.log("==> CONENU : req.body.user");
          // console.log(req.body.user);

          const userFormObject = req.body;
          console.log("******userFormObject******");
          console.log(userFormObject);

          // Mettre à jour la base de donnée

          const { Nom, nbrCouvert } = userFormObject;

          const updateSql = `
            UPDATE user SET
            Nom= ?,
            nbrCouvert= ?
            WHERE id = ?
            `;

          const values = [Nom, nbrCouvert, id];
          console.log("********values*******");
          console.log(values);

          mysqlConnection
            .promise()
            .query(updateSql, values, (error, results) => {
              if (error) {
                res.status(500).json({ error });
              } else {
                res.status(200).json({
                  message: "Mise a jour ok dans la base de donnée",
                  results,
                });
              }
            });
        } else {
          console.log(
            "UserId différent de l'userId dans l'objet : pas autoriser à réaliser des changements"
          );
          // throw "UserId différent de l'userId dans l'objet : pas autoriser à réaliser des changements";
          res.status(403).json({
            message: "vous n'ètes pas autorisé à modifier les données",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteUser = (req, res) => {
  try {
    // Aller chercher l'id de l'objet a supprimer dans la requête
    const id = req.originalUrl.split("=")[1];
    console.log("******ID**********");
    console.log(id);

    const querySql = "SELECT * FROM `user` WHERE `id` = ?";

    mysqlConnection.query(querySql, [id], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        console.log("==> RESULTS");
        console.log(results);

        // controle de l'existance de la donnée dans la bdd pour éviter le crash du serveur
        if (results != 0) {
          console.log("Présence de l'objet dans la base de donnée");
        } else {
          console.log("Objet non présent dans la base de donnée");
          return res.status(404).json({
            message: "pas d'objet a supprimer dans la base de donnée",
          });
        }

        // Controle autaurisation de la modification par l'userId
        userIdParamsUrl = req.originalUrl.split("=")[1];
        console.log("******userIdParamsUrl*******");
        console.log(userIdParamsUrl);

        if (userIdParamsUrl == results[0].id) {
          console.log("Authorization pour SUPPRESSION de l'objet");

          // Mettre à jour la base de donnée
          // Ma requète PHPmyadmin pour supprimer la data

          const querySql = `
            DELETE FROM user
            WHERE id= ?
            `;

          const values = [id];

          // La connexion a la base de donnée
          mysqlConnection
            .promise()
            .query(querySql, values, (error, results) => {
              if (error) {
                res.status(500).json({ error });
              } else {
                res.status(201).json({
                  message: "Objet effacé dans la base de donnée",
                  results,
                });
              }
            });
        } else {
          console.log("Pas autorisé");
          res.status(403).json({
            message: "Vous n'êtes pas autorisé a supprimer les données",
          });
        }
      }
    });
    //
  } catch (error) {
    res.status(500).json({ error: error, message: "ERREUR !" });
  }
};
