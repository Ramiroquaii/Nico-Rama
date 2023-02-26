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
  
  async function getUser(usr){
    const client = connectAtlas();
    const databaseAtlas = client.db(database);
    const collectionProductos = databaseAtlas.collection("usuarios");
  
    let result;
    try {
        const query = { user: usr };
        result = await collectionProductos.findOne(query);
    } finally {
        await client.close();
    }
    return result; //Null si usuario no existe - Objeto usuario si se encuentra en la DB.  
  }

  async function validateUser(usr, pwd){
    const usuario = await getUser(usr);
  }