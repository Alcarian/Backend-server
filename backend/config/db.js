const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql");

const mysqlconnection = mysql.createConnection({
  hoste: "localhost",
  database: "quai_antique",
  user: "root",
  password: "",
});

mysqlconnection.connect((err) => {
  if (err) {
    console.log(`error connecting: ${err.stack}`);
  } else {
    console.log("connecté à la base de donnée quai_antique");
    console.log(`connected as id ${mysqlconnection.threadId}`);
  }
});

module.exports = mysqlconnection;
