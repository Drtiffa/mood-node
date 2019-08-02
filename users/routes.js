var express = require('express');
var usersRouter = express.Router();
var usersController = require("./controller")

usersRouter.get('/', usersController.getAll);
usersRouter.post('/', usersController.createUser);
usersRouter.post('/auth', usersController.authUser)
usersRouter.put('/update/:id', usersController.updateUser);
usersRouter.delete('/:id', usersController.deleteUser);

module.exports = usersRouter;