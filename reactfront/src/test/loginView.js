import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalInstance, setModalInstance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const modalElement = document.getElementById('registerModal');
    const modal = new Modal(modalElement, {
      backdrop: 'static',
      keyboard: false
    });
    setModalInstance(modal);

    return () => {
      if (modalInstance) {
        modalInstance.dispose();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        Email: email,
        Contraseña: password
      });
      alert(response.data.message);
      if (response.data.usuario) {
        navigate('/visualizar-menu');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const openModal = () => {
    setShowModal(true);
    if (modalInstance) {
      modalInstance.show();
    }
  };

  const closeModal = () => {
    if (modalInstance) {
      modalInstance.hide();
    }
    setShowModal(false);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg" style={{maxWidth: '400px', width: '100%'}}>
        <div className="card-body p-5">
          <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">Recordarme</label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">Iniciar Sesión</button>
            <button type="button" className="btn btn-secondary w-100" onClick={openModal}>Registrarse</button>
          </form>
          <div className="text-center mt-3">
            <a href="#" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
      </div>
      <RegisterModal show={showModal} onHide={closeModal} />
    </div>
  );
};

const RegisterModal = ({ show, onHide }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailDomain, setEmailDomain] = useState('@duocuc.cl');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullEmail = emailDomain === 'custom' ? email : `${email}${emailDomain}`;
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/usuario', {
        PrimerNombre: firstName,
        ApellidoPaterno: lastName,
        Email: fullEmail,
        Contraseña: password,
        Telefono: '' // Puedes agregar un campo de teléfono si es necesario
      });
      alert(response.data.message);
      onHide();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden={!show}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="registerModalLabel">Registro</h5>
            <button type="button" className="btn-close" onClick={onHide} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="firstName" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="lastName" className="form-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <select 
                    className="form-select" 
                    value={emailDomain} 
                    onChange={(e) => setEmailDomain(e.target.value)}
                  >
                    <option value="@duocuc.cl">@duocuc.cl</option>
                    <option value="@profesor.duocuc.cl">@profesor.duocuc.cl</option>
                    <option value="custom">Otro</option>
                  </select>
                </div>
                {emailDomain === 'custom' && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Ingrese dominio personalizado"
                    value={email.split('@')[1] || ''}
                    onChange={(e) => setEmail(email.split('@')[0] + '@' + e.target.value)}
                    required
                  />
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;