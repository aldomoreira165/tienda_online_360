const sequelize = require("../config/db");

const obtenerProductos = async (req, res) => {
  try {
    const [results, _] = await sequelize.query(`EXEC p_obtenerProductos`);

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

const obtenerProductoId = async (req, res) => {
  const { id } = req.params;

  try {
    const [results, _] = await sequelize.query(
      `EXEC p_obtenerProductoID @idProductos = ${id}`
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

const obtenerProductosActivos = async (req, res) => {
  try {
    const [results, _] = await sequelize.query(`EXEC p_obtenerProductosActivos`);

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

const crearProducto = async (req, res) => {
  const {
    categoria_id,
    usuario_id,
    nombre,
    marca,
    codigo,
    stock,
    estados_id,
    precio,
    fecha_creacion,
    foto,
  } = req.body;

  try {
    const [results, _] = await sequelize.query(
      `EXEC p_insertarProductos 
      @categoriaProductos_idCategoriaProductos = ${parseInt(categoria_id, 10)}, 
      @usuarios_idUsuarios = ${parseInt(usuario_id, 10)}, 
      @nombre = '${nombre}', 
      @marca = '${marca}', 
      @codigo = '${codigo}', 
      @stock = ${parseInt(stock, 10)}, 
      @estados_idEstados = ${parseInt(estados_id, 10)}, 
      @precio = ${parseFloat(precio)}, 
      @fecha_creacion = '${fecha_creacion}', 
      @foto = ${foto ? `'${foto}'` : 'NULL'}`
    );

    res.status(200).json({
      estado: "exito",
      data: {
        id: results[0].idProductos,
        categoria: results[0].categoriaProductos_idCategoriaProductos,
        usuario: results[0].usuarios_idUsuarios,
        nombre: results[0].nombre,
        marca: results[0].marca,
        codigo: results[0].codigo,
        stock: results[0].stock,
        estado: results[0].estados_idEstados,
        precio: results[0].precio,
        fecha_creacion: results[0].fecha_creacion,
        foto: results[0].foto,
      },
    });
  } catch (error) {
    res.status(400).json({
      estado: "error",
      mensaje: error.message,
    });
  }
};

const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const {
    categoria_id,
    nombre,
    marca,
    codigo,
    stock,
    estados_id,
    precio,
    foto,
  } = req.body;

  try {
    const [results, _] = await sequelize.query(
      `EXEC p_actualizarProducto 
      @idProductos = ${parseInt(id, 10)},
      @categoriaProductos_idCategoriaProductos = ${parseInt(categoria_id, 10)}, 
      @nombre = '${nombre}', 
      @marca = '${marca}', 
      @codigo = '${codigo}', 
      @stock = ${parseInt(stock, 10)}, 
      @estados_idEstados = ${parseInt(estados_id, 10)}, 
      @precio = ${parseFloat(precio)},  
      @foto = ${foto ? `'${foto}'` : 'NULL'}`
    );

    res.status(200).json({
      estado: "exito",
      data: {
        id: results[0].idProductos,
        categoria: results[0].CategoriaProductos_idCategoriaProductos,
        usuario: results[0].Usuarios_idUsuarios,
        nombre: results[0].nombre,
        marca: results[0].marca,
        codigo: results[0].codigo,
        stock: results[0].stock,
        estado: results[0].Estados_idEstados,
        precio: results[0].precio,
        fecha_creacion: results[0].fecha_creacion,
        foto: results[0].foto,
      },
    });
  } catch (error) {
    res.status(400).json({
      estado: "error",
      mensaje: error.message,
    });
  }
};

const reducirStockProducto = async (req, res) => {
  const { id } = req.params;

  const { cantidad } = req.body;

  try {
    const [results, _] = await sequelize.query(
      `EXEC p_reducirStockProducto
      @idProductos = ${parseInt(id, 10)},
      @cantidadProducto = ${parseInt(cantidad, 10)}`
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
  obtenerProductos,
  obtenerProductoId,
  obtenerProductosActivos,
  crearProducto,
  actualizarProducto,
  reducirStockProducto,
};
