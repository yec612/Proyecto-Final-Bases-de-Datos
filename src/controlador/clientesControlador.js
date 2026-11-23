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

    static async obtenerClientePorId(req, res) {
        try {
            const cliente = await clientesModelo.obtenerPorId(req.params.id);

            if (!cliente) {
                return res.status(404).json({ exito: false, mensaje: 'Cliente no encontrado' });
            }

            return res.status(200).json({ exito: true, datos: cliente });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener cliente por ID' });
        }
    }

    static async crearCliente(req, res) {
        const { nombre, ciudad, fecha_registro } = req.body;

        if (!nombre || !ciudad || !fecha_registro) {
            return res.status(400).json({
                exito: false,
                mensaje: 'nombre, ciudad y fecha_registro son obligatorios'
            });
        }

        if (!fechaValida(fecha_registro)) {
            return res.status(400).json({
                exito: false,
                mensaje: 'fecha_registro debe tener el formato YYYY-MM-DD'
            });
        }

        try {
            const id = await clientesModelo.crear({ nombre, ciudad, fecha_registro });
            return res.status(201).json({
                exito: true,
                mensaje: 'Cliente creado correctamente',
                datos: { id_cliente: id }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al crear cliente' });
        }
    }

    static async actualizarCliente(req, res) {
        const { nombre, ciudad, fecha_registro } = req.body;

        if (!nombre || !ciudad || !fecha_registro) {
            return res.status(400).json({
                exito: false,
                mensaje: 'nombre, ciudad y fecha_registro son obligatorios'
            });
        }

        if (!fechaValida(fecha_registro)) {
            return res.status(400).json({
                exito: false,
                mensaje: 'fecha_registro debe tener el formato YYYY-MM-DD'
            });
        }

        try {
            const filas = await clientesModelo.actualizar(req.params.id, { nombre, ciudad, fecha_registro });

            if (filas === 0) {
                return res.status(404).json({ exito: false, mensaje: 'Cliente no encontrado' });
            }

            return res.status(200).json({ exito: true, mensaje: 'Cliente actualizado correctamente' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar cliente' });
        }
    }

    static async eliminarCliente(req, res) {
        try {
            const filas = await clientesModelo.eliminar(req.params.id);

            if (filas === 0) {
                return res.status(404).json({ exito: false, mensaje: 'Cliente no encontrado' });
            }

            return res.status(200).json({ exito: true, mensaje: 'Cliente eliminado correctamente' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar cliente' });
        }
    }
}

module.exports = clientesControlador;