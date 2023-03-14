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
          res.status(200).json({ results });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.readAllFormUser = async (req, res) => {
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
  console.log("===> ROUTE GETONEFORMUSER");
  console.log(req.params.id);
  console.log({ id_form_user: req.params.id });

  try {
    const id = req.params.id;
    console.log("==> CONST ID");
    console.log(id);
    const querySql = "SELECT * FROM `form_user` WHERE `form_user_userId` = ?";

    const ficheUser = await mysqlConnection.query(
      querySql,
      [id],
      (error, results) => {
        if (error) {
          res.json({ error });
        } else {
          res.status(200).json({ results });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateOneFormUser = async (req, res) => {};
