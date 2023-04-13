//import mysqlConnection
const mysqlConnection = require("../config/db");

exports.readAllHours = async (req, res) => {
  try {
    const querySql = "SELECT * FROM `hours`";

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
