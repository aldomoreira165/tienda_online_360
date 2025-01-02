const { verificarToken } = require('./../helpers/handleToken');
const sequelize = require("../config/db");

const verificarAuth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verificarToken(token);
        const response = await buscarToken(token);

        // veroificar si el token existe
        if (response.length === 0) {
            return res.status(401).json({
                estado: "error",
                mensaje: "No se cuenta con los permisos necesarios"
            });
        }

        // verificar si el token es valido
        if (tokenData.id) {
            req.usuario = tokenData;
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

const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        try {
            const { rol } = req.usuario;

            if (rolesPermitidos.includes(rol)) {
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
    verificarAuth,
    verificarRol
}