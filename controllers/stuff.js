// On importe le modele thing que l'on vient de creer:
const Thing = require('../models/Thing');

exports.createThing = (req, res, next) =>{
    delete req.body._id;
    const thing = new Thing({
        // '...' est l'operateur spread, il permet de faire une copîe de tous les elements de req.body
        ...req.body
    });
    thing.save() // save enregistre thing dans la base de données
    .then(() => res.status(201).json({ message: 'Objet enregistré'}))
    .catch(error => res.status(400).json({error}));
};

exports.modifyThing = (res, req, next) => {
    // UpdateOne va nous permettre de modifier un element de la base de données, le premiere argument c'est l'objet de comparaison et l'autre cest le nouvel objet que l'on envoie
    Thing.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'objet modifié'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
    // deleteOne va nous permettre de supprimer un élément de notre base de données
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id}) // FindOne retourne une seul thing sur un systeme de comparaison des id
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllThing = (req, res, next) => {
    Thing.find() // find renvoie un tableau de tous mes Things
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};