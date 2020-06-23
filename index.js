const express = require("express");
const body = require("body-parser");
const app = express();
const { addUserToDB, checkUser, authenticateUser, logUser, getUserFromDB } = require("./controllers/users.controller");
const { getProducts, newProduct, updateProduct, deleteProduct } = require("./controllers/products.controller");
const { newOrder, updateStateOrder } = require("./controllers/orders.controller");

app.listen(3000, () => {
    console.log("LISTO PARA USAR // escuchando en puerto 3000");
});

app.use(body.json());

/* Users endpoint */

app.get("api/users", authenticateUser, getUserFromDB, (req, res) => {});
app.post("/api/users", addUserToDB, (req, res) => {});
app.post("/login", logUser, (req, res) => {});

/* products endpoints */

app.get("/api/products", getProducts, (req, res) => {});
app.post("/api/products", authenticateUser, newProduct, (req, res) => {});
app.patch("/api/products/:id", authenticateUser, updateProduct, (req, res) => {});
app.delete("/api/products:id", authenticateUser, deleteProduct, (req, res) => {});

/* Order endpoints */

app.post("/api/order", newOrder, (req, res) => {});
app.patch("/api/order", newOrder, authenticateUser, (req, res) => {});

/* Orders endpoint */

/* pedidoID = {
    usuarioID: {
        producto1: {
            productoID,
            precio,
        },
        producto2: {
            productoID,
            precio,
        },
        producto3: {
            productoID,
            precio,
        },
    }
} 


forma de pago
usuario
productos
total


*/
