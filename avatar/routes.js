var express = require('express');
var avatarRouter = express.Router();
var avatarController = require("./controller")

avatarRouter.get('/', avatarController.getAvatar);
avatarRouter.post('/', avatarController.createAvatar);
avatarRouter.get('/:id', avatarController.getAvatarId);
avatarRouter.get('/:id/image', avatarController.getAvatarImage);

module.exports = avatarRouter;