const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.post('/createorder', (req, res) => {
    Order.createOrder(req.body)
    .then(order => res.send(order))
    .catch(err => res.send(err.message));
});

router.put('/updateorder/:id', (req, res) => {
    Order.updateOrder(req.body, req.params.id)
    .then(order => res.send(order))
    .catch(err => res.send(err.message));
});

router.delete('/deleteorder/:id', (req, res) => {
    Order.deleteOrder(req.params.id)
    .then(order => res.send(order))
    .catch(err => res.send(err.message));
});

router.get('/getlistorder', (req, res) => {
    Order.getListOrder()
    .then(orders => res.send(orders))
    .catch(err => res.send(err.message));
});

router.get('/getordercustomer/:id', (req, res) => {
    Order.getOrderForCustomer(req.params.id)
    .then(orders => res.send(orders))
    .catch(err => res.send(err.message));
});

module.exports = router;