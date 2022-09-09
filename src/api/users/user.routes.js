const express = require('express');
const controller = require('./user.controller');

const router = express.Router();

router
  .post('/register', controller.registerPost)
  .post('/login', controller.loginPost)
  .post('/logout', controller.logoutPost)
  .post('/test', controller.test)
  .get('/check-session', controller.checkSessionGet)
  .put('/edit/:id', controller.putUser );

module.exports = router;