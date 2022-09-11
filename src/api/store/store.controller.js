const { response } = require('express');
const Store = require('./store.model');
const User = require('../users/user.model');


//________________________________________________________
const createStore = async (req, res, next) => {
    try {
        const user = req.user;

        if (user.commerceId) {
            const error = new Error('El usuario ya es propietario de un comercio');
            error.status = 400;
            return next(error);
        }

        const store = {
            ...req.body,
            owner: user._id,
        };

        const newStore = new Store(store);
        const created = await newStore.save();

        await User.findByIdAndUpdate(user._id, { commerceId: created._id });

        return res.status(201).json(created);
        
        /**
         * En el front ->
         * 1. Cogemos el comercio y actualizamos en Redux.
         * 2. MUY Importante! Tenemos que actualizar en el front el usuario, recordamos que ahora
         * tiene un nuevo campo llamado commerceId.
         * 
         */

    } catch (error) {
        return next(error);
    }
};
//_____________________________________________________________
const getAllStores = async (req, res, next) => {
    try {
        const stores = await Store.find();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getStore = async (req, res, next) => {
    try {
        const {id} = req.params;
        const store = await Store.findById(id).populate('products');
        res.status(200).json(store);
    } catch (error) {
        res.status(500).send(error);
    }
}

const putStore = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const id = req.params.id;
        const store = new Store(req.body);
        store._id = id;   //cambiamos el id al nuevo objeto para actualizar el que genera por el suyo
        console.log(store);
        const updatedStore = await Store.findByIdAndUpdate(id, store);
        return res.status(200).json(store);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postStore = async (req, res, next) => {
    try {
        const newStore = new Store(req.body);
        const store = await newStore.save();
        res.status(200).json(store);
    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteStore = async (req, res, next) => {
    try {
        const id = req.params.id;
        const store = await Store.findByIdAndDelete(id);
        return res.status(200).json(store);
    } catch (error) {
        return res.status(500).json(error);
    }
}



module.exports = {createStore, getAllStores, getStore, putStore, postStore, deleteStore}
