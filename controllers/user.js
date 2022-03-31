// On met notre package de hash pour crypter les mots de passe.
const bcrypt = require('bcrypt');

const User = require('../models/User');

const jwt = require('jsonwebtoken');

// PARTIE ENREGISTREMENT DE NOTRE USER
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User ({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'utilisateur créé'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

// PARTIE LOGIN DE NOTRE USER
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // on cherche un utilisateur de la base de données
    .then(user => {
      if (!user) { // si on a pas trouver de user dans la base on va renvoyer une erreur 401.
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      } //si on a trouvé un utilisateur:
      bcrypt.compare(req.body.password, user.password) //on compare le mot de passe de la requete avec celui de la base de données
        .then(valid => {
          if (!valid) { // si la comparaison n'est pas valable, on retourne une erreur 401
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          } // si tout est ok on va revoyer un status 200
          res.status(200).json({
            userId: user._id, // avec l'id de l'utilisateur
            // L'utilisateurn lors de sa connection, va recevoir un token encodé depuis le serveur, le serv peut verifier le token pour chaque requete authentifiée
            token: jwt.sign( //jsonwebtoken est un token d'encodage
                { userId: user._id }, //userid encodé pour appliquer le bon id à chaque objet créé
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              ) // pour des serv modernes, on priviligie les tokens au sessions et au cookies (notemment due aux applis mobiles)
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};