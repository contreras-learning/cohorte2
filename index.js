const express = require('express');
const app = express();

//URL Encode Support for POST, PUT Methods
const bodyParser = require('body-parser');

let usersController = require('./app/controllers/users')();
let classesController = require('./app/controllers/classes')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//{{SERVER}}/users/
app.use('/users', usersController);
app.use('/classes', classesController);


app.listen(3456, function () {
    console.log('Corriendo');
})