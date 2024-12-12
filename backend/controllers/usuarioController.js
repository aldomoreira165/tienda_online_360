const sequelize = require('../config/db');

const crearUsuarioOperador = async (req, res) => {
    const { estado_id, correo, nombre, password, telefono, fecha_nacimiento, fecha_creacion } = req.body;

    try {
        const [results, _] = await sequelize.query(
            `EXEC p_insertarUsuarioOperador 
            @estados_idEstados = ${parseInt(estado_id, 10)},
            @correo_electronico = '${correo}',
            @nombre_completo = '${nombre}',
            @password = '${password}',
            @telefono = '${telefono}',
            @fecha_nacimiento = '${fecha_nacimiento}',
            @fecha_creacion = '${fecha_creacion}'`
        );

        res.status(200).json({
            estado: 'exito',
            data: {
                id: results[0].idUsuarios,
                nombre: results[0].nombre_completo,
                password: results[0].password,
                correo: results[0].correo_electronico,
                telefono: results[0].telefono,
                fechaNacimiento: results[0].fecha_nacimiento,
                fechaCreacion: results[0].fecha_creacion,
                estado: results[0].Estados_idEstados,
                rol: results[0].Rol_idRol,
                cliente: results[0].Clientes_idClientes
            }
        });
    } catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message,
        });
    }
};

const crearUsuarioCliente = async (req, res) => {

};

const actualizarUsuario = async (req, res) => {

};

module.exports = {
    crearUsuarioCliente,
    crearUsuarioOperador
};