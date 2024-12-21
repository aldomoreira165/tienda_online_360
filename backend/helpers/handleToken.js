const dotenv = require("dotenv");
dotenv.config({path: "./../.env"});
const jwt = require('jsonwebtoken');

const generarToken = async(user) => {
    return jwt.sign(
        {
            id: user.id,
            rol: user.rol,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
};

const verificarToken = async(token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generarToken,
    verificarToken
};