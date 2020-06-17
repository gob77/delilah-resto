const express = require("express");
const body = require("body-parser");
/* const sequelize = require("./db.config"); */
/* const products = require("./models/Products.model"); */
const app = express();
const userControllers = require("./controllers/users.controller");
const productControllers = require("./controllers/products.controller");

app.listen(3000, () => {
    console.log("LISTO PARA USAR // escuchando en puerto 3000");
});

app.use(body.json());

app.post("/login", userControllers.logUser, (req, res) => {});

app.get("/seguro", userControllers.authenticateUser, (req, res) => {
    res.send("autenticazion exitosa");
});

app.post("/register", (req, res) => {});

app.post("/api/newuser", userControllers.addUserToDB, (req, res) => {});

app.get("/users", userControllers.getUserFromDB, (req, res) => {});

/* products endpoints */

app.get("/api/products/all", productControllers.getProducts, (req, res) => {});
