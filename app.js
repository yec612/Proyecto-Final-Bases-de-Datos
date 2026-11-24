const express = require('express');
const router = require('./src/rutas/rutas');
const empleadosRouter = require('./src/rutas/empleadosRutas');
const categoriasRouter = require('./src/rutas/categoriasRutas');
const clientesRouter = require('./src/rutas/clientesRutas');
const pedidosRouter = require('./src/rutas/pedidosRutas');
const productosRouter = require('./src/rutas/productosRutas');
const detalleRouter = require('./src/rutas/detalleRutas');

const app = express();


app.use(express.json());
app.use('/api/empleados', empleadosRouter);
app.use('/api/categorias', categoriasRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/pedidos', pedidosRouter);
app.use('/api/productos', productosRouter);
app.use('/api/detalle', detalleRouter);
app.use('/api/', router);




module.exports = app;
