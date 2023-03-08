const mysql = require("mysql");

// le modele de base de donnée pour enregistrer un nouvel utilisateur
const userSchema = mysql.Schema({
  email: { type: string, required: true, unique: true },
  password: { type: string, required: true },
});

module.exports = mysql.model("user", userSchema);
