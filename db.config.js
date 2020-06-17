const Sequelize = require("sequelize");
const mysql = require("mysql2");
const UsersModel = require("./models/Users.model");
const ProductModel = require("./models/Products.model");
const OrdersModel = require("./models/Orders.model");

console.log("SE ESTA CONFIGURANDO LA BASE DE DATOS");

const sequelize = new Sequelize("delilah_test", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

const User = UsersModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Order = OrdersModel(sequelize, Sequelize);

Order.hasMany(Product);
Product.belongsTo(Order);

sequelize.sync({ force: false }).then(() => console.log("tablas creadas"));

module.exports = { User, Product, sequelize };
