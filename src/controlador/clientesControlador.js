const clientesModelo = require('../modelo/clientesModelo')

const fechaValida = (fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha) && !isNaN(Date.parse(fecha));

class clientesControlador {

    static async obtenerClientes(req, res) {
        try {
            const clientes = await clientesModelo.obtenerTodos();
            return res.status(200).json({ exito: true, datos: clientes });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener clientes' });
        }
    }
}

module.exports = clientesControlador;