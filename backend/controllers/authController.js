const sequelize = require("../config/db");
const { compararContraseña } = require('./../helpers/handleBcrypt');
const {  generarToken } = require('./../helpers/handleToken')

const login = async (req, res) => {
    const { correo_electronico, contraseña } = req.body;
    try {
        const [results, _] = await sequelize.query(
            `EXEC p_obtenerUsuarioEmail @correo_electronico = '${correo_electronico}'`
        );

        if (results.length === 0) {
            throw new Error("Usuario no encontrado");
        }

        const contraseñaUsuario = results[0].password;

        const comparacion = await compararContraseña(contraseña, contraseñaUsuario);

        if (!comparacion) {
            throw new Error("Contraseña incorrecta");
        }

        // generando objeto usuario para generar token
        const usuarioToken = {
            id: results[0].idUsuarios,
            rol: results[0].Rol_idRol
        };
        
        const token = await generarToken(usuarioToken);
        console.log(token);

        res.status(200).json({
            estado: "exito",
            data: {
                id: results[0].idUsuarios,
                nombre: results[0].nombre_completo,
                correo: results[0].correo_electronico,
                telefono: results[0].telefono,
                fechaNacimiento: results[0].fecha_nacimiento,
                fechaCreacion: results[0].fecha_creacion,
                estado: results[0].Estados_idEstados,
                rol: results[0].Rol_idRol,
                cliente: results[0].Clientes_idClientes
            },
            token: token
        });
    }
    catch (error) {
        res.status(400).json({
            estado: "error",
            mensaje: error.message,
        });
    }
};

module.exports = {
    login
};