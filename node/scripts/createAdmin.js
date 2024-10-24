import bcrypt from 'bcrypt';
import db from '../database/db.js';
import UsuarioModel from '../models/UsuarioModel.js';

const createAdminUser = async () => {
    const adminData = {
        PrimerNombre: 'Admin',
        ApellidoPaterno: 'User',
        Email: 'admin@admin.com',
        Contraseña: 'admin123', // Contraseña en texto plano
        ID_TipoCuenta: 1, // Tipo de cuenta administrador
        Telefono: '123456789'
    };

    try {
        // Conectar a la base de datos
        await db.authenticate();
        console.log('Conexión a la base de datos exitosa');

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(adminData.Contraseña, 10);

        // Crear el usuario administrador
        await UsuarioModel.create({
            PrimerNombre: adminData.PrimerNombre,
            ApellidoPaterno: adminData.ApellidoPaterno,
            Email: adminData.Email,
            Contraseña: hashedPassword,
            ID_TipoCuenta: adminData.ID_TipoCuenta,
            Telefono: adminData.Telefono
        });

        console.log('¡Usuario administrador creado correctamente!');
    } catch (error) {
        console.error('Error al crear el usuario administrador:', error);
    } finally {
        // Cerrar la conexión a la base de datos
        await db.close();
    }
};

createAdminUser();