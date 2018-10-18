const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/getProduct', (req, res) => {
    Product.getProduct()
    .then(products => res.send(products))
    .catch(err => res.send(err.message));
});

router.post('/createproduct', (req, res) => {
    Product.createProduct(req.body)
    .then(product => res.send(product))
    .catch(err => res.send(err.message));
});

router.put('/updateproduct/:id', (req, res) => {
    Product.updateProduct(req.body, req.params.id)
    .then(product => res.send(product))
    .catch(err => res.send(err.message));
});

router.delete('/deleteproduct/:id', (req, res) => {
    Product.deleteProduct(req.params.id)
    .then(product => res.send(product))
    .catch(err => res.send(err.message));
});

router.get('/listproductofcategory/:id', (req, res) => {
    Product.listProductOfCategory(req.params.id)
    .then(products => res.send(products))
    .catch(err => res.send(err.message));
});

module.exports = router;