let usuarios = [
    { id: 1, nombre: 'Juan', correo: 'juan@example.com' },
    { id: 2, nombre: 'María', correo: 'maria@example.com' }
];

class UsuarioModelo {   
    static obtenerUsuarios() {
        return usuarios;
    }

    static obtenerUsuarioPorId(id) {
        return usuarios.find(u => u.id === parseInt(id));
    }

    static crear (datos) {
        const nuevoUsuario = {
            id: usuarios.length + 1,
            nombre: datos.nombre,
            correo: datos.correo
        };
        usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }

    static actualizar(id, datos) {
        const usuario = this.obtenerUsuarioPorId(id);
        if (!usuario) return null;

        usuario.nombre = datos.nombre || usuario.nombre;
        usuario.correo = datos.correo || usuario.correo;
        return usuario;
    }

    static eliminar(id) {
        const index = usuarios.findIndex(u => u.id === parseInt(id));
        if (index === -1) return false;
        usuarios.splice(index, 1);
        return true;
    }
}

module.exports = UsuarioModelo;