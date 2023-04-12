//import mysqlConnection
const mysqlConnection = require("../config/db");

exports.readAllMenu = async (req, res) => {
  try {
    const querySql = "SELECT * FROM `menu_semaine`";

    mysqlConnection.query(querySql, (error, results) => {
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
