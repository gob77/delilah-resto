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
            res.send(`Se agrego el usuario: ${username} a la base de datos con el id ${users.id}`);
        });
    } catch (err) {
        res.json({
            error: err,
        });
    }
};

const logUser = async (req, res, next) => {
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
                    id: validado.id,
                    address: validado.address,
                    isAdmin: validado.isAdmin,
                },
                secret
            );

            res.json({ token });
        }
        next();
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

    console.log(foundIt.username);

    if (foundIt.password != b) {
        return false;
    }
    return foundIt;
};

const authenticateUser = (req, res, next) => {
    console.log(req.originalUrl);

    try {
        const token = req.headers.authorization.split(" ")[1];
        const checkToken = jwt.verify(token, secret);
        if (checkToken) {
            req.usuario = checkToken;
            return next();
        }
    } catch (err) {
        res.status(401);
        res.send("Ud no tiene autorizacion para realizar esta accion");
    }
};

const isAdmin = (req, res, next) => {};

const secret = "e2emrtwrdDeLiLah*";

module.exports = { addUserToDB, checkUser, authenticateUser, logUser, getUserFromDB };
