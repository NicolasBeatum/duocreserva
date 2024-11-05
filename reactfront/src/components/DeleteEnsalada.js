// src/components/DeleteEnsalada.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteEnsalada = () => {
    const [ensaladas, setEnsaladas] = useState([]);

    // Cargar la lista de ensaladas
    useEffect(() => {
        const fetchEnsaladas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/ensalada'); // Ajusta la URL según tu API
                setEnsaladas(response.data);
            } catch (error) {
                console.error('Error al cargar las ensaladas:', error);
            }
        };

        fetchEnsaladas();
    }, []);

    // Función para eliminar una ensalada
    const deleteEnsalada = async (ensaladaId) => {
        try {
            await axios.delete(`http://localhost:8000/api/ensalada/${ensaladaId}`); // Ajusta la URL según tu API
          
            setEnsaladas(prevEnsaladas => 
                prevEnsaladas.filter(ensalada => ensalada.ID_Ensalada !== ensaladaId) // Asegúrate de usar el ID correcto
            );
            alert('Ensalada eliminada con éxito!'); // Mensaje de éxito
        } catch (error) {
            console.error('Error al eliminar la ensalada:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Ensaladas</h2>
            <div className="row">
                {ensaladas.length === 0 ? (
                    <p>No hay ensaladas disponibles.</p>
                ) : (
                    ensaladas.map(ensalada => (
                        <div key={ensalada.ID_Ensalada} className="card m-2" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">{ensalada.Nombre}</h5>
                                <p className="card-text">{ensalada.Descripcion}</p>
                                <p className="card-text"><small className="text-muted">${ensalada.Precio}</small></p>
                                <button className="btn btn-danger" onClick={() => deleteEnsalada(ensalada.ID_Ensalada)}>
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

export default DeleteEnsalada;
