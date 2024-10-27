import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const MenuLocal = () => {
  const [comidas, setComidas] = useState([]); // Estado para comidas
  const [postres, setPostres] = useState([]); // Estado para postres
  const [ensaladas, setEnsaladas] = useState([]); // Estado para ensaladas
  const [cart, setCart] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [activeTab, setActiveTab] = useState('comidas'); // Estado para la pestaña activa
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // Cargar los datos del menú desde la base de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const comidasResponse = await axios.get('http://localhost:8000/api/comidas');
        const postresResponse = await axios.get('http://localhost:8000/api/postre');
        const ensaladasResponse = await axios.get('http://localhost:8000/api/ensalada');
        setComidas(comidasResponse.data);
        setPostres(postresResponse.data);
        setEnsaladas(ensaladasResponse.data);
      } catch (error) {
        console.error('Error al cargar el menú:', error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => 
        (item.ID_Comida && cartItem.ID_Comida === item.ID_Comida) ||
        (item.ID_Postre && cartItem.ID_Postre === item.ID_Postre) ||
        (item.ID_Ensalada && cartItem.ID_Ensalada === item.ID_Ensalada)
      );

      if (existingItem) {
        return prevCart.map(cartItem => 
          (item.ID_Comida && cartItem.ID_Comida === item.ID_Comida) || 
          (item.ID_Postre && cartItem.ID_Postre === item.ID_Postre) ||
          (item.ID_Ensalada && cartItem.ID_Ensalada === item.ID_Ensalada)
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => 
        (cartItem.ID_Comida && cartItem.ID_Comida === itemId) || 
        (cartItem.ID_Postre && cartItem.ID_Postre === itemId) ||
        (cartItem.ID_Ensalada && cartItem.ID_Ensalada === itemId)
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevCart.map(cartItem => 
            (cartItem.ID_Comida === itemId || cartItem.ID_Postre === itemId ||  cartItem.ID_Ensalada === itemId)
              ? { ...cartItem, quantity: cartItem.quantity - 1 } 
              : cartItem
          );
        } else {
          return prevCart.filter(cartItem => 
            !(cartItem.ID_Comida === itemId || cartItem.ID_Postre === itemId || cartItem.ID_Ensalada === itemId)
          );
        }
      }
      return prevCart;
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.Precio * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reserva enviada", { cart, selectedDate, customerName, customerPhone });

    // Mostrar alerta de reserva realizada
    alert('¡Reserva realizada con éxito!');

    setCart([]);
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setCustomerName("");
    setCustomerPhone("");
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Filtrar comidas y postres según el término de búsqueda
  const filteredComidas = comidas.filter(item => 
    item.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPostres = postres.filter(item => 
    item.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredEnsaladas = ensaladas.filter(item => 
    item.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid py-5">
      <h1 className="text-center mb-4">Reserva tu almuerzo</h1>

      {/* Campo de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Pestañas */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'comidas' ? 'active' : ''}`} 
            onClick={() => setActiveTab('comidas')}
          >
            Comidas
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'postres' ? 'active' : ''}`} 
            onClick={() => setActiveTab('postres')}
          >
            Postres
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'ensaladas' ? 'active' : ''}`} 
            onClick={() => setActiveTab('ensaladas')}
          >
            Ensaladas
          </button>
        </li>
      </ul>

      <div className="row">
        <div className="col-md-8">
          {/* Contenido basado en la pestaña activa */}
          {activeTab === 'comidas' && (
            <>
              <h2>Comidas</h2>
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {filteredComidas.map(item => (
                  <div key={item.id} className="col">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">{item.Nombre}</h5>
                        <p className="card-text">{item.Descripcion}</p>
                        <p className="card-text"><small className="text-muted">${item.Precio}</small></p>
                        <button className="btn btn-warning" onClick={() => addToCart(item)}>
                          Añadir al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {activeTab === 'postres' && (
            <>
              <h2>Postres</h2>
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {filteredPostres.map(item => (
                  <div key={item.id} className="col">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">{item.Nombre}</h5>
                        <p className="card-text">{item.Descripcion}</p>
                        <p className="card-text"><small className="text-muted">${item.Precio}</small></p>
                        <button className="btn btn-warning" onClick={() => addToCart(item)}>
                          Añadir al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {activeTab === 'ensaladas' && (
            <>
              <h2>Ensaladas</h2>
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {filteredEnsaladas.map(item => (
                  <div key={item.id} className="col">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">{item.Nombre}</h5>
                        <p className="card-text">{item.Descripcion}</p>
                        <p className="card-text"><small className="text-muted">${item.Precio}</small></p>
                        <button className="btn btn-warning" onClick={() => addToCart(item)}>
                          Añadir al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tu pedido</h5>
              {cart.map(item => (
                <div key={item.ID_Comida || item.ID_Postre || item.ID_Ensalada} className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h6 className="mb-0">{item.Nombre}</h6>
                    <small className="text-muted">${item.Precio} x {item.quantity}</small>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => removeFromCart(item.ID_Comida || item.ID_Postre || item.ID_Ensalada)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => addToCart(item)}>+</button>
                  </div>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>${totalPrice.toFixed(0)}</strong>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="pickup-date" className="form-label">Fecha de recogida</label>
                  <input
                    type="date"
                    className="form-control"
                    id="pickup-date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="customer-name" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="customer-name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="customer-phone" className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="customer-phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Reservar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuLocal;
