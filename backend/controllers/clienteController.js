const sequelize = require('../config/db');

const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { 
        razon_social,
        nombre_comercial,
        direccion_entrega,
        telefono,
        correo_electronico 
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
            estado: 'exito',
            data: {
                id: results[0].idClientes,
                razonSocial: results[0].razon_social,
                nombreComercial: results[0].nombre_comercial,
                direccionEntrega: results[0].direccion_entrega,
                telefono: results[0].telefono,
                correoElectronico: results[0].correo_electronico
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
    actualizarCliente
}