const FirestoreModel = function (firestore) {
    this.getAll = function (table) {
        return new Promise((resolve, reject) => {
            firestore.collection(table).get()
            .then((registros)=>{
                let respuesta =[];
                registros.forEach((registro) => {
                    let elemento = registro.data();
                    elemento.id = registro.id;
                    respuesta.push(elemento);
                });

                resolve(respuesta);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };

    this.getById = function (table, id) {
        return new Promise((resolve, reject) => {
            firestore.collection(table).doc(id).get()
            .then((registro)=>{
                if (registro.exists){
                    let respuesta = registro.data();
                    respuesta.id = registro.id;
                    resolve(respuesta);
                }else{
                    reject({error: 'El elemento en la colección ' + table+' no existe'});
                }                
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };

    this.create = function (table, params) {
        return new Promise((resolve, reject) => {
            firestore.collection(table).add(params)
            .then((respuesta)=>{
                params.id = respuesta.id;
                resolve(params);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };

    this.update = function (table, params, id) {
        return new Promise((resolve, reject) => {
            firestore.collection(table).doc(id).update(params)
            .then((respuesta)=>{        
                params.id = respuesta.id;
                resolve(params);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };

    this.delete = function (table, id) {
        return new Promise((resolve, reject) => {
            firestore.collection(table).doc(id).delete()
            .then((respuesta)=>{                
                resolve('Elemento eliminado' + id);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };
    
    this.clean = function (table) {
        return new Promise((resolve, reject) => {
        });
    };
    
    this.initialize = function (table, params) {
        return new Promise((resolve, reject) => {
            resolve('No aplica para Firestore');
        });
    };

    return this;

};

module.exports = FirestoreModel;