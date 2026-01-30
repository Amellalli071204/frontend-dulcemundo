import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [mostrarCarrito, setMostrarCarrito] = useState(false)

  useEffect(() => {
    // 👇 PEGA AQUÍ TU LINK DE RAILWAY (El que termina en /api/productos)
    const URL_BACKEND = 'https://backend-dulcemundo-pro-production.up.railway.app/api/productos';
    
    axios.get(URL_BACKEND)
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error:", err))
  }, [])

  // Agregar producto o aumentar cantidad
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(item => 
        item.id === producto.id ? { ...existe, cantidad: existe.cantidad + 1 } : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  }

  // Quitar producto o disminuir cantidad
  const quitarDelCarrito = (id) => {
    const existe = carrito.find(item => item.id === id);
    if (existe.cantidad === 1) {
      setCarrito(carrito.filter(item => item.id !== id));
    } else {
      setCarrito(carrito.map(item => 
        item.id === id ? { ...existe, cantidad: existe.cantidad - 1 } : item
      ));
    }
  }

  const totalPagar = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const finalizarPago = (metodo) => {
    alert(`🛒 Pedido Confirmado\n💰 Total: $${totalPagar.toFixed(2)}\n💳 Método: ${metodo}\n\n¡Gracias por comprar en Dulce Mundo! 🍬`);
    setCarrito([]);
    setMostrarCarrito(false);
  }

  return (
    <div className="contenedor-principal">
      {/* Botón Flotante del Carrito */}
      <div className="carrito-flotante" onClick={() => setMostrarCarrito(true)}>
        <span>🛒</span>
        <span className="badge">{totalArticulos}</span>
      </div>

      <h1>🌸 Dulce Mundo 🍬</h1>

      {/* Ventana Modal del Carrito */}
      {mostrarCarrito && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="btn-cerrar" onClick={() => setMostrarCarrito(false)}>×</button>
            <h2>Tu Carrito 🛍️</h2>
            
            <div className="lista-carrito">
              {carrito.length === 0 ? (
                <p>Tu carrito está vacío 🥺</p>
              ) : (
                carrito.map(item => (
                  <div key={item.id} className="item-fila">
                    <div className="item-info">
                      <strong>{item.nombre}</strong>
                      <span>${item.precio} c/u</span>
                    </div>
                    <div className="item-controles">
                      <button onClick={() => quitarDelCarrito(item.id)}>-</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => agregarAlCarrito(item)}>+</button>
                    </div>
                    <div className="item-subtotal">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {carrito.length > 0 && (
              <div className="seccion-pago">
                <hr />
                <div className="total-contenedor">
                  <span>TOTAL A PAGAR:</span>
                  <span className="monto-total">${totalPagar.toFixed(2)}</span>
                </div>
                
                <p className="instruccion-pago">Selecciona tu método de pago:</p>
                <div className="botones-pago">
                  <button onClick={() => finalizarPago('Mercado Pago')} className="pago-mp">Mercado Pago 🔵</button>
                  <button onClick={() => finalizarPago('Transferencia')} className="pago-bank">Transferencia 🏦</button>
                  <button onClick={() => finalizarPago('Efectivo (One Push)')} className="pago-cash">Efectivo 💵</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid de Productos */}
      <div className="grid-productos">
        {productos.map(p => (
          <div key={p.id} className="tarjeta-dulce">
            <div className="imagen-wrapper">
              <img src={p.imagen_url} alt={p.nombre} />
            </div>
            <h3>{p.nombre}</h3>
            <p className="precio-tag">${p.precio}</p>
            <button className="btn-agregar" onClick={() => agregarAlCarrito(p)}>
              Añadir 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App