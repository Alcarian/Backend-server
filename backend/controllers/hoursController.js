//import mysqlConnection
const mysqlConnection = require("../config/db");

exports.readAllHours = async (req, res) => {
  try {
    const querySql = "SELECT * FROM `hours`";

    await mysqlConnection.query(querySql, (error, results) => {
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

exports.updateHours = async (req, res) => {
  try {
    const id = req.params.id;
    const querySql = "SELECT * FROM user WHERE id = ?";

    const [results] = await mysqlConnection.promise().query(querySql, [id]);

    console.log("==> RESULTS <==");
    console.log(results);

    const hoursObject = {
      open_lunch: req.body.open_lunch,
      close_lunch: req.body.close_lunch,
      open_diner: req.body.open_diner,
      close_diner: req.body.close_diner,
    };

    console.log("****hoursObject****");
    console.log(hoursObject);

    const { open_lunch, close_lunch, open_diner, close_diner } = hoursObject;

    const updateSql = `
      UPDATE hours SET
      open_lunch = ?,
      close_lunch = ?,
      open_diner = ?,
      close_diner = ?,
      WHERE id = ?
    `;

    const valuesUpdate = [open_lunch, close_lunch, open_diner, close_diner, id];

    console.log("==> valuesUpdate <==");
    console.log(valuesUpdate);

    mysqlConnection
      .promise()
      .query(updateSql, valuesUpdate, (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error });
        } else {
          res.status(201).json({
            message: "Mise à jour des horaires effectuée !",
            results,
          });
        }
      });
  } catch (error) {
    res.status(500).json({ error });
  }
};
