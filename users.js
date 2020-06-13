/* const Sequelize = require("sequelize");
const mysql = require("mysql2");

const addUserToDB = async (req, res, next) => {
    const [name, email, phone, address, pass, role] = req.body;
    try {
        const newUser = `INSERT INTO delilah_test.users (full_name, email, phone, full_address, password, role) VALUES (${name}, ${email}, ${phone}, ${address}, ${pass}, ${role})`;
        const _newUser = await Sequelize.query(newUser, { raw: true });
        console.log("Registro insertado.");

        console.log(req.body);
        next();
    } catch (err) {
        console.log(err);
        console.log("aca esta el error");
    }
};

module.exports = { addUserToDB };
 */
