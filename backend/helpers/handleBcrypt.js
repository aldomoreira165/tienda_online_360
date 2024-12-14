const bcrypt = require('bcrypt');

const encriptarContraseña = async (textoPlano) => {
    const contraseñaEncriptada = await bcrypt.hash(textoPlano, 10);
    return contraseñaEncriptada;
};

const compararContraseña = async (contraseñaTexto, contraseñaEncriptada) => {
    const resultado = await bcrypt.compare(contraseñaTexto, contraseñaEncriptada);
    return resultado; 
};

module.exports = {
    encriptarContraseña,
    compararContraseña
};