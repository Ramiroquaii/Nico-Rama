const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productsSchema = new Schema( {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    foto: { type: String, required: true },
    sotck: { type: Number, required: true },
})

const Product = model('Product', productsSchema);

module.exports = {Product};