import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'

// --- PANTALLA 1: LA TIENDA ---
function Tienda({ productos, agregar, totalArticulos }) {
  return (
    <div className="pantalla-tienda">
      <nav className="nav-bar">
        <div className="logo">
          <span className="emoji">🌸</span>
          <h1>Dulce Mundo</h1>
          <span className="emoji">🍬</span>
        </div>
        <Link to="/carrito" className="btn-carrito-link">
          Mi Carrito ({totalArticulos}) 🛒
        </Link>
      </nav>

      <div className="grid-productos">
        {productos.length === 0 ? <p className="cargando">Cargando dulces...</p> : (
          productos.map(p => (
            <div key={p.id} className="tarjeta-dulce">
              <div className="imagen-contenedor">
                <img src={p.imagen_url} alt={p.nombre} />
              </div>
              <h3>{p.nombre}</h3>
              <p className="precio-tag">${p.precio}</p>
              <button className="btn-agregar" onClick={() => agregar(p)}>
                Agregar 🛒
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// --- PANTALLA 2: EL CARRITO ---
function CarritoPagina({ carrito, agregar, quitar, limpiar }) {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const finalizar = (modo) => {
    alert(`🛒 Pedido Confirmado\n💰 Total: $${total.toFixed(2)}\n💳 Método: ${modo}\n\n¡Gracias por tu compra! 🍬`);
    limpiar();
    navigate('/'); 
  }

  return (
    <div className="pantalla-carrito-detalle">
      <Link to="/" className="enlace-volver">⬅ Volver a la Tienda</Link>
      <h2 className="titulo-seccion">Tu Carrito de Compras 🛍️</h2>
      
      {carrito.length === 0 ? (
        <div className="vacio-mensaje">
          <p>No has agregado dulces aún. 🥺</p>
          <Link to="/" className="btn-agregar" style={{textDecoration:'none'}}>Ir a buscar dulces</Link>
        </div>
      ) : (
        <div className="contenedor-pago-flex">
          <div className="lista-productos-carrito">
            {carrito.map(item => (
              <div key={item.id} className="fila-producto">
                <img src={item.imagen_url} alt={item.nombre} className="img-mini" />
                <div className="info-p">
                  <strong>{item.nombre}</strong>
                  <span>${item.precio} c/u</span>
                </div>
                <div className="controles-cantidad">
                  <button onClick={() => quitar(item.id)}>-</button>
                  <span className="cantidad-num">{item.cantidad}</span>
                  <button onClick={() => agregar(item)}>+</button>
                </div>
                <span className="subtotal-item">${(item.precio * item.cantidad).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="caja-resumen-pago">
            <h3>Resumen</h3>
            <div className="total-display">Total: ${total.toFixed(2)}</div>
            <p className="pago-txt">Selecciona tu método de pago:</p>
            <div className="botones-metodos">
              <button onClick={() => finalizar('Mercado Pago')} className="btn-mp">Mercado Pago 🔵</button>
              <button onClick={() => finalizar('Transferencia')} className="btn-tr">Transferencia 🏦</button>
              <button onClick={() => finalizar('Efectivo')} className="btn-ef">Efectivo 💵</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([])

  useEffect(() => {
    const URL = 'https://backend-dulcemundo-pro-production.up.railway.app/api/productos';
    axios.get(URL).then(res => setProductos(res.data)).catch(console.error)
  }, [])

  const agregar = (p) => {
    const ex = carrito.find(i => i.id === p.id);
    if (ex) setCarrito(carrito.map(i => i.id === p.id ? {...i, cantidad: i.cantidad + 1} : i));
    else setCarrito([...carrito, {...p, cantidad: 1}]);
  }

  const quitar = (id) => {
    const ex = carrito.find(i => i.id === id);
    if (ex.cantidad === 1) setCarrito(carrito.filter(i => i.id !== id));
    else setCarrito(carrito.map(i => i.id === id ? {...i, cantidad: i.cantidad - 1} : i));
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tienda productos={productos} agregar={agregar} totalArticulos={carrito.reduce((a,b)=>a+b.cantidad,0)} />} />
        <Route path="/carrito" element={<CarritoPagina carrito={carrito} agregar={agregar} quitar={quitar} limpiar={()=>setCarrito([])} />} />
      </Routes>
    </Router>
  )
}