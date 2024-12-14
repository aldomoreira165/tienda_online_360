const dotenv = require("dotenv");
dotenv.config({path: "./../.env"});
const jwt = require('jsonwebtoken');

const generarToken = async(user) => {
    return jwt.sign(
        {
            id: user.id,
            rol: user.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
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