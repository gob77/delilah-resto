/* const db = require("../db.config"); */
const { Product } = require("../db.config");

const getProducts = async (req, res) => {
    const products = await Product.findAll();
    res.json({
        products,
    });
};

const newProduct = async (req, res) => {
    const { name, price, description } = req.body;
    const newProduct = await Product.create({
        name,
        price,
        description,
    }).then((newProduct) => {
        res.send("se agrego el producto a la db");
    });
};

const updateProduct = async (req, res) => {
    const productID = req.params.id;
    const { data } = req.body.price;
    const updated = await Product.update(
        { price: data },
        {
            where: {
                id: productID,
            },
        }
    ).then((data) => {
        console.log("updated");
    });

    res.send("updated");
};

module.exports = {
    getProducts,
    newProduct,
    updateProduct,
};
