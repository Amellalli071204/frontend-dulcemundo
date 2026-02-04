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
    <div className="pagina-carrito-total">
      <Link to="/" className="link-regresar">⬅ Volver a la Tienda</Link>
      <h2 className="titulo-carrito">Tu Carrito de Compras 🛍️</h2>

      {carrito.length === 0 ? (
        <div className="mensaje-vacio">
          <p>Tu carrito está vacío 🥺</p>
          <Link to="/" className="btn-tienda">Ir a buscar dulces</Link>
        </div>
      ) : (
        <div className="layout-carrito">
          <div className="seccion-articulos">
            {carrito.map(item => (
              <div key={item.id} className="tarjeta-item-carrito">
                <img src={item.imagen_url} alt={item.nombre} className="foto-carrito-mini" />
                <div className="detalles-item">
                  <strong className="nombre-p">{item.nombre}</strong>
                  <span className="precio-p">${item.precio} c/u</span>
                </div>
                <div className="selector-cantidad">
                  <button onClick={() => quitar(item.id)} className="btn-menos">-</button>
                  <span className="num-cant">{item.cantidad}</span>
                  <button onClick={() => agregar(item)} className="btn-mas">+</button>
                </div>
                <span className="subtotal-p">${(item.precio * item.cantidad).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="panel-resumen-pago">
            <h3>Total a Pagar</h3>
            <div className="cifra-total">${total.toFixed(2)}</div>
            <p className="texto-metodo">Selecciona tu pago:</p>
            <div className="botones-pago-grupo">
              <button onClick={() => finalizarPago('Mercado Pago')} className="btn-pago-mp">Mercado Pago 🔵</button>
              <button onClick={() => finalizarPago('Transferencia')} className="btn-pago-tr">Transferencia 🏦</button>
              <button onClick={() => finalizarPago('Efectivo')} className="btn-pago-ef">Efectivo 💵</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;