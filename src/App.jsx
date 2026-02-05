import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Navbar está dentro de la carpeta components
import Navbar from './components/Navbar'; 

// 2. Login y Registro están directamente en src (según tu captura)
import Login from './Login';
import Registro from './Registro';

// 3. Catálogo (Home) también está en src
import Catalogo from './Catalogo';

function App() {
  return (
    <Router>
      {/* Tu menú rosa siempre visible */}
      <Navbar /> 
      
      <div className="container">
        <Routes>
          {/* Ruta principal: Catálogo */}
          <Route path="/" element={<Catalogo />} />

          {/* Rutas de usuario */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Página no encontrada */}
          <Route path="*" element={<h2>404 - ¡Aquí no hay dulces! 🍭</h2>} />
        </Routes>
      </div>
    </Router>
  );
}  

export default App;