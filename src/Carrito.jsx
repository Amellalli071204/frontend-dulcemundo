import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Carrito.css';

function Carrito({ carrito, agregar, quitar, limpiar }) {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const pagar = (metodo) => {
    alert(`Pedido Confirmado!\nTotal: $${total.toFixed(2)}\nMétodo: ${metodo}`);
    limpiar();
    navigate('/');
  };

  return (
    <div className="pantalla-carrito">
      <Link to="/" className="volver">⬅ Volver a la Tienda</Link>
      <h2>Tu Carrito 🛍️</h2>
      {carrito.length === 0 ? <p>Está vacío 🥺</p> : (
        <div className="contenedor-flex">
          <div className="lista">
            {carrito.map(item => (
              <div key={item.id} className="fila">
                <img src={item.imagen_url} alt={item.nombre} className="mini" />
                <div className="info">
                  <strong>{item.nombre}</strong>
                  <span>${item.precio} c/u</span>
                </div>
                <div className="controles">
                  <button onClick={() => quitar(item.id)}>-</button>
                  <span className="num">{item.cantidad}</span>
                  <button onClick={() => agregar(item)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="resumen">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={() => pagar('Mercado Pago')} className="mp">Mercado Pago 🔵</button>
            <button onClick={() => pagar('Transferencia')} className="tr">Transferencia 🏦</button>
            <button onClick={() => pagar('Efectivo')} className="ef">Efectivo 💵</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;s