const UsuarioModelo = require('../modelo/usuarioModelo');

class usuarioControlador {

    static obtenerUsuarios(req, res) {

        const usuarios = UsuarioModelo.obtenerUsuarios();
        res.status(200).json({exito: true, datos: usuarios});


    }

    static obtenerUsuarioPorId(req, res) {
        const id = req.params.id;
        const usuario = UsuarioModelo.obtenerUsuarioPorId(id);

        if (usuario) {
            res .status(200).json({ exito: true, datos: usuario });
        }
        res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
        
    }
    static crear (req, res) {
        const {nombre, correo} = req.body;
        if (!nombre || !correo) {
            return res.status(400).json({ exito: false, mensaje: 'Nombre y correo son requeridos' });
        }
        const nuevoUsuario = UsuarioModelo.crear({ nombre, correo });
        res.status(201).json({ exito: true, datos: nuevoUsuario });
    }
    
    static actualizar(req, res) {
        const usuarioActualizado = UsuarioModelo.actualizar(req.params.id, req.body);
        if (!usuarioActualizado) {
            return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json({ exito: true, datos: usuarioActualizado });
    }
    
    static eliminar(req, res) {
        const elimidado = UsuarioModelo.eliminar(req.params.id);
        if (!elimidado) {
            return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json({ exito: true, mensaje: 'Usuario eliminado' });
    }
}

module.exports = usuarioControlador;
