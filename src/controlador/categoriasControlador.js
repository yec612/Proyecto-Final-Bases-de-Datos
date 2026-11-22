const categoriasModelo = require('../modelo/categoriasModelo');

class categoriasControlador {
    static async obtenerCategorias(req, res) {
        try {
            const categorias = await categoriasModelo.obtenerTodas();
            return res.status(200).json({ exito: true, datos: categorias });
        }
        catch (error) {
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener categorías' });
        }
    }

    static async obtenerCategoriaPorId(req, res) {
        try {
            const categoria = await categoriasModelo.obtenerPorId(req.params.id);

            if (!categoria) {
                return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });
            }

            return res.status(200).json({ exito: true, datos: categoria });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener categoría por ID' });
        }
    }

    static async crearCategoria(req, res) {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ exito: false, mensaje: 'nombre es obligatorio' });
        }

        try {
            const id = await categoriasModelo.crear({ nombre });
            return res.status(201).json({
                exito: true,
                mensaje: 'Categoría creada correctamente',
                datos: { id_categoria: id }
            });
        }
        catch (error) {
            console.error(error);

            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ exito: false, mensaje: 'Ya existe una categoría con ese nombre' });
            }

            return res.status(500).json({ exito: false, mensaje: 'Error al crear categoría' });
        }
    }

    static async actualizarCategoria(req, res) {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ exito: false, mensaje: 'nombre es obligatorio' });
        }

        try {
            const filas = await categoriasModelo.actualizar(req.params.id, { nombre });

            if (filas === 0) {
                return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });
            }

            return res.status(200).json({ exito: true, mensaje: 'Categoría actualizada correctamente' });
        }
        catch (error) {
            console.error(error);

            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ exito: false, mensaje: 'Ya existe una categoría con ese nombre' });
            }

            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar categoría' });
        }
    }

    static async eliminarCategoria(req, res) {
        try {
            const filas = await categoriasModelo.eliminar(req.params.id);

            if (filas === 0) {
                return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });
            }

            return res.status(200).json({ exito: true, mensaje: 'Categoría eliminada correctamente' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar categoría' });
        }
    }
}


module.exports = categoriasControlador;