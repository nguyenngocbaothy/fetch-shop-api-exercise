const Sequelize = require('sequelize');
const sequelize = require('../helpers/configdb');

const Customer = sequelize.define('customer', {
  forename: Sequelize.STRING,
  surname: Sequelize.STRING,
  add1: Sequelize.STRING,
  add2: Sequelize.STRING,
  postcode: Sequelize.INTEGER,
  phone: Sequelize.INTEGER,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  registered: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
});

// sequelize.sync()
//   .then(() => Customer.create({
//     forename: 'John',
//     surname: 'Smith',
//     add1: 'abc, us',
//     add2: 'xyz, us',
//     postcode: 7777,
//     phone: 08264658,
//     email: 'john@gmail.com',
//     registered: false
//   }))
//   .then(customer => {
//     console.log(customer.toJSON());
//   });

exports.Customer = Customer;

exports.getCustomer = async () => {
  const list =  await Customer.findAll({raw: true});
  return list;
}  


exports.createCustomer = async (body) => {
  const cust =  await Customer.create(body);
  return cust;
} 

exports.updateCustomer = async (body, customerId) => {
  const customer = await Customer.findById(customerId);
  const customerUpdate = await customer.update(body);
  return customerUpdate;
} 

exports.deleteCustomer = async (customerId) => {
  const customer = await Customer.findById(customerId);
  const customerDelete = await customer.destroy();
  return customerDelete;
} 