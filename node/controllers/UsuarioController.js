import UsuarioModel from '../models/UsuarioModel.js';
import bcrypt from 'bcrypt';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.findAll();
        res.json(usuarios);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Obtener un usuario por ID
export const getUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findByPk(req.params.ID_Usuario);
        res.json(usuario);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear un nuevo usuario
export const createUsuario = async (req, res) => {
    const { PrimerNombre, ApellidoPaterno, Email, Contraseña, Telefono } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(Contraseña, 10);
        await UsuarioModel.create({
            PrimerNombre,
            ApellidoPaterno,
            Email,
            Contraseña: hashedPassword,
            Telefono
        });
        res.json({ message: "¡Usuario creado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar un usuario por ID
export const updateUsuario = async (req, res) => {
    const { PrimerNombre, ApellidoPaterno, Email, Contraseña, Telefono } = req.body;
    try {
        const usuario = await UsuarioModel.findByPk(req.params.ID_Usuario);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (Contraseña) {
            usuario.Contraseña = await bcrypt.hash(Contraseña, 10);
        }
        usuario.PrimerNombre = PrimerNombre;
        usuario.ApellidoPaterno = ApellidoPaterno;
        usuario.Email = Email;
        usuario.Telefono = Telefono;

        await usuario.save();
        res.json({ message: "¡Usuario actualizado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Eliminar un usuario por ID
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
};

// Obtener perfil del usuario
export const getPerfil = async (req, res) => {
    try {
        const usuario = await UsuarioModel.findByPk(req.user.ID_Usuario, {
            attributes: ['PrimerNombre', 'ApellidoPaterno', 'Email', 'Telefono']
        });
        res.json(usuario);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar perfil del usuario
export const updatePerfil = async (req, res) => {
    const { PrimerNombre, ApellidoPaterno, Email, Contraseña, Telefono } = req.body;
    try {
        const usuario = await UsuarioModel.findByPk(req.user.ID_Usuario);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (Contraseña) {
            usuario.Contraseña = await bcrypt.hash(Contraseña, 10);
        }
        usuario.PrimerNombre = PrimerNombre;
        usuario.ApellidoPaterno = ApellidoPaterno;
        usuario.Email = Email;
        usuario.Telefono = Telefono;

        await usuario.save();
        res.json({ message: "Perfil actualizado correctamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
};