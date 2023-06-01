const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const menuRoutes = require("./routes/menuRoute");
const adminRoutes = require("./routes/adminRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const hoursRoutes = require("./routes/hoursRoute");

// créer une application express
const app = express();

//importation de body-parser
const bodyparser = require("body-parser");

// log des req et res
app.use(morgan("dev"));

app.use(
  cors({
    origin: "https://alcarian-quai-antique.netlify.app",
    credentials: true,
  })
);

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
