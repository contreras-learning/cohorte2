module.exports = function (db) {
    const express = require('express');
    const router = express.Router();
    const TABLE = 'classes';
    let model = require('../models/sqlite-model')(db);


    //{{SERVER}}/users/ 
    //Lista todos los usuarios
    router.get('/', function (request, response) {
        model.getAll(TABLE)
        .then((rows)=>{
            response.send(rows);
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });

    //{{SERVER}}/users/id 
    //Trae un usuario por ID
    router.get('/:id', function (request, response) {
        let id = request.params.id;
        model.getById(TABLE, id)
        .then((row)=>{
            response.send(row);
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });

    //{{SERVER}}/users/
    //Crea un usuario
    router.post('/', function (request, response) {        
        model.create(TABLE, request.body)
        .then((object)=>{
            response.send(object)
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });

    //{{SERVER}}/users/:id
    //Edita un usuario
    router.put('/:id', function (request, response) {        
        let id = request.params.id;
        model.update(TABLE, request.body, id)
        .then((row)=>{
            response.send(row);
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });

    });
    

    //{{SERVER}}/users/id
    //Elimina un usuario
    router.delete('/:id', function (request, response) {
        let id = request.params.id;        
        model.delete(TABLE, id)
        .then((message)=>{
            response.send(message);
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });


    //{{SERVER}}/users/delete_users
    //Limpiar tabla
    router.get('/option/clean', function (request, response) {
        model.clean(TABLE)
        .then((message)=>{
            response.send(message)
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });

    //{{SERVER}}/users/create_users
    router.post('/option/initialize', function (request, response) {
        model.initialize(TABLE, request.body)
        .then((message)=>{
            response.send(message)
        }).catch((error)=>{
            console.error(error);
            response.send(error);
        });
    });    

    return router;
}