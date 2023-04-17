const express = require("express");
const morgan = require("morgan");
const mysql = require("./config/db");
const http = require("http");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const menuRoutes = require("./routes/menuRoute");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const hoursRoutes = require("./routes/hoursRoute");

// créer une application express
const app = express();

// Utilisation des cors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//importation de body-parser
const bodyparser = require("body-parser");

// log des req et res
app.use(morgan("dev"));

//gérer les problèmes de CORS (Cross-Origin-Request-Sharing)
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

// transformer le body en format json utilisable
app.use(bodyparser.json());

// route d'authentification
app.use("/api/authentification", userRoutes);

// route menu
app.use("/api/menu", menuRoutes);

// route admin
app.use("/api/admin", adminRoutes);

//route users
app.use("/api/users", userRoutes);

//route booking
app.use("/api/booking", bookingRoutes);

//route hours
app.use("/api/hours", hoursRoutes);

//exporter l'application
module.exports = app;
