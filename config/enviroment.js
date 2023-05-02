
const path = require ('path');

require('dotenv').config()

const mongoUri = process.env.MONGO_URI

module.exports = { mongoUri};
