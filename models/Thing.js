const mongoose = require('mongoose');

// On va créér un schema d'article a créér par les utilisateurs
const thingSchema = mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    imageUrl: { type: String, required: true},
    userId: { type: String, required: true},
    price: { type: Number, required: true},
});

// La méthode  model  transforme ce modèle en un modèle utilisable:
module.export = mongoose.model('Thing', thingSchema);