const Sequelize = require("sequelize");
const mysql = require("mysql2");
/* const dbconnection = require("./db.config"); */

console.log("A CONTINUACION SE CREARA LA BASE DE DATOS");

const connection = new Sequelize("", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

connection
    .authenticate()
    .then(async () => {
        try {
            const db = "CREATE DATABASE IF NOT EXISTS delilah_test";
            const _db = await connection.query(db, { raw: true });
            console.log("DB creada");
        } catch (error) {
            console.log(error);
        }
    })
    .catch((err) => {
        console.log(err);
    });
