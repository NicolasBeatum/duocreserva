// src/test/ComidasTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ComidasTable = () => {
    const [comidas, setComidas] = useState([]);

    useEffect(() => {
        const fetchComidas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/comidas');
                setComidas(response.data);
            } catch (error) {
                console.error('Error fetching comidas:', error);
            }
        };

        fetchComidas();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Lista de Comidas</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {comidas.map((comida) => (
                        <tr key={comida.ID_Comida}>
                            <td>{comida.ID_Comida}</td>
                            <td>{comida.Nombre}</td>
                            <td>{comida.Descripcion}</td>
                            <td>{comida.Precio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComidasTable;