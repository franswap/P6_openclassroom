// On va installer express sur notre appli
const express = require('express');

// Pour que l'application utilise express
const app = express();

// On importe Mongoose, package facilitant les interactions avec notre base de données
const mongoose = require('mongoose');

// On importe le modele thing que l'on vient de creer:
const Thing = require('./models/Thing')

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

// Pour que les users ajoutent leurs sauces
app.post('/api/stuff', (req, res, next) =>{
    delete req.body._id;
    const thing = new Thing({
        // '...' est l'operateur spread, il permet de faire une copîe de tous les elements de req.body
        ...req.body
    });
    thing.save() // save enregistre thing dans la base de données
    .then(() => res.status(201).json({ message: 'Objet enregistré'}))
    .catch(error => res.status(400).json({error}));
});

// On va creer une route put qui va nous permettre de modifier notre objet
app.put('/api/stuff/:id', (res, req, next) => {
    // UpdateOne va nous permettre de modifier un element de la base de données, le premiere argument c'est l'objet de comparaison et l'autre cest le nouvel objet que l'on envoie
    Thing.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'objet modifié'}))
        .catch(error => res.status(400).json({ error }));
})

// On va creer une route put qui va nous permettre de supprimer notre objet
app.delete('/api/stuff/:id', (req, res, next) => {
    // deleteOne va nous permettre de supprimer un élément de notre base de données
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

// element dynamique de l'objet de maniere unitaire losquon clique dessus.
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id}) // FindOne retourne une seul thing sur un systeme de comparaison des id
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error }));
});

// la methode get va nous chercher tous les éléments 'Things' de notre base
app.get('/api/stuff', (req, res, next) => {
    Thing.find() // find renvoie un tableau de tous mes Things
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

// on l'exporte pour y acceder sur les autres fichiers (notemment le serv node)
module.exports =app;
