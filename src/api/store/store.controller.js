const { response } = require('express');
const Store = require('./store.model');

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


module.exports = {getAllStores, getStore, putStore, postStore}
