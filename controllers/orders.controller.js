/* const db = require("../db.config"); */
const { Order, Product, User } = require("../db.config");
const jwt = require("jsonwebtoken");

const newOrder = (req, res) => {
    const { detail, payment, address } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const secret = "e2emrtwrdDeLiLah*";
    const checkToken = jwt.verify(token, secret);

    detail.forEach(async (index) => {
        const prodID = await Product.findOne({ where: { id: `${index}` } });
        const newOrder = await Order.create({
            productID: prodID.productID,
            payment,
            address: checkToken.address,
            userId: checkToken.id,
        });
    });

    res.send("se crearon las ordenes");
};

module.exports = { newOrder };
