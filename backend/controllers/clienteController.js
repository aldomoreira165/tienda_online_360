const sequelize = require("../config/db");

const crearCliente = async (req, res) => {
  const { razon_social, nombre_comercial, direccion_entrega, telefono, email } =
    req.body;

  try {
    const [results, _] = await sequelize.query(
      `EXEC p_insertarCliente 
            @razon_social = '${razon_social}',
            @nombre_comercial = '${nombre_comercial}',
            @direccion_entrega = '${direccion_entrega}',
            @telefono = '${telefono}',
            @email = '${email}'`
    );

    console.log("results", results);

    res.status(201).json({
      estado: "exito",
      data: {
        id: results[0].idClientes,
        razon_social: results[0].razon_social,
        nombre_comercial: results[0].nombre_comercial,
        direccion_entrega: results[0].direccion_entrega,
        telefono: results[0].telefono,
        correo_electronico: results[0].email,
      },
    });
  } catch (error) {
    res.status(400).json({
      estado: "error",
      mensaje: error.message,
    });
  }
};

const actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const {
    razon_social,
    nombre_comercial,
    direccion_entrega,
    telefono,
    correo_electronico,
  } = req.body;

  try {
    const [results, _] = await sequelize.query(
      `EXEC p_actualizarCliente 
            @idClientes = ${parseInt(id, 10)},
            @razon_social = '${razon_social}',
            @nombre_comercial = '${nombre_comercial}',
            @direccion_entrega = '${direccion_entrega}',
            @telefono = '${telefono}',
            @correo_electronico = '${correo_electronico}'`
    );

    res.status(200).json({
      estado: "exito",
      data: {
        id: results[0].idClientes,
        razonSocial: results[0].razon_social,
        nombreComercial: results[0].nombre_comercial,
        direccionEntrega: results[0].direccion_entrega,
        telefono: results[0].telefono,
        correoElectronico: results[0].correo_electronico,
      },
    });
  } catch (error) {
    res.status(400).json({
      estado: "error",
      mensaje: error.message,
    });
  }
};

const obtenerClientes = async (req, res) => {
  try {
    const [results, _] = await sequelize.query(`EXEC p_obtenerClientes`);

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
  crearCliente,
  actualizarCliente,
  obtenerClientes,
};
