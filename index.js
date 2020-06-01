const express = require('express');
const app = express();
const config = require('./config.json');
//const config = require('./app/utils/config');

const port = process.env.PORT ? process.env.PORT : config.app.port ? config.app.port : 3000;
const bind = process.env.BIND ? process.env.BIND : config.app.bind ? config.app.bind : '127.0.0.1';
//const port = process.env.PORT || config.app.port || 3000;


//URL Encode Support for POST, PUT Methods
const bodyParser = require('body-parser');

//let usersController = require('./app/controllers/users')();
let usersController = require('./app/controllers/users_firebase')()
let classesController = require('./app/controllers/classes')();
let loginController = require('./app/controllers/login')();
let heroController = require('./app/controllers/heroes')();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//{{SERVER}}/users/
app.use('/users', usersController);
app.use('/classes', classesController);
app.use('/login', loginController); 
app.use('/heroes', heroController);


app.get('/', (request, response) => {
    response.send('Bienvenido a la API de ' + config.app.name);
});

app.listen(port, bind, function () {
    console.log('***********************');
    console.log('Aplicación: ' + config.app.name);
    console.log('Corriendo en: ' + config.app.bind + ':' + config.app.port);
    console.log('***********************');
})