// src/services/postreService.js
import axios from 'axios';

const API_POSTRES_URL = 'http://localhost:8000/api/postre'; // Cambia la URL si es necesario

// Funciones para Postres
export const getAllPostres = async () => {
    const response = await axios.get(API_POSTRES_URL);
    return response.data;
};

export const getPostre = async (id) => {
    const response = await axios.get(`${API_POSTRES_URL}/${id}`);
    return response.data;
};

export const createPostre = async (postre) => {
    const response = await axios.post(API_POSTRES_URL, postre);
    return response.data;
};

export const updatePostre = async (id, postre) => {
    const response = await axios.put(`${API_POSTRES_URL}/${id}`, postre);
    return response.data;
};

export const deletePostre = async (id) => {
    const response = await axios.delete(`${API_POSTRES_URL}/${id}`);
    return response.data;
};
