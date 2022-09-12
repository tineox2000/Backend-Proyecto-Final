
const express = require('express');
const fileMiddleware = require('../../utils/middlewares/file.middleware');
const { isAuthenticated } = require('../../utils/middlewares/auth.middleware');
const {createStore, getAllStores, getStore, putStore, postStore, deleteStore} = require('./store.controller');

const storeRoutes = express.Router();

storeRoutes.get('/', getAllStores);
storeRoutes.get('/:id', getStore);
storeRoutes.put('/edit/:id', [isAuthenticated], putStore);
storeRoutes.post('/create', [isAuthenticated, fileMiddleware.upload.single("photo"), fileMiddleware.uploadToCloudinary], createStore);
storeRoutes.post('/new', [isAuthenticated], postStore);
storeRoutes.delete('/delete/:id', [isAuthenticated], deleteStore);

module.exports = storeRoutes;
