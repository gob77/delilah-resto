const db = require("../db.config");
const { Product } = require("../db.config");

const getProducts = async () => {
    const products = await Product.findAll();
    res.json({
        products,
    });
};

module.exports = {
    getProducts,
};
