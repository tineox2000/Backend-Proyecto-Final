const express = require('express');
const { isAuthenticated } = require('../../utils/middlewares/auth.middleware');
const {createStore, getAllStores, getStore, putStore, postStore, deleteStore} = require('./store.controller');
const upload = require('../../utils/middlewares/uploadFile.middleware');

const storeRoutes = express.Router();

storeRoutes.get('/', getAllStores);
storeRoutes.get('/:id', getStore);
storeRoutes.put('/edit/:id', [isAuthenticated], putStore);
storeRoutes.post('/create', [isAuthenticated, upload.single("photo")], createStore);
storeRoutes.post('/new', [isAuthenticated], postStore);
storeRoutes.delete('/delete/:id', [isAuthenticated], deleteStore);

module.exports = storeRoutes;
