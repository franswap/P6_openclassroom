const mongoose = require('mongoose');

// package pour avoir une adresse mail unique par utilisateur et non plusieurs
const uniqueValidator = require('mongoose-unique-validator');

// Un user se compose d'une varible avec un mot de passe et un email unique.
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);