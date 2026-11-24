const express = require('express');
const router = express.Router();

const pedidosControlador = require('../controlador/pedidosControlador');

router.get('/', pedidosControlador.obtenerPedidos);
router.get('/con-cliente', pedidosControlador.obtenerPedidosConCliente);
router.get('/:id', pedidosControlador.obtenerPedidoPorId);
router.post('/', pedidosControlador.crearPedido);
router.put('/:id', pedidosControlador.actualizarPedido);
router.delete('/:id', pedidosControlador.eliminarPedido);

module.exports = router;