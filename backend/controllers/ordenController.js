const sequelize = require('../config/db');

const crearOrdenConDetalle = async (req, res) => {
    const { 
        Estados_idEstados, 
        nombre_completo, 
        direccion, 
        telefono, 
        correo_electronico, 
        fecha_entrega, 
        total_orden, 
        detalles 
    } = req.body;

    const { id } = req.usuario;

    try {
        const detallesJSON = JSON.stringify(detalles);

        const [results, _] = await sequelize.query(
            `EXEC p_insertarOrdenConDetalle 
            @Usuarios_idUsuarios = ${parseInt(id, 10)},
            @Estados_idEstados = ${parseInt(Estados_idEstados, 10)},
            @nombre_completo = '${nombre_completo}',
            @direccion = '${direccion}',
            @telefono = '${telefono}',
            @correo_electronico = '${correo_electronico}',
            @fecha_entrega = '${fecha_entrega}',
            @total_orden = ${parseFloat(total_orden)},
            @detalles = '${detallesJSON}'`
        );

        res.status(200).json({
            estado: 'exito',
            data: {
                idOrden: results[0].idOrden,
                usuario: results[0].Usuarios_idUsuarios,
                estado: results[0].Estados_idEstados,
                fechaCreacion: results[0].fecha_creacion,
                nombreCompleto: results[0].nombre_completo,
                direccion: results[0].direccion,
                telefono: results[0].telefono,
                correoElectronico: results[0].correo_electronico,
                fechaEntrega: results[0].fecha_entrega,
                totalOrden: results[0].total_orden,
                detalles: JSON.parse(detallesJSON),
            }
        });
    } catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message,
        });
    }
};

const obtenerOrdenes = async (req, res) => {
    try {
        const [results, _] = await sequelize.query(
            `EXEC p_obtenerOrdenes`
        );

        // agrupando los resultados por idOrden
        const ordenes = [];
        results.forEach((orden) => {
            const ordenExistente = ordenes.find(o => o.idOrden === orden.idOrden);
            if (ordenExistente) {
                ordenExistente.detalles.push({
                    Productos_idProductos: orden.Productos_idProductos,
                    nombre: orden.nombre,
                    marca: orden.marca,
                    foto: orden.foto,
                    precio: orden.precio,
                    cantidad: orden.cantidad,
                    subtotal: orden.subtotal
                });
            } else {
                ordenes.push({
                    idOrden: orden.idOrden,
                    Usuarios_idUsuarios: orden.Usuarios_idUsuarios,
                    Estados_idEstados: orden.Estados_idEstados,
                    fecha_creacion: orden.fecha_creacion,
                    fecha_entrega: orden.fecha_entrega,
                    direccion: orden.direccion,
                    estado_nombre: orden.estado_nombre,
                    total: orden.total_orden,
                    idUsuario: orden.Usuarios_idUsuarios,
                    emailUsuario: orden.correo_electronico,
                    detalles: [{
                        Productos_idProductos: orden.Productos_idProductos,
                        nombre: orden.nombre,
                        marca: orden.marca,
                        foto: orden.foto,
                        precio: orden.precio,
                        cantidad: orden.cantidad,
                        subtotal: orden.subtotal
                    }]
                });
            }
        });

        res.status(200).json({
            estado: 'exito',
            data: ordenes,
        });

    } catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message
        });
    }
};

const obtenerOrdenId = async (req, res) => {
    const { id } = req.params;

    try {
        const [results, _] = await sequelize.query(
            `EXEC p_obtenerOrdenID @idOrden = ${parseInt(id, 10)}`
        );

        // agrupando los resultados por idOrden
        const ordenes = [];
        results.forEach((orden) => {
            const ordenExistente = ordenes.find(o => o.idOrden === orden.idOrden);
            if (ordenExistente) {
                ordenExistente.detalles.push({
                    Productos_idProductos: orden.Productos_idProductos,
                    cantidad: orden.cantidad,
                    subtotal: orden.subtotal
                });
            } else {
                ordenes.push({
                    idOrden: orden.idOrden,
                    Usuarios_idUsuarios: orden.Usuarios_idUsuarios,
                    Estados_idEstados: orden.Estados_idEstados,
                    fecha_creacion: orden.fecha_creacion,
                    detalles: [{
                        Productos_idProductos: orden.Productos_idProductos,
                        cantidad: orden.cantidad,
                        subtotal: orden.subtotal
                    }]
                });
            }
        });

        res.status(200).json({
            estado: 'exito',
            data: ordenes,
        });

    } catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message
        });
    }
};

const obtenerOrdenesUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const [results, _] = await sequelize.query(
            `EXEC p_obtenerOrdenesUsuario @idUsuarios = ${parseInt(id, 10)}`
        );

        // agrupando los resultados por idOrden
        const ordenes = [];
        results.forEach((orden) => {
            const ordenExistente = ordenes.find(o => o.idOrden === orden.idOrden);
            if (ordenExistente) {
                ordenExistente.detalles.push({
                    Productos_idProductos: orden.Productos_idProductos,
                    nombre: orden.nombre,
                    marca: orden.marca,
                    foto: orden.foto,
                    precio: orden.precio,
                    cantidad: orden.cantidad,
                    subtotal: orden.subtotal
                });
            } else {
                ordenes.push({
                    idOrden: orden.idOrden,
                    Usuarios_idUsuarios: orden.Usuarios_idUsuarios,
                    Estados_idEstados: orden.Estados_idEstados,
                    fecha_creacion: orden.fecha_creacion,
                    fecha_entrega: orden.fecha_entrega,
                    direccion: orden.direccion,
                    estado_nombre: orden.estado_nombre,
                    total: orden.total_orden,
                    detalles: [{
                        Productos_idProductos: orden.Productos_idProductos,
                        nombre: orden.nombre,
                        marca: orden.marca,
                        foto: orden.foto,
                        precio: orden.precio,
                        cantidad: orden.cantidad,
                        subtotal: orden.subtotal
                    }]
                });
            }
        });

        res.status(200).json({
            estado: 'exito',
            data: ordenes,
        });

    } catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message
        });
    }
};

const obtenerOrdenesConfirmadas = async (req, res) => {
    try {
        const [results, _] = await sequelize.query(
            `EXEC p_obtenerOrdenesConfirmadas`
        );

        // agrupando los resultados por idOrden
        const ordenes = [];
        results.forEach((orden) => {
            const ordenExistente = ordenes.find(o => o.idOrden === orden.idOrden);
            if (ordenExistente) {
                ordenExistente.detalles.push({
                    Productos_idProductos: orden.Productos_idProductos,
                    nombre: orden.nombre,
                    marca: orden.marca,
                    foto: orden.foto,
                    precio: orden.precio,
                    cantidad: orden.cantidad,
                    subtotal: orden.subtotal
                });
            } else {
                ordenes.push({
                    idOrden: orden.idOrden,
                    Usuarios_idUsuarios: orden.Usuarios_idUsuarios,
                    Estados_idEstados: orden.Estados_idEstados,
                    fecha_creacion: orden.fecha_creacion,
                    fecha_entrega: orden.fecha_entrega,
                    direccion: orden.direccion,
                    estado_nombre: orden.estado_nombre,
                    total: orden.total_orden,
                    idUsuario: orden.Usuarios_idUsuarios,
                    emailUsuario: orden.correo_electronico,
                    detalles: [{
                        Productos_idProductos: orden.Productos_idProductos,
                        nombre: orden.nombre,
                        marca: orden.marca,
                        foto: orden.foto,
                        precio: orden.precio,
                        cantidad: orden.cantidad,
                        subtotal: orden.subtotal
                    }]
                });
            }
        });

        res.status(200).json({
            estado: 'exito',
            data: ordenes,
        });

    } catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message
        });
    }
}

const entregarOrden = async (req, res) => {
    const { id } = req.params;

    try {
        const [results, _] = await sequelize.query(
            `EXEC p_entregarOrden @idOrden = ${parseInt(id, 10)}`
        );

        res.status(200).json({
            estado: 'exito',
            data: results[0],
        });

    } catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message
        });
    }
}

const rechazarOrden = async (req, res) => {
    const { id } = req.params;

    try {
        const [results, _] = await sequelize.query(
            `EXEC p_rechazarOrden @idOrden = ${parseInt(id, 10)}`
        );

        res.status(200).json({
            estado: 'exito',
            data: results[0],
        });

    } catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message
        });
    }
}

const actualizarOrden = async (req, res) => {
    const { id } = req.params;
    const { 
        Estados_idEstados,
        nombre_completo,
        direccion,
        telefono,
        correo_electronico,
        fecha_entrega,
        total_orden
    } = req.body;

    try {
        
        const [results, _] = await sequelize.query(
            `EXEC p_actualizarOrden 
            @idOrden = ${parseInt(id, 10)},
            @Estados_idEstados = ${parseInt(Estados_idEstados, 10)},
            @nombre_completo = '${nombre_completo}',
            @direccion = '${direccion}',
            @telefono = '${telefono}',
            @correo_electronico = '${correo_electronico}',
            @fecha_entrega = '${fecha_entrega}',
            @total_orden = ${parseFloat(total_orden)}`
        );

        res.status(200).json({
            estado: 'exito',
            data: {
                idOrden: results[0].idOrden,
                Estados_idEstados: results[0].Estados_idEstados,
                nombre_completo: results[0].nombre_completo,
                direccion: results[0].direccion,
                telefono: results[0].telefono,
                correo_electronico: results[0].correo_electronico,
                fecha_entrega: results[0].fecha_entrega,
                total_orden: results[0].total_orden
            }
        });

    } catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message,
        });
    }
};

const cancelarOrden = async (req, res) => {
    const { id } = req.params;

    try {
        const [results, _] = await sequelize.query(
            `EXEC p_cancelarOrden @idOrden = ${parseInt(id, 10)}`
        );

        res.status(200).json({
            estado: 'exito',
            data: results[0],
        });

    } catch (error) {
        res.status(400).json({
            estado: 'error',
            mensaje: error.message
        });
    }
}

module.exports = {
    crearOrdenConDetalle,
    obtenerOrdenes,
    obtenerOrdenesUsuario,
    obtenerOrdenId,
    obtenerOrdenesConfirmadas,
    actualizarOrden,
    entregarOrden,
    rechazarOrden,
    cancelarOrden
};
