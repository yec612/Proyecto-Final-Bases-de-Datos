const pool = require('../config/bd');

class DetalleModelo {

    static async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM detalle_pedido');
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await pool.query('SELECT * FROM detalle_pedido WHERE id_detalle = ?', [id]);
        return rows[0];
    }

    // INNER JOIN triple: detalle_pedido + productos + pedidos
    static async obtenerPorPedido(idPedido) {
        const [rows] = await pool.query(
            `SELECT pe.id_pedido, pe.fecha_pedido,
                    pr.nombre AS nombre_producto,
                    d.cantidad,
                    d.precio_unitario,
                    (d.cantidad * d.precio_unitario) AS subtotal
             FROM detalle_pedido d
             INNER JOIN productos pr ON d.id_producto = pr.id_producto
             INNER JOIN pedidos pe ON d.id_pedido = pe.id_pedido
             WHERE pe.id_pedido = ?
             ORDER BY d.id_detalle`,
            [idPedido]
        );
        return rows;
    }

    // INNER JOIN + GROUP BY: total vendido por producto
    static async obtenerResumen() {
        const [rows] = await pool.query(
            `SELECT pr.id_producto,
                    pr.nombre AS nombre_producto,
                    SUM(d.cantidad) AS unidades_vendidas,
                    SUM(d.cantidad * d.precio_unitario) AS total_vendido
             FROM detalle_pedido d
             INNER JOIN productos pr ON d.id_producto = pr.id_producto
             GROUP BY pr.id_producto, pr.nombre
             ORDER BY total_vendido DESC`
        );
        return rows;
    }

    // Apoyo para validar que existan pedido y producto
    static async existePedido(id) {
        const [rows] = await pool.query('SELECT 1 FROM pedidos WHERE id_pedido = ?', [id]);
        return rows.length > 0;
    }

    static async existeProducto(id) {
        const [rows] = await pool.query('SELECT 1 FROM productos WHERE id_producto = ?', [id]);
        return rows.length > 0;
    }

    static async crear({ id_pedido, id_producto, cantidad, precio_unitario }) {
        const [resultado] = await pool.query(
            'INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
            [id_pedido, id_producto, cantidad, precio_unitario]
        );
        return resultado.insertId;
    }

    static async actualizar(id, { id_pedido, id_producto, cantidad, precio_unitario }) {
        const [resultado] = await pool.query(
            'UPDATE detalle_pedido SET id_pedido = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id_detalle = ?',
            [id_pedido, id_producto, cantidad, precio_unitario, id]
        );
        return resultado.affectedRows;
    }

    static async eliminar(id) {
        const [resultado] = await pool.query('DELETE FROM detalle_pedido WHERE id_detalle = ?', [id]);
        return resultado.affectedRows;
    }
}

module.exports = DetalleModelo;