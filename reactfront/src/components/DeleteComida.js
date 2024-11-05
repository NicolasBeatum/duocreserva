// src/components/DeleteComida.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteComida = () => {
    const [comidas, setComidas] = useState([]);

    // Cargar la lista de comidas
    useEffect(() => {
        const fetchComidas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/comidas'); // Asegúrate de que esta URL sea correcta
                setComidas(response.data);
            } catch (error) {
                console.error('Error al cargar las comidas:', error);
            }
        };

        fetchComidas();
    }, []);

    // Función para eliminar una comida
    const deleteComida = async (comidaId) => {
        try {
            await axios.delete(`http://localhost:8000/api/comidas/${comidaId}`); // Ajusta la URL según tu API
            // Actualiza el estado para eliminar la comida del estado local
            setComidas(prevComidas => 
                prevComidas.filter(comida => comida.ID_Comida !== comidaId) // Asegúrate de usar el ID correcto
            );
            alert('Comida eliminada con éxito!'); // Mensaje de éxito
        } catch (error) {
            console.error('Error al eliminar la comida:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Comidas</h2>
            <div className="row">
                {comidas.length === 0 ? (
                    <p>No hay comidas disponibles.</p>
                ) : (
                    comidas.map(comida => (
                        <div key={comida.ID_Comida} className="card m-2" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">{comida.Nombre}</h5>
                                <p className="card-text">{comida.Descripcion}</p>
                                <p className="card-text"><small className="text-muted">${comida.Precio}</small></p>
                                <button className="btn btn-danger" onClick={() => deleteComida(comida.ID_Comida)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DeleteComida;
