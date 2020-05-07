const SQLiteModel = function(sqlite){
    
    this.getAll = function(table) {
        return new Promise((resolve, reject) =>{
            sqlite.serialize(function () {
                sqlite.all("SELECT * FROM "+table, function (error, rows) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(rows);
                    }
                });
            });
        });        
    };

    this.getById = function(table, id) {
        return new Promise((resolve, reject) =>{
            sqlite.serialize(function () {
                sqlite.all("SELECT * FROM "+table+ " WHERE id="+id, function (error, rows) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(rows[0]);
                    }
                });
            });
        });        
    };

    this.create = function(table, params) {
        return new Promise((resolve, reject) =>{
            sqlite.serialize(function () {

                let query = 'INSERT INTO ' + table + ' ('
                let columnNames='';
                let columnValues='';
                for (let [key, value] of Object.entries(params)) {                    
                    columnNames+="'"+key+"', "
                    if (isNaN(value)){
                        columnValues+="'"+value+"', ";
                    }else{
                        columnValues+=value+", ";
                    }                    
                }
                query+=columnNames.substring(0, columnNames.length - 2);
                query+=') VALUES (';
                query+=columnValues.substring(0, columnValues.length - 2);
                query+=');';

                console.log(query);
                sqlite.run(query, function(response, error){
                    if(error){
                        reject(error);
                    }else{
                        resolve(params);
                    }
                    
                }); 
            });
        });
    };

    this.update = function(table, params, id) {
        return new Promise((resolve, reject) =>{
            sqlite.serialize(function () {

                let query = 'UPDATE ' + table + ' SET '
                let element='';                
                for (let [key, value] of Object.entries(params)) {                    
                    element+=key+'=';
                    if (isNaN(value)){
                        element+='"'+value+'", ';
                    }else{
                        element+=value+', ';
                    }                    
                }
                query+=element.substring(0, element.length - 2);
                query+=' WHERE id='+id;
                sqlite.run(query, function(response, error){
                    if(error){
                        reject(error);
                    }
                    resolve(params);
                });                
            });
        });        
    };

    this.delete = function(table, id) {
        return new Promise((resolve, reject) =>{
            sqlite.serialize(function () {

                let query = 'DELETE FROM ' + table+ ' WHERE id='+id;
                console.log(query);     
                sqlite.run(query, function(response, error){
                    if(error){
                        reject(error);
                    }
                    resolve('Se ha eliminado '+id);
                });                
            });
        });        
    };

    this.clean = function(table) {
        return new Promise((resolve, reject) =>{
            sqlite.serialize(function () {
                let query = 'DROP TABLE IF EXISTS ' + table;
                console.log(query);
                sqlite.run(query, function(response, error){
                    if(error){
                        reject(error);
                    }
                    resolve('Se limpió la base de datos '+table);
                });               
            });
        });        
    };

    this.initialize = function(table, params) {
        return new Promise((resolve, reject) =>{
            sqlite.serialize(function () {
                let query = 'CREATE TABLE IF NOT EXISTS  ' + table + ' (id INTEGER PRIMARY KEY, '
                let element='';
                for (let [key, value] of Object.entries(params)) {                    
                    element+=key+' '+value+', ';                    
                }
                query+=element.substring(0, element.length - 2);
                query+=');' 
                console.log(query);

                sqlite.run(query, function(response, error){
                    if(error){
                        reject(error);
                    }
                    resolve(params);
                });              
            });
        });        
    };

    return this;
};

module.exports = SQLiteModel;