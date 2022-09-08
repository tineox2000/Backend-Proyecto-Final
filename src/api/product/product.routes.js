const express = require('express');

const router = express.Router();

const {getAllProducts, getProduct, postProduct, putProduct, deleteProduct} = require('./product.controller');

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/new', postProduct)
router.put('/edit/:id', putProduct)
router.delete('/delete/:id', deleteProduct);

module.exports = router;
