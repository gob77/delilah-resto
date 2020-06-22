/* const { sequelize } = require("../db.config"); */

module.exports = (sequelize, type) => {
    return sequelize.define(
        "product",
        {
            productID: {
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
