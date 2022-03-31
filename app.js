// On va installer express sur notre appli
const express = require('express');

// Pour que l'application utilise express
const app = express();

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
    console.log(req.body);
    res.status(201).json({
        message: 'objet créé !'
    });
});

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: "rfggfsdfs",
            title: 'TABASCO',
            description: 'calienteeee !',
            imageURL: 'https://media.carrefour.fr/medias/71da1f34451d38609f7fc9a52f8bafcb/p_540x540/8714100903506-photosite-20211029-191101-0.jpg',
            price: 2900,
            userId: 'rfdsgssfd',
        },
        {
            _id: "hdfhsgsgs",
            title: 'POIVRE',
            description: 'bof bof',
            imageURL: 'https://file1.topsante.com/var/topsante/storage/images/1/3/1/8/1318447/tous-les-bienfaits-sante-poivre.jpg?alias=original',
            price: 1900,
            userId: 'rfdsgssfd',
        },
    ];
    res.status(200).json(stuff);
});

// on l'exporte pour y acceder sur les autres fichiers (notemment le serv node)
module.exports =app;
