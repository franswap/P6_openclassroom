// On va installer express sur notre appli
const express = require('express');

// Pour que l'application utilise express
const app = express();

// On importe Mongoose, package facilitant les interactions avec notre base de données
const mongoose = require('mongoose');

// On va importer nos routes
const stuffRoutes = require('./routes/stuff'); // route d'items
const userRoutes = require('./routes/user'); // route de users

mongoose.connect('mongodb+srv://sauceenjoyer:tabasco33@piquante.jmz0f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// ce middleware intercepte toutes les requetes avec un content type json et les mets à disposition dans req.body
app.use(express.json());

// On ajoute un middleware pour faire copmmuniquer notre port 4200 avec notre port 3000
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // L'origine (ceux qui peuvent acceder à notre API = tout le monde)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // On autorise certains headers 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // On autorise certaines methodes 
    next();
  });


  app.use('/api/stuff', stuffRoutes);
  app.use('/api/auth', userRoutes)

// on l'exporte pour y acceder sur les autres fichiers (notemment le serv node)
module.exports =app;
