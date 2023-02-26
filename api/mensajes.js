const Router = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { urlAtlas, database } = require('../config.js');

function connectAtlas(){
    const client = new MongoClient(
        urlAtlas,
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
        }
    );
    return client;
}

const mensajesApiRouter = new Router()

mensajesApiRouter.get('/api/mensajes', async (req, res) => {
    const client = connectAtlas();
    const databaseAtlas = client.db(database);
    const collectionMensajes = databaseAtlas.collection("mensajes");

    let mensajes=[];
    try {
        const cursorAtlas = collectionMensajes.find();

        if ((await cursorAtlas.countDocuments) === 0) {
            mensajes.push( {error: "NO EXISTEN MENSAJES EN LA BASE"} );
        } else {
            await cursorAtlas.forEach(element => mensajes.push(element));
        }
    } finally {
        await client.close();
    }
    res.send(mensajes);
});

mensajesApiRouter.get('/api/mensajes/:msgAutor', async (req, res) => {
    const { msgAutor } = req.params;

    const client = connectAtlas();
    const databaseAtlas = client.db(database);
    const collectionMensajes = databaseAtlas.collection("mensajes");

    let mensaje=[];
    try {
        const query = { autor: msgAutor };
        const result = await collectionMensajes.findOne(query);
        if(result == null){
            mensaje.push( { error: `NO EXISTE ${msgAutor} EN LA BASE` } );
        } else {
            mensaje.push(result);
        }
    } finally {
        await client.close();
    }
    res.send(mensaje);
});

mensajesApiRouter.post('/api/mensajes', (req, res) => {
    res.send("ALTA de Mensaje");
});

mensajesApiRouter.post('/api/mensajes/:id', (req, res) => {
    res.send("ACTUALIZACION de Mensaje");
});

mensajesApiRouter.delete('/api/mensajes/:id', (req, res) => {
    res.send("ELIMINACION de Mensaje");
});

module.exports = mensajesApiRouter;