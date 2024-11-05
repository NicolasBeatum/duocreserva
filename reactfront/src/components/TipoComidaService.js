import axios from 'axios';

const API_URL = 'http://localhost:8000/api/tipos-comida'; // Cambia la URL si es necesario

// Obtener todos los IDs de tipos de comida
export const getIDTiposComida = async () => {
    try {
        const response = await axios.get(`${API_URL}/ids`); // Asegúrate de que esta ruta esté definida en tu backend
        return response.data;
    } catch (error) {
        console.error('Error al obtener IDs de tipos de comida:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
};

// Obtener todos los nombres de tipos de comida
export const getNombreTiposComida = async () => {
    try {
        const response = await axios.get(`${API_URL}/nombres`); // Asegúrate de que esta ruta esté definida en tu backend
        return response.data;
    } catch (error) {
        console.error('Error al obtener nombres de tipos de comida:', error);
        throw error; // Propaga el error para manejarlo en el componente
    }
};
