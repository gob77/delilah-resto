/* const db = require("../db.config"); */
const { Order, Product } = require("../db.config");
const jwt = require("jsonwebtoken");
const { isAdmin } = require("./users.controller");

const newOrder = async (req, res) => {
    const { detail, payment, address, total } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const secret = "e2emrtwrdDeLiLah*";
    const checkToken = jwt.verify(token, secret);

    let order = {
        state: "pending",
        payment,
        address: checkToken.address,
        userID: checkToken.id,
        total,
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

const updateStateOrder = async (req, res) => {
    isAdmin(req.usuario);

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
    res.send("updated");
};

const deleteOrder = async (req, res) => {
    isAdmin(req.usuario);

    const orderID = req.params.id;
    const deleteOrder = await Order.destroy({
        where: {
            id: orderID,
        },
    });
    res.send("Se elemino el pedido");
};

module.exports = { newOrder, updateStateOrder, deleteOrder };

/* {
        payment,
        address: checkToken.address,
        userId: checkToken.id,
    } */
