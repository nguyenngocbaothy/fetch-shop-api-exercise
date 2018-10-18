const express = require('express');
const app = express();
const parser = require('body-parser')

const customerRouter = require('./controller/customer');
const productRouter = require('./controller/product');
const categoryRouter = require('./controller/category');
const orderRouter = require('./controller/order');
const orderItemRouter = require('./controller/orderItem');
const deliveryRouter = require('./controller/deliveryAddess');

app.use(parser.json()); 

app.use('/customer', customerRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/order', orderRouter);
app.use('/orderitem', orderItemRouter);
app.use('/delivery', deliveryRouter);

app.listen(3000, () => console.log('Server is started!'));