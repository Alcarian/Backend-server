// import de bcrypt pour hasher les password
const bcrypt = require("bcrypt");

// import crypto-js pour chiffrer les mails
const cryptojs = require("crypto-js");

// import pour l'utilisation des variables d'environement
const dotenv = require("dotenv");
const result = dotenv.config();

class User {
  constructor(nbrCouvert, Nom, email, password) {
    this.nbrCouvert = nbrCouvert;
    this.Nom = Nom;
    this.email = email;
    this.password = password;
  }
  // Méthode pour chiffrer et déchiffrer l'email
  emailChiffrement() {
    const emailCryptojs = cryptojs
      .HmacSHA256(this.email, `${process.env.CLE_DE_CHIFFREMENT_EMAIL}`)
      .toString();
    return emailCryptojs;
  }
  // Méthode pour hasher le mdp
  hashPassword = async function () {
    try {
      const hashPassword = bcrypt.hash(this.password, 10);
      console.log(hashPassword);
      return hashPassword;
    } catch (err) {
      console.log(err);
    }
  };

  static controlCouvert(nbrCouvert) {
    return nbrCouvert >= 1 && nbrCouvert <= 10;
  }
}

module.exports = User;
