const detalleModelo = require('../modelo/detalleModelo');

const esNumeroNoNegativo = (v) => v !== undefined && v !== null && v !== '' && !isNaN(Number(v)) && Number(v) >= 0;
const esEnteroPositivo = (v) => esNumeroNoNegativo(v) && Number.isInteger(Number(v)) && Number(v) > 0;

// Devuelve un mensaje de error o null si todo está bien
const validarDetalle = async ({ id_pedido, id_producto, cantidad, precio_unitario }) => {
    if (!id_pedido || !id_producto || cantidad === undefined || precio_unitario === undefined) {
        return 'id_pedido, id_producto, cantidad y precio_unitario son obligatorios';
    }
    if (!esEnteroPositivo(cantidad)) {
        return 'cantidad debe ser un número entero mayor a 0';
    }
    if (!esNumeroNoNegativo(precio_unitario)) {
        return 'precio_unitario debe ser un número mayor o igual a 0';
    }
    if (!(await detalleModelo.existePedido(id_pedido))) {
        return 'El pedido indicado no existe';
    }
    if (!(await detalleModelo.existeProducto(id_producto))) {
        return 'El producto indicado no existe';
    }
    return null;
};

class detalleControlador {

    static async obtenerDetalles(req, res) {
        try {
            const detalles = await detalleModelo.obtenerTodos();
            return res.status(200).json({ exito: true, datos: detalles });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener detalles' });
        }
    }

    static async obtenerDetallePorId(req, res) {
        try {
            const detalle = await detalleModelo.obtenerPorId(req.params.id);

            if (!detalle) {
                return res.status(404).json({ exito: false, mensaje: 'Detalle no encontrado' });
            }

            return res.status(200).json({ exito: true, datos: detalle });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener detalle por ID' });
        }
    }

    static async obtenerDetallePorPedido(req, res) {
        try {
            const detalles = await detalleModelo.obtenerPorPedido(req.params.id_pedido);

            if (detalles.length === 0) {
                return res.status(404).json({
                    exito: false,
                    mensaje: 'No se encontraron detalles para ese pedido'
                });
            }

            return res.status(200).json({ exito: true, datos: detalles });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener el detalle del pedido' });
        }
    }

    static async obtenerResumen(req, res) {
        try {
            const resumen = await detalleModelo.obtenerResumen();
            return res.status(200).json({ exito: true, datos: resumen });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener el resumen de ventas' });
        }
    }

    static async crearDetalle(req, res) {
        try {
            const error = await validarDetalle(req.body);
            if (error) {
                return res.status(400).json({ exito: false, mensaje: error });
            }

            const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
            const id = await detalleModelo.crear({ id_pedido, id_producto, cantidad, precio_unitario });

            return res.status(201).json({
                exito: true,
                mensaje: 'Detalle creado correctamente',
                datos: { id_detalle: id }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al crear detalle' });
        }
    }

    static async actualizarDetalle(req, res) {
        try {
            const error = await validarDetalle(req.body);
            if (error) {
                return res.status(400).json({ exito: false, mensaje: error });
            }

            const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
            const filas = await detalleModelo.actualizar(req.params.id, { id_pedido, id_producto, cantidad, precio_unitario });

            if (filas === 0) {
                return res.status(404).json({ exito: false, mensaje: 'Detalle no encontrado' });
            }

            return res.status(200).json({ exito: true, mensaje: 'Detalle actualizado correctamente' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar detalle' });
        }
    }

    static async eliminarDetalle(req, res) {
        try {
            const filas = await detalleModelo.eliminar(req.params.id);

            if (filas === 0) {
                return res.status(404).json({ exito: false, mensaje: 'Detalle no encontrado' });
            }

            return res.status(200).json({ exito: true, mensaje: 'Detalle eliminado correctamente' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar detalle' });
        }
    }
}

module.exports = detalleControlador;