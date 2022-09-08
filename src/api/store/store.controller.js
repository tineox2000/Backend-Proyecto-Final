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
        const store = await Store.findById(id)//.populate('products');
        res.status(200).json(store);
    } catch (error) {
        res.status(500).send(error);
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


module.exports = {getAllStores, getStore, postStore}
