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
const aplication = express();

aplication.get('/', function (request, response) {
    response.send('Estoy acá');
});
aplication.get('/hola', function (request, response) {
    response.send('Hola amigo');
});

aplication.get('/usuarios', function (request, response) {
    
    /* let usuarios = [];
    usuario1 = {};
    usuario1.nombre = "Juanito";
    usuario1.apellido = "Arcorisis";
    usuario1.edad = 36;
    usuario1.color = "verde";

    usuarios.push(usuario1); */
    
    response.send([{"nombre":"Juanito", "apellido": "Arcoiris", edad: 36},{"nombre":"Fulano", "apellido": "De Tal", edad: 28}]);
});


aplication.listen(3456, function () {
    console.log('Corriendo');
})