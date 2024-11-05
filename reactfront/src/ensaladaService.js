// src/services/ensaladaService.js
import axios from 'axios';

const API_ENSALADAS_URL = 'http://localhost:8000/api/ensalada'; // Cambia la URL si es necesario

// Funciones para Ensaladas
export const getAllEnsaladas = async () => {
    const response = await axios.get(API_ENSALADAS_URL);
    return response.data;
};

export const getEnsalada = async (id) => {
    const response = await axios.get(`${API_ENSALADAS_URL}/${id}`);
    return response.data;
};

export const createEnsalada = async (ensalada) => {
    const response = await axios.post(API_ENSALADAS_URL, ensalada);
    return response.data;
};

export const updateEnsalada = async (id, ensalada) => {
    const response = await axios.put(`${API_ENSALADAS_URL}/${id}`, ensalada);
    return response.data;
};

export const deleteEnsalada = async (id) => {
    const response = await axios.delete(`${API_ENSALADAS_URL}/${id}`);
    return response.data;
};
