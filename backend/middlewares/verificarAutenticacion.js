const { verificarToken } = require('./../helpers/handleToken');
const sequelize = require("../config/db");

const verificarAuth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verificarToken(token);

        const response = await buscarToken(token);

        if (response.length === 0) {
            return res.status(401).json({
                estado: "error",
                mensaje: "No se cuenta con los permisos necesarios"
            });
        }

        if (tokenData.id) {
            next();
        } else {
            res.status(401).json({
                estado: "error",
                mensaje: "No se cuenta con los permisos necesarios"
            });
        }
    } catch (error) {
        res.status(401).json({
            estado: "error",
            mensaje: "No se cuenta con los permisos necesarios"
        });
    }
};

const buscarToken = async(token) => {
    try {
        const [results, _] = await sequelize.query(`EXEC p_obtenerToken @token = '${token}'`);
        return results;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    verificarAuth
}