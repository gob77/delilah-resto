/* const db = require("../db.config"); */
const { Product } = require("../db.config");
const { isAdmin } = require("./users.controller");

const getProducts = async (req, res) => {
    const products = await Product.findAll();
    res.json({
        products,
    });
};

const newProduct = async (req, res) => {
    isAdmin(req.usuario);

    const { name, price, description } = req.body;
    const newProduct = await Product.create({
        name,
        price,
        description,
    });

    res.send("se agrego a la db");
};

const updateProduct = async (req, res) => {
    isAdmin(req.usuario);

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

const deleteProduct = async (req, res) => {
    isAdmin(req.usuario);
    const productID = req.params.id;
    const deleteProduct = await Product.destroy({
        where: {
            id: productID,
        },
    });
    res.send("Se elemino el producto");
};

module.exports = {
    getProducts,
    newProduct,
    updateProduct,
    deleteProduct,
};
