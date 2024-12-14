const sequelize = require("../config/db");

const obtenerCategorias = async (req, res) => {
  try {
    const [results, _] = await sequelize.query(`EXEC p_obtenerCategorias`);

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

const obtenerCategoriaId = async (req, res) => {
  const { id } = req.params;

  try {
    const [results, _] = await sequelize.query(
      `EXEC p_obtenerCategoriaID @idCategoriaProductos = ${id}`
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

const crearCategoria = async (req, res) => {
    const { usuario_id, nombre, estado_id, fecha_creacion } = req.body;

    try {
        const [results, _] = await sequelize.query(
            `EXEC p_insertarCategoriaProductos 
            @usuarios_idUsuarios = ${parseInt(usuario_id, 10)},
            @nombre = '${nombre}',
            @estados_idEstados = ${parseInt(estado_id, 10)},
            @fecha_creacion = '${fecha_creacion}'`
        );

        res.status(200).json({
            estado: 'exito',
            data: {
                id: results[0].idCategoriaProductos,
                nombre: results[0].nombre,
                fechaCreacion: results[0].fecha_creacion,
                usuario: results[0].Usuarios_idUsuarios,
                estado: results[0].Estados_idEstados
            }
        });
    } catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message
        });
    }
};

const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre, estado_id } = req.body;

    try {
        const [results, _] = await sequelize.query(
            `EXEC p_actualizarCategoria 
            @idCategoriaProductos = ${parseInt(id, 10)},
            @nombre = '${nombre}',
            @estados_idEstados = ${parseInt(estado_id, 10)}`
        );

        res.status(200).json({
            estado: 'exito',
            data: {
                id: results[0].idCategoriaProductos,
                nombre: results[0].nombre,
                estado: results[0].Estados_idEstados,
                usuario: results[0].Usuarios_idUsuarios,
                fechaCreacion: results[0].fecha_creacion
            }
        });
    } catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message
        });
    }
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriaId,
  crearCategoria,
  actualizarCategoria
};
