// src/components/DeletePostre.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeletePostre = () => {
    const [postres, setPostres] = useState([]);

    // Cargar la lista de postres
    useEffect(() => {
        const fetchPostres = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/postre'); // Ajusta la URL según tu API
                setPostres(response.data);
            } catch (error) {
                console.error('Error al cargar los postres:', error);
            }
        };

        fetchPostres();
    }, []);

    // Función para eliminar un postre
    const deletePostre = async (postreId) => {
        try {
            await axios.delete(`http://localhost:8000/api/postre/${postreId}`); // Ajusta la URL según tu API
            // Actualiza el estado para eliminar el postre del estado local
            setPostres(prevPostres => 
                prevPostres.filter(postre => postre.ID_Postre !== postreId) // Asegúrate de usar el ID correcto
            );
            alert('Postre eliminado con éxito!'); // Mensaje de éxito
        } catch (error) {
            console.error('Error al eliminar el postre:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Postres</h2>
            <div className="row">
                {postres.length === 0 ? (
                    <p>No hay postres disponibles.</p>
                ) : (
                    postres.map(postre => (
                        <div key={postre.ID_Postre} className="card m-2" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">{postre.Nombre}</h5>
                                <p className="card-text">{postre.Descripcion}</p>
                                <p className="card-text"><small className="text-muted">${postre.Precio}</small></p>
                                <button className="btn btn-danger" onClick={() => deletePostre(postre.ID_Postre)}>
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

export default DeletePostre;
