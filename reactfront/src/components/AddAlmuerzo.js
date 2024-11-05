import React, { useState, useEffect } from 'react';
import { getNombreTiposComida } from './TipoComidaService'; // Ajusta la ruta si es necesario
import axios from 'axios';

const AddAlmuerzoForm = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [idTipoComida, setIdTipoComida] = useState('');
    const [tiposComida, setTiposComida] = useState([]);
    const [mensaje, setMensaje] = useState('');

    // Obtener los tipos de comida desde el servicio
    useEffect(() => {
        const fetchTiposComida = async () => {
            try {
                const tipos = await getNombreTiposComida(); // Llama al método del servicio
                setTiposComida(tipos); // Guarda la respuesta en el estado
            } catch (error) {
                console.error('Error al obtener tipos de comida:', error);
            }
        };

        fetchTiposComida();
    }, []);

    // Manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        const nuevoAlmuerzo = {
            Nombre: nombre,
            ID_TipoComida: idTipoComida,
            Descripcion: descripcion,
            Precio: precio,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/comidas', nuevoAlmuerzo);
            setMensaje('Almuerzo añadido con éxito.');
            setNombre('');
            setDescripcion('');
            setPrecio('');
            setIdTipoComida('');
        } catch (error) {
            setMensaje('Hubo un error al añadir el almuerzo.');
            console.error('Error al añadir almuerzo:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Añadir un nuevo almuerzo</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre del almuerzo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Descripción</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Precio</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                <label>Tipo de Comida</label>
                <select 
                    className="form-control" 
                    value={idTipoComida} 
                    onChange={(e) => setIdTipoComida(e.target.value)} 
                    required
                >
                    <option value="">Selecciona un tipo de comida</option>
                    <option value="1">Normal</option>
                    <option value="3">Hipocalórico</option>
                    <option value="2">Vegetariano</option>
                </select>
                </div>
                
                <button type="submit" className="btn btn-primary mt-3">Añadir Almuerzo</button>
            </form>
            {mensaje && <p className="mt-3">{mensaje}</p>}
            
        </div>
    );
};



export default AddAlmuerzoForm;
