// src/services/jugoService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/jugo';

export const getJugos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createJugo = async (jugo) => {
    const response = await axios.post(API_URL, jugo);
    return response.data;
};

export const deleteJugo = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
