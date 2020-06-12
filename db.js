const Sequelize = require("sequelize");
const mysql = require("mysql2");

const sequelize = new Sequelize("", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

sequelize
    .authenticate()
    .then(async () => {
        try {
            const db = "CREATE DATABASE IF NOT EXISTS delilah_test";
            const _db = await sequelize.query(db, { raw: true });

            const table = "CREATE TABLE delilah_test.usuarios (id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR (60) UNIQUE NOT NULL, nombre VARCHAR (60) NOT NULL, edad INT UNSIGNED NOT NULL";

            /* const table = "CREATE TABLE delilah_test.users (name VARCHAR(255), address VARCHAR(255))"; */
            const _table = await sequelize.query(table, { raw: true });

            console.log("DB creada");
        } catch (error) {
            console.log("La DB ya esta creada");
        }
    })
    .catch((err) => {
        console.log(err);
    });
