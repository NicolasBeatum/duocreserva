// src/services/comidaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/comidas'; // Cambia la URL si es necesario

export const getAllComidas = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getComida = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createComida = async (comida) => {
    const response = await axios.post(API_URL, comida);
    return response.data;
};

export const updateComida = async (id, comida) => {
    const response = await axios.put(`${API_URL}/${id}`, comida);
    return response.data;
};

export const deleteComida = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
