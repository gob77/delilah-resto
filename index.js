const express = require("express");
const body = require("body-parser");
const app = express();
const { addUserToDB, authenticateUser, logUser, getUserFromDB, isAdmin } = require("./controllers/users.controller");
const { getProducts, newProduct, updateProduct, deleteProduct } = require("./controllers/products.controller");
const { newOrder, updateStateOrder, deleteOrder } = require("./controllers/orders.controller");

app.listen(3000, () => {
    console.log("LISTO PARA USAR // escuchando en puerto 3000");
});

app.use(body.json());

/* Users endpoint */

app.get("/api/users", authenticateUser, isAdmin, getUserFromDB, (req, res) => {});
app.post("/api/register", addUserToDB, (req, res) => {});
app.post("/login", logUser, (req, res) => {});

/* products endpoints */

app.get("/api/products", getProducts, (req, res) => {});
app.post("/api/products", authenticateUser, isAdmin, newProduct, (req, res) => {});
app.patch("/api/products/:id", authenticateUser, isAdmin, updateProduct, (req, res) => {});
app.delete("/api/products/:id", authenticateUser, isAdmin, deleteProduct, (req, res) => {});

/* Order endpoints */

app.post("/api/order", newOrder, (req, res) => {});
app.patch("/api/order/:id", authenticateUser, isAdmin, updateStateOrder, (req, res) => {});
app.delete("/api/order/:id", authenticateUser, isAdmin, deleteOrder, (req, res) => {});
