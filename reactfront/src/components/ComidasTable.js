import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const ComidasTable = () => {
    const [comidas, setComidas] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedComida, setSelectedComida] = useState(null);
    const [carrito, setCarrito] = useState([]); // Estado para el carrito

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

    const handleClose = () => setShow(false);
    const handleShow = (comida) => {
        setSelectedComida(comida);
        setShow(true);
    };

    const agregarAlCarrito = (comida) => {
        setCarrito([...carrito, comida]); // Agregar la comida al carrito
        alert(`${comida.Nombre} ha sido añadido al carrito.`);
    };

    const eliminarDelCarrito = (index) => {
        const nuevoCarrito = carrito.filter((_, i) => i !== index); // Filtrar la comida a eliminar
        setCarrito(nuevoCarrito);
        alert('Comida eliminada del carrito.');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Plato de Fondo</h1>
            <p>Selecciona algún plato de fondo para ver su descripción...</p>
            <table className="table table-hover table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Agregar</th> {/* Nueva columna para acciones */}
                    </tr>
                </thead>
                <tbody>
                    {comidas.map((comida) => (
                        <tr key={comida.ID_Comida} onClick={() => handleShow(comida)} style={{ cursor: 'pointer' }}>
                            <td>{comida.ID_Comida}</td>
                            <td>{comida.Nombre}</td>
                            <td>${comida.Precio}</td>
                            <td>
                                <Button 
                                    variant="success" 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevenir que el modal se muestre al hacer clic en el botón
                                        agregarAlCarrito(comida);
                                    }}
                                >
                                    Agregar al Carrito
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para mostrar los detalles de la comida */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles de la Comida</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedComida && (
                        <div>
                            <h5>Nombre: {selectedComida.Nombre}</h5>
                            <p>Descripción: {selectedComida.Descripcion}</p>
                            <p>Precio: ${selectedComida.Precio}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Mostrar el contenido del carrito */}
            <div className="mt-5">
                <h2>Carrito</h2>
                <ul className="list-group">
                    {carrito.map((comida, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {comida.Nombre} - ${comida.Precio}
                            <Button 
                                variant="danger" 
                                onClick={() => eliminarDelCarrito(index)}
                            >
                                Eliminar
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ComidasTable;
