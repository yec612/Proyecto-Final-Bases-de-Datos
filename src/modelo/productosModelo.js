const pool = require('../config/bd');

class productosModelo {
    
    static async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM productos');
        return rows;
    }
    static async obtenerPorId(id) {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
        return rows[0];
    }

    // INNER JOIN: productos + categorias
    static async obtenerConCategoria() {
        const [rows] = await pool.query(
            `SELECT p.id_producto, p.nombre, p.precio, p.costo, p.stock,
                    c.id_categoria, c.nombre AS nombre_categoria
             FROM productos p
             INNER JOIN categorias c ON p.id_categoria = c.id_categoria
             ORDER BY p.id_producto`
        );
        return rows;
    }

    // Apoyo para validar que exista la categoría
    static async existeCategoria(id) {
        const [rows] = await pool.query('SELECT 1 FROM categorias WHERE id_categoria = ?', [id]);
        return rows.length > 0;
    }

    static async crear({ nombre, id_categoria, precio, costo, stock }) {
        const [resultado] = await pool.query(
            'INSERT INTO productos (nombre, id_categoria, precio, costo, stock) VALUES (?, ?, ?, ?, ?)',
            [nombre, id_categoria, precio, costo, stock]
        );
        return resultado.insertId;
    }

    static async actualizar(id, { nombre, id_categoria, precio, costo, stock }) {
        const [resultado] = await pool.query(
            'UPDATE productos SET nombre = ?, id_categoria = ?, precio = ?, costo = ?, stock = ? WHERE id_producto = ?',
            [nombre, id_categoria, precio, costo, stock, id]
        );
        return resultado.affectedRows;
    }

    static async eliminar(id) {
        const [resultado] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [id]);
        return resultado.affectedRows;
    }
}

module.exports = productosModelo;