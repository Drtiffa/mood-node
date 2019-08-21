const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define my avatar model
const avatarSchema = new Schema({
    avatar: { type: String, required: true },
});

module.exports = mongoose.model('Avatar', avatarSchema);