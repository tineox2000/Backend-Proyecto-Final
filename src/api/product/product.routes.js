const express = require('express');
const { isAuthenticated } = require('../../utils/middlewares/auth.middleware');
const { upload }  = require('../../utils/middlewares/file.middleware');

const router = express.Router();

const {getAllProducts, getProduct, postProduct, putProduct, deleteProduct} = require('./product.controller');

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/new', upload.single("photo"), postProduct);
router.put('/edit/:id', putProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
