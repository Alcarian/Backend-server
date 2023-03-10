const express = require("express");
const morgan = require("morgan");
const mysql = require("./config/db");
const http = require("http");
const userRoutes = require("./routes/userRoute");

// créer une application express
const app = express();

//importation de body-parser
const bodyparser = require("body-parser");

// log des req et res
app.use(morgan("dev"));

//gérer les problèmes de CORS (Cross-Origin-Request-Sharing)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// transformer le body en format json utilisable
app.use(bodyparser.json());

// route d'authentification
app.use("/api/authentification", userRoutes);

//exporter l'application
module.exports = app;
