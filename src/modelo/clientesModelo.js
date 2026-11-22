const pool = require('../config/bd');

class clientesModelo {

    static async obtenerTodos() {
        const [rows] = await pool.query('SELECT * FROM clientes');
        return rows;
    }
}

module.exports = clientesModelo;