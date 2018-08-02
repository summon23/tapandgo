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
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'users',
        freezeTableName: true,
        underscored: true,
        indexes:[
            {
                unique:true,
                fields:['username']
            },
            {
                unique:true,
                fields:['email']
            }
        ]
    });

    // force: true will drop the table if it already exists
    User.sync({force: false}).then(() => {
        // Table created
        // return User.create({
        //     username: 'hilman',
        //     first_name: 'Hilman',
        //     last_name: 'Syafei',
        //     email: 'syafeihilman@gmail.com',
        //     'password': 'hilman1993'
        // });
    });

    return User;
}
