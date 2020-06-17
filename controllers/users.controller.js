const jwt = require("jsonwebtoken");
const { User } = require("../db.config");

const addUserToDB = async (req, res) => {
    const { username, name, phone, address, password, isAdmin } = req.body;
    try {
        User.create({
            username,
            name,
            phone,
            address,
            password,
            isAdmin,
        }).then((users) => {
            res.send("added to DB");
        });
    } catch (err) {
        res.json({
            error: err,
        });
    }
};

const logUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const validado = await checkUser(username, password);
        if (!validado) {
            res.json({
                errror: "El usuario es incorrecto o la contrasenia es invalida",
            });
            return;
        } else {
            const token = jwt.sign(
                {
                    username,
                    isAdmin: validado.isAdmin,
                },
                secret
            );

            res.json({ token });
        }
    } catch (error) {
        res.send("error");
    }
};

const getUserFromDB = async (req, res, next) => {
    let getUser = await User.findAll();
    res.json({
        users: getUser,
    });
    next();
};

const checkUser = async (a, b) => {
    const foundIt = await User.findOne({ where: { username: `${a}` } });

    if (foundIt.password != b) {
        return false;
    }
    return foundIt;
};

const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const checkToken = jwt.verify(token, secret);
        if (checkToken) {
            req.usuario = checkToken;
            return next();
        }
    } catch (err) {
        console.error(err);
        res.send("error");
    }
};

const secret = "e2emrtwrdDeLiLah*";

module.exports = { addUserToDB, checkUser, authenticateUser, logUser, getUserFromDB };
