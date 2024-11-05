// src/components/DeleteJugo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteJugo = () => {
    const [jugos, setJugos] = useState([]);
    const [error, setError] = useState('');

    // Cargar la lista de jugos
    useEffect(() => {
        const fetchJugos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/jugo'); // Ajusta la URL según tu API
                setJugos(response.data);
            } catch (error) {
                console.error('Error al cargar los jugos:', error);
                setError('Error al cargar los jugos. Intente de nuevo más tarde.');
            }
        };

        fetchJugos();
    }, []);

    // Función para eliminar un jugo
    const deleteJugo = async (jugoId) => {
        try {
            await axios.delete(`http://localhost:8000/api/jugo/${jugoId}`); // Ajusta la URL según tu API
            // Actualiza el estado para eliminar el jugo del estado local
            setJugos(prevJugos => 
                prevJugos.filter(jugo => jugo.ID_Jugo !== jugoId) // Asegúrate de usar el ID correcto
            );
            alert('Jugo eliminado con éxito!');
        } catch (error) {
            console.error('Error al eliminar el jugo:', error);
            setError('Hubo un error al eliminar el jugo. Por favor, intente de nuevo.');
        }
    };

    return (
        <div>
            <h2>Lista de Jugos</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
                {jugos.length === 0 ? (
                    <p>No hay jugos disponibles.</p>
                ) : (
                    jugos.map(jugo => (
                        <div key={jugo.ID_Jugo} className="card m-2" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">{jugo.Nombre}</h5>
                                <p className="card-text">{jugo.Descripcion}</p>
                                <p className="card-text"><small className="text-muted">${jugo.Precio}</small></p>
                                <button className="btn btn-danger" onClick={() => deleteJugo(jugo.ID_Jugo)}>
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

export default DeleteJugo;
