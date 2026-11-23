const pedidosModelo = require('../modelo/pedidosModelos');

const fechaValida = (fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha) && !isNaN(Date.parse(fecha));

// Valida el body completo; devuelve un mensaje de error o null si todo está bien
const validarPedido = async ({ id_cliente, id_empleado, fecha_pedido, canal }) => {
    if (!id_cliente || !id_empleado || !fecha_pedido || !canal) {
        return 'id_cliente, id_empleado, fecha_pedido y canal son obligatorios';
    }
    if (!fechaValida(fecha_pedido)) {
        return 'fecha_pedido debe tener el formato YYYY-MM-DD';
    }
    if (!(await pedidosModelo.existeCliente(id_cliente))) {
        return 'El cliente indicado no existe';
    }
    if (!(await pedidosModelo.existeEmpleado(id_empleado))) {
        return 'El empleado indicado no existe';
    }
    return null;
};

class pedidosControlador {

    static async obtenerPedidos(req, res) {
        try {
            const pedidos = await pedidosModelo.obtenerTodos();
            return res.status(200).json({ exito: true, datos: pedidos });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener pedidos' });
        }
    }

    static async obtenerPedidoPorId(req, res) {
        try {
            const pedido = await pedidosModelo.obtenerPorId(req.params.id);

            if (!pedido) {
                return res.status(404).json({ exito: false, mensaje: 'Pedido no encontrado' });
            }

            return res.status(200).json({ exito: true, datos: pedido });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener pedido por ID' });
        }
    }

    static async obtenerPedidosConCliente(req, res) {
        try {
            const pedidos = await pedidosModelo.obtenerConCliente();
            return res.status(200).json({ exito: true, datos: pedidos });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener pedidos con cliente' });
        }
    }

    static async crearPedido(req, res) {
        try {
            const error = await validarPedido(req.body);
            if (error) {
                return res.status(400).json({ exito: false, mensaje: error });
            }

            const { id_cliente, id_empleado, fecha_pedido, canal } = req.body;
            const id = await pedidosModelo.crear({ id_cliente, id_empleado, fecha_pedido, canal });

            return res.status(201).json({
                exito: true,
                mensaje: 'Pedido creado correctamente',
                datos: { id_pedido: id }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al crear pedido' });
        }
    }

    static async actualizarPedido(req, res) {
        try {
            const error = await validarPedido(req.body);
            if (error) {
                return res.status(400).json({ exito: false, mensaje: error });
            }

            const { id_cliente, id_empleado, fecha_pedido, canal } = req.body;
            const filas = await pedidosModelo.actualizar(req.params.id, { id_cliente, id_empleado, fecha_pedido, canal });

            if (filas === 0) {
                return res.status(404).json({ exito: false, mensaje: 'Pedido no encontrado' });
            }

            return res.status(200).json({ exito: true, mensaje: 'Pedido actualizado correctamente' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar pedido' });
        }
    }

    static async eliminarPedido(req, res) {
        try {
            const filas = await pedidosModelo.eliminar(req.params.id);

            if (filas === 0) {
                return res.status(404).json({ exito: false, mensaje: 'Pedido no encontrado' });
            }

            return res.status(200).json({ exito: true, mensaje: 'Pedido eliminado correctamente' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar pedido' });
        }
    }

}

module.exports = pedidosControlador;