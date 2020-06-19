'use strict';

const MongoContext = require('../modules/MongoContext');
const COLLECTION = 'userfeed';


exports.findAll = function (wheres = {}) {
	const db = MongoContext.getInstance();

	return new Promise((resolve, reject) => {
        try {
            let dbo = db.db("nodeserver");
        	dbo.collection(COLLECTION).find(wheres).toArray((err,result) => {
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
            let dbo = db.db("nodeserver");
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
            let dbo = db.db("nodeserver");
        	dbo.collection(COLLECTION).deleteOne(wheres, (err, result) => {
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
            let dbo = db.db("nodeserver");
        	dbo.collection(COLLECTION).updateOne(wheres, newVals,(err, result) => {
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
            let dbo = db.db("nodeserver");
        	dbo.collection(COLLECTION).insertOne(obj,(err, result)=> {
		    	if (err) throw reject(err)
		    	resolve(result);
		  	});
        } catch(err) {
            console.log('data');
            reject(err);
        }
    });
};

module.exports = exports;
