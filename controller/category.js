const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/getcategory', (req, res) => {
    Category.getCategory()
    .then(categories => res.send(categories))
    .catch(err => res.send(err.message));
});

router.post('/createcategory', (req, res) => {
    Category.createCategory(req.body)
    .then(category => res.send(category))
    .catch(err => res.send(err.message));
});

router.put('/updatecategory/:id', (req, res) => {
    Category.updateCategory(req.body, req.params.id)
    .then(category => res.send(category))
    .catch(err => res.send(err.message));
});

router.delete('/deletecategory/:id', (req, res) => {
    Category.deleteCategory(req.params.id)
    .then(category => res.send(category))
    .catch(err => res.send(err.message));
});

module.exports = router;