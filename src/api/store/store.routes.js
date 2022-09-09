
const express = require('express');
const { isAuthenticated } = require('../../utils/middlewares/auth.middleware');
const {getAllStores, getStore, putStore, postStore} = require('./store.controller');

const storeRoutes = express.Router();

storeRoutes.get('/', getAllStores);
storeRoutes.get('/:id', getStore);
storeRoutes.put('/edit/:id', putStore);
storeRoutes.post('/new', [isAuthenticated], postStore);

module.exports = storeRoutes;
