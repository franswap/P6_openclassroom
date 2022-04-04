const express = require('express');
const router = express.Router();

const stuffController = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

// Pour que les users ajoutent leurs sauces
router.post('/', auth, multer, stuffController.createThing);

// On va creer une route put qui va nous permettre de modifier notre objet
router.put('/:id', auth, multer, stuffController.modifyThing)

// On va creer une route put qui va nous permettre de supprimer notre objet
router.delete('/:id', auth, stuffController.deleteThing);

// element dynamique de l'objet de maniere unitaire losquon clique dessus.
router.get('/:id', auth, stuffController.getOneThing);

// la methode get va nous chercher tous les éléments 'Things' de notre base
router.get('/', auth, stuffController.getAllThing);

module.exports = router;