import React, { useState, useContext, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';
import RegisterModal from './RegisterModal';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (modalRef.current) {
      const modal = new Modal(modalRef.current, {
        backdrop: 'static',
        keyboard: false
      });
      modalRef.current.addEventListener('hidden.bs.modal', () => setShowModal(false));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        Email: email,
        Contraseña: password
      });
      const token = response.data.token;
      login(token);
      alert('Inicio de sesión exitoso');
      navigate('/visualizar-menu');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const openModal = () => {
    setShowModal(true);
    if (modalRef.current) {
      const modal = Modal.getInstance(modalRef.current) || new Modal(modalRef.current);
      modal.show();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      const modal = Modal.getInstance(modalRef.current);
      if (modal) {
        modal.hide();
      }
    }
    setShowModal(false);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
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
      <RegisterModal show={showModal} onHide={closeModal} modalRef={modalRef} />
    </div>
  );
};

export default LoginForm;