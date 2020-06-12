var jwt = require("jsonwebtoken");

const logUser = (req, res, next) => {
    try {
        const { usuario, contrasenia } = req.body;
        const validado = checkUser(usuario, contrasenia);
        if (!validado) {
            res.json({
                errror: "El usuario es incorrecto o la contrasenia es invalida",
            });
            return;
        }
        const token = jwt.sign(
            {
                usuario,
            },
            secret
        );

        res.json({ token });
        return next();
    } catch (error) {
        console.log(error);
    }
};

const checkUser = (usuario, contrasenia) => {
    const [filtrarUsuario] = users.filter((fila) => fila.usuario === usuario && fila.contrasenia === contrasenia);
    if (!filtrarUsuario) {
        return false;
    }
    return filtrarUsuario;
};

const authenticateUser = (req, res, next) => {
    console.log(req.headers.authorization.split(" ")[1]);
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

const users = [
    {
        usuario: "mauricio",
        contrasenia: "123456",
    },
];

module.exports = { checkUser, authenticateUser, logUser };
