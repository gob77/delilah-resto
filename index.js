const express = require("express");
const body = require("body-parser");
const app = express();
const { addUserToDB, checkUser, authenticateUser, logUser, getUserFromDB } = require("./controllers/users.controller");
const { getProducts, newProduct, updateProduct } = require("./controllers/products.controller");
const { newOrder } = require("./controllers/orders.controller");

app.listen(3000, () => {
    console.log("LISTO PARA USAR // escuchando en puerto 3000");
});

app.use(body.json());

/* Users endpoint */

app.get("api/users/all", authenticateUser, getUserFromDB, (req, res) => {});
app.post("/api/users/new", addUserToDB, (req, res) => {});
app.post("/login", logUser, (req, res) => {});

/* products endpoints */

app.get("/api/products/all", getProducts, (req, res) => {});
app.post("/api/products/new", authenticateUser, newProduct, (req, res) => {});
app.patch("/api/products/update/:id", authenticateUser, updateProduct, (req, res) => {});
app.delete("/api/products/delete/:id", authenticateUser, updateProduct, (req, res) => {});

/* Order endpoints */

app.post("/api/order", newOrder, (req, res) => {});

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
