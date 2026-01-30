import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])
  const [mostrarCarrito, setMostrarCarrito] = useState(false)

  useEffect(() => {
    // 👇 REVISA QUE ESTE LINK SEA EL TUYO EXACTO
    const URL_BACKEND = 'https://backend-dulcemundo-pro-production.up.railway.app/api/productos';
    
    axios.get(URL_BACKEND)
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar:", err))
  }, [])

  const agregarAlCarrito = (p) => {
    const existe = carrito.find(item => item.id === p.id);
    if (existe) {
      setCarrito(carrito.map(item => item.id === p.id ? { ...item, cantidad: item.cantidad + 1 } : item));
    } else {
      setCarrito([...carrito, { ...p, cantidad: 1 }]);
    }
  }

  const quitarUno = (id) => {
    const item = carrito.find(i => i.id === id);
    if (item.cantidad === 1) {
      setCarrito(carrito.filter(i => i.id !== id));
    } else {
      setCarrito(carrito.map(i => i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i));
    }
  }

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const pagar = (metodo) => {
    alert(`💰 Total a pagar: $${total.toFixed(2)}\nMetodo: ${metodo}\n\n¡Gracias por tu compra! 🍬`);
    setCarrito([]);
    setMostrarCarrito(false);
  }

  return (
    <div className="app-container">
      {/* BOTON DEL CARRITO (Siempre visible) */}
      <button className="boton-carrito-flotante" onClick={() => setMostrarCarrito(true)}>
        🛒 Ver Carrito ({carrito.reduce((a, b) => a + b.cantidad, 0)})
      </button>

      <h1>🌸 Dulce Mundo 🍬</h1>

      {/* VENTANA DEL CARRITO (MODAL) */}
      {mostrarCarrito && (
        <div className="capa-oscura">
          <div className="ventana-carrito">
            <button className="boton-cerrar" onClick={() => setMostrarCarrito(false)}>X</button>
            <h2>Tu Pedido 🍭</h2>
            
            {carrito.length === 0 ? <p>Carrito vacío</p> : (
              <div className="lista-items">
                {carrito.map(item => (
                  <div key={item.id} className="item-fila">
                    <span>{item.nombre}</span>
                    <div className="controles">
                      <button onClick={() => quitarUno(item.id)}>-</button>
                      <strong>{item.cantidad}</strong>
                      <button onClick={() => agregarAlCarrito(item)}>+</button>
                    </div>
                    <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                  </div>
                ))}
                <div className="total-seccion">
                  <h3>Total: ${total.toFixed(2)}</h3>
                  <p>¿Cómo deseas pagar?</p>
                  <div className="opciones-pago">
                    <button onClick={() => pagar('Mercado Pago')} className="btn-mp">Mercado Pago 🔵</button>
                    <button onClick={() => pagar('Transferencia')} className="btn-tr">Transferencia 🏦</button>
                    <button onClick={() => pagar('Efectivo')} className="btn-ef">Efectivo 💵</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="productos-grid">
        {productos.map(p => (
          <div key={p.id} className="tarjeta-producto">
            <img src={p.imagen_url} alt={p.nombre} />
            <h3>{p.nombre}</h3>
            <p className="precio">${p.precio}</p>
            <button className="btn-add" onClick={() => agregarAlCarrito(p)}>Agregar 🛒</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App