const Product = require('./product.model');


const getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await Product.find();
        return res.status(200).json(allProducts);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (product) {
            return res.status(200).json(product);
        }else{
            return res.status(404).json('producto no encontrado');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}


const postProduct = async (req, res, next) => {
    try {
        const newProduct = new Product(req.body); 
        const createdProduct = await newProduct.save();
        return res.status(201).json(createdProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const putProduct = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const id = req.params.id;
        const product = new Product(req.body);
        product._id = id;
        console.log(product);
        const updatedProduct = await Product.findByIdAndUpdate(id, product);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}


const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const productDb = await Product.findByIdAndDelete(id);
        return res.status(200).json(productDb);
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = {getAllProducts, getProduct, postProduct, putProduct, deleteProduct}
