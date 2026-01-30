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
    axios.get('https://backend-dulcemundo-pro-production.up.railway.app/api/productos')
      .then(res => setProductos(res.data));
  }, []);

  const agregar = (p) => {
    const ex = carrito.find(i => i.id === p.id);
    if (ex) setCarrito(carrito.map(i => i.id === p.id ? {...i, cantidad: i.cantidad + 1} : i));
    else setCarrito([...carrito, {...p, cantidad: 1}]);
  };

  const quitar = (id) => {
    const ex = carrito.find(i => i.id === id);
    if (ex.cantidad === 1) setCarrito(carrito.filter(i => i.id !== id));
    else setCarrito(carrito.map(i => i.id === id ? {...i, cantidad: i.cantidad - 1} : i));
  };

  return (
    <Router>
      <nav className="nav-principal">
        <Link to="/" style={{textDecoration:'none'}}><h1>🌸 Dulce Mundo 🍬</h1></Link>
        <Link to="/carrito" className="btn-nav">Mi Carrito ({carrito.reduce((a,b)=>a+b.cantidad,0)}) 🛒</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Catalogo productos={productos} agregar={agregar} />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} agregar={agregar} quitar={quitar} limpiar={()=>setCarrito([])} />} />
      </Routes>
    </Router>
  );
}