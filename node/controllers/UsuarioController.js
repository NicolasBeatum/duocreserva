import UsuarioModel from '../models/UsuarioModel.js';

// Mostrar un usuario
export const getUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findOne({
            where: {
                ID_Usuario: req.params.ID_Usuario
            }
        });
        res.json(usuario);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Mostrar todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.findAll();
        res.json(usuarios);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Registrar un nuevo usuario
export const createUsuario = async (req, res) => {
    try {
        const { PrimerNombre, ApellidoPaterno, Email, Contraseña, Telefono } = req.body;
        const nuevoUsuario = {
            PrimerNombre,
            ApellidoPaterno,
            Email,
            Contraseña,
            ID_TipoCuenta: 2, // Tipo de cuenta por defecto
            Telefono
        };

        // Crear el usuario en la base de datos
        await UsuarioModel.create(nuevoUsuario);

        res.json({ message: "Usuario registrado correctamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Iniciar sesión
export const loginUsuario = async (req, res) => {
    try {
        const { Email, Contraseña } = req.body;

        // Buscar el usuario por email
        const usuario = await UsuarioModel.findOne({ where: { Email } });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar la contraseña
        if (usuario.Contraseña !== Contraseña) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        res.json({ message: "Inicio de sesión exitoso", usuario });
    } catch (error) {
        res.json({ message: error.message });
    }
}
// Actualizar un usuario
export const updateUsuario = async (req, res) => {
    try {
        await UsuarioModel.update(req.body, {
            where: {
                ID_Usuario: req.params.ID_Usuario
            }
        });
        res.json({ message: "¡Usuario actualizado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    try {
        await UsuarioModel.destroy({
            where: {
                ID_Usuario: req.params.ID_Usuario
            }
        });
        res.json({ message: "¡Usuario eliminado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
}