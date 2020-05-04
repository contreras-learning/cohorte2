/* function sumar(a, b){
    return a+b;
}


console.log(sumar(1,2));
console.log(sumar(-1,0));
console.log(sumar(-1,-1));
console.log(sumar(0,0));
console.log("Funcionando");
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/db.sqlite');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/create_users',  function(request, response){
    db.serialize(function () {
        db.run('CREATE TABLE IF NOT EXISTS users (name TEXT, id_number INT, email TEXT)');        
        response.send('Inicializada');
    });

    
});

app.get('/delete_users', function(request, response){
    db.serialize(function(){
        db.run('DROP TABLE IF EXISTS users');
        response.send('Limpiada');
    });
});

app.post('/users', function(request, response){
    //console.log(request.body);
    db.serialize(function(){
        db.run('INSERT INTO users values ("'
        +request.body.nombre+'",'
        +request.body.cc+',"'
        +request.body.email+'")');        
        response.send('Se ha agregado el usuario: ' +request.body.nombre + ', '+request.body.cc+ ', '+request.body.email);
    });
    
});

app.get('/users', function (request, response) {
    
    db.serialize(function () {

        db.all("SELECT * FROM users", function(error, rows){
            if(error){
                response.send(error);
            }else{
                response.send(rows);
            }
        })

        /* db.each("SELECT * FROM lista", function (error, row) {
            if (error) {
                console.error(error);
            } else {
                console.log(row);
            }
        }); */
    });
});
app.get('/hola', function (request, response) {
    console.log('Ingresó a hola');
    response.send('Hola amigo');

});

app.get('/usuarios', function (request, response) {

    /* let usuarios = [];
    usuario1 = {};
    usuario1.nombre = "Juanito";
    usuario1.apellido = "Arcorisis";
    usuario1.edad = 36;
    usuario1.color = "verde";

    usuarios.push(usuario1); */

    response.send([{ "nombre": "Juanita", "apellido": "Arcoiris", edad: 36 }, { "nombre": "Fulano", "apellido": "De Tal", edad: 28 }]);
});


app.listen(3456, function () {
    console.log('Corriendo');
})