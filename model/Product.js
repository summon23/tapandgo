'use strict';

module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define('Product', {
        category_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_price: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'product',
        freezeTableName: true,
        underscored: true
    });

    // force: true will drop the table if it already exists
    Product.sync({force: false}).then(() => {
        // Table created
        // return User.create({
        //     first_name: 'John',
        //     last_name: 'Hancock'
        // });
    });

    return Product;
}
