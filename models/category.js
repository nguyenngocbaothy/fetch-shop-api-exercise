const Sequelize = require('sequelize');
const sequelize = require('../helpers/configdb');

const Category = sequelize.define('category', {
    name: Sequelize.STRING,
    description: {
        type: Sequelize.STRING,
        require: false
    },
    image: {
        type: Sequelize.STRING,
        require: false
    }
});

// Category.hasMany(Product.Product, {foreignKey: 'cateId', sourceKey: 'id'}); 

// sequelize.sync()
//   .then(() => Category.create({
//     name: 'cate1',
//     description: '',
//     image: ''
//   }))
//   .then(category => {
//     console.log(category.toJSON());
//   });

exports.Category = Category;  

exports.getCategory = async () => {
    const list = await Category.findAll({ raw: true });
    return list;
}

exports.createCategory = async (body) => {
    const cust = await Category.create(body);
    return cust;
}

exports.updateCategory = async (body, categoryId) => {
    const category = await Category.findById(categoryId);
    const categoryUpdate = await category.update(body);
    return categoryUpdate;
}

exports.deleteCategory = async (categoryId) => {
    const category = await Category.findById(categoryId);
    const categoryDelete = await category.destroy();
    return categoryDelete;
} 
