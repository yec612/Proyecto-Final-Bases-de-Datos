const express = require('express');
const router = express.Router();

const clientesControlador = require('../controlador/clientesControlador');

router.get('/', clientesControlador.obtenerClientes);
router.get('/:id', clientesControlador.obtenerClientePorId);
router.post('/', clientesControlador.crearCliente);
router.put('/:id', clientesControlador.actualizarCliente);
router.delete('/:id', clientesControlador.eliminarCliente);

module.exports = router;
