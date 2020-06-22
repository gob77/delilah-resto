/* const { sequelize } = require("../db.config"); */

module.exports = (sequelize, type) => {
    return sequelize.define("order", {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        detail: type.STRING,
        payment: type.STRING,
        address: type.STRING,
    });
};
