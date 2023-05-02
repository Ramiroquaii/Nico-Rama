const mongoose = require('mongoose');

const { mongoUri } = require('./enviroment.js');



// mongoose.connect(mongoUri, {})
//     .then(db = console.log('database is connected'))
//     .catch(err => console.error(err))

let isConnected;

const connectToDb = async () => {
    if(!isConnected) {
        console.log('nueva conexion');
        await mongoose.connect(mongoUri)
        isConnected = true;
        return;
    }

    console.log('conexion existente');
    return;
}

module.exports = { connectToDb };