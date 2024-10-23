import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Perfil = () => {
  const [perfil, setPerfil] = useState({
    PrimerNombre: '',
    ApellidoPaterno: '',
    Email: '',
    Telefono: '',
    Contraseña: ''
  });
  const [isEditing, setIsEditing] = useState({
    PrimerNombre: false,
    ApellidoPaterno: false,
    Email: false,
    Telefono: false,
    Contraseña: false
  });

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPerfil(response.data);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };

    fetchPerfil();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      [name]: value
    }));
  };

  const handleEdit = (field) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [field]: true
    }));
  };

  const handleSave = async (field) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8000/api/perfil', perfil, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Perfil actualizado correctamente');
      setIsEditing((prevIsEditing) => ({
        ...prevIsEditing,
        [field]: false
      }));
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error al actualizar el perfil');
    }
  };

  const renderField = (field, label, type = 'text') => {
    return (
      <div className="mb-3">
        <label htmlFor={field} className="form-label">{label}</label>
        <div className="input-group">
          <input
            type={type}
            className="form-control"
            id={field}
            name={field}
            value={perfil[field]}
            onChange={handleChange}
            disabled={!isEditing[field]}
          />
          <button 
            type="button"
            className={`btn ${isEditing[field] ? 'btn-success' : 'btn-primary'}`}
            onClick={() => isEditing[field] ? handleSave(field) : handleEdit(field)}
          >
            {isEditing[field] ? 'Guardar' : 'Editar'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Perfil de Usuario</h2>
              <div>
                {renderField('PrimerNombre', 'Nombre')}
                {renderField('ApellidoPaterno', 'Apellido')}
                {renderField('Email', 'Correo Electrónico', 'email')}
                {renderField('Telefono', 'Teléfono', 'tel')}
                {renderField('Contraseña', 'Contraseña', 'password')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;