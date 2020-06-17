const { sequelize } = require("../db.config");
const products = require("./Products.model");

module.exports = (sequelize, type) => {
    return sequelize.define(
        "order",
        {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            description: type.STRING,
        },
        {
            timestamps: false,
        }
    );
};
