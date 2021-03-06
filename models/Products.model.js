/* const { sequelize } = require("../db.config"); */

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
            price: type.INTEGER,
            description: type.STRING,
        },
        {
            timestamps: false,
        }
    );
};
