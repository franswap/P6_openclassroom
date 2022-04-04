const mongoose = require('mongoose');

// On va créér un schema d'article a créér par les utilisateurs
const thingSchema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true},
    nanufacturer: { type: String, required: true},
    description: { type: String, required: true},
    imageUrl: { type: String, required: true},
    heat: { type: Number, required: true},
    like: { type: Number, required: true},
    dislike: { type: Number, required: true},
    userLiked: { type: String, required: true},
    userDisliked: { type: String, required: true},
});

// La méthode  model  transforme ce modèle en un modèle utilisable:
module.export = mongoose.model('Thing', thingSchema);