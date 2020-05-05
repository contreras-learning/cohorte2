module.exports = function (db) {
    const express = require('express');
    const router = express.Router();
    const TABLE = 'users';


    //{{SERVER}}/users/create_users

    router.get('/initialize', function (request, response) {
        db.serialize(function () {
            db.run('CREATE TABLE IF NOT EXISTS '+TABLE+' (name TEXT, id_number INT, email TEXT)');
            response.send('Inicializada');
        });
    });

    //{{SERVER}}/users/delete_users
    router.get('/clean', function (request, response) {
        db.serialize(function () {
            db.run('DROP TABLE IF EXISTS '+TABLE);
            response.send('Limpiada');
        });
    });

    //{{SERVER}}/users/
    router.post('/', function (request, response) {
        //console.log(request.body);
        db.serialize(function () {
            db.run('INSERT INTO '+TABLE+' values ("'
                + request.body.nombre + '",'
                + request.body.cc + ',"'
                + request.body.email + '")');
            response.send('Se ha agregado el usuario: ' + request.body.nombre + ', ' + request.body.cc + ', ' + request.body.email);
        });

    });

    //{{SERVER}}/users/
    router.put('/', function (request, response) {
        //console.log(request.body);
        db.serialize(function () {            
            db.run("UPDATE users SET name='"+request.body.nombre+"', email='"+request.body.email+"' WHERE id_number="+request.body.cc);
            response.send('Se actualizo la tabla '+TABLE +' con la información: ' + request.body.nombre + ', ' + request.body.cc + ', ' + request.body.email);
        });

    });
    //{{SERVER}}/users/
    router.get('/', function (request, response) {

        db.serialize(function () {

            db.all("SELECT * FROM "+TABLE, function (error, rows) {
                if (error) {
                    response.send(error);
                } else {
                    response.send(rows);
                }
            })            
        });
    });

    //{{SERVER}}/users/id
    router.get('/:id', function (request, response) {
        let id = request.params.id;        
        db.serialize(function () {

            db.all("SELECT * FROM "+TABLE + " WHERE id_number="+id, function (error, rows) {
                if (error) {
                    response.send(error);
                } else {
                    response.send(rows[0]);
                }
            })            
        });
    });

    //{{SERVER}}/users/id
    router.delete('/:id', function (request, response) {
        let id = request.params.id;        
        db.serialize(function () {

            db.all("DELETE FROM "+TABLE + " WHERE id_number="+id, function (error, rows) {
                if (error) {
                    response.send(error);
                } else {
                    response.send(rows);
                }
            })            
        });
    });

    return router;
}