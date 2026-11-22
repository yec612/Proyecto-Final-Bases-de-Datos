const express = require('express');
const router = express.Router();

const categoriasControlador = require('../controlador/categoriasControlador');

router.get('/', categoriasControlador.obtenerCategorias);
router.get('/:id', categoriasControlador.obtenerCategoriaPorId);
router.post('/', categoriasControlador.crearCategoria);
router.put('/:id', categoriasControlador.actualizarCategoria);
router.delete('/:id', categoriasControlador.eliminarCategoria);

module.exports = router;
