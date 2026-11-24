const express = require('express');
const router = express.Router();

const productosControlador = require('../controlador/productosControlador');

router.get('/', productosControlador.obtenerProductos);
router.get('/con-categoria', productosControlador.obtenerProductosConCategoria); // fija antes que /:id
router.get('/:id', productosControlador.obtenerProductoPorId);
router.post('/', productosControlador.crearProducto);
router.put('/:id', productosControlador.actualizarProducto);
router.delete('/:id', productosControlador.eliminarProducto);

module.exports = router;

