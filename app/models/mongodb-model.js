const MongoDBModel = function (MongoClient, url) {
    // Database Name
    const dbName = 'myproject';

    //const MongoClient = require('mongodb').MongoClient;


    this.getAll = function (table) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (error, client) {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    let database = client.db(dbName);
                    const collection = database.collection(table);                    
                    collection.find({}).toArray(function(errorGetAll, result){
                        resolve(result);
                        client.close();
                    });
                }
            });
        });
    };

    /* this.getAll = function (table) {
        return new Promise((resolve, reject) => {

            MongoClient.connect(url, function (error, client) {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    let database = client.db(dbName);
                    const collection = database.collection(table);
                    //collection.insertOne({"name":"Juanito", "date": new Date()});
                    collection.find({}).toArray(function(errorGetAll, result){
                        resolve(result);
                        client.close();
                    });

                    //resolve('Se ha creado la coleccion');
                    database.createCollection(table, function (errorCollection, result) {
                        if (errorCollection) {
                            console.error(error);
                            reject(error);
                        } else {
                            console.log('Se ha creado la colección');
                            resolve('Se ha creado la coleccion');
                            client.close();
                        }

                    });

                }

            });

        });

    }; */

    this.getById = function (table, id) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, function (error, client) {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    let database = client.db(dbName);
                    const collection = database.collection(table);                    
                    collection.findOne({name:id},function(errorGetAll, result){
                        resolve(result);
                        client.close();
                    });
                }
            });
        });

    };

    this.create = function (table, params) {
        return new Promise((resolve, reject) => {
            resolve('Se está llamando desde mongo');
        });

    };

    this.update = function (table, params, id) {
        return new Promise((resolve, reject) => {
            resolve('Se está llamando desde mongo');
        });

    };

    this.delete = function (table, id) {
        return new Promise((resolve, reject) => {
            resolve('Se está llamando desde mongo');
        });

    };

    this.clean = function (table) {
        return new Promise((resolve, reject) => {
            resolve('Se está llamando desde mongo');
        });

    };

    this.initialize = function (table, params) {
        return new Promise((resolve, reject) => {
            resolve('Se está llamando desde mongo');
        });

    };

    return this;
};

module.exports = MongoDBModel;