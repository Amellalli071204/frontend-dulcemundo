import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa tus componentes (asegúrate de que los nombres y rutas coincidan)
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Tu catálogo de dulces
import Login from './components/Login';
import Registro from './components/Registro';
import PanelAdmin from './pages/PanelAdmin'; // La página para gestionar productos

function App() {
  return (
    <Router>
      {/* El Navbar se queda afuera de Routes para que aparezca en todas las páginas */}
      <Navbar /> 
      
      <div className="container" style={{ marginTop: '20px' }}>
        <Routes>
          {/* Ruta principal: Tu catálogo de dulces */}
          <Route path="/" element={<Home />} />

          {/* Ruta para que los clientes se unan */}
          <Route path="/registro" element={<Registro />} />

          {/* Ruta para iniciar sesión */}
          <Route path="/login" element={<Login />} />

          {/* Ruta del Panel de Administración (donde tú mandas) */}
          <Route path="/admin" element={<PanelAdmin />} />
          
          {/* Ruta por si alguien escribe una dirección que no existe */}
          <Route path="*" element={<h2>404 - ¡Uy! Aquí no hay dulces 🍭</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;