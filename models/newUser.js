const { sequelize } = require("../db");

module.exports = (sequelize, type) => {
    return sequelize.define(
        "user",
        {
            id: {
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
