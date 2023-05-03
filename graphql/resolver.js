const { Product } = require("../models/product");

const getAllProductos = async () => {
    let sortedProducts;
    try {
        sortedProducts = await Product.find({});
    } catch (error) {
        // productos.push({ error: "Mensaje de Error" });
    }
    return sortedProducts;
};

module.exports = {
    getAllProductos
};