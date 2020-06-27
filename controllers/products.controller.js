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
    try {
        const newProduct = await Product.create({
            name,
            price,
            description,
        }).then((data) => {
            res.send("Se agrego el producto a la base de datos");
            res.status(200);
        });
    } catch (error) {
        console.log(error);
    }
};

const updateProduct = async (req, res) => {
    const productID = req.params.id;
    const data = req.body;
    console.log(productID);
    console.log(data);

    const updated = await Product.update(
        {
            price: data.price,
        },
        {
            where: {
                id: `${productID}`,
            },
        }
    );
    res.status(200);
    res.send("Se actualizo el producto");
};

const deleteProduct = async (req, res) => {
    const productID = req.params.id;
    const deleteProduct = await Product.destroy({
        where: {
            id: productID,
        },
    });
    res.status(200);
    res.send("Se elemino el producto");
};

module.exports = {
    getProducts,
    newProduct,
    updateProduct,
    deleteProduct,
};
