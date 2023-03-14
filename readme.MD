# backend

Pour lancer le serveur : `$ npm run server`

# Routes avec POSTMAN

    Toutes les routes nécéssite une authentification par Token

## La route POST pour créer un compte

http://localhost:5000/api/authentification/signup

Body --> raw --> format json
password --> mot de passe fort

{
"email" : "xxxxxxxxxx",
"password" : "xxxxx"
}

## La route POST pour se connecter

http://localhost:5000/api/authentification/login

Body --> raw --> format json
Récupérer email et password du signup

{
"email" : "xxxxxxxxx",
"password" : "xxxxx"  
}

## La route POST pour créer la fiche user

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

## La route GET pour afficher TOUS les objets qu'il y a dans la fiche user

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

## La route GET pour afficher un objet grace à son Id

http://localhost:5000/api/form_user/:id

Authorization --> type = Bearer Token
Token --> fournis par le login
Params --> KEY = userId
VALUE = userId
Body --> none

## La route PUT pour modifier un objet grace à son Id

http://localhost:5000/api/form_user/:id

Authorization --> type = Bearer Token
Token --> fournis par le login
Params --> KEY = userId
VALUE = userId
Body --> raw --> format json

## La route DELETE pour supprimer un objet grace à son Id

http://localhost:5000/api/form_user/:id

Params --> KEY = userId
VALUE = userId
