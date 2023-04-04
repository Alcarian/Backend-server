const http = require("http");

//import de l'application app
const app = require("./app");

//package variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

// paramètre du port
app.set("port", process.env.PORT);

// crée le serveur
const server = http.createServer(app);

// écoute les requètes sur le port
server.listen(process.env.PORT);
