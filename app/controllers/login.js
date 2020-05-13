const LoginController = function () {
    const express = require('express');
    const router = express.Router();
    var jwt = require('jsonwebtoken');

    router.post('/', function (request, response) {
        let user = request.body.user;
        let password = request.body.password;

        if (user == 'admin' && password == '12345678') {
            let datos = {
                user: user,
                date_login: new Date(),
                type: 'Admin'
            }

            let secreto = 'bictia';

            let token = jwt.sign({ 
                //                                    60 * 60 = 360 segundo = 1 hora
                exp: Math.floor(Date.now() / 1000) + (10 * 1), 
                data: datos }, secreto);
            response.send({ token: token });
        } else {
            response.send('Datos incorrectos');
        }
    });

    return router;
}
module.exports = LoginController;