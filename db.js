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

            const table = "CREATE TABLE delilah_test.users ( user_id INT PRIMARY KEY AUTO_INCREMENT , full_name VARCHAR(50) NOT NULL , email VARCHAR(100) NOT NULL , phone VARCHAR(100) NOT NULL , full_address VARCHAR(150) NOT NULL , password VARCHAR(20) NOT NULL , role VARCHAR(20) NOT NULL )";

            const _table = await sequelize.query(table, { raw: true });

            console.log("DB creada");
        } catch (error) {
            console.log(error);
            console.log("La DB ya esta creada");
        }
    })
    .catch((err) => {
        console.log(err);
    });

const UsersModel = require("./models/newUser");
const User = UsersModel(sequelize, Sequelize);
sequelize.sync({ force: false }).then(() => console.log("tablas creadas"));

const addUserToDB = async (req, res, next) => {
    const { username, name, phone, address, password, isAdmin } = req.body;
    console.log(req.body);
    const newUser = `INSERT INTO delilah_test.users (username, name, phone, address, password, isAdmin) VALUES ("${username}", "${name}", "${phone}", "${address}", "${password}", "${isAdmin}")`;
    try {
        const _newUser = await sequelize.query(newUser, { raw: true });
        req.body.user_id = _newUser[0];
        res.sendStatus(200);
        res.send(req.body.user_id);
        next();
    } catch (err) {
        console.log(err);
        res.send("se produjo un error");
    }
};

module.exports = { sequelize, addUserToDB };
