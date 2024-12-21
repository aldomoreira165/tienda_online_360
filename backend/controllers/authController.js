const dotenv = require("dotenv");
dotenv.config({path: "./../.env"});
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
            return res.status(400).json({
                estado: "error",
                mensaje: "Usuario no encontrado"
            });
        }

        const contraseñaUsuario = results[0].password;

        const comparacion = await compararContraseña(contraseña, contraseñaUsuario);

        if (!comparacion) {
            return res.status(400).json({
                estado: "error",
                mensaje: "Contraseña incorrecta"
            });
        }

        // generando objeto usuario para generar token
        const usuarioToken = {
            id: results[0].idUsuarios,
            rol: results[0].Rol_idRol,
            email: results[0].correo_electronico
        };
        
        const token = await generarToken(usuarioToken);
        
        await insertarToken(token);

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

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        await sequelize.query(
            `EXEC p_eliminarToken @token = '${token}'`
        );
        res.status(200).json({
            estado: "exito",
            mensaje: "Sesión cerrada correctamente"
        });
    } catch (error) {
        res.status(400).json({
            estado: "error",
            mensaje: error.message
        });
    }
};

const insertarToken = async (token) => {
    try {
        await sequelize.query(
            `EXEC p_insertarToken @token = '${token}'`
        );
    } catch (error) {
        throw new Error("Error al insertar el token en la base de datos");
    }
}

module.exports = {
    login,
    logout
};