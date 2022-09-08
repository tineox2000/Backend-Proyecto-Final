
const express = require('express');
const {getAllStores, getStore, postStore} = require('./store.controller');

const storeRoutes = express.Router();

storeRoutes.get('/', getAllStores);
storeRoutes.get('/:id', getStore);
storeRoutes.post('/new', postStore);

module.exports = storeRoutes;
