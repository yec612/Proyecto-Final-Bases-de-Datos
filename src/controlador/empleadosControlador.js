const empleadosModelo = require('../modelo/empleadosModelo');

class empleadosControlador {
    static async obtenerEmpleados(req, res) {

        try {
            const empleados = await empleadosModelo.obtenerTodos();
            return res.status(200).json({ exito: true, datos: empleados });
        }
        catch (error) {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener empleados' });
        }
    }

    static async obtenerEmpleadoPorId(req, res) {

    try {
        const empleado = await empleadosModelo.obtenerPorId(req.params.id);

        if (!empleado) {
            return res.status(404).json({
                exito: false,
                mensaje: 'Empleado no encontrado'
            });
        }

        return res.status(200).json({
            exito: true,
            datos: empleado
        });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            exito: false,
            mensaje: 'Error al obtener empleado por ID'
        });
    }
    }

    static async crearEmpleado(req, res) {
        const { nombre, area } = req.body;

        if (!nombre || !area) {
            return res.status(400).json({
                exito: false,
                mensaje: 'nombre y area son obligatorios'
            });
        }

        try {
            const id = await empleadosModelo.crear({ nombre, area });
            return res.status(201).json({
                exito: true,
                mensaje: 'Empleado creado correctamente',
                datos: { id_empleado: id }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al crear empleado' });
        }
    }

    static async actualizarEmpleado(req, res) {
        const { nombre, area } = req.body;

        if (!nombre || !area) {
            return res.status(400).json({
                exito: false,
                mensaje: 'nombre y area son obligatorios'
            });
        }

        try {
            const filas = await empleadosModelo.actualizar(req.params.id, { nombre, area });

            if (filas === 0) {
                return res.status(404).json({ exito: false, mensaje: 'Empleado no encontrado' });
            }

            return res.status(200).json({ exito: true, mensaje: 'Empleado actualizado correctamente' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar empleado' });
        }
    }

    static async eliminarEmpleado(req, res) {
        try {
            const filas = await empleadosModelo.eliminar(req.params.id);

            if (filas === 0) {
                return res.status(404).json({ exito: false, mensaje: 'Empleado no encontrado' });
            }

            return res.status(200).json({ exito: true, mensaje: 'Empleado eliminado correctamente' });
        }
        catch (error) {
            console.error(error);

            if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(409).json({
                    exito: false,
                    mensaje: 'No se puede eliminar: el empleado tiene registros asociados'
                });
            }

            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar empleado' });
        }
    }
}

module.exports = empleadosControlador;
