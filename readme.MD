# backend

Pour lancer le serveur : `$ npm run server`

## Routes avec POSTMAN

    Certaines routes nécéssitent une authentification par Token

## La route POST pour créer un compte :

http://localhost:5000/api/authentification/signup

Body --> raw --> format json
password --> mot de passe fort

{
"email" : "xxxx@xxx.xxx",
"password" : "xxxxx"
}

## La route POST pour se connecter :

http://localhost:5000/api/authentification/login

Body --> raw --> format json
Récupérer email et password du signup

{
"email" : "xxxx@xxx.xx",
"password" : "xxxxx"  
}

## La route POST pour créer la fiche user :

http://localhost:5000/api/form_user/

Authorization --> type = Bearer Token
Token --> fournis par le login
Body --> raw --> format json
userId --> fournis par le login
nbrCouverts --> un nombre de couvert par defaut entre 1 et 10 compris

{
"form_user" : {
"userId" : xx,
"nom" : "xxxxx",
"nbrCouverts" : xx  
 }
}

## La route GET pour lire toutes les fiches user :

http://localhost:5000/api/form_user/

Authorization --> type = Bearer Token
Token --> fournis par le login
Body --> raw --> format json
userId --> fournis par le login

{
"form_user" : {
"userId": xx
}
}

## La route GET pour lire une fiche user grâce à son Id :

http://localhost:5000/api/users/infos

Authorization --> type = Bearer Token
Token --> fournis par le login
Params --> KEY = userId
VALUE = userId
Body --> none

## La route PUT pour modifier une fiche user grâce à son Id

http://localhost:5000/api/users/userUpdate

Authorization --> type = Bearer Token
Token --> fournis par le login
Params --> KEY = Id
VALUE = userId
Body --> raw --> format json
userId --> fournis par le login
nbrCouverts --> un nombre de couvert par defaut entre 1 et 10 compris

{
"id" : xx,
"Nom" : "xxxxxx",
"nbrCouvert" : x
}

## La route DELETE pour supprimer une fiche user grâce à son Id :

http://localhost:5000/api/users/deleteUser

Params --> KEY = id
VALUE = userId
userId --> fournis par le login

## La route GET pour afficher le menu :

http://localhost:5000/api/menu/

Params --> none
Body --> none

## La route PUT pour modifier le menu :

http://localhost:5000/api/admin/updateMenu

Body --> raw --> format json

{

    "entree" : "xxxxxxxxxx",
    "plat" : "xxxxxxx",
    "dessert" : "xxxxx",
    "descriptionEntree" : "xxxxxxxxxx",
    "descriptionPlat" : "xxxxxxxxxx",
    "descriptionDessert" : "xxxxxxx",
    "jour_semaine" : "Un jour de la semaine sauf le lundi"

}

## La route POST pour effectuer une réservation :

http://localhost:5000/api/booking/

Body --> raw --> format json

{
"NbrPersonnes": "x",
"date": "30/03/23",
"heures": "13h30",
"nom": "xxxxxxx",
"Num_téléphone": "0102030405",
"email": "xxxx@xxx.xxxx"
}
