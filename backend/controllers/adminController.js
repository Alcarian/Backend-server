//import mysqlConnection
const mysqlConnection = require("../config/db");

// Import models base de données
const updateModel = require("../models/updateModel");

exports.updateMenu = (req, res) => {
  try {
    const day = req.body.jour_semaine;
    const querySql = "SELECT * FROM menu_semaine WHERE jour_semaine = ?";

    mysqlConnection.query(querySql, [day], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error });
      } else {
        console.log("==> RESULTS");
        console.log(results);

        const updateMenuObject = req.body;

        // Mettre à jour la base de donnée

        const {
          entree,
          plat,
          dessert,
          descriptionEntree,
          descriptionPlat,
          descriptionDessert,
        } = updateMenuObject;

        const updateQuery = `
                UPDATE menu_semaine SET
                entree= ?,
                plat= ?,
                dessert= ?,
                description_entree= ?,
                description_plat= ?,
                description_dessert= ?
                WHERE jour_semaine= ?
                `;

        const values = [
          entree,
          plat,
          dessert,
          descriptionEntree,
          descriptionPlat,
          descriptionDessert,
          day,
        ];

        mysqlConnection
          .promise()
          .query(updateQuery, values, (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({ error });
            } else {
              res.status(201).json({
                message: "Mise a jour ok dans la base de donnée",
                results,
              });
            }
          });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
