var mongo = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;

function Cad() {
    this.logs;
    this.usuarios;
    this.partidas;

    //logs
    this.insertarLog = function (log, callback) {
        insertar(this.logs, log, callback);
    }

    this.obtenerLogs = function (callback) {
        obtenerTodos(this.logs, callback);
    }

    //Partidas
    this.insertarPartida = function (partida, callback) {
        insertar(this.partidas, partida, callback);
    }

    this.obtenerPartidas = function (callback) {
        obtenerTodos(this.partidas, callback);
    }

    //Usuarios
    this.insertarUsuario = function (usuario, callback) {
        insertar(this.usuarios, usuario, callback);
    }

    this.obtenerUsuarios = function (callback) {
        obtenerTodos(this.usuarios, callback);
    }

    function insertar(coleccion, elemento, callback) {
        coleccion.insertOne(elemento, function (err, result) {
            if (err) {
                console.log("error");
            }
            else {
                console.log("Nuevo elemento creado");
                callback(elemento);
            }
        });
    }

    function obtenerTodos(coleccion, callback) {
        coleccion.find().toArray(function (error, col) {
            callback(col);
        });
    };

    this.conectar = function () {
        let cad = this;
        // mongodb+srv://batalla:<password>@cluster0.daszbao.mongodb.net/?retryWrites=true&w=majority
        mongo.connect("mongodb+srv://batalla:batalla@cluster0.daszbao.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true }, function (err, database) {
            if (!err) {
                console.log("Conectado a MongoDB Atlas");
                database.db("batalla").collection("logs", function (err, col) {
                    if (err) {
                        console.log("No se puede obtener la coleccion")
                    }
                    else {
                        console.log("tenemos la colección logs");
                        cad.logs = col;
                    }
                });
            } else {
                console.log("No se pudo conectar con MongoDB Atlas");
            }
        });
    }
    
    this.conectar();
}

module.exports.Cad = Cad;