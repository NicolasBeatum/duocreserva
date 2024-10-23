import React, { useState } from 'react';
import axios from 'axios';

const RegisterModal = ({ show, onHide, modalRef }) => {
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
      const response = await axios.post('http://localhost:8000/api/register', {
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
    <div className={`modal fade ${show ? 'show' : ''}`} id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden={!show} ref={modalRef}>
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

export default RegisterModal;