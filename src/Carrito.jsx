import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Carrito.css';

function Carrito({ carrito, agregar, quitar, limpiar }) {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const finalizarPago = (metodo) => {
    alert(`💰 Pago procesado con: ${metodo}\nTotal: $${total.toFixed(2)}\n\n¡Gracias por tu compra! 🍭`);
    limpiar();
    navigate('/');
  };

  return (
    <div className="pantalla-carrito">
      <Link to="/" className="enlace-volver">⬅ Volver a la Tienda</Link>
      <h2 className="titulo-seccion">Tu Carrito de Compras 🛍️</h2>

      {carrito.length === 0 ? (
        <div className="vacio-mensaje">
          <p>Tu carrito está vacío 🥺</p>
          <Link to="/" className="btn-volver-tienda">Ir a buscar dulces</Link>
        </div>
      ) : (
        <div className="contenedor-flex">
          <div className="lista-productos">
            {carrito.map(item => (
              <div key={item.id} className="fila-item">
                <img src={item.imagen_url} alt={item.nombre} className="img-carrito" />
                <div className="info-txt">
                  <strong>{item.nombre}</strong>
                  <span>${item.precio} c/u</span>
                </div>
                <div className="controles">
                  <button onClick={() => quitar(item.id)}>-</button>
                  <span className="cant">{item.cantidad}</span>
                  <button onClick={() => agregar(item)}>+</button>
                </div>
                <span className="subtotal">${(item.precio * item.cantidad).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="caja-pago">
            <h3>Total: ${total.toFixed(2)}</h3>
            <p>Selecciona tu pago:</p>
            <div className="metodos">
              <button onClick={() => finalizarPago('Mercado Pago')} className="btn-mp">Mercado Pago 🔵</button>
              <button onClick={() => finalizarPago('Transferencia')} className="btn-tr">Transferencia 🏦</button>
              <button onClick={() => finalizarPago('Efectivo')} className="btn-ef">Efectivo 💵</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;