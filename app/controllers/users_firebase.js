const UserFirebase = function () {
    const express = require('express');
    const router = express.Router();

    const general = require('../utils/general')();
    let admin = general.getFirebase();

    router.get('/', function (request, response) {
        admin.auth().listUsers().then(function (usersResult) {
            let allUsers = [];
            usersResult.users.forEach(element => {
                allUsers.push(element.toJSON());
            });
            response.send(allUsers);
        }).catch(function (error) {
            response.send(error);
        });
    });

    router.get('/:id', function (request, response) {
        let id = request.params.id;
        admin.auth().getUser(id).then(function (users) {
            response.send(users.toJSON());
        }).catch(function (error) {
            response.send(error);
        });
    });

    router.post('/', function (request, response) {
        admin.auth().createUser(request.body).then(function (users) {
            response.send(users.uid);
        }).catch(function (error) {
            response.send(error);
        });
    });

    router.put('/:id', function (request, response) {
        let id = request.params.id;
        admin.auth().updateUser(id, request.body).then(function (user) {
            response.send(user.toJSON());
        }).catch(function (error) {
            response.send(error);
        });
    });

    router.delete('/:id', function (request, response) {
        let id = request.params.id;
        admin.auth().deleteUser(id).then(function () {
            response.send('Se eliminó');
        }).catch(function (error) {
            response.send(error);
        });

    });

    router.get('/token/:id', function (request, response) {
        let id = request.params.id;

        admin.auth().getUser(id).then(function (users) {
            let user = users.toJSON();
            let customInformation = {
                user: user,
                date_login: new Date(),
                type: 'Admin'
            };
            admin.auth().createCustomToken(id, customInformation).then(function (customToken) {
                response.send(customToken);
            }).catch(function (error) {
                response.send(error);
            });

        }).catch(function (error) {
            response.send(error);
        });




    });

    router.get('/option/clean', function (request, response) {

    });

    return router;
}

module.exports = UserFirebase;