var express = require('express');
var avatarRouter = express.Router();
var avatarController = require("./controller")

avatarRouter.get('/', avatarController.getAvatar);
avatarRouter.post('/', avatarController.createAvatar);

module.exports = avatarRouter;