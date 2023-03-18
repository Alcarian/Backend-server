//import mysqlConnection
const mysqlConnection = require("../config/db");

// Import models base de données
const form_user = require("../models/FormUser");

exports.createFormUser = async (req, res) => {
  const userFormObject = req.body.form_user;

  const { userId, nom, nbrCouverts } = userFormObject;

  // Instance form_user
  const user_form = new form_user(userId, nom, nbrCouverts);

  // console.log("==> CONTENUE user_form");
  // console.log(user_form);

  // Enregistrer l'objet dans la bdd
  try {
    const querySql = `INSERT INTO form_user(form_user_userId, form_user_name, nbr_couverts) VALUE (?) `;
    const values = [userId, nom, nbrCouverts];
    const ficheUser = await mysqlConnection.query(
      querySql,
      [values],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({
            message: "Fiche utilisateur créé !",
            results,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.readAllFormUser = async (req, res) => {
  console.log("==> JE SUIS DANS ALL");
  try {
    const ficheUser = await mysqlConnection.query(
      "SELECT * FROM `form_user` WHERE ?",
      ["1"],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.readOneFormUser = async (req, res) => {
  console.log("==> JE SUIS DANS ONE");
  console.log("==> ORIGINALURL");
  console.log(req.originalUrl.split("=")[1]);

  try {
    const id = req.originalUrl.split("=")[1];
    console.log("==> CONST ID");
    console.log(id);
    const querySql = "SELECT * FROM `form_user` WHERE `form_user_userId` = ?";

    await mysqlConnection.query(querySql, [id], (error, results) => {
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

exports.updateOneFormUser = async (req, res) => {
  // console.log("==> ROUTE PUT");
  // console.log(req.params.id);

  // console.log("==> CONTENU BODY");
  // console.log(req.body);

  // Aller chercher l'objet dans la table form_user
  try {
    const id = req.params.id;
    const querySql = "SELECT * FROM form_user WHERE id_form_user = ?";

    const ficheUser = await mysqlConnection.query(
      querySql,
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          console.log("==> RESULTS");
          console.log(results);

          // Controle autaurisation de la modification par l'userId
          userIdParamsUrl = req.originalUrl.split("=")[1];

          if (userIdParamsUrl == results[0].form_user_userId) {
            console.log("Authorization pour modif objet");

            // L'objet qui va ètre mis à jour dans la base de donnée
            // console.log("==> CONTENU : REQ.BODY");
            // console.log(req.body);

            // console.log("==> CONENU : req.body.ficheUser");
            // console.log(req.body.form_user);

            const userFormObject = req.body.form_user;

            // Mettre à jour la base de donnée
            // UPDATE `form_user` SET `form_user_name`= ?,`nbr_couverts`= ? WHERE `id_form_user` = ?

            const { nom, nbrCouverts } = userFormObject;

            const querySql = `
            UPDATE form_user SET
            form_user_name= ?,
            nbr_couverts= ?
            WHERE id_form_user = ?
            `;

            const values = [nom, nbrCouverts, id];

            mysqlConnection.query(querySql, values, (error, results) => {
              if (error) {
                res.status(500).json({ error });
              } else {
                res.status(201).json({
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
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteOneFormUser = async (req, res) => {
  try {
    // Aller chercher l'id de l'objet a supprimer dans la requête
    const id = req.params.id;

    const querySql = "SELECT * FROM form_user WHERE id_form_user = ?";

    const ficheUser = await mysqlConnection.query(
      querySql,
      [id],
      (error, results) => {
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

          if (userIdParamsUrl == results[0].form_user_userId) {
            console.log("Authorization pour SUPPRESSION de l'objet");

            // Mettre à jour la base de donnée
            // Ma requète PHPmyadmin pour supprimer la data
            // DELETE FROM `form_user` WHERE `id_form_user` = ?

            const querySql = `
            DELETE FROM form_user
            WHERE id_form_user = ?
            `;

            const values = [id];

            // La connexion a la base de donnée
            mysqlConnection.query(querySql, values, (error, results) => {
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
      }
    );
    //
  } catch (error) {
    res.status(500).json({ error: error, message: "ERREUR !" });
  }
};
