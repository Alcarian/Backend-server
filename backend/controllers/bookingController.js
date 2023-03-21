//import mysqlConnection
const mysqlConnection = require("../config/db");

// Import models base de données
const bookingModel = require("../models/BookingModels");

exports.postBooking = async (req, res) => {
  const bookingObject = req.body.form_user;

  const { NbrPersonnes, date, heures, nom, Num_téléphone } = bookingObject;

  // Instance booking
  const booking = new bookingModel(
    NbrPersonnes,
    date,
    heures,
    nom,
    Num_téléphone
  );

  // console.log("==> CONTENUE booking");
  // console.log(booking);

  // Enregistrer l'objet dans la bdd
  try {
    const querySql = `INSERT INTO booking(NbrPersonnes, date, heures, nom, Num_téléphone) VALUE (?) `;
    const values = [NbrPersonnes, date, heures, nom, Num_téléphone];
    await mysqlConnection.query(querySql, [values], (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        res.status(200).json({
          message: "Fiche utilisateur créé !",
          results,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
