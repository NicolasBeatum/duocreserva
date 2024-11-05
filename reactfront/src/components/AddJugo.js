// src/components/AddJugo.js
import React, { useState } from 'react';
import axios from 'axios';

const AddJugo = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reiniciar el mensaje de error

        // Validación básica
        if (!nombre || !descripcion || !precio) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        // Crear el objeto del jugo
        const nuevoJugo = {
            Nombre: nombre,
            Descripcion: descripcion,
            Precio: parseInt(precio), // Asegúrate de que el precio es un número
        };

        try {
            // Hacer la solicitud POST a la API
            const response = await axios.post('http://localhost:8000/api/jugo', nuevoJugo);
            alert('Jugo agregado con éxito!');
            // Reiniciar el formulario
            setNombre('');
            setDescripcion('');
            setPrecio('');
        } catch (error) {
            console.error('Error al agregar el jugo:', error);
            setError('Hubo un error al agregar el jugo. Por favor, intente de nuevo.');
        }
    };

    return (
        <div>
            <h2>Agregar Nuevo Jugo</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={precio} 
                        onChange={(e) => setPrecio(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Agregar Jugo</button>
            </form>
        </div>
    );
};

export default AddJugo;
