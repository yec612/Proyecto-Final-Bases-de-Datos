const pool = require('../config/bd');

class CategoriasModelo {

    static async obtenerTodas() {
        const [rows] = await pool.query('SELECT * FROM categorias');
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await pool.query('SELECT * FROM categorias WHERE id_categoria = ?', [id]);
        return rows[0];
    }

    static async crear({ nombre }) {
        const [resultado] = await pool.query(
            'INSERT INTO categorias (nombre) VALUES (?)',
            [nombre]
        );
        return resultado.insertId;
    }

    static async actualizar(id, { nombre }) {
        const [resultado] = await pool.query(
            'UPDATE categorias SET nombre = ? WHERE id_categoria = ?',
            [nombre, id]
        );
        return resultado.affectedRows;
    }

    static async eliminar(id) {
        const [resultado] = await pool.query(
            'DELETE FROM categorias WHERE id_categoria = ?',
            [id]
        );
        return resultado.affectedRows;
    }
}

module.exports = CategoriasModelo; 
