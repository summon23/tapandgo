'use strict';

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'users',
        freezeTableName: true,
        underscored: true
    });

    // force: true will drop the table if it already exists
    User.sync({force: false}).then(() => {
        // Table created
        // return User.create({
        // first_name: 'John',
        // last_name: 'Hancock'
        // });
    });

    return User;
}
