const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const sqliteClient = new sqlite3.Database('./db/db.sqlite');
const mongodbCliente = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const databaseConfig = { 
    "sqlite": sqliteClient, 
    "mongodb": mongodbCliente, 
    "mongodb_url": url,
    "default": 'mongodb'
};

let usersController = require('./app/controllers/users')(databaseConfig);
let classesController = require('./app/controllers/classes')(databaseConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//{{SERVER}}/users/
app.use('/users', usersController);
app.use('/classes', classesController);


app.listen(3456, function () {
    console.log('Corriendo');
})