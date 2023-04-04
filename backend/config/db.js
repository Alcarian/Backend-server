const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2/promise");

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const mysqlconnection = mysql.createConnection(urlDB);

mysqlconnection.connect((err) => {
  if (err) {
    console.log(`error connecting: ${err.stack}`);
  } else {
    console.log("connecté à la base de donnée quai_antique");
    console.log(`connected as id ${mysqlconnection.threadId}`);
  }
});

module.exports = mysqlconnection;
