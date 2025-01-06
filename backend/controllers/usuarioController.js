const sequelize = require("../config/db");
const { encriptarContraseña } = require("./../helpers/handleBcrypt");

const crearUsuario = async (req, res) => {
  const {
    rol_id,
    estado_id,
    correo_electronico,
    nombre_completo,
    password,
    telefono,
    fecha_nacimiento,
    cliente_id,
  } = req.body;

  try {
    const contraseñaEncriptada = await encriptarContraseña(password);
    const resultado = await sequelize.query(
      `EXEC p_insertarUsuario 
            @rol_idRol = ${parseInt(rol_id, 10)},
            @estados_idEstados = ${parseInt(estado_id, 10)},
            @correo_electronico = '${correo_electronico}',
            @nombre_completo = '${nombre_completo}',
            @password = '${contraseñaEncriptada}',
            @telefono = '${telefono}',
            @fecha_nacimiento = '${fecha_nacimiento}',
            @clientes_idClientes = ${cliente_id ? parseInt(cliente_id, 10) : null}`
    );

    res.status(201).json({
      estado: "exito",
      data: {
        id: resultado[0][0].idUsuarios,
        nombre: resultado[0][0].nombre_completo,
        password: resultado[0][0].password,
        correo: resultado[0][0].correo_electronico,
        telefono: resultado[0][0].telefono,
        fechaNacimiento: resultado[0][0].fecha_nacimiento,
        estado_id: resultado[0][0].Estados_idEstados,
        rol_id: resultado[0][0].Rol_idRol,
        cliente_id: resultado[0][0].Clientes_idClientes,
      },
    });
  } catch (error) {
    res.status(400).json({
      estado: "error",
      mensaje: error.message,
    });
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;

  const {
    nombre_completo,
    telefono,
  } = req.body;

  try {
    const [results, _] = await sequelize.query(
      `EXEC p_actualizarUsuario 
            @idUsuarios = ${parseInt(id, 10)},
            @nombre_completo = '${nombre_completo}',
            @telefono = '${telefono}'`
    );

    res.status(200).json({
      estado: "exito",
      data: {
        id: results[0].idUsuarios,
        nombre: results[0].nombre_completo,
        password: results[0].password,
        correo: results[0].correo_electronico,
        telefono: results[0].telefono,
        fechaNacimiento: results[0].fecha_nacimiento,
        estado: results[0].Estados_idEstados,
        rol: results[0].Rol_idRol,
        cliente: results[0].Clientes_idClientes,
      },
    });
  } catch (error) {
    res.status(400).json({
      estado: "error",
      mensaje: error.message,
    });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const [results, _] = await sequelize.query(`EXEC p_obtenerUsuarios`);

    res.status(200).json({
      estado: "exito",
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      estado: "error",
      mensaje: error.message,
    });
  }
};

const obtenerUsuarioId = async (req, res) => {
  const { id } = req.params;

  try {
    const [results, _] = await sequelize.query(
      `EXEC p_obtenerUsuarioId @idUsuarios = ${parseInt(id, 10)}`
    );

    res.status(200).json({
      estado: "exito",
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
        cliente: results[0].Clientes_idClientes,
      },
    });
  } catch (error) {
    res.status(400).json({
      estado: "error",
      mensaje: error.message,
    });
  }
};

const obtenerUsuarioActivo = async (req, res) => {
  try {
    const [results, _] = await sequelize.query(`EXEC p_obtenerUsuariosActivos`);

    res.status(200).json({
      estado: "exito",
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      estado: "error",
      mensajesss: error.message,
    });
  }
}

const obtenerUsuarioInactivo = async (req, res) => {
  try {
    const [results, _] = await sequelize.query(`EXEC p_obtenerUsuariosInactivos`);

    res.status(200).json({
      estado: "exito",
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      estado: "error",
      mensaje: error.message,
    });
  }
};

const activarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const [results, _] = await sequelize.query(
      `EXEC p_activarUsuario @idUsuarios = ${parseInt(id, 10)}`
    );

    res.status(200).json({
      estado: "exito",
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      estado: "error",
      mensaje: error.message,
    });
  }
};

const inactivarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const [results, _] = await sequelize.query(
      `EXEC p_inactivarUsuario @idUsuarios = ${parseInt(id, 10)}`
    );

    res.status(200).json({
      estado: "exito",
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      estado: "error",
      mensaje: error.message,
    });
  }
}; 

module.exports = {
  crearUsuario,
  actualizarUsuario,
  obtenerUsuarios,
  obtenerUsuarioId,
  obtenerUsuarioActivo,
  obtenerUsuarioInactivo,
  activarUsuario,
  inactivarUsuario,
};
