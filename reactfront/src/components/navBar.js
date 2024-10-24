import React, { useContext, useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../images/logoDuocReserva.png';
import AuthContext from '../context/authContext.js';
import RegisterModal from './RegisterModal';
import { Modal } from 'bootstrap'; // Importar Modal desde Bootstrap
import { useNavigate, Link } from 'react-router-dom'; // Importar useNavigate y Link

const Navbar = () => {
  const { isAuthenticated, logout, userType } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate(); // Usar useNavigate para redirección

  useEffect(() => {
    if (modalRef.current) {
      const modal = new Modal(modalRef.current, {
        backdrop: 'static',
        keyboard: false
      });
      modalRef.current.addEventListener('hidden.bs.modal', () => setShowModal(false));
    }
  }, []);

  const openModal = () => {
    setShowModal(true);
    if (modalRef.current) {
      const modal = Modal.getInstance(modalRef.current) || new Modal(modalRef.current);
      modal.show();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (modalRef.current) {
      const modal = Modal.getInstance(modalRef.current);
      if (modal) {
        modal.hide();
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirigir al inicio después de cerrar sesión
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top me-2" />
          DuocUC
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/visualizar-menu">Menu</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                              {userType === 1 && (
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link btn">Admin Panel</Link>
                  </li>
                )}
                <li className="nav-item">
                  <a className="nav-link" href="/perfil">Gestionar mi perfil</a>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn" onClick={handleLogout}>Cerrar sesión</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Iniciar Sesión</a>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={openModal}>Registrarse</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <RegisterModal show={showModal} onHide={closeModal} modalRef={modalRef} />
    </nav>
  );
};

export default Navbar;