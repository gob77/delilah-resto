/* const db = require("../db.config"); */
const { Order, Product } = require("../db.config");
const jwt = require("jsonwebtoken");

const newOrder = async (req, res) => {
    const { detail, payment, total } = req.body;
    const { userID, address } = req.usuario;

    let order = {
        state: "pending",
        payment,
        address,
        userID,
        total,
    };

    const createOrder = await Order.create(order).then((order) => {
        detail.forEach(async (index) => {
            try {
                const getProduct = await Product.findOne({ where: { id: `${index}` } });
                getProduct.addOrder(order);
            } catch (error) {
                console.log(error);
            }
        });
    });
    res.send("se crearon las ordenes");
};

const updateStateOrder = async (req, res) => {
    const orderID = req.params.id;
    const data = req.body.state;

    const updated = await Order.update(
        {
            state: `${data}`,
        },
        {
            where: { id: `${orderID}` },
        }
    );
    res.status(200);
    res.send("Se actualizo el pedido");
};

const deleteOrder = async (req, res) => {
    const orderID = req.params.id;
    const deleteOrder = await Order.destroy({
        where: {
            id: orderID,
        },
    });
    res.status(200);
    res.send("Se elemino el pedido");
};

module.exports = { newOrder, updateStateOrder, deleteOrder };
