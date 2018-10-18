const Sequelize = require('sequelize');
const sequelize = require('../helpers/configdb');
const Order = require('../models/order');

const DeliveryAddress = sequelize.define('deliveryAddess', {
    forename: Sequelize.STRING,
    surname: Sequelize.STRING,
    add1: Sequelize.STRING,
    add2: Sequelize.STRING,
    postcode: Sequelize.INTEGER,
    phone: Sequelize.INTEGER,
    email: Sequelize.STRING
});

// DeliveryAddress.hasMany(Order.Order, { foreignKey: 'delivery_add_id', targetKey: 'id' });

// sequelize.sync()
//     .then(() => DeliveryAddress.create({
//         forename: 'Alice',
//         surname: 'Alicee',
//         add1: '222a',
//         add2: '222a',
//         postcode: 2342,
//         phone: 6539341846,
//         email: alice2gmail.com
//     }))
//     .then(deliveryAddress => {
//         console.log(deliveryAddress.toJSON());
//     });

exports.DeliveryAddress = DeliveryAddress;  

