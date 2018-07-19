'use strict';

module.exports = function(sequelize, DataTypes) {
    const Costumer = sequelize.define('Customer', {
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'customers',
        freezeTableName: true,
        underscored: true
    });

    // force: true will drop the table if it already exists
    Costumer.sync({force: false}).then(() => {
        // Table created
        // return Costumer.create({
        //     username: 'John',
        //     email: 'Hancock'
        // });
    });

    return Costumer;
}
