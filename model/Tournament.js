'use strict';

module.exports = function(sequelize, DataTypes) {
    const Tournament = sequelize.define('Tournament', {
        name: { type: DataTypes.STRING },
        class: { type: DataTypes.STRING },
        total_price: { type: DataTypes.INTEGER },
        channel_id: { type: DataTypes.INTEGER },
    }, {
        tableName: 'tournament',
        freezeTableName: true,
        underscored: true,
        indexes:[
            {
                unique:true,
                fields:['name']
            }
        ]
    });

    return Tournament;
}
