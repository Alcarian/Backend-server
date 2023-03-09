const users = [];

class User {
  constructor(nom, email, password) {
    this.nbrCouvert = nbrCouvert;
    this.nom = nom;
    this.email = email;
    this.password = password;
  }

  static findByEmail(email) {
    return users.find((user) => user.email === email);
  }

  save() {
    users.push(this);
  }

  static verifyPassword(user, password) {
    return user.password === password;
  }

  static estValideChiffre(nbrCouvert) {
    return nbrCouvert >= 1 && nbrCouvert <= 10;
  }
}

module.exports = User;
