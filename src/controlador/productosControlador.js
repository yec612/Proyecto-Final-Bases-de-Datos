const productosModelo = require('../modelo/productosModelo');

const esNumeroNoNegativo = (v) => v !== undefined && v !== null && v !== '' && !isNaN(Number(v)) && Number(v) >= 0;
const esEnteroNoNegativo = (v) => esNumeroNoNegativo(v) && Number.isInteger(Number(v));

// Devuelve un mensaje de error o null si todo está bien
const validarProducto = async ({ nombre, id_categoria, precio, costo, stock }) => {
    if (!nombre || !id_categoria || precio === undefined || costo === undefined || stock === undefined) {
        return 'nombre, id_categoria, precio, costo y stock son obligatorios';
    }
    if (!esNumeroNoNegativo(precio) || !esNumeroNoNegativo(costo)) {
        return 'precio y costo deben ser números mayores o iguales a 0';
    }
    if (!esEnteroNoNegativo(stock)) {
        return 'stock debe ser un número entero mayor o igual a 0';
    }
    if (!(await productosModelo.existeCategoria(id_categoria))) {
        return 'La categoría indicada no existe';
    }
    return null;
};

class productosControlador {

    static async obtenerProductos(req, res) {
        try {
            const productos = await productosModelo.obtenerTodos();
            return res.status(200).json({ exito: true, datos: productos });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener productos' });
        }
    }

    static async obtenerProductoPorId(req, res) {
        try {
            const producto = await productosModelo.obtenerPorId(req.params.id);

            if (!producto) {
                return res.status(404).json({ exito: false, mensaje: 'Producto no encontrado' });
            }

            return res.status(200).json({ exito: true, datos: producto });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener producto por ID' });
        }
    }

    static async obtenerProductosConCategoria(req, res) {
        try {
            const productos = await productosModelo.obtenerConCategoria();
            return res.status(200).json({ exito: true, datos: productos });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al obtener productos con categoría' });
        }
    }

    static async crearProducto(req, res) {
        try {
            const error = await validarProducto(req.body);
            if (error) {
                return res.status(400).json({ exito: false, mensaje: error });
            }

            const { nombre, id_categoria, precio, costo, stock } = req.body;
            const id = await productosModelo.crear({ nombre, id_categoria, precio, costo, stock });

            return res.status(201).json({
                exito: true,
                mensaje: 'Producto creado correctamente',
                datos: { id_producto: id }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al crear producto' });
        }
    }

    static async actualizarProducto(req, res) {
        try {
            const error = await validarProducto(req.body);
            if (error) {
                return res.status(400).json({ exito: false, mensaje: error });
            }

            const { nombre, id_categoria, precio, costo, stock } = req.body;
            const filas = await productosModelo.actualizar(req.params.id, { nombre, id_categoria, precio, costo, stock });

            if (filas === 0) {
                return res.status(404).json({ exito: false, mensaje: 'Producto no encontrado' });
            }

            return res.status(200).json({ exito: true, mensaje: 'Producto actualizado correctamente' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al actualizar producto' });
        }
    }

    static async eliminarProducto(req, res) {
        try {
            const filas = await productosModelo.eliminar(req.params.id);

            if (filas === 0) {
                return res.status(404).json({ exito: false, mensaje: 'Producto no encontrado' });
            }

            return res.status(200).json({ exito: true, mensaje: 'Producto eliminado correctamente' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ exito: false, mensaje: 'Error al eliminar producto' });
        }
    }
}

module.exports = productosControlador;