const pool = require('../config/bd');

class clientesModelo {

    static async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM clientes');
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
        return rows[0];
    }

    static async crear({ nombre, ciudad, fecha_registro }) {
        const [resultado] = await pool.query(
            'INSERT INTO clientes (nombre, ciudad, fecha_registro) VALUES (?, ?, ?)',
            [nombre, ciudad, fecha_registro]
        );
        return resultado.insertId;
    }

    static async actualizar(id, { nombre, ciudad, fecha_registro }) {
        const [resultado] = await pool.query(
            'UPDATE clientes SET nombre = ?, ciudad = ?, fecha_registro = ? WHERE id_cliente = ?',
            [nombre, ciudad, fecha_registro, id]
        );
        return resultado.affectedRows;
    }

    static async eliminar(id) {
        const [resultado] = await pool.query(
            'DELETE FROM clientes WHERE id_cliente = ?',
            [id]
        );
        return resultado.affectedRows;
    }
}

module.exports = clientesModelo;