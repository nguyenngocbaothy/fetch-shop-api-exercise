const Sequelize = require('sequelize');
const sequelize = require('../helpers/configdb');
const Product = require('../models/product');
const Order = require('../models/order');

const OrderItem = sequelize.define('orderItem', {
    order_id: Sequelize.INTEGER,
    product_id: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER
});

// OrderItem.belongsTo(Order.Order, {foreignKey: 'order_id', targetKey: 'id'});
OrderItem.hasMany(Product.Product, {foreignKey: 'product_id', sourceKey: 'id'});

// sequelize.sync()
//     .then(() => OrderItem.create({
//         order_id: 1,
//         product_id: 1,
//         quantity: 10
//     }))
//     .then(orderItem => {
//         console.log(orderItem.toJSON());
//     });

exports.OrderItem = OrderItem;   