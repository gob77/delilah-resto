const { sequelize } = require("../db.config");
const Orders = require("./Orders.model");

module.exports = (sequelize, type) => {
    return sequelize.define(
        "product",
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: type.STRING,
            price: type.STRING,
            description: type.STRING,
        },
        {
            timestamps: false,
        }
    );
};
