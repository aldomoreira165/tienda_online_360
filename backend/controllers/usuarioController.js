const sequelize = require('../config/db');
const { encriptarContraseña } = require('./../helpers/handleBcrypt')

const crearUsuarioOperador = async (req, res) => {
    const { 
        estados_idEstados, 
        correo_electronico, 
        nombre_completo, 
        password, 
        telefono, 
        fecha_nacimiento, 
    } = req.body;

    try {
        const hashedPassword = await encriptarContraseña(password);
        console.log("hashedPassword", hashedPassword);
        const [results, _] = await sequelize.query(
            `EXEC p_insertarUsuarioOperador 
            @estados_idEstados = ${parseInt(estados_idEstados, 10)},
            @correo_electronico = '${correo_electronico}',
            @nombre_completo = '${nombre_completo}',
            @password = '${hashedPassword}',
            @telefono = '${telefono}',
            @fecha_nacimiento = '${fecha_nacimiento}'`
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
    const { 
        estados_idEstados,
        correo_electronico,
        nombre_completo,
        password,
        telefono,
        fecha_nacimiento,
        fecha_creacion,
        razon_social,
        nombre_comercial,
        direccion_entrega
     } = req.body;

    try {
        const hashedPassword = await encriptarContraseña(password);
        const [results, _] = await sequelize.query(
            `EXEC p_insertarUsuarioCliente 
            @estados_idEstados = ${parseInt(estados_idEstados, 10)},
            @correo_electronico = '${correo_electronico}',
            @nombre_completo = '${nombre_completo}',
            @password = '${hashedPassword}',
            @telefono = '${telefono}',
            @fecha_nacimiento = '${fecha_nacimiento}',
            @fecha_creacion = '${fecha_creacion}',
            @razon_social = '${razon_social}',
            @nombre_comercial = '${nombre_comercial}',
            @direccion_entrega = '${direccion_entrega}'`
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
    }
    catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message,
        });
    }    
};

const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { 
        cambioCliente,
        estados_idEstados, 
        correo_electronico, 
        nombre_completo, 
        password, 
        telefono, 
        fecha_nacimiento
    } = req.body;

    try {
        const hashedPassword = await encriptarContraseña(password);
        console.log("hashedPassword", hashedPassword);
        const [results, _] = await sequelize.query(
            `EXEC p_actualizarUsuario 
            @idUsuarios = ${parseInt(id, 10)},
            @cambioCliente = ${parseInt(cambioCliente, 10)},
            @estados_idEstados = ${parseInt(estados_idEstados, 10)},
            @correo_electronico = '${correo_electronico}',
            @nombre_completo = '${nombre_completo}',
            @password = '${hashedPassword}',
            @telefono = '${telefono}',
            @fecha_nacimiento = '${fecha_nacimiento}'`
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

module.exports = {
    crearUsuarioCliente,
    crearUsuarioOperador,
    actualizarUsuario
};