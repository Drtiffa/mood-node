const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// je defini mon model d'avatar en donnant les infos qui seront enregistré en BDD
const avatarSchema = new Schema({
    avatar: { type: String, required: true },
});

module.exports = mongoose.model('Avatar', avatarSchema);