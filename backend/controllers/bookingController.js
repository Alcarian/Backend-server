//import mysqlConnection
const mysqlConnection = require("../config/db");

// Import models base de données
const bookingModel = require("../models/BookingModels");

exports.postBooking = (req, res) => {
  const bookingObject = req.body;

  const { NbrPersonnes, date, heures, nom, Num_téléphone, email } =
    bookingObject;

  // Instance booking
  const booking = new bookingModel(
    NbrPersonnes,
    date,
    heures,
    nom,
    Num_téléphone,
    email
  );

  // Enregistrer l'objet dans la bdd

  const querySql = `INSERT INTO booking(NbrPersonnes, date, heures, nom, Num_téléphone, email) VALUE (?) `;

  const values = [NbrPersonnes, date, heures, nom, Num_téléphone, email];

  mysqlConnection
    .promise()
    .query(querySql, [values])
    .then((results) => {
      res.status(200).json({
        message: "Réservation effectuée!",
        results,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.readBooking = (req, res) => {
  const querySql = "SELECT * FROM `booking`";

  mysqlConnection
    .promise()
    .query(querySql)
    .then((results) => {
      res.status(200).json({
        message: " Requête GET ok !",
        results,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

exports.deleteBooking = (req, res) => {
  const id = req.originalUrl.split("=")[1];

  const querySql = "SELECT * FROM `booking` WHERE `id` = ?";

  mysqlConnection
    .promise()
    .query(querySql, [id])
    .then((results) => {
      // controle de l'existance de la donnée dans la bdd pour éviter le crash du serveur
      if (results[0]) {
        console.log("Présence de l'objet dans la base de donnée");
      } else {
        console.log("Objet non présent dans la base de donnée");
        return res.status(404).json({
          message: "pas d'objet a supprimer dans la base de donnée",
        });
      }

      const querySql2 = `DELETE FROM booking WHERE id= ?`;

      const values = [id];

      mysqlConnection
        .promise()
        .query(querySql2, values)
        .then(() => {
          mysqlConnection.end();
          res.status(200).send("La réservation a été supprimée");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression de la réservation");
    });
};
