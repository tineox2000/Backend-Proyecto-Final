
const express = require('express');
const { isAuthenticated } = require('../../utils/middlewares/auth.middleware');
const {getAllStores, getStore, putStore, postStore, deleteStore} = require('./store.controller');

const storeRoutes = express.Router();

storeRoutes.get('/', getAllStores);
storeRoutes.get('/:id', getStore);
storeRoutes.put('/edit/:id', putStore);
storeRoutes.post('/new',  postStore);
storeRoutes.delete('/delete/:id', deleteStore);

module.exports = storeRoutes;
