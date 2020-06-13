const express = require("express");
const body = require("body-parser");
const auth = require("./auth");
const sequelize = require("./db");
const app = express();

app.listen(3000, () => {
    console.log("Iniciado en puerto 3000");
});

app.use(body.json());

app.post("/login", auth.logUser, (req, res) => {});

app.get("/seguro", auth.authenticateUser, (req, res) => {
    res.send("autenticazion exitosa");
});

app.post("/register", (req, res) => {});

app.post("/api/newuser", sequelize.addUserToDB, (req, res) => {});
