const { Product } = require("../models/product");
const User  = require("../models/user");

const productRead = async () => {
    const sortedProducts = await Product.find({})
    return sortedProducts;
};

const userRead = async () => {
    const sortedUsers = await User.find({})
    // console.log(sortedProducts);
    return sortedUsers;
};
module.exports = { productRead, userRead }