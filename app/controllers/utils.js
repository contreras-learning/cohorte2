module.exports = function(){
    const express = require('express');
    const router = express.Router();


    router.get('/hola', function (request, response) {
        console.log('Ingresó a hola');
        response.send('Hola amigo');
    
    });
    
    router.get('/usuarios', function (request, response) {
    
        /* let usuarios = [];
        usuario1 = {};
        usuario1.nombre = "Juanito";
        usuario1.apellido = "Arcorisis";
        usuario1.edad = 36;
        usuario1.color = "verde";
    
        usuarios.push(usuario1); */
    
        response.send([{ "nombre": "Juanita", "apellido": "Arcoiris", edad: 36 }, { "nombre": "Fulano", "apellido": "De Tal", edad: 28 }]);
    });
}