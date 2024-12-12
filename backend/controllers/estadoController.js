const sequelize = require('../config/db');

const crearEstado = async (req, res) => {
  const { nombre } = req.body;
  
  try {
    const [results, _ ] = await sequelize.query(
      `EXEC p_insertarEstado @nombre = '${nombre}'`
    );
  
    console.log(results);

    res.status(200).json({
      estado: 'exito',
      data: {
        id: results[0].idEstados,
        nombre: results[0].nombre,
      }
    });
  } catch (error) {
    res.status(400).json({
      estado: 'error',
      mensaje: error.message,
    });
  }
};

const obtenerEstados = async (req, res) => {
    try {
        const [results, _ ] = await sequelize.query(
        `EXEC p_obtenerEstados`
        );
        
        res.status(200).json({
        estado: 'exito',
        data: results,
        });
    } catch (error) {
        res.status(400).json({
        estado: 'error',
        mensaje: error.message,
        });
    }
}

const obtenerEstadoId = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [results, _ ] = await sequelize.query(
        `EXEC p_obtenerEstadoID @idEstados = ${id}`
        );
        
        res.status(200).json({
        estado: 'exito',
        data: results,
        });
    } catch (error) {
        res.status(400).json({
        estado: 'error',
        mensaje: error.message,
        });
    }
};

module.exports = {
  crearEstado,
  obtenerEstados,
  obtenerEstadoId
};