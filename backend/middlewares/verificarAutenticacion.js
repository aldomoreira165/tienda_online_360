const { verificarToken } = require('./../helpers/handleToken');

const verificarAuth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verificarToken(token);
        console.log(tokenData);

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

module.exports = {
    verificarAuth
}