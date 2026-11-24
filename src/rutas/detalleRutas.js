const express = require('express');
const router = express.Router();

const detalleControlador = require('../controlador/detalleControlador');

router.get('/', detalleControlador.obtenerDetalles);
router.get('/resumen', detalleControlador.obtenerResumen);                       // fija antes que /:id
router.get('/pedido/:id_pedido', detalleControlador.obtenerDetallePorPedido);    // fija antes que /:id
router.get('/:id', detalleControlador.obtenerDetallePorId);
router.post('/', detalleControlador.crearDetalle);
router.put('/:id', detalleControlador.actualizarDetalle);
router.delete('/:id', detalleControlador.eliminarDetalle);

module.exports = router;