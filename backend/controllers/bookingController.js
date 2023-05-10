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

exports.readBooking = async (req, res) => {
  const querySql = "SELECT * FROM `booking`";

  await mysqlConnection
    .promise()
    .query(querySql)
    .then((results) => {
      console.log("*****results******");
      console.log(results);
      res.status(200).json({
        message: " Requête GET ok !",
        results,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
