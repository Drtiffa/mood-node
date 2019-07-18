const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// je defini mon model utlisateurs en donnant les infos qui seront enregistré en BDD
const userSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);