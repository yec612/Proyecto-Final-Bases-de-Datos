const express = require('express');
const router = express.Router();

const usuarioControlador = require('../controlador/usuarioControlador');

router.get('/', usuarioControlador.obtenerUsuarios);
router.get('/:id', usuarioControlador.obtenerUsuarioPorId);
router.post('/', usuarioControlador.crear);
router.put('/:id', usuarioControlador.actualizar);
router.delete('/:id', usuarioControlador.eliminar);

module.exports = router;

