/* const { sequelize } = require("../db.config"); */

module.exports = (sequelize, type) => {
    return sequelize.define("order", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        state: type.STRING,
        payment: type.STRING,
        address: type.STRING,
        total: type.INTEGER,
        /* user_ID: type.INTEGER, */
    });
};
