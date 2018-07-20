'use strict';

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('Feed', {
        user_id: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'feed',
        freezeTableName: true,
        underscored: true
    });

    // force: true will drop the table if it already exists
    User.sync({force: true}).then(() => {
        // Table created
        // return User.create({
        // first_name: 'John',
        // last_name: 'Hancock'
        // });
    });

    return User;
}
