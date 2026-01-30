import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'

// --- PANTALLA 1: LA TIENDA ---
function Tienda({ productos, agregarAlCarrito, totalArticulos }) {
  return (
    <div className="pantalla-tienda">
      <nav className="barra-navegacion">
        <h1>🌸 Dulce Mundo 🍬</h1>
        <Link title="Ir al carrito" to="/carrito" className="boton-ir-carrito">
          🛒 Mi Carrito ({totalArticulos})
        </Link>
      </nav>

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

// --- PANTALLA 2: EL CARRITO (PAGO) ---
function PantallaCarrito({ carrito, agregarAlCarrito, quitarUno, limpiarCarrito }) {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const pagar = (metodo) => {
    alert(`💰 Total a pagar: $${total.toFixed(2)}\nMétodo: ${metodo}\n\n¡Gracias por tu compra en Dulce Mundo! 🍬`);
    limpiarCarrito();
    navigate('/'); // Regresa a la tienda después de pagar
  }

  return (
    <div className="pantalla-carrito-detalle">
      <Link to="/" className="enlace-volver">⬅ Volver a la Tienda</Link>
      <h2>Tu Carrito de Compras 🛍️</h2>

      {carrito.length === 0 ? (
        <div className="vacio">
          <p>No has agregado dulces aún. 🥺</p>
          <Link to="/" className="btn-add">Ir a buscar dulces</Link>
        </div>
      ) : (
        <div className="seccion-pago-completa">
          <div className="lista-detallada">
            {carrito.map(item => (
              <div key={item.id} className="fila-carrito">
                <img src={item.imagen_url} alt={item.nombre} className="mini-img" />
                <div className="info">
                  <strong>{item.nombre}</strong>
                  <span>${item.precio} c/u</span>
                </div>
                <div className="controles">
                  <button onClick={() => quitarUno(item.id)}>-</button>
                  <strong>{item.cantidad}</strong>
                  <button onClick={() => agregarAlCarrito(item)}>+</button>
                </div>
                <span className="subtotal">${(item.precio * item.cantidad).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="caja-pago">
            <h3>Resumen de Compra</h3>
            <div className="total-grande">Total: ${total.toFixed(2)}</div>
            <p>Selecciona tu forma de pago:</p>
            <div className="opciones-pago">
              <button onClick={() => pagar('Mercado Pago')} className="btn-mp">Mercado Pago 🔵</button>
              <button onClick={() => pagar('Transferencia')} className="btn-tr">Transferencia Bancaria 🏦</button>
              <button onClick={() => pagar('Efectivo (One Push)')} className="btn-ef">Pago en Efectivo 💵</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- COMPONENTE PRINCIPAL (RUTAS) ---
export default function App() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])

  useEffect(() => {
    const URL_BACKEND = 'https://backend-dulcemundo-pro-production.up.railway.app/api/productos';
    axios.get(URL_BACKEND).then(res => setProductos(res.data)).catch(console.error)
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

  const totalArticulos = carrito.reduce((a, b) => a + b.cantidad, 0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tienda productos={productos} agregarAlCarrito={agregarAlCarrito} totalArticulos={totalArticulos} />} />
        <Route path="/carrito" element={<PantallaCarrito carrito={carrito} agregarAlCarrito={agregarAlCarrito} quitarUno={quitarUno} limpiarCarrito={() => setCarrito([])} />} />
      </Routes>
    </Router>
  )
}