const express = require('express');
const router = express.Router();

const stuffController = require('../controllers/stuff');


// Pour que les users ajoutent leurs sauces
router.post('/', stuffController.createThing);

// On va creer une route put qui va nous permettre de modifier notre objet
router.put('/:id', stuffController.modifyThing)

// On va creer une route put qui va nous permettre de supprimer notre objet
router.delete('/:id', stuffController.deleteThing);

// element dynamique de l'objet de maniere unitaire losquon clique dessus.
router.get('/:id', stuffController.getOneThing);

// la methode get va nous chercher tous les éléments 'Things' de notre base
router.get('/', stuffController.getAllThing);

module.exports = router;