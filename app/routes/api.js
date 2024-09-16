// routes/userRoutes.js
const express = require("express");
const api = express.Router();
const auth = require("../Middleware/Auth");
const userController = require("../Controllers/User");
const controller = require("../Controllers/Controllers")
const groupRouting = require("../Middleware/groupRouting");
const loginController = require("../Controllers/Auth/login")
const roleController = require("../Controllers/Role");


api.post("/login", loginController.login);
// Encrypt / Decrypt Routes
api.post('/encrypt', controller.encrypt);
api.post('/decrypt', controller.decrypt);
// Routes
groupRouting(api, "/", auth, (api) => {
  api.get("/getAllUsers", userController.getAllUsers);
  api.post("/users", userController.createUser);

  // Roles 
  api.get('/role', roleController.getAll);
  api.get('/role/:id', roleController.getOne);
  api.post('/role', roleController.create);
  api.put('/role/:id', roleController.update);
  api.delete('/role/:id', roleController.delete);
});
module.exports = api;
