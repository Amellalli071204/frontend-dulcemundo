import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importaciones desde la carpeta 'components'
import Navbar from './components/Navbar';
import Carrito from './components/Carrito';

// Importaciones desde la carpeta 'pages'
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Registro from './pages/Registro';

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
          <Route path="*" element={<h2>404 - ¡No hay dulces aquí! 🍭</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;