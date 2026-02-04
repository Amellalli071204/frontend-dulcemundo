import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Catalogo from './Catalogo';
import Carrito from './Carrito';
import './App.css';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // 👇 REVISA QUE ESTE SEA TU LINK DE RAILWAY
    const URL = 'https://backend-dulcemundo-pro-production.up.railway.app/api/productos';
    axios.get(URL)
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  const agregar = (p) => {
    const ex = carrito.find(i => i.id === p.id);
    if (ex) {
      setCarrito(carrito.map(i => i.id === p.id ? { ...i, cantidad: i.cantidad + 1 } : i));
    } else {
      setCarrito([...carrito, { ...p, cantidad: 1 }]);
    }
  };

  const quitar = (id) => {
    const ex = carrito.find(i => i.id === id);
    if (ex.cantidad === 1) {
      setCarrito(carrito.filter(i => i.id !== id));
    } else {
      setCarrito(carrito.map(i => i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i));
    }
  };

  const totalArticulos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Router>
      <nav className="nav-principal">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>🌸 Dulce Mundo 🍬</h1>
        </Link>
        <Link to="/carrito" className="btn-nav">
          Mi Carrito ({totalArticulos}) 🛒
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Catalogo productos={productos} agregar={agregar} />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} agregar={agregar} quitar={quitar} limpiar={() => setCarrito([])} />} />
      </Routes>
    </Router>
  );
}