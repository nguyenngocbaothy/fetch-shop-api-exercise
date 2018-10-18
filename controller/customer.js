const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

router.get('/getcustomer', (req, res) => {
    Customer.getCustomer()
    .then(customers => res.send(customers))
    .catch(err => res.send(err.message));
});

router.post('/createcustomer', (req, res) => {
    Customer.createCustomer(req.body)
    .then(customer => res.send(customer))
    .catch(err => res.send(err.message));
});

router.put('/updatecustomer/:id', (req, res) => {
    Customer.updateCustomer(req.body, req.params.id)
    .then(customer => res.send(customer))
    .catch(err => res.send(err.message));
});

router.delete('/deletecustomer/:id', (req, res) => {
    Customer.deleteCustomer(req.params.id)
    .then(customer => res.send(customer))
    .catch(err => res.send(err.message));
});

module.exports = router;