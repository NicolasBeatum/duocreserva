import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Datos de ejemplo
const menuItems = [
  { id: 1, name: "Pollo a la parrilla", price: 12, description: "Con ensalada y papas", category: "Carnes" },
  { id: 2, name: "Lomo saltado", price: 14, description: "Tradicional plato peruano", category: "Carnes" },
  { id: 3, name: "Ensalada César", price: 10, description: "Con pollo grillado", category: "Ensaladas" },
  { id: 4, name: "Ensalada de quinoa", price: 11, description: "Con vegetales y aderezo de limón", category: "Ensaladas" },
  { id: 5, name: "Pasta Alfredo", price: 13, description: "Con salsa cremosa y parmesano", category: "Pastas" },
  { id: 6, name: "Lasaña vegetariana", price: 12, description: "Con berenjena y zucchini", category: "Pastas" },
];

const LocalLunchReservation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [activeCategory, setActiveCategory] = useState("Carnes");

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  const filteredItems = menuItems.filter(item => 
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    item.category === activeCategory
  );

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        );
      }
      return [...prevCart, {...item, quantity: 1}];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem => 
          cartItem.id === itemId ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
        );
      }
      return prevCart.filter(cartItem => cartItem.id !== itemId);
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reserva enviada", { cart, selectedDate, customerName, customerPhone });
    setCart([]);
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setCustomerName("");
    setCustomerPhone("");
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="container-fluid py-5">
      <h1 className="text-center mb-4">Reserva tu almuerzo</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar almuerzos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button">Buscar</button>
          </div>
          <ul className="nav nav-tabs mb-3">
            {categories.map(category => (
              <li className="nav-item" key={category}>
                <button 
                  className={`nav-link ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {filteredItems.map(item => (
              <div key={item.id} className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text"><small className="text-muted">${item.price}</small></p>
                    <button className="btn btn-primary" onClick={() => addToCart(item)}>
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tu pedido</h5>
              {cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                    <small className="text-muted">${item.price} x {item.quantity}</small>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => removeFromCart(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => addToCart(item)}>+</button>
                  </div>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>${totalPrice.toFixed(2)}</strong>
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
                  <small className="form-text text-muted">
                    {formatDate(selectedDate)}
                  </small>
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
                <button type="submit" className="btn btn-success w-100">
                  Reservar almuerzo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalLunchReservation;