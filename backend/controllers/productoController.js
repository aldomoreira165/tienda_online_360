const obtenerProductos = async (req, res) => {
    try {
        const [results, _ ] = await sequelize.query(
        `EXEC p_obtenerProductos`
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

module.exports = {
    obtenerProductos
}