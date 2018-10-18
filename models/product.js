const Sequelize = require('sequelize');
const sequelize = require('../helpers/configdb');
const Category = require('../models/category');

const Product = sequelize.define('product', {
    cateId: Sequelize.INTEGER,
    name: Sequelize.STRING,
    description: {
        type: Sequelize.STRING,
        require: false
    },
    image: {
        type: Sequelize.STRING,
        require: false
    },
    price: {
        type: Sequelize.DOUBLE,
        require: true
    }
});

Product.belongsTo(Category.Category, {foreignKey: 'cateId', targetKey: 'id'});

// sequelize.sync()
//     .then(() => Product.create({
//         cateId: 1,
//         name: 'product1',
//         description: 'hhj',
//         image: 'jjj',
//         price: 11.11
//     }))
//     .then(product => {
//         console.log(product.toJSON());
//     });

exports.Product = Product;   

exports.getProduct = async () => {
    const list = await Product.findAll({ raw: true });
    return list;
}

exports.createProduct = async (body) => {
    const cust = await Product.create(body);
    return cust;
}

exports.updateProduct = async (body, productId) => {
    const product = await Product.findById(productId);
    const productUpdate = await product.update(body);
    return productUpdate;
}

exports.deleteProduct = async (productId) => {
    const product = await Product.findById(productId);
    const productDelete = await product.destroy();
    return productDelete;
} 

exports.listProductOfCategory = async (categoryId) => {
    const products = await Product.findAll({
        where: {
            cateId: categoryId
        }
    })
    return products;
}
