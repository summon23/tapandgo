'use strict';

const MongoContext = require('../modules/MongoContext');
const COLLECTION = 'userfeed';


exports.findAll = function (wheres) {
	const db = MongoContext.getInstance();
	return new Promise((resolve, reject) => {
        try {
        	db.collection(COLLECTION).find({}).toArray((err,result) => {
	    	if (err) throw err;
		    	resolve(result);
		  	});
        } catch(err) {
            reject(err);
        }
    });
};

exports.findOne = function (wheres) {
	const db = MongoContext.getInstance();
	return new Promise((resolve, reject) => {
        try {
        	db.collection(COLLECTION).findOne(wheres, (err, result) => {
	    		if (err) throw err;
		    	resolve(result);
		  	});
        } catch(err) {
            reject(err);
        }
    });
};

exports.deleteOne = function (wheres) {
	const db = MongoContext.getInstance();
	return new Promise((resolve, reject) => {
        try {
        	db.collection(COLLECTION).deleteOne(wheres, (err, result) => {
	    		if (err) throw err;
		    	resolve(result);
		  	});
        } catch(err) {
            reject(err);
        }
    });
};

exports.updateOne = function (wheres, newVals) {
	const db = MongoContext.getInstance();
	return new Promise((resolve, reject) => {
        try {
        	db.collection(COLLECTION).updateOne(wheres, newVals,(err, result) => {
	    		if (err) throw err;
		    	resolve(result);
		  	});
        } catch(err) {
            reject(err);
        }
    });
};

exports.createOne = function (obj) {
  	const db = MongoContext.getInstance();
  	return new Promise((resolve, reject) => {
        try {
        	db.collection(COLLECTION).insertOne(obj,(err, result)=> {
		    	if (err) throw reject(err);
		    	resolve(result);
		  	});
        } catch(err) {
            reject(err);
        }
    });
};

module.exports = exports;
