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
  // try {
  //   const querySql = `INSERT INTO booking(NbrPersonnes, date, heures, nom, Num_téléphone, email) VALUE (?) `;

  //   const values = [NbrPersonnes, date, heures, nom, Num_téléphone, email];

  //   mysqlConnection.promise().query(querySql, [values], (error, results) => {
  //     if (error) {
  //       res.json({ error });
  //     } else {
  //       res.status(200).json({
  //         message: "Réservation effectuée!",
  //         results,
  //       });
  //     }
  //   });
  // } catch (err) {
  //   res.status(500).json({ error: err });
  // }

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
