/* const { sequelize } = require("../db.config"); */

module.exports = (sequelize, type) => {
    return sequelize.define(
        "user",
        {
            userID: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: type.STRING,
            name: type.STRING,
            phone: type.STRING,
            address: type.STRING,
            password: type.STRING,
            isAdmin: type.BOOLEAN,
        },
        {
            timestamps: false,
        }
    );
};
