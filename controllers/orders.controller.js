/* const db = require("../db.config"); */
const { Order, Product, User } = require("../db.config");
const jwt = require("jsonwebtoken");
const productsController = require("./products.controller");

const newOrder = async (req, res) => {
    const { detail, payment, address } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const secret = "e2emrtwrdDeLiLah*";
    const checkToken = jwt.verify(token, secret);

    let order = {
        state: "pending",
        payment,
        address: checkToken.address,
        userID: checkToken.id,
        total: await getTotalPrice(detail),
    };

    console.log(order);
    const createOrder = await Order.create(order).then((order) => {
        detail.forEach(async (index) => {
            try {
                const product = await Product.findOne({ where: { id: `${index}` } });
                product.addOrder(order);
            } catch (error) {
                console.log(error);
            }
        });
    });
    res.send("se crearon las ordenes");
};

const getTotalPrice = async (arr) => {
    let price = 0;
    arr.forEach(async (index) => {
        const getProduct = Product.findOne({ where: { id: `${index}` } });
        price += getProduct.price;
    });
    return price;
};

const updateStateOrder = async (req, res) => {
    const orderID = req.params.id;
    const { data } = req.body.price;
    const updated = await Product.update(
        { state: data },
        {
            where: {
                id: orderID,
            },
        }
    ).then((data) => {
        console.log("updated");
    });

    res.send("updated");
};

module.exports = { newOrder, updateStateOrder };

/* {
        payment,
        address: checkToken.address,
        userId: checkToken.id,
    } */
