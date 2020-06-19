'use strict';

const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');
const mongodb = require('mongodb');
const modelPath = './model';
const Helper = require('../../utils/helper');
const config = require('../../config');
// Load Env File
config.loadEnvironment();

const models = {};
let modelsInitialized = false;

exports.getContext = async() => {
    if (modelsInitialized === true) {
        return models;
    }

    const DB = new Sequelize(process.env.DB_CONNECTION_STRING, {
        dialect: 'mysql',
        logging: true,
        // logging: process.env.NODE_ENV === 'production' ? false : console.log,
        pool: {
            min: 0,
            max: 5,
            idle: 10000,
            evict: 10000,
        },
        operatorsAliases: false,
    });

    //migrate Database
    const file = fs.readdirSync(path.join(__dirname, '../../', modelPath)).filter((file) => {
        return (file.indexOf('.') !== 0) && (path.extname(file) === '.js') && (file !== 'index.js');
    }).forEach((file) => {
        const model = DB.import(path.join(__dirname, '../../' ,modelPath, file));
        //console.log(model);
        models[model.name] = model;
    });

    return models;
};

exports.getInstance = () => models;

exports.startTransaction = async () => {
    models.db_transaction = await models.context.transaction({
        isolationLevel: models.context.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
    });
};

exports.commit = async () => {
    if (models.db_transaction) {
        await models.db_transaction.commit();
        models.db_transaction = null;
    }
};

exports.rollback = async () => {
    if (models.db_transaction) {
        await models.db_transaction.rollback();
        models.db_transaction = null;
    }
};

exports.closeContext = async () =>{
    if (models && models.context) {
        const result = await models.context.close();
        models = {
            ORMProvider: Sequelize
        };
        modelsInitialized = false;
        return result;
    }

    return null;
};

module.exports = exports;
