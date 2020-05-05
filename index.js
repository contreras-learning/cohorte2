const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/db.sqlite');

let usersController = require('./app/controllers/users')(db);
let classesController = require('./app/controllers/classes')(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//{{SERVER}}/users/
app.use('/users', usersController);
app.use('/classes', classesController);


app.listen(3456, function () {
    console.log('Corriendo');
})