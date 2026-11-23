const pool = require('../config/bd');

class pedidosModelo {

    static async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM pedidos');
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await pool.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id]);
        return rows[0];
    }

    // INNER JOIN: pedidos + clientes
    static async obtenerConCliente() {
        const [rows] = await pool.query(
            `SELECT p.id_pedido, p.fecha_pedido, p.canal,
                    c.id_cliente, c.nombre AS nombre_cliente
             FROM pedidos p
             INNER JOIN clientes c ON p.id_cliente = c.id_cliente
             ORDER BY p.id_pedido`
        );
        return rows;
    }

    // Apoyo para validar que existan cliente y empleado
    static async existeCliente(id) {
        const [rows] = await pool.query('SELECT 1 FROM clientes WHERE id_cliente = ?', [id]);
        return rows.length > 0;
    }

    static async existeEmpleado(id) {
        const [rows] = await pool.query('SELECT 1 FROM empleados WHERE id_empleado = ?', [id]);
        return rows.length > 0;
    }

    static async crear({ id_cliente, id_empleado, fecha_pedido, canal }) {
        const [resultado] = await pool.query(
            'INSERT INTO pedidos (id_cliente, id_empleado, fecha_pedido, canal) VALUES (?, ?, ?, ?)',
            [id_cliente, id_empleado, fecha_pedido, canal]
        );
        return resultado.insertId;
    }

    static async actualizar(id, { id_cliente, id_empleado, fecha_pedido, canal }) {
        const [resultado] = await pool.query(
            'UPDATE pedidos SET id_cliente = ?, id_empleado = ?, fecha_pedido = ?, canal = ? WHERE id_pedido = ?',
            [id_cliente, id_empleado, fecha_pedido, canal, id]
        );
        return resultado.affectedRows;
    }

    static async eliminar(id) {
        const [resultado] = await pool.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
        return resultado.affectedRows;
    }
}

module.exports = pedidosModelo;