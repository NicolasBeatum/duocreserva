import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [nombre, setNombre] = useState('');
    const [idTipoComida, setIdTipoComida] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        try {
            const response = await axios.post('http://localhost:8000/api/comidas', {
                Nombre: nombre,
                ID_TipoComida: idTipoComida,
                Descripcion: descripcion,
                Precio: precio
            });

            alert(response.data.message); // Muestra el mensaje de éxito
            // Reinicia el formulario
            setNombre('');
            setIdTipoComida('');
            setDescripcion('');
            setPrecio('');
        } catch (error) {
            console.error('Error al añadir la comida:', error);
            alert('Error al añadir la comida');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Añadir Comida</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="idTipoComida">ID Tipo Comida</label>
                    <input
                        type="number"
                        className="form-control"
                        id="idTipoComida"
                        value={idTipoComida}
                        onChange={(e) => setIdTipoComida(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="precio">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        id="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Añadir Comida</button>
            </form>
        </div>
    );
};

export default AdminPage;

