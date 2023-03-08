const http = require("http");

//package variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

//import de l'application app
const app = require("./app");

// paramètre du port
app.set("port", process.env.PORT);

// crée le serveur
const server = http.createServer(app);

// écoute les requètes sur le port
server.listen(process.env.PORT);
