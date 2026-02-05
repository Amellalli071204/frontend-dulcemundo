import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Navbar está en la carpeta 'components'
import Navbar from './components/Navbar'; 

// 2. Todos estos están directamente en la carpeta 'src' según tu captura
import Catalogo from './Catalogo';
import Login from './Login';
import Registro from './Registro';
import Carrito from './Carrito';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="*" element={<h2>404 - No hay dulces aquí 🍭</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;