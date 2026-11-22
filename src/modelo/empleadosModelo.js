const pool = require('../config/bd');

class EmpleadosModelo {

    static async obtenerTodos() {

        const [rows] = await pool.query('SELECT * FROM empleados');
        return rows;
    }  

    static async obtenerPorId(id) {
        const [rows] = await pool.query('SELECT * FROM empleados WHERE id_empleado = ?', [id]);
        return rows[0];
    }

    static async crear({ nombre, area }) {
        const [resultado] = await pool.query(
            'INSERT INTO empleados (nombre, area) VALUES (?, ?)',
            [nombre, area]
        );
        return resultado.insertId;
    }

    static async actualizar(id, { nombre, area }) {
        const [resultado] = await pool.query(
            'UPDATE empleados SET nombre = ?, area = ? WHERE id_empleado = ?',
            [nombre, area, id]
        );
        return resultado.affectedRows;
    }
    
    static async eliminar(id) {
        const [resultado] = await pool.query(
            'DELETE FROM empleados WHERE id_empleado = ?',
            [id]
        );
        return resultado.affectedRows;
    }
    

}
    
module.exports = EmpleadosModelo;