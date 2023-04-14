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

exports.updateHours = async (req, res) => {
  try {
    const id = req.params.id;
    const querySql = "SELECT * FROM user WHERE id = ?";

    const [results] = await mysqlConnection.promise().query(querySql, [id]);

    console.log("==> RESULTS");
    console.log(results);
  } catch (error) {
    res.status(500).json({ error });
  }
};
