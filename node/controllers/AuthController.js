import UsuarioModel from '../models/UsuarioModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = 'zKuL0Nehvm'; // Asegúrate de tener esta clave en tu archivo .env

// Registro de usuario
export const registerUsuario = async (req, res) => {
    const { PrimerNombre, ApellidoPaterno, Email, Contraseña, ID_TipoCuenta = 2, Telefono } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(Contraseña, 10);
        const nuevoUsuario = await UsuarioModel.create({
            PrimerNombre,
            ApellidoPaterno,
            Email,
            Contraseña: hashedPassword,
            ID_TipoCuenta,
            Telefono
        });
        res.json({ message: "¡Usuario registrado correctamente!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Inicio de sesión de usuario
export const loginUsuario = async (req, res) => {
    const { Email, Contraseña } = req.body;
    try {
        const usuario = await UsuarioModel.findOne({ where: { Email } });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(Contraseña, usuario.Contraseña);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ ID_Usuario: usuario.ID_Usuario }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.json({ message: error.message });
    }
};