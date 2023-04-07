//import mysqlConnection
const mysqlConnection = require("../config/db");

// Import models base de données
const updateModel = require("../models/updateModel");

exports.updateMenu = (req, res) => {
  console.log("==> ************ROUTE PUT************************");
  console.log(req.body);

  try {
    const day = req.body.jour_semaine;
    const querySql = "SELECT * FROM menu_semaine WHERE jour_semaine";

    mysqlConnection.promise().query(querySql, (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        console.log("==> RESULTS");
        console.log(results);

        // Controle autorisation de la modification par l'userId
        // userIdParamsUrl = req.originalUrl.split("=")[1];

        // if (userIdParamsUrl == results) {
        //   console.log("Authorization pour modif objet");
        //   console.log(userIdParamsUrl);

        const updateMenuObject = req.body;
        console.log("==>> UPDATEMENUOBJECT");
        console.log(updateMenuObject);

        // Mettre à jour la base de donnée

        const {
          entree,
          plat,
          dessert,
          descriptionEntree,
          descriptionPlat,
          descriptionDessert,
        } = updateMenuObject;

        const querySql = `
                UPDATE menu_semaine SET
                entree= ?,
                plat= ?,
                dessert= ?,
                description_entree= ?,
                description_plat= ?,
                description_dessert= ?
                WHERE jour_semaine= ?
                `;
        console.log("===> *****QUERY*****");
        console.log(querySql);

        const values = [
          entree,
          plat,
          dessert,
          descriptionEntree,
          descriptionPlat,
          descriptionDessert,
          day,
        ];

        console.log("===> *****VALUE*****");
        console.log(values);

        mysqlConnection.promise().query(querySql, values, (error, results) => {
          if (error) {
            res.status(500).json({ error });
          } else {
            res.status(201).json({
              message: "Mise a jour ok dans la base de donnée",
              results,
            });
          }
        });
        // } else {
        //   console.log(
        //     "UserId différent de l'userId dans l'objet : pas autoriser à réaliser des changements"
        //   );
        //   // throw "UserId différent de l'userId dans l'objet : pas autoriser à réaliser des changements";
        //   res.status(403).json({
        //     message: "vous n'ètes pas autorisé à modifier les données",
        //   });
        // }
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
