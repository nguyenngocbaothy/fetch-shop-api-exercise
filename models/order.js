const Sequelize = require('sequelize');
const sequelize = require('../helpers/configdb');
const Customer = require('../models/customer');
const OrderItem = require('../models/orderItem');
const DeliveryAddress = require('../models/deliveryAddress');

const Order = sequelize.define('order', {
    customer_id: Sequelize.INTEGER,
    registered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    delivery_add_id: Sequelize.INTEGER,
    payment_type: Sequelize.STRING,
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    total: Sequelize.DOUBLE
});

Order.belongsTo(Customer.Customer, { foreignKey: 'customer_id', targetKey: 'id' });
Order.belongsTo(DeliveryAddress.DeliveryAddress, { foreignKey: 'delivery_add_id' });
Order.hasMany(OrderItem.OrderItem, { foreignKey: 'order_id' });

// sequelize.sync()
//     .then(() => Order.create({
//         customer_id: 1,
//         delivery_add_id: 1,
//         payment_type: 'Master Card',
//         total: 11.11
//     }))
//     .then(order => {
//         console.log(order.toJSON());
//     });

exports.Order = Order;

exports.createOrder = async (body) => {
    const customer = await Customer.Customer.findById(body.customer_id)
    if (!customer) {
        throw new Error('Can not find customer');
    } else {
        const delivery_add = await DeliveryAddress.DeliveryAddress.create({
            forename: body.forename,
            surname: body.surname,
            add1: body.add1,
            add2: body.add2,
            postcode: body.postcode,
            phone: body.phone,
            email: body.email
        });

        if (!delivery_add) {
            throw new Error('Error to add delivery address')
        } else {
            const order = await Order.create({
                customer_id: body.customer_id,
                delivery_add_id: delivery_add.id,
                payment_type: body.payment_type,
                total: body.total
            });

            if (!order) {
                throw new Error('Can not create order');
            } else {
                const orderItem = await OrderItem.OrderItem.create({
                    order_id: order.id,
                    product_id: body.product_id,
                    quantity: body.quantity
                });

                return order;
            }
        }

    }
};

exports.updateOrder = async (body, orderId) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error('Can not find order');
    } else {
        const orderUpdate = await order.update({
            delivery_add_id: body.delivery_add_id,
            payment_type: body.payment_type,
            total: body.total
        });
        if (!orderUpdate) {
            throw new Error('Error to update order');
        } else {
            const delivery = await DeliveryAddress.DeliveryAddress.findById(order.delivery_add_id);
            if (!delivery) {
                throw new Error('Can not find delivery order');
            } else {
                const deliveryUpdate = await delivery.update({
                    forename: body.forename,
                    surname: body.surname,
                    add1: body.add1,
                    add2: body.add2,
                    postcode: body.postcode,
                    phone: body.phone,
                    email: body.email
                });
                if (!deliveryUpdate) {
                    throw new Error('Error to update delivery');
                } else {
                    const orderItem = await OrderItem.OrderItem.find({order_id: order.id})
                    if (!orderItem) {
                        throw new Error('Can not find orderItem');
                    } else {
                        const orderItemUpdate = await orderItem.update({
                            order_id: body.order_id,
                            product_id: body.product_id,
                            quantity: body.quantity
                        });
                        if (!orderItemUpdate) {
                            throw new Error('Error to updar orderItem');
                        } else {
                            return [orderUpdate, deliveryUpdate, orderItemUpdate]
                        }
                    }
                }
            }
        }
    }

};

exports.deleteOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Can not find order');
    const orderRemoved = await order.destroy();
    if (!orderRemoved) throw new Error('Can not destroy order');
    return orderRemoved;
}

exports.getListOrder = async () => {
    const orders = await Order.findAll({
        include: [
            {
                model: OrderItem.OrderItem
            },
            {
                model: DeliveryAddress.DeliveryAddress
            },
            {
                model: Customer.Customer
            },
        ]
    });

    return orders;
}

exports.getOrderForCustomer = async (customerId) => {
    const orders = await Order.findAll({
        where: {
            customer_id: customerId
        }
    });

    return orders;
}